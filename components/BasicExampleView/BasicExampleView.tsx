import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ProjectStructure } from '../BasicExampleCodes';
import { Icon } from '../Icons/Icon';
import { Sidebar } from './Sidebar';
import UserContent from './UserContent';

interface DocChangeInfo {
  type: 'modification' | 'initialize';
  content: string;
}

interface PresenceChangeInfo {
  type: 'presence';
  content: string;
}

interface Props {
  yorkieClientAddress: string;
  yorkieDocumentKey: string;
  projectStructure: ProjectStructure;
  iframeUrl: string;
}

const ExampleContent = () => {
  return <div></div>;
};

export const UserNames = {
  user1: 'User 1',
  user2: 'User 2',
  user3: 'User 3',
  user4: 'User 4',
};
export const UserColors = {
  user1: 'green',
  user2: 'purple',
  user3: 'red',
  user4: 'yellow',
};

export function BasicExampleView({ yorkieClientAddress, yorkieDocumentKey, projectStructure, iframeUrl }: Props) {
  const [docChangeInfos, setDocChangeInfos] = useState<DocChangeInfo[]>([]);
  const [userList, setUserList] = useState<('user1' | 'user2' | 'user3' | 'user4')[]>(['user1', 'user2', 'user3']);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const activate = async () => {
      const yorkie = await import('yorkie-js-sdk');
      const client = new yorkie.Client('https://api.yorkie.dev');
      await client.activate();
      const doc = new yorkie.Document('vuejs-kanban');
      await client.attach(doc);
      setDocChangeInfos((prev) => [...prev, { type: 'initialize', content: 'Connection has been established!' }]);
      doc.subscribe((event) => {
        if (event.type === 'remote-change') {
          for (const changeInfo of event.value) {
            for (const path of changeInfo.paths) {
              setDocChangeInfos((prev) => [...prev, { type: 'modification', content: path }]);
            }
          }
        }
      });
    };
    activate();
  }, []);

  const scrollToBottom = () => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [docChangeInfos]);

  const deleteUser = (userId: string) => {
    if (userList.length === 1) {
      alert('You need at least one user');
      return;
    }
    setUserList((prev) => prev.filter((user) => user !== userId));
  };

  const addUser = () => {
    if (userList.length === 4) {
      alert("You can't add more users");
      return;
    }
    if (userList[0] !== 'user1') {
      setUserList((prev) => ['user1', ...prev]);
      return;
    }
    if (userList[1] !== 'user2') {
      setUserList((prev) => prev.slice(0, 1).concat(['user2']).concat(prev.slice(1)));
      return;
    }
    if (userList[2] !== 'user3') {
      setUserList((prev) => prev.slice(0, 2).concat(['user3']).concat(prev.slice(2)));
      return;
    }
    if (userList[3] !== 'user4') {
      setUserList((prev) => prev.slice(0, 3).concat(['user4']).concat(prev.slice(3)));
      return;
    }
  };
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <Sidebar
        defaultOpened={true}
        title="Kanban Board"
        description="Kanban Board is a tool for managing tasks and workflow. It is a visual way to manage tasks and workflow."
        code={projectStructure}
      />
      <div style={{ flex: '1 0', display: 'flex', flexDirection: 'column' }}>
        <div className="pin_box" style={{ height: 85, border: 'none' }}>
          <ul className="pin_list" style={{ padding: 20 }}>
            {userList.map((user) => {
              return (
                <li
                  key={user}
                  style={{ padding: '5px 10px' }}
                  className={classNames('pin_item shadow_m', { is_active: userList.includes(user) })}
                >
                  <span className="user" style={{ margin: '0px' }}>
                    <span className={`icon gradient_180deg_${UserColors[user]}`}></span>
                    <span className="text">{UserNames[user]}</span>
                  </span>
                  <div className="btn_box">
                    <button
                      type="button"
                      className={classNames('btn btn_line btn_pin', { blue_0: userList.includes('user1') })}
                      title="Pin"
                      onClick={() => {
                        deleteUser(user);
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
            <span className="blind">유저 추가하기</span>
          </button>
        </div>
        <div style={{ flex: '1 0', position: 'relative' }}>
          <ul
            style={{
              flexWrap: 'wrap',
              display: 'flex',
              height: '100%',
              flexDirection: userList.length <= 2 ? 'column' : 'row',
              margin: '0 15px',
            }}
          >
            {userList.map((user) => {
              return <UserContent key={user} user={user} iframeUrl={iframeUrl} userCount={userList.length} />;
            })}
          </ul>
        </div>
        <div
          style={{
            height: 120,
            backgroundColor: '#d9d9d9',
            color: 'black',
            marginBottom: 25,
            marginLeft: 15,
            marginRight: 15,
          }}
        >
          <div
            style={{
              marginTop: 5,
              paddingLeft: 8,
              width: 'max-content',
              paddingRight: 5,
              marginBottom: 5,
            }}
          >
            Event Log
          </div>
          <div style={{ overflowY: 'auto', paddingLeft: 3, maxHeight: 113 - 18 - 5, fontSize: 12 }}>
            {docChangeInfos.map((changeInfo, index) => (
              <div style={{ marginBottom: 5, paddingLeft: 8 }} key={index}>
                <span style={{ fontWeight: 'bold' }}>event</span> -{' '}
                {changeInfo.type === 'modification' && <span style={{ opacity: 0.5 }}>modification occured at </span>}
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
