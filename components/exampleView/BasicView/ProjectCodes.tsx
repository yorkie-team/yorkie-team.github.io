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
import { CodeBlock } from '@/components';
import { Icon, Text, Box, IconFile, IconFolderOpen, IconFolderClose } from 'yorkie-ui';

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
  const [isFolderOpen, setIsFolderOpen] = useState<boolean>(true);

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
                  } else {
                    setIsFolderOpen(!isFolderOpen);
                  }
                }}
              >
                {child.isFile ? (
                  <Icon icon={<IconFile />} position="start" size="xl" />
                ) : isFolderOpen ? (
                  <Icon icon={<IconFolderOpen />} position="start" size="sm" />
                ) : (
                  <Icon icon={<IconFolderClose />} position="start" size="sm" />
                )}
                <Text fontSize="sm"> {child.name}</Text>
              </button>
              {!child.isFile && isFolderOpen && <SubFolderCodes fileList={child.children} onClickFile={onClickFile} />}
            </li>
          );
        })}
      </ul>
      <div className="codeblock_area">
        <Text fontSize="md" borderWidth="1px" borderBottom="1px" align="center" fontWeight="semibold" paddingBlock="3">
          {activeFileInfo?.name || ''}
        </Text>
        <Box className="codeblock_box" fontSize="sm">
          <CodeBlock
            code={activeFileInfo?.content || ''}
            language={(activeFileInfo?.language as any) || 'javascript'}
            withLineNumbers
          />
        </Box>
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
  const [isFolderOpen, setIsFolderOpen] = useState<boolean>(true);
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
                } else {
                  setIsFolderOpen(!isFolderOpen);
                }
              }}
            >
              {child.isFile ? (
                <Icon icon={<IconFile />} position="start" size="sm" />
              ) : isFolderOpen ? (
                <Icon icon={<IconFolderOpen />} position="start" size="sm" />
              ) : (
                <Icon icon={<IconFolderClose />} position="start" size="sm" />
              )}
              <Text fontSize="sm">{child.name}</Text>
            </button>
            {!child.isFile && isFolderOpen && <SubFolderCodes fileList={child.children} onClickFile={onClickFile} />}
          </li>
        );
      })}
    </ul>
  );
}
