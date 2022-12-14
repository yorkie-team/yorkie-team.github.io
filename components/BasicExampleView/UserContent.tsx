import React from 'react';
import { UserColors, UserNames } from './BasicExampleView';

function UserContent({ user, iframeUrl }: { user: 'user1' | 'user2' | 'user3' | 'user4'; iframeUrl: string }) {
  return (
    // <>
    <li
      className="shadow_m"
      key={user}
      style={{
        // height: 'calc(50% - 150px)',
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0',
        width: '100%',
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
