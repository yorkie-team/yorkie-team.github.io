import type { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import { type DocsMeta, getSlugs, getDocsFromSlug } from '@/utils/mdxUtils';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXComponents } from 'mdx/types';
import { Layout, CustomLink } from '@/components';

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
    <Layout className='docs_page' shortFooter>
      <div className='wrapper'>
        <div className='docs_header'>
          <h2>title: {meta.title}</h2>
          {meta.description && <p className='description'>desc: {meta.description}</p>}
        </div>
        <main>
          <MDXRemote {...source} components={components} />
        </main>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params as { slug: string })?.slug || 'index';
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
    if (slug === 'index') {
      return { params: { slug: [''] } };
    }
    return { params: { slug: [slug] } };
  });

  return {
    paths,
    fallback: false,
  };
};
