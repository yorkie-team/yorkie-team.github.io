import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@/components';
import UserContent from './UserContent';

export const UserColors = ['red', 'yellow', 'green', 'orange', 'blue', 'purple'];

export function BasicExampleView({ iframeURL, userMaxCount = 4 }: { iframeURL: string; userMaxCount?: number }) {
  const [userList, setUserList] = useState<number[]>([1, 2]);

  // Ensure iframe URL ends with /index.html for locally built examples
  const normalizedIframeURL =
    iframeURL.startsWith('/apps/') && !iframeURL.endsWith('.html') ? `${iframeURL}/index.html` : iframeURL;

  const deleteUser = useCallback(
    (userId: number) => {
      if (userList.length === 1) {
        alert('You need at least one user');
        return;
      }
      setUserList((prev) => prev.filter((userNumber) => userNumber !== userId));
    },
    [setUserList, userList.length],
  );

  const addUser = useCallback(() => {
    if (userList.length === userMaxCount) {
      alert("You can't add more users");
      return;
    }
    if (userList.length === userList[userList.length - 1]) {
      setUserList((prev) => [...prev, userList.length + 1]);
      return;
    }
    for (let i = 0; i < userList.length; i++) {
      if (userList[i] !== i + 1) {
        setUserList((prev) => [...prev.slice(0, i), i + 1, ...prev.slice(i)]);
        return;
      }
    }
  }, [setUserList, userList, userMaxCount]);

  return (
    <div className="content code_view">
      <div className="pin_box">
        <ul className="pin_list">
          {userList.map((userNumber) => {
            return (
              <li key={userNumber} className={classNames('pin_item shadow_m')}>
                <span className="user">
                  <span className={`icon gradient_180deg_${UserColors[userNumber % UserColors.length]}`}></span>
                  <span className="text">{`User ${userNumber}`}</span>
                </span>
                <div className="btn_box">
                  <button
                    type="button"
                    className={classNames('btn btn_line btn_pin')}
                    title="Pin"
                    onClick={() => {
                      deleteUser(userNumber);
                    }}
                  >
                    <Icon type="close" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <button type="button" className="btn btn_add" onClick={addUser}>
          <Icon type="plus" />
        </button>
      </div>
      <ul className="grid_list2">
        {userList.map((userNumber) => {
          return <UserContent key={userNumber} userNumber={userNumber} iframeURL={normalizedIframeURL} />;
        })}
      </ul>
    </div>
  );
}
