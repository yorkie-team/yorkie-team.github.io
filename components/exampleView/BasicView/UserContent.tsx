import React from 'react';
import { Icon } from '@/components';
import { UserColors } from './BasicExampleView';

function UserContent({
  userNumber,
  iframeURL,
  canRemove,
  onRemove,
}: {
  userNumber: number;
  iframeURL: string;
  canRemove: boolean;
  onRemove: (userNumber: number) => void;
}) {
  const label = `User ${userNumber}`;
  return (
    <li className={`preview_pane peer_${UserColors[userNumber % UserColors.length]}`}>
      <div className="preview_pane_top">
        <span className="preview_pane_user">
          <span className="preview_pane_dot" aria-hidden="true" />
          {label}
        </span>
        <button
          type="button"
          className="btn_remove"
          onClick={() => onRemove(userNumber)}
          disabled={!canRemove}
          aria-label={`Remove ${label}`}
          title={canRemove ? `Remove ${label}` : 'At least one user stays in the preview'}
        >
          <Icon type="close" />
        </button>
      </div>
      <div className="preview_pane_body">
        <iframe title={`Example as ${label}`} src={iframeURL} />
      </div>
    </li>
  );
}

export default UserContent;
