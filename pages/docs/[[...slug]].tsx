import type { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import { type DocsMeta, type DocsOrderList, getSlugs, getDocsFromSlug, getDocsOrderList } from '@/utils/mdxUtils';
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
  navList,
}: {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: DocsMeta;
  navList: DocsOrderList;
}) {
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
      remarkPlugins: [],
      rehypePlugins: [],
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
