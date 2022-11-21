import { ReactElement, ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import classNames from 'classnames';

export function Layout({
  className,
  gnbPageName,
  children,
  shortFooter,
}: {
  className?: string;
  gnbPageName?: 'Products' | 'Documentation' | 'Examples' | 'Community';
  children: ReactNode;
  shortFooter?: boolean;
}): ReactElement {
  return (
    <>
      <div className={classNames('wrap', className)}>
        <Header gnbPageName={gnbPageName} />
        <main className="container">{children}</main>
        <Footer shortFooter={shortFooter} />
      </div>
    </>
  );
}
