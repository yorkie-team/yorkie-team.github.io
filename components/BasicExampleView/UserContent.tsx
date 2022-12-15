import React from 'react';
import { UserColors, UserNames } from './BasicExampleView';

function UserContent({
  user,
  iframeUrl,
  userCount,
}: {
  user: 'user1' | 'user2' | 'user3' | 'user4';
  iframeUrl: string;
  userCount: number;
}) {
  return (
    <>
      <li className="grid_item shadow_m" key={user}>
        <div className="dashboard" style={{ height: '100%' }}>
          <div className="dashboard_top">
            <span className={`user gradient_180deg_${UserColors[user]}`}>{UserNames[user]}</span>
          </div>
          <div className="dashboard_content" style={{ flex: '1 0' }}>
            <iframe title="Example" frameBorder={0} src={iframeUrl} width="100%" height="100%"></iframe>
          </div>
        </div>
      </li>
    </>
  );
}

export default UserContent;
