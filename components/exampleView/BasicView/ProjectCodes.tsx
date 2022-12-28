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
  }, [files, activeFile, ignoreFiles]);

  return (
    <div className="folder_box">
      <ul className="folder_list">
        {fileInfo.children?.map((child) => {
          if (isEmptyDirectory(child)) {
            return null;
          }
          return (
            <li key={child.name} className={classNames('folder_item', { is_active: child.isFile && child.isOpen })}>
              <button
                type="button"
                className="btn_folder"
                onClick={() => {
                  if (child.isFile) {
                    onClickFile(child.path);
                  }
                }}
              >
                {child.isFile ? <Icon type="file" /> : <Icon type="folder" />}
                <span className="name"> {child.name}</span>
              </button>
              {!child.isFile && <SubFolderCodes fileList={child.children} onClickFile={onClickFile} />}
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
}: {
  fileList: Array<CodeInfo>;
  onClickFile: (targetFile: string) => void;
}) {
  return (
    <ul className="folder_sub_list">
      {fileList.map((child) => {
        if (isEmptyDirectory(child)) {
          return null;
        }
        return (
          <li className={classNames('folder_item', { is_active: child.isFile && child.isOpen })} key={child.name}>
            <button
              type="button"
              className="btn_folder"
              onClick={() => {
                if (child.isFile) {
                  onClickFile(child.path);
                }
              }}
            >
              {child.isFile ? <Icon type="file" /> : <Icon type="folder" />}
              <span className="name">{child.name}</span>
            </button>
            {!child.isFile && <SubFolderCodes fileList={child.children} onClickFile={onClickFile} />}
          </li>
        );
      })}
    </ul>
  );
}
