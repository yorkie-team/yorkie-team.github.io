import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ProjectFile, ProjectCode } from '../BasicExampleProjects';
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
  yorkieApiKey: string;
  projectCode: ProjectCode;
  documentStructure: string;
  iframeUrl: string;
}

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

export function BasicExampleView({
  yorkieClientAddress,
  yorkieDocumentKey,
  projectCode,
  iframeUrl,
  documentStructure,
  yorkieApiKey,
}: Props) {
  const [docChangeInfos, setDocChangeInfos] = useState<DocChangeInfo[]>([]);
  const [userList, setUserList] = useState<('user1' | 'user2' | 'user3' | 'user4')[]>(['user1', 'user2']);
  const [projectCodeState, setProjectCodeState] = useState<ProjectCode>(projectCode);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let unsubscribe: Function;
    const activate = async () => {
      const yorkie = await import('yorkie-js-sdk');
      const client = new yorkie.Client(yorkieClientAddress, {
        apiKey: yorkieApiKey,
      });
      console.log(yorkieApiKey);
      await client.activate();
      const doc = new yorkie.Document('vuejs-kanban');
      await client.attach(doc);
      setDocChangeInfos((prev) => [...prev, { type: 'initialize', content: 'Connection has been established!' }]);
      unsubscribe = doc.subscribe((event) => {
        console.log('hihihih');
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
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [yorkieClientAddress, yorkieDocumentKey, yorkieApiKey]);

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
    <main className="container">
      <Sidebar
        defaultOpened={true}
        title="Kanban Board"
        description="Kanban Board is a tool for managing tasks and workflow. It is a visual way to manage tasks and workflow."
        projectCodeState={projectCodeState}
        setProjectCodeState={setProjectCodeState}
        documentStructure={documentStructure}
      />
      <div className="content code_view">
        <div className="pin_box">
          <ul className="pin_list">
            {userList.map((user) => {
              return (
                <li key={user} className={classNames('pin_item shadow_m')}>
                  <span className="user" style={{ margin: '0px' }}>
                    <span className={`icon gradient_180deg_${UserColors[user]}`}></span>
                    <span className="text">{UserNames[user]}</span>
                  </span>
                  <div className="btn_box">
                    <button
                      type="button"
                      className={classNames('btn btn_line btn_pin')}
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

        <ul
          className="grid_list2"
          // style={{
          //   flexWrap: 'wrap',
          //   display: 'flex',
          //   height: '100%',
          //   flexDirection: userList.length <= 2 ? 'column' : 'row',
          //   margin: '0 15px',
          // }}
        >
          {userList.map((user) => {
            return <UserContent key={user} user={user} iframeUrl={iframeUrl} userCount={userList.length} />;
          })}
        </ul>

        <div className="log_box">
          <div className="log_inner">
            <div className="log_title">Event Log</div>
            <div style={{ overflowY: 'auto', paddingLeft: 3, maxHeight: 113 - 18 - 5, fontSize: 12 }}>
              {docChangeInfos.map((changeInfo, index) => (
                <div className="log_desc" key={index}>
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
    </main>
  );
}
