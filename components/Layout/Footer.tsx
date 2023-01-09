import { ReactElement } from 'react';
import Link from 'next/link';
import LogoSVG from '@/public/assets/icons/logo_horizontal_s.svg';
import { ThemeDropdown } from './ThemeDropdown';

const fullYear = new Date(process.env.NEXT_PUBLIC_BUILT_AT!).getFullYear();
export function Footer({ shortFooter }: { shortFooter?: boolean }): ReactElement {
  if (shortFooter) {
    return (
      <footer className="footer_service">
        <p className="copyright">Copyright © {fullYear} Yorkie</p>
      </footer>
    );
  }

  return (
    <footer className="footer_service">
      <div className="footer_inner">
        <div className="box_info">
          <strong className="logo">
            <Link href="/" className="link">
              <LogoSVG />
            </Link>
          </strong>
          <p className="copyright">Copyright &copy; {fullYear} Yorkie</p>
          <div className="filter">
            <div className="filter_list">
              <div className="filter_item">
                <ThemeDropdown />
              </div>
            </div>
          </div>
        </div>
        <div className="box_site">
          <div className="site">
            <strong className="title">
              <Link href="/products" className="link">
                Products
              </Link>
            </strong>
            <ul className="site_list">
              <li className="site_item">
                <Link href="/products#document-and-presence" className="link">
                  Document and Presence
                </Link>
              </li>
              <li className="site_item">
                <Link href="/products#dashboard" className="link">
                  Dashboard
                </Link>
              </li>
              <li className="site_item">
                <Link href="/products#self-hosted-server" className="link">
                  Self-hosted server
                </Link>
              </li>
            </ul>
          </div>
          <div className="site">
            <strong className="title">
              <Link href="/docs" className="link">
                Documentation
              </Link>
            </strong>
            <ul className="site_list">
              <li className="site_item">
                <Link href="/docs" className="link">
                  About Yorkie
                </Link>
              </li>
              <li className="site_item">
                <Link href="/docs/getting-started" className="link">
                  Getting Started
                </Link>
              </li>
              <li className="site_item">
                <Link href="/docs/js-sdk" className="link">
                  JS SDK
                </Link>
              </li>
              <li className="site_item">
                <Link href="/docs/ios-sdk" className="link">
                  iOS SDK
                </Link>
              </li>
              <li className="site_item">
                <Link href="/docs/android-sdk" className="link">
                  Android SDK
                </Link>
              </li>
            </ul>
          </div>
          <div className="site">
            <strong className="title">
              <Link href="/examples" className="link">
                Examples
              </Link>
            </strong>
            <ul className="site_list">
              <li className="site_item">
                <Link href="/examples/kanban" className="link">
                  Kanban Board
                </Link>
              </li>
              <li className="site_item">
                <Link href="/examples/profile-stack" className="link">
                  Profile Stack
                </Link>
              </li>
              <li className="site_item">
                <Link href="/examples/todomvc" className="link">
                  TodoMVC
                </Link>
              </li>
              <li className="site_item">
                <Link href="/examples/codemirror" className="link">
                  CodeMirror
                </Link>
              </li>
              <li className="site_item">
                <Link href="/examples/tldraw" className="link">
                  tldraw
                </Link>
              </li>
            </ul>
          </div>
          <div className="site">
            <strong className="title">
              <Link href="/community" className="link">
                Community
              </Link>
            </strong>
            <ul className="site_list">
              <li className="site_item">
                <Link href="https://discord.gg/MVEAwz9sBy" className="link" target="_blank" rel="noreferrer">
                  Discord
                </Link>
              </li>
              <li className="site_item">
                <Link href="https://github.com/yorkie-team" className="link" target="_blank" rel="noreferrer">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
