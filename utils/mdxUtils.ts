import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_PATH = path.join(process.cwd(), 'docs');

const getAllFiles = (dirPath: string) => {
  const files: Array<string> = [];
  fs.readdirSync(dirPath, { withFileTypes: true }) //
    .forEach((file) => {
      const path = `${dirPath}/${file.name}`;

      if (file.isDirectory()) {
        const nestFiles = getAllFiles(path);
        files.push(...nestFiles);
      } else {
        files.push(path);
      }
    });

  return files;
};

export const getSlugs = () => {
  const docsFilePaths = getAllFiles(DOCS_PATH).filter((path) => /\.mdx?$/.test(path));
  return docsFilePaths.map((path) => path.replace(`${DOCS_PATH}/`, '').replace(/\.mdx?$/, ''));
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
