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
    // <>
    <li
      className="shadow_m"
      key={user}
      style={{
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'column',
        flex: userCount <= 2 ? '1 0' : undefined,
        width: userCount > 2 ? '50%' : '100%',
      }}
    >
      <div className="dashboard" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="dashboard_top">
          <span className={`user gradient_180deg_${UserColors[user]}`}>{UserNames[user]}</span>
        </div>
        <div className="dashboard_content" style={{ flex: '1 0', position: 'relative' }}>
          <iframe title="Example" frameBorder={0} src={iframeUrl} width="100%" height="100%"></iframe>
        </div>
      </div>
    </li>
    // </>
  );
}

export default UserContent;
