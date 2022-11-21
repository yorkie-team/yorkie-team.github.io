import classNames from 'classnames';

import StarSVG from '@/public/assets/icons/icon_stars.svg';
import CopySVG from '@/public/assets/icons/icon_copy.svg';
import BookSVG from '@/public/assets/icons/icon_book.svg';

const svgMap = {
  star: <StarSVG />,
  copy: <CopySVG />,
  book: <BookSVG />,
};
type SVGType = keyof typeof svgMap;

export function Icon({ type, color, className }: { type: SVGType; color?: string; className?: string }) {
  return <span className={classNames('icon', className, color)}>{svgMap[type]}</span>;
}
