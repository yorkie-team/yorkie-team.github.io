import classNames from 'classnames';

import DangerSVG from '@/public/assets/icons/icon_alert_danger.svg';
import InfoSVG from '@/public/assets/icons/icon_alert_info.svg';
import SuccessSVG from '@/public/assets/icons/icon_alert_success.svg';
import WarningSVG from '@/public/assets/icons/icon_alert_warning.svg';
import ArrowSVG from '@/public/assets/icons/icon_arrow.svg';
import BackHomeSVG from '@/public/assets/icons/icon_back_home.svg';
import BookSVG from '@/public/assets/icons/icon_book.svg';
import BulbSVG from '@/public/assets/icons/icon_bulb.svg';
import CheckSVG from '@/public/assets/icons/icon_check.svg';
import CheckCircleSVG from '@/public/assets/icons/icon_check_circle.svg';
import CloseSVG from '@/public/assets/icons/icon_close.svg';
import CloseSmallSVG from '@/public/assets/icons/icon_close_small.svg';
import CloudSVG from '@/public/assets/icons/icon_cloud_orange.svg';
import CopySVG from '@/public/assets/icons/icon_copy.svg';
import DiamondSVG from '@/public/assets/icons/icon_diamond.svg';
import DiscordSVG from '@/public/assets/icons/icon_discord.svg';
import ExpandSVG from '@/public/assets/icons/icon_expand.svg';
import FileSVG from '@/public/assets/icons/icon_file.svg';
import FolderSVG from '@/public/assets/icons/icon_folder.svg';
import FolderOpenSVG from '@/public/assets/icons/icon_folder_open.svg';
import GitHubSVG from '@/public/assets/icons/icon_github.svg';
import GnbMenuSVG from '@/public/assets/icons/icon_gnb_menu.svg';
import MenuSVG from '@/public/assets/icons/icon_menu.svg';
import MessageSmileSVG from '@/public/assets/icons/icon_message_smile.svg';
import MessageSquareSVG from '@/public/assets/icons/icon_message_square.svg';
import MinimizeSVG from '@/public/assets/icons/icon_minimize.svg';
import OpenSelectorSVG from '@/public/assets/icons/icon_open_selector.svg';
import PackageSVG from '@/public/assets/icons/icon_package.svg';
import PinSVG from '@/public/assets/icons/icon_pin.svg';
import PlusSVG from '@/public/assets/icons/icon_plus.svg';
import RecorderSVG from '@/public/assets/icons/icon_recorder.svg';
import ScenarioSVG from '@/public/assets/icons/icon_scenario.svg';
import SlackSVG from '@/public/assets/icons/icon_slack.svg';
import SmileSVG from '@/public/assets/icons/icon_smile.svg';
import StarSVG from '@/public/assets/icons/icon_stars.svg';
import ToolSVG from '@/public/assets/icons/icon_tool.svg';
import TwinkleSVG from '@/public/assets/icons/icon_twinkle.svg';
import ViewFullSVG from '@/public/assets/icons/icon_view_full.svg';
import ViewGridSVG from '@/public/assets/icons/icon_view_grid.svg';
import ViewShowSVG from '@/public/assets/icons/icon_view_show.svg';
import ViewSplitSVG from '@/public/assets/icons/icon_view_split.svg';

const svgMap = {
  star: <StarSVG />,
  copy: <CopySVG />,
  book: <BookSVG />,
  backHome: <BackHomeSVG />,
  slack: <SlackSVG />,
  github: <GitHubSVG />,
  gnbMenu: <GnbMenuSVG />,
  close: <CloseSVG />,
  closeSmall: <CloseSmallSVG />,
  openSelector: <OpenSelectorSVG />,
  diamond: <DiamondSVG />,
  tool: <ToolSVG />,
  messageSquare: <MessageSquareSVG />,
  messageSmile: <MessageSmileSVG />,
  smile: <SmileSVG />,
  checkCircle: <CheckCircleSVG />,
  scenario: <ScenarioSVG />,
  arrow: <ArrowSVG />,
  recorder: <RecorderSVG />,
  bulb: <BulbSVG />,
  twinkle: <TwinkleSVG />,
  menu: <MenuSVG />,
  danger: <DangerSVG />,
  success: <SuccessSVG />,
  warning: <WarningSVG />,
  info: <InfoSVG />,
  check: <CheckSVG />,
  discord: <DiscordSVG />,
  viewFull: <ViewFullSVG />,
  viewShow: <ViewShowSVG />,
  viewGrid: <ViewGridSVG />,
  viewSplit: <ViewSplitSVG />,
  expand: <ExpandSVG />,
  plus: <PlusSVG />,
  minimize: <MinimizeSVG />,
  pin: <PinSVG />,
  package: <PackageSVG />,
  cloud: <CloudSVG />,
  folderClose: <FolderSVG />,
  folderOpen: <FolderOpenSVG />,
  file: <FileSVG />,
};
type SVGType = keyof typeof svgMap;

export function Icon({ type, color, className }: { type: SVGType; color?: string; className?: string }) {
  return <span className={classNames('icon', className, color)}>{svgMap[type]}</span>;
}
