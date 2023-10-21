import cloneDeep from 'lodash.clonedeep';
import minimatch from 'minimatch';

export type FileInfo = {
  isFile: true;
  isOpen: boolean;
  language: string;
  name: string;
  path: string;
  content: string;
};

export type DirectoryInfo = {
  isFile: false;
  name: string;
  path: string;
  children: (FileInfo | DirectoryInfo)[];
};

export type CodeInfo = FileInfo | DirectoryInfo;

export const isEmptyDirectory = (codeInfo: CodeInfo): boolean => {
  if (codeInfo.isFile) return false;
  if (codeInfo.children.length === 0) {
    return true;
  }

  let isEmptyNested = true;
  for (const child of codeInfo.children) {
    if (!isEmptyDirectory(child)) {
      isEmptyNested = false;
    }
  }
  return isEmptyNested;
};

export const getFileInfo = (codeInfo: CodeInfo, targetFile: string): FileInfo | null => {
  if (codeInfo.isFile) {
    if (codeInfo.path === targetFile) return codeInfo;
    return null;
  }

  for (const child of codeInfo.children) {
    const result = getFileInfo(child, targetFile);
    if (result) {
      return result;
    }
  }
  return null;
};

export const filterIgnoreFiles = (directoryInfo: DirectoryInfo, ignoreFiles: string[]): DirectoryInfo => {
  const cloneDirectoryInfo = cloneDeep(directoryInfo);
  cloneDirectoryInfo.children = cloneDirectoryInfo.children.filter(
    (child) => !ignoreFiles.some((ignoreFile) => minimatch(child.path, ignoreFile, { matchBase: true })),
  );
  cloneDirectoryInfo.children.forEach((child, i) => {
    if (!child.isFile) {
      const childInfo = filterIgnoreFiles(child, ignoreFiles);
      cloneDirectoryInfo.children[i] = childInfo;
    }
  });
  return cloneDirectoryInfo;
};

const _setFirstFileOpen = (
  directoryInfo: DirectoryInfo,
  hasOpenFile: boolean = false,
): [DirectoryInfo, boolean, FileInfo | null] => {
  const cloneDirectoryInfo = cloneDeep(directoryInfo);
  let _hasOpenFile = hasOpenFile;
  let _openedFileInfo: FileInfo | null = null;
  cloneDirectoryInfo.children.forEach((child, i) => {
    if (child.isFile) {
      child.isOpen = !_hasOpenFile;
      _openedFileInfo = !_hasOpenFile ? child : _openedFileInfo;
      _hasOpenFile = true;
    } else {
      const [childInfo, childHasOpenFile, openedFileInfo] = _setFirstFileOpen(child, _hasOpenFile);
      cloneDirectoryInfo.children[i] = childInfo;
      _hasOpenFile = childHasOpenFile;
      _openedFileInfo = openedFileInfo;
    }
  });
  return [cloneDirectoryInfo, _hasOpenFile, _openedFileInfo];
};

export const setFirstFileOpen = (directoryInfo: DirectoryInfo): [DirectoryInfo, FileInfo | null] => {
  const [directoryInfoResult, , openedFileInfo] = _setFirstFileOpen(directoryInfo);
  return [directoryInfoResult, openedFileInfo];
};

export const setFileOpen = (directoryInfo: DirectoryInfo, targetFilePath: string): [DirectoryInfo, FileInfo | null] => {
  const clonedDirectoryInfo = cloneDeep(directoryInfo);
  const openedFileInfo = findOpenedFileInfo(clonedDirectoryInfo, targetFilePath);
  return [clonedDirectoryInfo, openedFileInfo];
};

const findOpenedFileInfo = (directoryInfo: DirectoryInfo, targetFilePath: string): FileInfo | null => {
  let opendFileInfo: FileInfo | null = null;
  for (const child of directoryInfo.children) {
    if (opendFileInfo != null) {
      break;
    }
    if (child.isFile) {
      child.isOpen = child.path === targetFilePath;
      if (child.isOpen) {
        opendFileInfo = child;
        break;
      }
    } else {
      opendFileInfo = opendFileInfo ?? findOpenedFileInfo(child, targetFilePath);
    }
  }
  return opendFileInfo;
}
