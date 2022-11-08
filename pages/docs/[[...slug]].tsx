import type { GetStaticProps, GetStaticPaths } from 'next';
import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { type DocsMeta, type DocsOrderList, getSlugs, getDocsFromSlug, getDocsOrderList } from '@/utils/mdxUtils';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXComponents } from 'mdx/types';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc, { HtmlElementNode, ListItemNode } from '@jsdevtools/rehype-toc';
import { Layout, CustomLink, Navigator, CodeBlock } from '@/components';

// Custom components/renderers to pass to MDX.
const components: MDXComponents = {
  a: CustomLink,
  h3: (props) => <h3 className='heading' {...props} />,
  h4: (props) => <h4 className='heading' {...props} />,
  h5: (props) => <h5 className='heading' {...props} />,
  h6: (props) => <h6 className='heading' {...props} />,
  pre: (props) => <CodeBlock {...props} />,
  TestComponent: dynamic(() => import('@/components/TestComponent')),
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
    <Layout className='documentation_page' shortFooter>
      <Navigator navList={navList} />
      <section className='section'>
        <MDXRemote {...source} components={components} />
      </section>
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
  const paths = getSlugs().map((slug) => {
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
