import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Icon } from '@/components';
import UserContent from './UserContent';

const CLIENT_COUNT_WORDS = ['No clients', 'One client', 'Two clients', 'Three clients', 'Four clients'];

const describeClients = (count: number) => {
  const clients = CLIENT_COUNT_WORDS[count] ?? `${count} clients`;
  if (count === 1) {
    return `${clients} on the document. Add a user, or open the example in another tab, to watch edits sync.`;
  }
  return `${clients} on the same document. Edit in one and watch the ${count === 2 ? 'other' : 'others'}.`;
};

/**
 * Live preview of a web example: the same app loaded in several iframes, each one a separate Yorkie client
 * attached to the same document. Panes sit side by side when the preview area is wide enough and stack
 * otherwise. On mobile only the first pane is shown, with a link to open the example on its own.
 */
export function BasicExampleView({ iframeURL, userMaxCount = 4 }: { iframeURL: string; userMaxCount?: number }) {
  const [userList, setUserList] = useState<number[]>([1, 2]);
  // Below the tablet breakpoint only the first pane is shown. A hidden iframe would still load and join the
  // document as a second client, so the other panes are rendered only once a wide viewport is confirmed.
  const [wide, setWide] = useState(false);
  const limitId = useId();
  const panesRef = useRef<HTMLUListElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  // Index of the pane that was just removed. Its remove button had focus and is gone, so focus moves to the
  // pane that took its place (or the one before it), or to "Add user" once no pane can be removed.
  const [removedIndex, setRemovedIndex] = useState<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 640px)');
    const update = () => setWide(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Ensure iframe URL ends with /index.html for locally built examples
  const normalizedIframeURL =
    iframeURL.startsWith('/apps/') && !iframeURL.endsWith('.html') ? `${iframeURL}/index.html` : iframeURL;

  const canRemove = userList.length > 1;
  const canAdd = userList.length < userMaxCount;

  const deleteUser = useCallback(
    (userId: number) => {
      if (userList.length <= 1) return;
      setRemovedIndex(userList.indexOf(userId));
      setUserList((prev) => (prev.length > 1 ? prev.filter((userNumber) => userNumber !== userId) : prev));
    },
    [userList],
  );

  useEffect(() => {
    if (removedIndex === null) return;
    setRemovedIndex(null);
    const removeButtons = panesRef.current?.querySelectorAll<HTMLButtonElement>('.btn_remove:not(:disabled)');
    const target = removeButtons?.length ? removeButtons[Math.min(removedIndex, removeButtons.length - 1)] : null;
    (target ?? addRef.current)?.focus();
  }, [removedIndex]);

  // Reuse the lowest free user number so each user keeps its label.
  const addUser = useCallback(() => {
    setUserList((prev) => {
      if (prev.length >= userMaxCount) return prev;
      let next = 1;
      while (prev.includes(next)) next++;
      return [...prev, next].sort((a, b) => a - b);
    });
  }, [userMaxCount]);

  return (
    <section className="content code_view preview_view" aria-label="Live preview">
      <div className="preview_bar">
        <p className="preview_note">
          <span className="preview_note_wide" aria-live="polite">
            {describeClients(userList.length)}
          </span>
          <span className="preview_note_narrow">
            This is one client. Open the example in another tab or on another device to watch edits sync.
          </span>
        </p>
        <div className="preview_actions">
          <span className="preview_add">
            {/* aria-disabled rather than disabled: the click that reaches the limit would otherwise drop focus. */}
            <button
              ref={addRef}
              type="button"
              className={`btn btn_small btn_line${canAdd ? '' : ' is_disabled'}`}
              onClick={addUser}
              aria-disabled={!canAdd}
              aria-describedby={canAdd ? undefined : limitId}
            >
              <Icon type="plus" />
              <span className="text">Add user</span>
            </button>
            {!canAdd && (
              <span id={limitId} className="preview_limit">
                Up to {userMaxCount} users
              </span>
            )}
          </span>
          <a href={normalizedIframeURL} className="btn btn_small btn_line btn_open" target="_blank" rel="noreferrer">
            <span className="text preview_open_wide">Open in new tab</span>
            <span className="text preview_open_narrow">Open the example</span>
            <Icon type="link" />
          </a>
        </div>
      </div>
      <ul className="preview_panes" data-count={userList.length} ref={panesRef}>
        {(wide ? userList : userList.slice(0, 1)).map((userNumber) => (
          <UserContent
            key={userNumber}
            userNumber={userNumber}
            iframeURL={normalizedIframeURL}
            canRemove={canRemove}
            onRemove={deleteUser}
          />
        ))}
      </ul>
    </section>
  );
}
