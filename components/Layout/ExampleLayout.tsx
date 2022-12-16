import { ReactElement, ReactNode, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Button, Icon } from '@/components';
import LogoGnbSVG from '@/public/assets/icons/logo_gnb.svg';

type ExampleViewType = 'full' | 'show' | 'grid' | 'split';
type ExampleViewIconType = 'viewFull' | 'viewShow' | 'viewGrid' | 'viewSplit';
const exampleViewTypeMap = {
  full: { icon: 'viewFull', label: 'Full View' },
  show: { icon: 'viewShow', label: 'Show View' },
  grid: { icon: 'viewGrid', label: 'Grid View' },
  split: { icon: 'viewSplit', label: 'Split View' },
};

export function ExampleLayout({
  breadcrumbTitle,
  viewTypes = ['full', 'show', 'grid', 'split'],
  defaultViewType = 'full',
  children,
}: {
  breadcrumbTitle: string;
  viewTypes?: Array<ExampleViewType>;
  defaultViewType?: ExampleViewType;
  children(payload: { viewType: ExampleViewType }): ReactNode;
}): ReactElement {
  const [viewType, setViewType] = useState<ExampleViewType>(defaultViewType);

  return (
    <div className="wrap examples_view_page">
      <header className="header_example">
        <nav className="nav">
          <h1 className="logo">
            <Link href="/">
              <LogoGnbSVG />
            </Link>
            <span className="blind">Yorkie</span>
          </h1>
          <span className="nav_text">Yorkie Example</span>
          <span className="nav_text">{breadcrumbTitle}</span>
        </nav>
      </header>
      <main className="container">{children({ viewType })}</main>
    </div>
  );
}
