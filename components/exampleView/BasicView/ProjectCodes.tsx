import React, { useCallback, useState, useEffect, useId, useRef, RefObject } from 'react';
import classNames from 'classnames';
import type { FileInfo, DirectoryInfo, CodeInfo } from '@/utils/exampleFileUtils';
import { isEmptyDirectory, filterIgnoreFiles, setFirstFileOpen, setFileOpen } from '@/utils/exampleFileUtils';
import { CodeBlock, Icon } from '@/components';

/**
 * Returns the paths of the folders that contain `targetPath`, outermost first,
 * or `null` when the file is not in the tree.
 */
function getAncestorFolderPaths(directoryInfo: DirectoryInfo, targetPath: string): string[] | null {
  for (const child of directoryInfo.children) {
    if (child.isFile) {
      if (child.path === targetPath) return [];
      continue;
    }
    const nested = getAncestorFolderPaths(child, targetPath);
    if (nested) return [child.path, ...nested];
  }
  return null;
}

type TreeState = {
  fileInfo: DirectoryInfo;
  activeFileInfo: FileInfo | null;
  openFolders: Set<string>;
};

function buildTreeState(files: DirectoryInfo, activeFile?: string, ignoreFiles?: string[]): TreeState {
  const filtered = ignoreFiles ? filterIgnoreFiles(files, ignoreFiles) : files;
  let [fileInfo, activeFileInfo] = activeFile ? setFileOpen(filtered, activeFile) : setFirstFileOpen(filtered);
  // A stale `activeFile` (the SDK moved its sources) would leave the viewer
  // empty with every folder closed. Open the first file instead.
  if (!activeFileInfo) {
    if (activeFile) console.warn(`ProjectCodes: activeFile "${activeFile}" is not in the example files.`);
    [fileInfo, activeFileInfo] = setFirstFileOpen(filtered);
  }
  // Open only the folders on the way to the active file. Opening everything
  // buries the source under build metadata in the iOS and Android examples.
  const ancestors = activeFileInfo ? getAncestorFolderPaths(fileInfo, activeFileInfo.path) : null;
  return { fileInfo, activeFileInfo, openFolders: new Set(ancestors ?? []) };
}

export function ProjectCodes({
  files,
  activeFile,
  ignoreFiles,
}: {
  files: DirectoryInfo;
  activeFile?: string;
  ignoreFiles?: string[];
}) {
  // Build the tree synchronously so the server render already has it.
  const [initialState] = useState(() => buildTreeState(files, activeFile, ignoreFiles));
  const [fileInfo, setFileInfo] = useState<DirectoryInfo>(initialState.fileInfo);
  const [activeFileInfo, setActiveFileInfo] = useState<FileInfo | null>(initialState.activeFileInfo);
  const [openFolders, setOpenFolders] = useState<Set<string>>(initialState.openFolders);
  const titleId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const revealActiveRef = useRef(true);

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

  const onClickFile = useCallback((targetFile: string) => {
    setFileInfo((prev) => {
      const [directoryInfo, openedFileInfo] = setFileOpen(prev, targetFile);
      setActiveFileInfo(openedFileInfo);
      return directoryInfo;
    });
  }, []);

  useEffect(() => {
    const state = buildTreeState(files, activeFile, ignoreFiles);
    setFileInfo(state.fileInfo);
    setActiveFileInfo(state.activeFileInfo);
    setOpenFolders(state.openFolders);
    revealActiveRef.current = true;
  }, [files, activeFile, ignoreFiles]);

  // Scroll the file list (not the page) so the initially active file is visible.
  useEffect(() => {
    const list = listRef.current;
    if (!revealActiveRef.current || !list) return;
    const active = list.querySelector<HTMLElement>('.folder_item.is_active');
    if (!active) return;
    const reveal = () => {
      // The viewer is hidden on mobile, so the list may have no layout yet. Keep the request until it does.
      if (list.clientHeight === 0) return false;
      revealActiveRef.current = false;
      const top = active.offsetTop;
      if (top < list.scrollTop || top + active.offsetHeight > list.scrollTop + list.clientHeight) {
        list.scrollTop = Math.max(0, top - (list.clientHeight - active.offsetHeight) / 2);
      }
      return true;
    };
    if (reveal() || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => {
      if (reveal()) observer.disconnect();
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [fileInfo, openFolders]);

  return (
    <div className="folder_box">
      <div className="folder_layout">
        <FileTree
          entries={fileInfo.children}
          listRef={listRef}
          onClickFile={onClickFile}
          openFolders={openFolders}
          toggleFolder={toggleFolder}
        />
        <div className="codeblock_area">
          <p className="file_title" id={titleId} title={activeFileInfo?.path}>
            {activeFileInfo?.name || ''}
          </p>
          {/* Focusable so keyboard users can scroll code wider or longer than the box. */}
          <div className="codeblock_box" role="region" aria-labelledby={titleId} tabIndex={0}>
            <CodeBlock
              code={activeFileInfo?.content || ''}
              language={(activeFileInfo?.language as any) || 'javascript'}
              withLineNumbers
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FileTree({
  entries,
  listRef,
  onClickFile,
  openFolders,
  toggleFolder,
}: {
  entries: Array<CodeInfo>;
  listRef?: RefObject<HTMLUListElement>;
  onClickFile: (targetFile: string) => void;
  openFolders: Set<string>;
  toggleFolder: (folderPath: string) => void;
}) {
  const isRoot = Boolean(listRef);
  return (
    <ul
      ref={listRef}
      className={isRoot ? 'folder_list' : 'folder_sub_list'}
      aria-label={isRoot ? 'Project files' : undefined}
    >
      {entries.map((child) => {
        if (isEmptyDirectory(child)) {
          return null;
        }
        const isOpen = !child.isFile && openFolders.has(child.path);
        const isActive = child.isFile && child.isOpen;
        return (
          <li key={child.path} className={classNames('folder_item', { is_active: isActive })}>
            <button
              type="button"
              className="btn_folder"
              title={child.name}
              aria-expanded={child.isFile ? undefined : isOpen}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => {
                if (child.isFile) {
                  onClickFile(child.path);
                } else {
                  toggleFolder(child.path);
                }
              }}
            >
              {child.isFile ? <Icon type="file" /> : isOpen ? <Icon type="folderOpen" /> : <Icon type="folderClose" />}
              <span className="name">{child.name}</span>
            </button>
            {!child.isFile && isOpen && (
              <FileTree
                entries={child.children}
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
