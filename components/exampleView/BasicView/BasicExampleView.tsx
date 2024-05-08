'use client';

import { Icon } from '@/components';
import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import yorkie from 'yorkie-js-sdk';
import UserContent from './UserContent';

interface DocChangeInfo {
  type: 'update' | 'initialize' | 'presence';
  content: string;
}

export const UserColors = ['red', 'yellow', 'green', 'orange', 'blue', 'purple'];

export function BasicExampleView({
  rpcAddr,
  apiKey,
  documentKey,
  iframeURL,
  userMaxCount = 4,
}: {
  rpcAddr: string;
  apiKey: string;
  documentKey: string;
  iframeURL: string;
  userMaxCount?: number;
}) {
  const [docChangeInfos, setDocChangeInfos] = useState<DocChangeInfo[]>([]);
  const [userList, setUserList] = useState<number[]>([1, 2]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let unsubscribeDoc: Function;

    const activate = async () => {
      const client = new yorkie.Client(rpcAddr, { apiKey });
      await client.activate();
      const doc = new yorkie.Document(documentKey);
      await client.attach(doc);

      setDocChangeInfos((prev) => [...prev, { type: 'initialize', content: 'Connection has been established!' }]);
      unsubscribeDoc = doc.subscribe((event) => {
        if (event.type === 'remote-change') {
          const { operations } = event.value;
          for (const op of operations) {
            setDocChangeInfos((prev) => [...prev, { type: 'update', content: op.path }]);
          }
        }
      });
    };
    activate();

    return () => {
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, [rpcAddr, documentKey, apiKey]);

  const scrollToBottom = useCallback(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messagesEndRef]);

  useEffect(scrollToBottom, [docChangeInfos, scrollToBottom]);

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
          return <UserContent key={userNumber} userNumber={userNumber} iframeURL={iframeURL} />;
        })}
      </ul>
      <div className="log_box">
        <div className="log_inner">
          <div className="log_title">Event Log</div>
          <div style={{ overflowY: 'auto', paddingLeft: 3, maxHeight: 113 - 18 - 5, fontSize: 12 }}>
            {docChangeInfos.map((changeInfo, index) => (
              <div className="log_desc" key={index}>
                <span style={{ fontWeight: 'bold' }}>event</span> -
                {changeInfo.type === 'update' && <span style={{ opacity: 0.5 }}>modification occurred at </span>}
                <span>{changeInfo.content}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
