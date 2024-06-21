import { useState } from 'react';
import classNames from 'classnames';
import { svgMap } from '@/components/Icons/Icon';
import { Icon, IconExpand, IconPlus } from 'yorkie-ui';
import DashboardUserGreenSVG from '@/public/assets/icons/icon_dashboard_user_green.svg';
import DashboardUserPurpleSVG from '@/public/assets/icons/icon_dashboard_user_purple.svg';
import DashboardUserRedSVG from '@/public/assets/icons/icon_dashboard_user_red.svg';
import DashboardUserYellowSVG from '@/public/assets/icons/icon_dashboard_user_yellow.svg';

const ExampleContent = ({ user }: { user: 'user1' | 'user2' | 'user3' | 'user4' }) => {
  const name = {
    user1: 'User 1',
    user2: 'User 2',
    user3: 'User 3',
    user4: 'User 4',
  };
  const color = {
    user1: 'green',
    user2: 'purple',
    user3: 'red',
    user4: 'yellow',
  };
  return (
    <>
      <div className="dashboard_top">
        <span className={`user gradient_180deg_${color[user]}`}>{name[user]}</span>
        <ul className="user_list">
          <li className="user_item">
            <span className="icon">
              <DashboardUserGreenSVG />
            </span>
          </li>
          <li className="user_item">
            <span className="icon">
              <DashboardUserRedSVG />
            </span>
          </li>
          <li className="user_item">
            <span className="icon">
              <DashboardUserPurpleSVG />
            </span>
          </li>
          <li className="user_item">
            <span className="icon">
              <DashboardUserYellowSVG />
            </span>
          </li>
        </ul>
      </div>
      <div className="dashboard_content">
        <iframe title="Example" frameBorder={0} src="https://yorkie.dev" width="100%" height="100%"></iframe>
      </div>
    </>
  );
};

export function DualView() {
  const [pinList, setPinList] = useState<Array<string>>(['user1']);

  const handlePin = (user: string) => {
    if (pinList.includes(user)) {
      setPinList(pinList.filter((item) => item !== user));
      return;
    }

    if (pinList.length === 2) {
      return;
    }

    setPinList([...pinList, user]);
  };

  return (
    <div className="content dual_view">
      <div className="pin_box">
        <ul className="pin_list">
          <li className={classNames('pin_item shadow_m', { is_active: pinList.includes('user1') })}>
            <span className="user">
              <span className="icon gradient_180deg_green"></span>
              <span className="text">User 1</span>
            </span>
            <div className="btn_box">
              <button
                type="button"
                className={classNames('btn btn_line btn_pin', { blue_0: pinList.includes('user1') })}
                title="Pin"
              >
                <Icon icon={svgMap.pin} />
              </button>
              <button type="button" className="btn btn_expand blue_0">
                <span className="text">Move to this tab</span>
                <Icon icon={<IconExpand />} />
              </button>
            </div>
          </li>
          <li className={classNames('pin_item shadow_m', { is_active: pinList.includes('user2') })}>
            <span className="user">
              <span className="icon gradient_180deg_purple"></span>
              <span className="text">User 2</span>
            </span>
            <div className="btn_box">
              <button
                type="button"
                className={classNames('btn btn_line btn_pin', { blue_0: pinList.includes('user2') })}
                title="Pin"
                onClick={() => {
                  handlePin('user2');
                }}
              >
                <Icon icon={svgMap.pin} />
              </button>
              <button type="button" className="btn btn_expand blue_0">
                <span className="text">Move to this tab</span>
                <Icon icon={<IconExpand />} />
              </button>
            </div>
          </li>
          <li className={classNames('pin_item shadow_m', { is_active: pinList.includes('user3') })}>
            <span className="user">
              <span className="icon gradient_180deg_red"></span>
              <span className="text">User 3</span>
            </span>
            <div className="btn_box">
              <button
                type="button"
                className={classNames('btn btn_line btn_pin', { blue_0: pinList.includes('user3') })}
                title="Pin"
                onClick={() => {
                  handlePin('user3');
                }}
              >
                <Icon icon={svgMap.pin} />
              </button>
              <button type="button" className="btn btn_expand blue_0">
                <span className="text">Move to this tab</span>
                <Icon icon={<IconExpand />} />
              </button>
            </div>
          </li>
          <li className={classNames('pin_item shadow_m', { is_active: pinList.includes('user4') })}>
            <span className="user">
              <span className="icon gradient_180deg_yellow"></span>
              <span className="text">User 4</span>
            </span>
            <div className="btn_box">
              <button
                type="button"
                className={classNames('btn btn_line btn_pin', { blue_0: pinList.includes('user4') })}
                title="Pin"
                onClick={() => {
                  handlePin('user4');
                }}
              >
                <Icon icon={svgMap.pin} />
              </button>
              <button type="button" className="btn is_disabled btn_expand gray300" disabled>
                <span className="text">Move to this tab</span>
                <Icon icon={<IconExpand />} />
              </button>
            </div>
          </li>
        </ul>
        <button type="button" className="btn btn_add">
          <IconPlus />
          <span className="blind">화면 추가하기</span>
        </button>
      </div>
      <ul className="grid_list2">
        {(pinList as Array<'user1' | 'user2' | 'user3' | 'user4'>).map((user) => (
          <li className="grid_item shadow_m" key={user}>
            <div className="dashboard">
              <ExampleContent user={user} />
            </div>
          </li>
        ))}
        {pinList.length < 2 && (
          <li className="grid_item shadow_m add_screen">
            <p className="guide">Pin one more to see other users&#39; screen</p>
          </li>
        )}
      </ul>
    </div>
  );
}
