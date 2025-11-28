import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import type {DirectoryInfo, FileInfo} from '../utils/exampleFileUtils';

dotenv.config();
const yorkieIOSVersion = process.env.NEXT_PUBLIC_YORKIE_IOS_VERSION || '0.5.2';

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
  // iOS/Swift specific
  swift: 'swift',
  h: 'objectivec',
  m: 'objectivec',
  mm: 'objectivec',
  plist: 'markup',
  xcconfig: 'properties',
  entitlements: 'markup',
  storyboard: 'markup',
  xib: 'markup',
  pbxproj: 'properties',
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
  xml: 'markup',
  yaml: 'yaml',
  yml: 'yaml',
};

const IGNORE_FILES = [
  '.DS_Store',
  'thumbnail.webp',
  'demo.mp4',
  'DerivedData',
  'xcuserdata',
  '.swiftpm',
  'build',
]

const getFileLanguage = (filename: string): string => {
  const extension = getFileExtension(filename);
  return LANGUAGE_MAP[extension] || extension;
};

const getFileContent = (filePath: string): string => {
  // Skip environment and local configuration files
  if (filePath.includes('.env.production') || filePath.includes('Config.xcconfig')) {
    return '';
  }

  const extension = getFileExtension(filePath);
  // NOTE: Image and binary files are not supported.
  if (extension === 'ico' || extension === 'png' || extension === 'jpg' || extension === 'webp' || 
      extension === 'icns' || extension === 'pdf' || extension === 'xcassets') {
    return '';
  }

  // Skip Xcode project configuration files that are too large or not needed
  if (filePath.includes('.xcodeproj/project.pbxproj') || 
      filePath.includes('.xcworkspace/') ||
      filePath.includes('xcshareddata/')) {
    return '';
  }

  // Handle Package.swift for SPM
  if (filePath.endsWith('Package.swift')) {
    const content = readFile(filePath);
    // Update Yorkie dependency version if needed
    return content.replace(
      /\.package\(url: "https:\/\/github\.com\/yorkie-team\/yorkie-ios-sdk\.git", from: "[^"]+"\)/g,
      `.package(url: "https://github.com/yorkie-team/yorkie-ios-sdk.git", from: "${yorkieIOSVersion}")`
    );
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

        if (IGNORE_FILES.some(ignore => file.name.includes(ignore))) {
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

const EXAMPLES_PATH = path.join(process.cwd(), 'temp/ios-examples');
const EXAMPLES_OUTPUT_PATH = path.join(process.cwd(), 'examples');

const fetchIOSExamples = () => {
  if (!fs.existsSync(EXAMPLES_PATH)) {
    console.log(`Examples path does not exist: ${EXAMPLES_PATH}`);
    console.log('Please clone the yorkie-ios-sdk repository examples to temp/ios-examples');
    return;
  }

  const exampleDirectories = getDirectories(EXAMPLES_PATH);

  exampleDirectories.forEach((dirPath) => {
    const exampleName = dirPath.replace(EXAMPLES_PATH + '/', '').toLowerCase();
    const info = getDirectoryInfo(dirPath);
    const contents =
        `import { DirectoryInfo } from '@/utils/exampleFileUtils';
        export const FILE_INFO: DirectoryInfo = ` + JSON.stringify(info);
    // Add "ios-" prefix to the output folder name
    const exampleOutputPath = path.join(EXAMPLES_OUTPUT_PATH, `ios-${exampleName}`);
    makeDirectory(exampleOutputPath);
    writeFile(path.join(exampleOutputPath, `/fileInfo.ts`), contents);
  });
};

fetchIOSExamples();
