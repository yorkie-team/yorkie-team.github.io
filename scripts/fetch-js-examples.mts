import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import type { DirectoryInfo, FileInfo } from '../utils/exampleFileUtils';

dotenv.config();
const yorkieVersion = process.env.NEXT_PUBLIC_YORKIE_JS_VERSION;

const makeDirectory = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const readFile = (path: string): string => {
  return fs.readFileSync(path, 'utf8');
};

const writeFile = (path: string, content: string) => {
  fs.writeFile(path, content, 'utf8', function (error) {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`[Success] Write file: ${path}`);
  });
};

const getDirectories = (dirPath: string): string[] => {
  const directories: string[] = [];
  fs.readdirSync(dirPath, { withFileTypes: true }) //
    .forEach((file) => {
      if (file.isDirectory()) {
        directories.push(path.join(dirPath, file.name));
      }
    });

  return directories;
};

const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  if (parts.length === 1 || (parts[0] === '' && parts.length === 2)) {
    return '';
  }
  return parts.pop() || '';
};

type ObjectType = {
  [key: string]: string;
};

const LANGUAGE_MAP: ObjectType = {
  ts: 'typescript',
  js: 'javascript',
  vue: 'javascript',
  jsx: 'jsx',
  tsx: 'tsx',
  html: 'markup',
  css: 'css',
  scss: 'scss',
  json: 'json',
  md: 'markdown',
  kt: 'kotlin',
  kts: 'kotlin',
  swift: 'swift',
};

const getFileLanguage = (filename: string): string => {
  const extension = getFileExtension(filename);
  return LANGUAGE_MAP[extension] || extension;
};

const getFileContent = (filePath: string): string => {
  if (filePath.includes('.env.production')) {
    return '';
  }

  const extension = getFileExtension(filePath);
  // NOTE(chacha912): Image file is not supported.
  if (extension === 'ico' || extension === 'png' || extension === 'jpg') {
    return '';
  }

  if (filePath.includes('package.json')) {
    const content = readFile(filePath);
    return content.replace(/"@yorkie-js\/(sdk|react|prosemirror)": "workspace:\*"/g, `"@yorkie-js/$1": "^${yorkieVersion}"`);
  }

  return readFile(filePath);
};

const getAbsolutePath = (fullPath: string, basePath: string): string => {
  return fullPath.replace(basePath, '') || '/';
};

const getDirectoryInfo = (dirPath: string, basePath?: string): DirectoryInfo => {
  const _basePath = basePath || dirPath;
  const directoryInfo: DirectoryInfo = {
    isFile: false,
    name: dirPath.split('/').pop()!,
    path: getAbsolutePath(dirPath, _basePath),
    children: [] as (FileInfo | DirectoryInfo)[],
  };
  fs.readdirSync(dirPath, { withFileTypes: true }) //
    .forEach((file) => {
      const path = `${dirPath}/${file.name}`;
      if (file.isDirectory()) {
        const childInfo = getDirectoryInfo(path, _basePath);
        directoryInfo.children.unshift(childInfo);
      } else {
        const childInfo: FileInfo = {
          isFile: true,
          isOpen: false,
          language: getFileLanguage(file.name),
          name: file.name,
          path: getAbsolutePath(path, _basePath),
          content: getFileContent(path),
        };
        directoryInfo.children.push(childInfo);
      }
    });
  return directoryInfo;
};

const EXAMPLES_PATH = path.join(process.cwd(), 'temp/examples');
const EXAMPLES_OUTPUT_PATH = path.join(process.cwd(), 'examples');

const fetchExamples = () => {
  const exampleDirectories = getDirectories(EXAMPLES_PATH);
  exampleDirectories.forEach((dirPath) => {
    const exampleName = dirPath.replace(EXAMPLES_PATH + '/', '');
    const info = getDirectoryInfo(dirPath);
    const contents =
      `import { DirectoryInfo } from '@/utils/exampleFileUtils';
        export const FILE_INFO: DirectoryInfo = ` + JSON.stringify(info);
    const exampleOutputPath = path.join(EXAMPLES_OUTPUT_PATH, exampleName);
    makeDirectory(exampleOutputPath);
    writeFile(path.join(exampleOutputPath, `/fileInfo.ts`), contents);
  });
};

fetchExamples();
