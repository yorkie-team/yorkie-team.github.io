import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import type {DirectoryInfo, FileInfo} from '../utils/exampleFileUtils';

dotenv.config();
const yorkieAndroidVersion = process.env.NEXT_PUBLIC_YORKIE_ANDROID_VERSION;

const makeDirectory = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {recursive: true});
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
  fs.readdirSync(dirPath, {withFileTypes: true}) //
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
  // Android/Kotlin specific
  kt: 'kotlin',
  kts: 'kotlin',
  xml: 'markup',
  gradle: 'groovy',
  properties: 'properties',
  pro: 'properties',
  toml: 'toml',
  yaml: 'yaml',
  yml: 'yaml',
  proto: 'protobuf',
  // Common file types
  ts: 'typescript',
  js: 'javascript',
  jsx: 'jsx',
  tsx: 'tsx',
  html: 'markup',
  css: 'css',
  scss: 'scss',
  json: 'json',
  md: 'markdown',
  sh: 'bash',
  swift: 'swift',
};

const IGNORE_FILES = [
  'res',
  'proguard-rules.pro',
  'thumbnail.webp',
  'demo.mp4',
]

const getFileLanguage = (filename: string): string => {
  const extension = getFileExtension(filename);
  return LANGUAGE_MAP[extension] || extension;
};

const getFileContent = (filePath: string): string => {
  // Skip environment and local configuration files
  if (filePath.includes('.env.production') || filePath.includes('local.properties')) {
    return '';
  }

  const extension = getFileExtension(filePath);
  // NOTE: Image and binary files are not supported.
  if (extension === 'ico' || extension === 'png' || extension === 'jpg' || extension === 'webp' || extension === 'jar') {
    return '';
  }

  // Handle Android Gradle build files
  if (filePath.endsWith('build.gradle.kts') || filePath.endsWith('build.gradle')) {
    const content = readFile(filePath);
    // Replace local project dependencies with Maven Central dependencies
    return content
        .replace(/implementation\(project\(":yorkie"\)\)/g, `implementation("dev.yorkie:yorkie-android:${yorkieAndroidVersion}")`)
        .replace(/implementation\(project\(":examples:core:common"\)\)/g, '// implementation(project(":examples:core:common")) // Common module - you may need to create this');
  }

  // Handle libs.versions.toml for Android
  if (filePath.includes('libs.versions.toml')) {
    const content = readFile(filePath);
    // Update yorkie version in the toml file
    return content.replace(/yorkie\s*=\s*"[^"]+"/g, `yorkie = "${yorkieAndroidVersion}"`);
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
  fs.readdirSync(dirPath, {withFileTypes: true}) //
      .forEach((file) => {
        const path = `${dirPath}/${file.name}`;

        if (IGNORE_FILES.includes(file.name)) {
          return;
        }

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

const fetchAndroidExamples = () => {
  const exampleDirectories = getDirectories(EXAMPLES_PATH);
  // Filter out support/utility directories (core and feature modules are not standalone examples)
  const filteredDirectories = exampleDirectories.filter((dirPath) => {
    const exampleName = dirPath.replace(EXAMPLES_PATH + '/', '');
    // Skip directories that are not standalone examples
    return !['core', 'feature'].includes(exampleName);
  });

  filteredDirectories.forEach((dirPath) => {
    const exampleName = dirPath.replace(EXAMPLES_PATH + '/', '');
    const info = getDirectoryInfo(dirPath);
    const contents =
        `import { DirectoryInfo } from '@/utils/exampleFileUtils';
        export const FILE_INFO: DirectoryInfo = ` + JSON.stringify(info);
    // Add "android-" prefix to the output folder name
    const exampleOutputPath = path.join(EXAMPLES_OUTPUT_PATH, `android-${exampleName}`);
    makeDirectory(exampleOutputPath);
    writeFile(path.join(exampleOutputPath, `/fileInfo.ts`), contents);
  });
};

fetchAndroidExamples();

