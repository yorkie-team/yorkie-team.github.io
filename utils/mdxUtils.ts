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

const docsFilePaths = getAllFiles(DOCS_PATH).filter((path) => /\.mdx?$/.test(path));

export const getSlugs = () => {
  return docsFilePaths.map((path) => path.replace(`${DOCS_PATH}/`, '').replace(/\.mdx?$/, ''));
};

type DocsOrderInfo = {
  title: string;
  href: string;
  order: number;
  subMenu: Array<DocsOrderInfo>;
};

export type DocsOrderList = Array<DocsOrderInfo>;

export const getDocsOrderList = (basePath: string): DocsOrderList => {
  const docsOrderList = docsFilePaths
    .map((path) => {
      const slug = path.replace(`${DOCS_PATH}/`, '').replace(/\.mdx?$/, '');
      const href = slug === 'index' ? basePath : basePath + '/' + slug;
      const { data } = matter(fs.readFileSync(path));

      return {
        href,
        title: data.title || slug,
        order: data.order || 0,
        phase: data.phase || '',
        subMenu: [],
      };
    })
    .sort((a, b) => a.order - b.order)
    .filter((list) => {
      if (process.env.NODE_ENV === 'development') return true;
      return list.phase !== 'development';
    });

  const navList: DocsOrderList = [];
  let temp: DocsOrderInfo | null = null;
  for (const menu of docsOrderList) {
    const { order } = menu;
    if (order % 10 === 0) {
      temp && navList.push(temp);
      temp = menu;
    } else {
      temp?.subMenu.push(menu);
    }
  }
  temp && navList.push(temp);

  return navList;
};

export type DocsMeta = {
  title: string;
  order: number;
  phase: string;
};

type Docs = {
  content: string;
  meta: DocsMeta;
};

export const getDocsFromSlug = (slug: string): Docs => {
  const docsFilePath = path.join(DOCS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(docsFilePath);
  const { content, data } = matter(source);

  return {
    content,
    meta: {
      title: data.title || slug,
      order: data.order || 0,
      phase: data.phase || '',
    },
  };
};

export const getDocsMetaFromSlug = (slug: string): DocsMeta => {
  const docsFilePath = path.join(DOCS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(docsFilePath);
  const { data } = matter(source);

  return {
    title: data.title || slug,
    order: data.order || 0,
    phase: data.phase || '',
  };
};
