import { ReactElement, ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout({
  className,
  children,
  shortFooter,
}: {
  className: string;
  children: ReactNode;
  shortFooter?: boolean;
}): ReactElement {
  return (
    <>
      <div className={`wrap ${className}`}>
        <Header />
        <main className='container'>
          <div className='content'>{children}</div>
        </main>
        <Footer shortFooter={shortFooter} />
      </div>
    </>
  );
}
