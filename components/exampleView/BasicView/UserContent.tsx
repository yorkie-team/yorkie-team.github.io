import React from 'react';
import { Icon } from '@/components';

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
  // The label stays neutral on purpose: each app picks its own color for this client, so a peer hue here
  // would name a color the app does not show (see DESIGN.md "The Peers Rule").
  return (
    <li className="preview_pane">
      <div className="preview_pane_top">
        <span className="preview_pane_user">{label}</span>
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
