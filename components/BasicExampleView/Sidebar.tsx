import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Icon, CodeBlock } from '@/components';
import { ProjectCode } from '../BasicExampleProjects';
import ProjectCodes from './ProjectCodes';

interface Props {
  defaultOpened?: boolean;
  title: string;
  description: string;
  projectCode: ProjectCode;
  documentStructure: string;
}

export function Sidebar({ defaultOpened = true, title, description, projectCode, documentStructure }: Props) {
  const [projectCodeState, setProjectCodeState] = useState<ProjectCode>(projectCode);
  const [viewType, setViewType] = useState<'code' | 'documentStructure'>('code');
  const [isOpened, setIsOpened] = useState<boolean>(defaultOpened);

  useEffect(() => {
    setIsOpened(defaultOpened);
  }, [defaultOpened]);

  return (
    <div className={classNames('sidebar type_wide', { type_shadow: !defaultOpened }, { is_hide: !isOpened })}>
      <div className="sidebar_top">
        <div className="codeblock_navigator">
          <button
            type="button"
            onClick={() => {
              setViewType('code');
            }}
            className={classNames('item', { is_active: viewType === 'code' })}
          >
            Code
          </button>
          <button
            type="button"
            onClick={() => {
              setViewType('documentStructure');
            }}
            className={classNames('item', { is_active: viewType === 'documentStructure' })}
          >
            Document Structure
          </button>
        </div>
        <button type="button" className="btn btn_toggle" onClick={() => setIsOpened(!isOpened)}>
          <Icon type="arrow" />
          <span className="blind">Close sidebar</span>
        </button>
      </div>
      <div className="guide_box">
        <h2 className="guide_title">{title}</h2>
        <p className="guide_desc">{description}</p>
        {viewType === 'code' && <ProjectCodes code={projectCodeState} setProjectCodeState={setProjectCodeState} />}
        {viewType === 'documentStructure' && (
          <div className="codeblock_box">
            <CodeBlock code={documentStructure} language="typescript" />
          </div>
        )}
      </div>
      <div className="sidebar_bottom" style={{ zIndex: 0 }}>
        <div className="btn_box">
          <a
            href="https://github.com/yorkie-team/yorkie-js-sdk/tree/main/examples/vuejs-kanban"
            className="btn gray600 "
          >
            GitHub
          </a>
        </div>
        <p className="guide_desc">Last updated 4 days ago</p>
      </div>
    </div>
  );
}
