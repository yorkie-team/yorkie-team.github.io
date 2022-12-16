import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@/components';
import DashboardUserGreenSVG from '@/public/assets/icons/icon_dashboard_user_green.svg';
import DashboardUserPurpleSVG from '@/public/assets/icons/icon_dashboard_user_purple.svg';
import DashboardUserRedSVG from '@/public/assets/icons/icon_dashboard_user_red.svg';
import DashboardUserYellowSVG from '@/public/assets/icons/icon_dashboard_user_yellow.svg';
import { DocChangeInfo } from '@/pages/examples/kanban';

const ExampleContent = ({ user, iframeUrl }: { user: 'user1' | 'user2' | 'user3' | 'user4'; iframeUrl: string }) => {
  const name = {
    user1: 'User 1',
    user2: 'User 2',
    user3: 'User 3',
    user4: 'User 4',
  };
  const color = {
    user1: 'green',
    user2: 'purple',
    user3: 'red',
    user4: 'yellow',
  };
  return (
    <>
      <div className="dashboard_top">
        <span className={`user gradient_180deg_${color[user]}`}>{name[user]}</span>
      </div>
      <div className="dashboard_content">
        <iframe title="Example" frameBorder={0} src={iframeUrl} width="100%" height="100%"></iframe>
      </div>
    </>
  );
};

export function SimpleDualView({
  iframeUrl,
  docChangeInfos,
  projectName,
}: {
  iframeUrl: string;
  docChangeInfos: Array<DocChangeInfo>;
  projectName: string;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [docChangeInfos]);

  return (
    <div className="content dual_view">
      <div style={{ backgroundColor: '#332E2A', color: 'white', height: 113 }}>
        <div
          style={{
            paddingLeft: 8,
            backgroundColor: '#FDC432',
            width: 'max-content',
            paddingRight: 5,
            color: 'black',
            marginBottom: 5,
          }}
        >
          ~/{projectName}
        </div>
        <div style={{ overflowY: 'auto', paddingLeft: 3, maxHeight: 113 - 18 - 5, fontSize: 12 }}>
          {docChangeInfos.map((changeInfo, index) => (
            <div style={{ marginBottom: 5 }} key={index}>
              <span style={{ color: '#FDC432' }}>event</span> -{' '}
              {changeInfo.type === 'modification' && <span style={{ opacity: 0.5 }}>modification occured at </span>}
              <span>{changeInfo.path}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* {changedPath && <div>Modification occrued at {changedPath}</div>} */}
        {/* <button type="button" className="btn btn_add">
          <Icon type="plus" />
          <span className="blind">화면 추가하기</span>
        </button> */}
      </div>
      <ul className="grid_list2">
        <li className="grid_item shadow_m" key={'user1'}>
          <div className="dashboard">
            <ExampleContent user={'user1'} iframeUrl={iframeUrl} />
          </div>
        </li>
        <li className="grid_item shadow_m" key={'user2'}>
          <div className="dashboard">
            <ExampleContent user={'user2'} iframeUrl={iframeUrl} />
          </div>
        </li>
      </ul>
    </div>
  );
}
