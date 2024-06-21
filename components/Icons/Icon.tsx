import classNames from 'classnames';

import OpenSelectorSVG from '@/public/assets/icons/icon_open_selector.svg';
import ToolSVG from '@/public/assets/icons/icon_tool.svg';
import MessageSmileSVG from '@/public/assets/icons/icon_message_smile.svg';
import CheckCircleSVG from '@/public/assets/icons/icon_check_circle.svg';
import RecorderSVG from '@/public/assets/icons/icon_recorder.svg';
import BulbSVG from '@/public/assets/icons/icon_bulb.svg';
import MenuSVG from '@/public/assets/icons/icon_menu.svg';
import DangerSVG from '@/public/assets/icons/icon_alert_danger.svg';
import SuccessSVG from '@/public/assets/icons/icon_alert_success.svg';
import WarningSVG from '@/public/assets/icons/icon_alert_warning.svg';
import InfoSVG from '@/public/assets/icons/icon_alert_info.svg';
import CheckSVG from '@/public/assets/icons/icon_check.svg';
import ViewFullSVG from '@/public/assets/icons/icon_view_full.svg';
import ViewShowSVG from '@/public/assets/icons/icon_view_show.svg';
import ViewGridSVG from '@/public/assets/icons/icon_view_grid.svg';
import ViewSplitSVG from '@/public/assets/icons/icon_view_split.svg';
import PinSVG from '@/public/assets/icons/icon_pin.svg';

export const svgMap = {
  openSelector: <OpenSelectorSVG />,
  tool: <ToolSVG />,
  messageSmile: <MessageSmileSVG />,
  checkCircle: <CheckCircleSVG />,
  recorder: <RecorderSVG />,
  bulb: <BulbSVG />,
  menu: <MenuSVG />,
  danger: <DangerSVG />,
  success: <SuccessSVG />,
  warning: <WarningSVG />,
  info: <InfoSVG />,
  check: <CheckSVG />,
  viewFull: <ViewFullSVG />,
  viewShow: <ViewShowSVG />,
  viewGrid: <ViewGridSVG />,
  viewSplit: <ViewSplitSVG />,
  pin: <PinSVG />,
};
type SVGType = keyof typeof svgMap;

export function Icon({ type, color, className }: { type: SVGType; color?: string; className?: string }) {
  return <span className={classNames('icon', className, color)}>{svgMap[type]}</span>;
}
