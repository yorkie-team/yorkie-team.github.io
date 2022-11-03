import type { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import { type DocsMeta, getSlugs, getDocsFromSlug } from '@/utils/mdxUtils';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXComponents } from 'mdx/types';
import { Layout, CustomLink, Navigator } from '@/components';

// Custom components/renderers to pass to MDX.
const components: MDXComponents = {
  a: CustomLink,
  TestComponent: dynamic(() => import('@/components/TestComponent')),
};

export default function DocsPage({
  source,
  meta,
}: {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: DocsMeta;
}) {
  // TODO(chacha912): Add side navigation and toc.
  return (
    <Layout className='documentation_page' shortFooter>
      <Navigator
        navList={[
          {
            title: 'Overview',
            href: '/docs',
            subMenu: [],
          },
          {
            title: 'Examples',
            href: '/docs/example-docs',
            subMenu: [
              { title: 'example2', href: '/docs/example-docs/example-doc2' },
              { title: 'example3', href: '/docs/example-docs/example-doc3' },
              {
                title: 'Chapter1',
                href: '/docs/example-docs/chapter1',
                subMenu: [
                  { title: 'SubChapter1', href: '/docs/example-docs/chapter1/subchapter' },
                  { title: 'SubChapter2', href: '/docs/example-docs/chapter1/subchapter2' },
                ],
              },
              {
                title: 'Chapter2',
                href: '/docs/example-docs/chapter2',
                subMenu: [{ title: 'Introduction', href: '/docs/example-docs/chapter2/introduction' }],
              },
            ],
          },
          {
            title: 'Tutorials',
            href: '/docs/tutorials',
            subMenu: [
              { title: 'example2', href: '/docs/tutorials/example-doc2' },
              { title: 'example3', href: '/docs/tutorials/example-doc3' },
            ],
          },
        ]}
      />
      <section className='section'>
        <h2>title: {meta.title}</h2>
        {meta.description && <p className='description'>desc: {meta.description}</p>}
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
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  return {
    props: {
      source: mdxSource,
      meta,
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
