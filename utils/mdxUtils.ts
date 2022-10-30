import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_PATH = path.join(process.cwd(), 'docs');

// docsFilePaths is the list of all mdx files inside the DOCS_PATH directory
const docsFilePaths = fs
  .readdirSync(DOCS_PATH) //
  .filter((path) => /\.mdx?$/.test(path));

export const getSlugs = () => {
  return docsFilePaths.map((path) => path.replace(/\.mdx?$/, ''));
};

export type DocsMeta = {
  slug: string;
  title: string;
  description: string;
};

type Docs = {
  content: string;
  meta: DocsMeta;
};

export const getDocsFromSlug = (slug: string): Docs => {
  const postFilePath = path.join(DOCS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);

  return {
    content,
    meta: {
      slug,
      title: data.title || slug,
      description: data.description || '',
    },
  };
};
