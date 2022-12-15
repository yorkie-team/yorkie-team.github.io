import React, { useCallback, useMemo, useState } from 'react';
import { ProjectFile, ProjectFolder, ProjectCode } from '../BasicExampleProjects';
import { CodeBlock, Icon } from '@/components';
import { PrismCode } from '../CodeBlock/PrismCode';
import classNames from 'classnames';

function SubProjectComponent({
  component,
  onClickFile,
}: {
  component: Array<ProjectFile | ProjectFolder> | undefined;
  onClickFile: (projectFile: ProjectFile) => void;
}) {
  if (!component) {
    return null;
  }
  return (
    <ul className="folder_sub_list" style={{ display: 'block' }}>
      {component.map((child) => {
        return (
          <li className={classNames('folder_item', { is_active: child.isFile && child.isOpen })} key={child.name}>
            <button
              type="button"
              className="btn_folder"
              onClick={() => {
                if (child.isFile) {
                  onClickFile(child);
                }
              }}
            >
              {child.isFile ? <Icon type="file" /> : <Icon type="folder" />}
              <span className="name">{child.name}</span>
              {/* TODO: nested folder does not work */}
              {/* {!child.isFile && child.children && <SubProjectComponent component={child.children} />} */}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

interface Props {
  code: ProjectCode;
  defaultOpenFile: ProjectFile;
  setProjectCodeState: React.Dispatch<React.SetStateAction<ProjectCode>>;
}

function ProjectCodes({ code, defaultOpenFile, setProjectCodeState }: Props) {
  const recursiveFindOpen = useCallback((components: Array<ProjectFile | ProjectFolder>): ProjectFile | undefined => {
    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      if (component.isFile && component.isOpen) {
        return component;
      }
      if (component.children) {
        const recursiveResult = recursiveFindOpen(component.children);
        if (!recursiveResult) {
          continue;
        } else {
          return recursiveResult;
        }
      }
    }
  }, []);

  const recursiveChangeOpenStatus = useCallback(
    (components: Array<ProjectFile | ProjectFolder>, targetFile: ProjectFile): void => {
      components.forEach((component) => {
        if (component.isFile) {
          component.isOpen = false;
        }
        if (component === targetFile) {
          component.isOpen = true;
        }
        if (component.children) {
          recursiveChangeOpenStatus(component.children, targetFile);
        }
      });
    },
    [],
  );

  const openedFile: ProjectFile = useMemo(() => {
    const file = recursiveFindOpen(code.children);
    if (file) {
      return file;
    }
    return { name: '', content: '', isFile: true, isOpen: false, language: 'javascript' };
  }, [code, recursiveFindOpen]);

  const onClickFile = useCallback(
    (projectFile: ProjectFile) => {
      setProjectCodeState((prev) => {
        recursiveChangeOpenStatus(prev.children, projectFile);
        return { ...prev };
      });
    },
    [setProjectCodeState, recursiveChangeOpenStatus],
  );
  return (
    <div className="folder_box">
      <ul className="folder_list">
        {code.children?.map((child) => {
          return (
            <li key={child.name} className={classNames('folder_item', { is_active: child.isFile && child.isOpen })}>
              <button
                type="button"
                className="btn_folder"
                onClick={() => {
                  if (child.isFile) {
                    onClickFile(child);
                  }
                }}
              >
                {child.isFile ? <Icon type="file" /> : <Icon type="folder" />}
                <span className="name"> {child.name}</span>
              </button>
              <SubProjectComponent component={child.children} onClickFile={onClickFile} />
            </li>
          );
        })}
      </ul>
      <div className="codeblock_area">
        <em className="file_title">{openedFile.name}</em>
        <div className="codeblock_box">
          <CodeBlock code={openedFile.content} language="javascript" withLineNumbers />
        </div>
      </div>
    </div>
  );
}

export default ProjectCodes;
