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
import { Layout, Navigator, Button, Icon, CodeBlock, CodeBlockHeader, Image, Mermaid } from '@/components';
import {
  CustomLink,
  CustomCodeBlock,
  Breadcrumb,
  Caption,
  ImageWrap,
  Alert,
  Blockquote,
  EditThisPage,
} from '@/components/docs';

// Custom components/renderers to pass to MDX.
const components: MDXComponents = {
  a: CustomLink,
  // Each docs page opens with one `##` heading, which is the page title, so
  // every level below it renders one step up to keep the outline unbroken.
  h2: (props) => <h1 className="docs_title" {...props} />,
  h3: (props) => <h2 className="heading" {...props} />,
  h4: (props) => <h3 className="heading" {...props} />,
  h5: (props) => <h4 className="heading" {...props} />,
  h6: (props) => <h5 className="heading" {...props} />,
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
  Mermaid,
};

/**
 * Scrolls the table of contents, not the window, so the entry for the current
 * section stays visible when the list is taller than its panel.
 */
function keepTOCItemInView(item: Element | null, behavior?: ScrollBehavior) {
  const list = document.querySelector<HTMLElement>('.pagination .toc-level-1');
  if (!item || !list || list.scrollHeight <= list.clientHeight) return;

  // An entry with subsections wraps their list too; measure its own link.
  const target = item.querySelector(':scope > a') ?? item;
  const listRect = list.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  const margin = 32;
  if (rect.top >= listRect.top + margin && rect.bottom <= listRect.bottom - margin) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  list.scrollTo({
    top: list.scrollTop + rect.top - listRect.top - list.clientHeight / 3,
    behavior: behavior ?? (reduceMotion ? 'auto' : 'smooth'),
  });
}

export default function DocsPage({
  source,
  meta,
  navList,
}: {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: DocsMeta;
  navList: DocsOrderList;
}) {
  const [activeId, setActiveId] = useState<string>('');
  const [isTOCOpen, setTOCOpen] = useState(false);
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
    const activeItem = document.querySelector(`[data-heading="${activeId}"]`);
    activeItem?.classList.add('is_active');
    keepTOCItemInView(activeItem);

    const current = document.querySelector('.pagination_toggle_current');
    if (current) current.textContent = activeItem?.querySelector(':scope > a')?.textContent ?? '';
  }, [activeId, updateHeadingPositions]);

  // Below 1440px the table of contents is a dropdown. A link, Escape or a
  // click elsewhere closes it, and so does moving to another page.
  useEffect(() => {
    setTOCOpen(false);
    const panel = document.querySelector('.pagination');
    const toggle = panel?.querySelector<HTMLButtonElement>('.pagination_toggle');
    if (!panel || !toggle) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (toggle.contains(target)) {
        setTOCOpen((open) => !open);
      } else if (!panel.contains(target) || target.closest('a')) {
        setTOCOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !panel.hasAttribute('data-open')) return;
      setTOCOpen(false);
      toggle.focus();
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [source]);

  useEffect(() => {
    const panel = document.querySelector('.pagination');
    panel?.toggleAttribute('data-open', isTOCOpen);
    panel?.querySelector('.pagination_toggle')?.setAttribute('aria-expanded', String(isTOCOpen));
    if (isTOCOpen) keepTOCItemInView(document.querySelector('.toc-item.is_active'), 'auto');
  }, [isTOCOpen, source]);

  return (
    <Layout className="documentation_page">
      <Head>
        <title>{meta?.title ? `${meta.title} · Yorkie Docs` : 'Documentation · Yorkie'}</title>
      </Head>
      <div className="content">
        <Navigator navList={navList} />
        <section className="section">
          <EditThisPage />
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
            headings: ['h3', 'h4'],
            customizeTOC: (toc: HtmlElementNode) => {
              const children = toc.children || [];
              const contents = (children[0] as any)?.children?.length;
              if (!contents) return false;

              toc.properties.className = 'pagination';
              toc.properties.ariaLabel = 'On this page';
              (children[0] as HtmlElementNode).properties.id = 'toc-list';
              const span = (className: string, value?: string) => ({
                type: 'element',
                tagName: 'span',
                properties: { className },
                children: value ? [{ type: 'text', value }] : [],
              });
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
                  // Below 1440px the title becomes this toggle, which also names the current section.
                  {
                    type: 'element',
                    tagName: 'button',
                    properties: {
                      className: 'pagination_toggle',
                      type: 'button',
                      ariaExpanded: 'false',
                      ariaControls: 'toc-list',
                    },
                    children: [
                      span('pagination_toggle_label', 'On this page'),
                      span('pagination_toggle_current'),
                      {
                        ...span('pagination_toggle_icon'),
                        properties: { className: 'pagination_toggle_icon', ariaHidden: 'true' },
                      },
                    ],
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
