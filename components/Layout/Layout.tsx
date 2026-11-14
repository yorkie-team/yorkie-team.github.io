import { ReactElement, ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import classNames from 'classnames';

export function Layout({
  className,
  children,
  shortFooter,
}: {
  className?: string;
  children: ReactNode;
  shortFooter?: boolean;
}): ReactElement {
  return (
    <div className={classNames('wrap', className)}>
      <a href="#content" className="skip_link">
        Skip to content
      </a>
      <Header />
      <main id="content" className="container" tabIndex={-1}>
        {children}
      </main>
      <Footer shortFooter={shortFooter} />
    </div>
  );
}
