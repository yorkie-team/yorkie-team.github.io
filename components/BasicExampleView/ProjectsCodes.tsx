import React, { useState } from 'react';
import { ProjectFile, ProjectFolder, ProjectCode } from '../BasicExampleProjects';
import { CodeBlock, Icon } from '@/components';
import { PrismCode } from '../CodeBlock/PrismCode';
import classNames from 'classnames';

interface Props {
  code: ProjectCode;
  defaultOpenFile: ProjectFile;
}

function SubProjectComponent({ component }: { component: Array<ProjectFile | ProjectFolder> | undefined }) {
  if (!component) {
    return null;
  }
  return (
    <ul className="folder_sub_list" style={{ display: 'block' }}>
      {component.map((child) => {
        return (
          <li className={classNames('folder_item', { is_active: child.isFile && child.isOpen })} key={child.name}>
            <button type="button" className="btn_folder">
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
function ProjectCodes({ code, defaultOpenFile }: Props) {
  const [openedFile, setOpenedFile] = useState<ProjectFile>(defaultOpenFile);
  return (
    <div className="folder_box">
      <ul className="folder_list">
        {code.children?.map((child) => {
          return (
            <li key={child.name} className={classNames('folder_item', { is_active: child.isFile && child.isOpen })}>
              <button type="button" className="btn_folder">
                {child.isFile ? <Icon type="file" /> : <Icon type="folder" />}
                <span className="name"> {child.name}</span>
              </button>
              <SubProjectComponent component={child.children} />
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
