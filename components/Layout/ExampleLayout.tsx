import { ReactElement, ReactNode, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';
import { Button, Icon } from '@/components';
import { useCurrentExample } from '@/components/exampleView/currentExample';
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
  const example = useCurrentExample();
  // Replace the site-wide defaults from _app.tsx (same keys) so a shared link
  // shows the example itself. Pages outside the catalog keep the defaults
  // except for the title.
  const ogTitle = `${example?.title ?? breadcrumbTitle} · Yorkie Examples`;
  const ogURL = example ? `${process.env.NEXT_PUBLIC_SITE_URL}/examples/${example.id}` : undefined;

  return (
    <div className="wrap examples_view_page">
      <Head>
        <meta key="og:title" property="og:title" content={ogTitle} />
        <meta key="twitter:title" property="twitter:title" content={ogTitle} />
        {example && <meta key="description" name="description" content={example.desc} />}
        {example && <meta key="og:description" property="og:description" content={example.desc} />}
        {example && <meta key="twitter:description" property="twitter:description" content={example.desc} />}
        {ogURL && <meta key="og:url" property="og:url" content={ogURL} />}
      </Head>
      <header className="header_example">
        <nav className="nav">
          <div className="logo">
            <Link href="/">
              <LogoGnbSVG />
              <span className="blind">Yorkie</span>
            </Link>
          </div>
          <span className="nav_text">
            <Link href="/examples">Examples</Link>
          </span>
          <h1 className="nav_text">{breadcrumbTitle}</h1>
        </nav>
      </header>
      <main className="container">{children({ viewType })}</main>
    </div>
  );
}
