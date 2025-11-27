import React, { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import type { FileInfo, DirectoryInfo, CodeInfo } from '@/utils/exampleFileUtils';
import {
  isEmptyDirectory,
  filterIgnoreFiles,
  setFirstFileOpen,
  setFileOpen,
  getFileInfo,
} from '@/utils/exampleFileUtils';
import { CodeBlock, Icon } from '@/components';

export function ProjectCodes({
  files,
  activeFile,
  ignoreFiles,
}: {
  files: DirectoryInfo;
  activeFile?: string;
  ignoreFiles?: string[];
}) {
  const [fileInfo, setFileInfo] = useState<DirectoryInfo>({
    isFile: false,
    name: '',
    path: '',
    children: [],
  });
  const [activeFileInfo, setActiveFileInfo] = useState<FileInfo | null>(
    activeFile ? getFileInfo(files, activeFile) : null,
  );
  // Track open state for each folder by path
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());

  const toggleFolder = useCallback((folderPath: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderPath)) {
        next.delete(folderPath);
      } else {
        next.add(folderPath);
      }
      return next;
    });
  }, []);

  const onClickFile = useCallback(
    (targetFile: string) => {
      setFileInfo((prev) => {
        const [directoryInfo, openedFileInfo] = setFileOpen(prev, targetFile);
        setActiveFileInfo(openedFileInfo);
        return directoryInfo;
      });
    },
    [setFileInfo],
  );

  useEffect(() => {
    let initialFileInfo = files;
    if (ignoreFiles) {
      initialFileInfo = filterIgnoreFiles(initialFileInfo, ignoreFiles);
    }

    const [directoryInfoResult, openedFile] = activeFile
      ? setFileOpen(initialFileInfo, activeFile)
      : setFirstFileOpen(initialFileInfo);
    initialFileInfo = directoryInfoResult;
    setActiveFileInfo(openedFile);
    setFileInfo(initialFileInfo);
    
    // Initialize all folders as open
    const allFolderPaths = new Set<string>();
    const collectFolderPaths = (info: DirectoryInfo) => {
      if (!info.isFile) {
        allFolderPaths.add(info.path);
        info.children.forEach((child) => {
          if (!child.isFile) {
            collectFolderPaths(child);
          }
        });
      }
    };
    collectFolderPaths(initialFileInfo);
    setOpenFolders(allFolderPaths);
  }, [files, activeFile, ignoreFiles]);

  return (
    <div className="folder_box">
      <ul className="folder_list">
        {fileInfo.children?.map((child) => {
          if (isEmptyDirectory(child)) {
            return null;
          }
          const isOpen = openFolders.has(child.path);
          return (
            <li key={child.path} className={classNames('folder_item', { is_active: child.isFile && child.isOpen })}>
              <button
                type="button"
                className="btn_folder"
                onClick={() => {
                  if (child.isFile) {
                    onClickFile(child.path);
                  } else {
                    toggleFolder(child.path);
                  }
                }}
              >
                {child.isFile ? (
                  <Icon type="file" />
                ) : isOpen ? (
                  <Icon type="folderOpen" />
                ) : (
                  <Icon type="folderClose" />
                )}
                <span className="name"> {child.name}</span>
              </button>
              {!child.isFile && isOpen && (
                <SubFolderCodes 
                  fileList={child.children} 
                  onClickFile={onClickFile}
                  openFolders={openFolders}
                  toggleFolder={toggleFolder}
                />
              )}
            </li>
          );
        })}
      </ul>
      <div className="codeblock_area">
        <em className="file_title">{activeFileInfo?.name || ''}</em>
        <div className="codeblock_box">
          <CodeBlock
            code={activeFileInfo?.content || ''}
            language={(activeFileInfo?.language as any) || 'javascript'}
            withLineNumbers
          />
        </div>
      </div>
    </div>
  );
}

function SubFolderCodes({
  fileList,
  onClickFile,
  openFolders,
  toggleFolder,
}: {
  fileList: Array<CodeInfo>;
  onClickFile: (targetFile: string) => void;
  openFolders: Set<string>;
  toggleFolder: (folderPath: string) => void;
}) {
  return (
    <ul className="folder_sub_list">
      {fileList.map((child) => {
        if (isEmptyDirectory(child)) {
          return null;
        }
        const isOpen = openFolders.has(child.path);
        return (
          <li className={classNames('folder_item', { is_active: child.isFile && child.isOpen })} key={child.path}>
            <button
              type="button"
              className="btn_folder"
              onClick={() => {
                if (child.isFile) {
                  onClickFile(child.path);
                } else {
                  toggleFolder(child.path);
                }
              }}
            >
              {child.isFile ? (
                <Icon type="file" />
              ) : isOpen ? (
                <Icon type="folderOpen" />
              ) : (
                <Icon type="folderClose" />
              )}
              <span className="name">{child.name}</span>
            </button>
            {!child.isFile && isOpen && (
              <SubFolderCodes 
                fileList={child.children} 
                onClickFile={onClickFile}
                openFolders={openFolders}
                toggleFolder={toggleFolder}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
