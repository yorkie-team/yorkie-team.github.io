import type { GetStaticProps, GetStaticPaths } from 'next';
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import {
  type DocsMeta,
  type DocsOrderList,
  getSlugs,
  getDocsFromSlug,
  getDocsMetaFromSlug,
  getDocsOrderList,
} from '@/utils/mdxUtils';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXComponents } from 'mdx/types';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc, { HtmlElementNode, ListItemNode } from '@jsdevtools/rehype-toc';
import rehypeImageMeta from '@/utils/rehypeImageMeta';
import rehypeWrapContents from '@/utils/rehypeWrapContents';
import rehypeVariables from '@/utils/rehypeVariables';
import { Layout, Navigator, Button, Icon, CodeBlock, CodeBlockHeader, Image } from '@/components';
import { CustomLink, CustomCodeBlock, Breadcrumb, Caption, ImageWrap, Alert, Blockquote } from '@/components/docs';

// Custom components/renderers to pass to MDX.
const components: MDXComponents = {
  a: CustomLink,
  h3: (props) => <h3 className="heading" {...props} />,
  h4: (props) => <h4 className="heading" {...props} />,
  h5: (props) => <h5 className="heading" {...props} />,
  h6: (props) => <h6 className="heading" {...props} />,
  Button,
  Icon,
  pre: (props) => <CustomCodeBlock {...props} />,
  blockquote: (props) => <Blockquote {...props} />,
  img: ({ src, alt, title, width, height }) => (
    <Image src={src!} alt={alt || ''} title={title} width={width as number} height={height as number} />
  ),
  Image,
  ImageWrap,
  Breadcrumb,
  Caption,
  Alert,
  CodeBlock,
  CodeBlockHeader,
};

export default function DocsPage({
  source,
  navList,
}: {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: DocsMeta;
  navList: DocsOrderList;
}) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<Array<Element>>([]);
  const [headingTops, setHeadingTops] = useState<Array<{ id: string; top: number }>>([]);

  const updateHeadingPositions = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const headingTops = [...headings].map((heading) => {
      const top = heading.getBoundingClientRect().top + scrollTop;
      return {
        id: heading.id,
        top,
      };
    });
    setHeadingTops(headingTops);
  }, [headings]);

  useEffect(() => {
    setHeadings(Array.from(document.querySelectorAll('.documentation_page .heading')));
  }, [source]);

  useEffect(() => {
    if (headings.length === 0) return;

    const setActiveTOCLink = () => {
      const scrollTop = document.documentElement.scrollTop;
      const yOffset = 150;

      const currentHeading =
        scrollTop < 10
          ? headingTops.find((headingTop) => {
              return scrollTop >= headingTop.top - yOffset;
            })
          : [...headingTops].reverse().find((headingTop) => {
              return scrollTop >= headingTop.top - yOffset;
            });

      setActiveId(currentHeading?.id || '');
    };

    window.addEventListener('scroll', setActiveTOCLink);
    setActiveTOCLink();
    return () => {
      window.removeEventListener('scroll', setActiveTOCLink);
    };
  }, [headings, headingTops]);

  useEffect(() => {
    updateHeadingPositions();
    document.querySelector(`.toc-item.is_active`)?.classList.remove('is_active');
    document.querySelector(`[data-heading="${activeId}"]`)?.classList.add('is_active');
  }, [activeId, updateHeadingPositions]);

  return (
    <Layout className="documentation_page">
      <Head>
        <title>Documentation · Yorkie</title>
      </Head>
      <div className="content">
        <Navigator navList={navList} />
        <section className="section">
          <MDXRemote {...source} components={components} />
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params as { slug: Array<string> })?.slug?.join('/') || 'index';
  const { content, meta } = getDocsFromSlug(slug);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeImageMeta,
        [
          rehypeVariables,
          {
            variables: [
              { pattern: 'YORKIE_VERSION', value: process.env.NEXT_PUBLIC_YORKIE_VERSION },
              { pattern: 'YORKIE_JS_VERSION', value: process.env.NEXT_PUBLIC_YORKIE_JS_VERSION },
              { pattern: 'YORKIE_IOS_VERSION', value: process.env.NEXT_PUBLIC_YORKIE_IOS_VERSION },
              { pattern: 'YORKIE_ANDROID_VERSION', value: process.env.NEXT_PUBLIC_YORKIE_ANDROID_VERSION },
              { pattern: 'DASHBOARD_PATH', value: process.env.NEXT_PUBLIC_DASHBOARD_PATH },
              { pattern: 'API_ADDR', value: process.env.NEXT_PUBLIC_API_ADDR },
              { pattern: 'API_HOST', value: process.env.NEXT_PUBLIC_API_HOST },
              { pattern: 'API_PORT', value: process.env.NEXT_PUBLIC_API_PORT },
            ],
          },
        ],
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            test: ['h3', 'h4', 'h5', 'h6'],
            behavior: 'wrap',
          },
        ],
        [
          rehypeToc,
          {
            position: 'afterend',
            headings: ['h3', 'h4', 'h5', 'h6'],
            customizeTOC: (toc: HtmlElementNode) => {
              const children = toc.children || [];
              const contents = (children[0] as any)?.children?.length;
              if (!contents) return false;

              toc.tagName = 'div';
              toc.properties.className = 'pagination';
              const wrapper = {
                type: 'element',
                tagName: 'div',
                properties: { className: 'pagination_inner' },
                children: [
                  {
                    type: 'element',
                    tagName: 'strong',
                    properties: { className: 'pagination_title' },
                    children: [{ type: 'text', value: 'On this page' }],
                  },
                  ...children,
                ],
              };
              toc.children = [wrapper];
            },
            customizeTOCItem: (tocItem: ListItemNode, heading: HtmlElementNode) => {
              tocItem.properties['data-heading'] = heading.properties.id;
            },
          },
        ],
        rehypeWrapContents,
      ],
    },
  });

  const navList = getDocsOrderList('/docs');

  return {
    props: {
      source: mdxSource,
      meta,
      navList,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getSlugs()
    .filter((slug) => {
      if (process.env.NODE_ENV === 'development') return true;

      const { phase } = getDocsMetaFromSlug(slug);
      return phase !== 'development';
    })
    .map((slug) => {
      return {
        params: {
          slug: slug === 'index' ? [''] : slug.split('/'),
        },
      };
    });

  return {
    paths,
    fallback: false,
  };
};
