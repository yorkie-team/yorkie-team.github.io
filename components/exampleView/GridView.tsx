import DashboardUserGreenSVG from '@/public/assets/icons/icon_dashboard_user_green.svg';
import DashboardUserPurpleSVG from '@/public/assets/icons/icon_dashboard_user_purple.svg';
import DashboardUserRedSVG from '@/public/assets/icons/icon_dashboard_user_red.svg';
import DashboardUserYellowSVG from '@/public/assets/icons/icon_dashboard_user_yellow.svg';
import { svgMap } from '@/components/Icons/Icon';
import { Icon, Icons } from 'yorkie-ui';

export function GridView() {
  return (
    <div className="content">
      <ul className="grid_list2">
        <li className="grid_item shadow_m is_active">
          <div className="dashboard">
            <div className="dashboard_top">
              <span className="user gradient_180deg_green">User 1</span>
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
              <iframe title="Example" src="https://yorkie.dev" width="100%" height="100%"></iframe>
            </div>
          </div>
        </li>
        <li className="grid_item shadow_m">
          <div className="dashboard">
            <div className="dashboard_top">
              <span className="user gradient_180deg_green">User 1</span>
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
              <iframe title="Example" src="https://yorkie.dev" width="100%" height="100%"></iframe>
              <div className="btn_box">
                <button type="button" className="btn btn_expand blue_0">
                  <Icon icon={<Icons.IconExpand />} />
                  <span className="blind">창 활성화 시키기</span>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li className="grid_item shadow_m">
          <div className="dashboard">
            <div className="dashboard_top">
              <span className="user gradient_180deg_green">User 1</span>
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
              <iframe title="Example" src="https://yorkie.dev" width="100%" height="100%"></iframe>
              <div className="btn_box">
                <button type="button" className="btn btn_expand blue_0">
                  <Icon icon={<Icons.IconExpand />} />
                  <span className="blind">창 활성화 시키기</span>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li className="grid_item shadow_m">
          <div className="dashboard">
            <div className="dashboard_top">
              <span className="user gradient_180deg_green">User 1</span>
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
              <iframe
                title="Example"
                src="https://liveblocks.io/examples/collaborative-whiteboard-advanced/nextjs/preview?roomId=kbF2ruMi-UOPd6rdJKjRg"
                width="100%"
                height="100%"
              ></iframe>
              <div className="btn_box">
                <button type="button" className="btn is_disabled btn_expand gray300" disabled>
                  <Icon icon={<Icons.IconExpand />} />
                  <span className="blind">창 활성화 시키기</span>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li className="grid_item shadow_m">
          <button type="button" className="btn_add">
            <span className="blind">화면 추가하기</span>
            <Icon icon={<Icons.IconPlus />} />
          </button>
        </li>
      </ul>
    </div>
  );
}
