import { getSlugs, getDocsFromSlug, getDocsMetaFromSlug, getDocsOrderList } from '@/utils/mdxUtils';
import type { MDXComponents } from 'mdx/types';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc, { HtmlElementNode, ListItemNode } from '@jsdevtools/rehype-toc';
import rehypeImageMeta from '@/utils/rehypeImageMeta';
import rehypeWrapContents from '@/utils/rehypeWrapContents';
import rehypeVariables from '@/utils/rehypeVariables';
import { Button, Icon, CodeBlock, CodeBlockHeader, Image } from '@/components';
import { CustomLink, CustomCodeBlock, Breadcrumb, Caption, ImageWrap, Alert, Blockquote } from '@/components/docs';
import SlugPage from './slug-page';
import { compileMDX } from 'next-mdx-remote/rsc';

type Props = {
  params: {
    slug?: string[];
  };
};

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

export default async function DocsPage({ params }: Props) {
  const slug = params.slug?.join('/') ?? 'index';

  const { content } = getDocsFromSlug(slug);
  const mdxSource = await compileMDX({
    source: content,
    options: {
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
      parseFrontmatter: true,
    },
    components,
  });

  const navList = getDocsOrderList('/docs');

  return <SlugPage navList={navList} source={mdxSource.content} />;
}

export async function generateMetadata({ params }: Props) {
  const slug = params.slug?.join('/') ?? 'index';
  const { meta } = getDocsFromSlug(slug);

  return {
    ...meta,
  };
}

export const dynamicParams = false;

export const generateStaticParams = () => {
  const params = getSlugs()
    .filter((slug) => {
      if (process.env.NODE_ENV === 'development') return true;

      const { phase } = getDocsMetaFromSlug(slug);
      return phase !== 'development';
    })
    .map((slug) => ({
      slug: slug === 'index' ? [''] : slug.split('/'),
    }));

  return params;
};
