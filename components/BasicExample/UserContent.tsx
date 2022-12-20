import React from 'react';
import { UserColors } from './BasicExampleView';

function UserContent({ userNumber, iframeURL }: { userNumber: number; iframeURL: string }) {
  return (
    <li className="grid_item shadow_m" key={userNumber}>
      <div className="dashboard">
        <div className="dashboard_top">
          <span className={`user gradient_180deg_${UserColors[userNumber % UserColors.length]}`}>
            {`User ${userNumber}`}
          </span>
        </div>
        <div className="dashboard_content">
          <iframe title="Example" frameBorder="0" src={iframeURL} width="100%" height="100%"></iframe>
        </div>
      </div>
    </li>
  );
}

export default UserContent;
