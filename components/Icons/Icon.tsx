import classNames from 'classnames';

import StarSVG from '@/public/assets/icons/icon_stars.svg';
import CopySVG from '@/public/assets/icons/icon_copy.svg';
import BookSVG from '@/public/assets/icons/icon_book.svg';
import BackHomeSVG from '@/public/assets/icons/icon_back_home.svg';
import SlackSVG from '@/public/assets/icons/icon_slack.svg';
import GitHubSVG from '@/public/assets/icons/icon_github.svg';
import GnbMenuSVG from '@/public/assets/icons/icon_gnb_menu.svg';
import CloseSVG from '@/public/assets/icons/icon_close.svg';
import OpenSelectorSVG from '@/public/assets/icons/icon_open_selector.svg';

const svgMap = {
  star: <StarSVG />,
  copy: <CopySVG />,
  book: <BookSVG />,
  backHome: <BackHomeSVG />,
  slack: <SlackSVG />,
  github: <GitHubSVG />,
  gnbMenu: <GnbMenuSVG />,
  close: <CloseSVG />,
  openSelector: <OpenSelectorSVG />,
};
type SVGType = keyof typeof svgMap;

export function Icon({ type, color, className }: { type: SVGType; color?: string; className?: string }) {
  return <span className={classNames('icon', className, color)}>{svgMap[type]}</span>;
}
