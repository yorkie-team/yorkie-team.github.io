import { ReactElement } from 'react';
import Link from 'next/link';
import LogoSVG from '@/public/assets/icons/logo_horizontal_s.svg';

export function Footer({ shortFooter }: { shortFooter?: boolean }): ReactElement {
  if (shortFooter) {
    return (
      <footer className='footer_service'>
        <p className='copyright'>Copyright © 2022 Yorkie</p>
      </footer>
    );
  }

  return (
    <footer className='footer_service'>
      <div className='footer_inner'>
        <div className='box_info'>
          <strong className='logo'>
            <Link href='/' className='link'>
              <LogoSVG />
            </Link>
          </strong>
          <p className='copyright'>Copyright © 2022 Yorkie</p>
        </div>
        <div className='box_site'>
          <div className='site'>
            <strong className='title'>
              <a href='#' className='link'>
                Products
              </a>
            </strong>
            <ul className='site_list'>
              <li className='site_item'>
                <a href='#' className='link'>
                  Document
                </a>
              </li>
              <li className='site_item'>
                <a href='#' className='link'>
                  Presence
                </a>
              </li>
              <li className='site_item'>
                <a href='#' className='link'>
                  Yorkie House
                </a>
              </li>
            </ul>
          </div>
          <div className='site'>
            <strong className='title'>
              <Link href='/docs' className='link'>
                Documentation
              </Link>
            </strong>
            <ul className='site_list'>
              <li className='site_item'>
                <Link href='/docs' className='link'>
                  About Yorkie
                </Link>
              </li>
              <li className='site_item'>
                <Link href='/docs/quick-start' className='link'>
                  Quick Start
                </Link>
              </li>
              <li className='site_item'>
                <Link href='/docs/js-sdk' className='link'>
                  JS SDK
                </Link>
              </li>
              <li className='site_item'>
                <Link href='/docs/ios-sdk' className='link'>
                  iOS SDK
                </Link>
              </li>
              <li className='site_item'>
                <Link href='/docs/android-sdk' className='link'>
                  Android SDK
                </Link>
              </li>
              <li className='site_item'>
                <Link href='/docs/project' className='link'>
                  Project
                </Link>
              </li>
            </ul>
          </div>
          <div className='site'>
            <strong className='title'>
              <Link href='/examples' className='link'>
                Examples
              </Link>
            </strong>
            <ul className='site_list'>
              <li className='site_item'>
                <Link href='/examples' className='link'>
                  Basic examples
                </Link>
              </li>
              <li className='site_item'>
                <Link href='/examples' className='link'>
                  Scenario examples
                </Link>
              </li>
            </ul>
          </div>
          <div className='site'>
            <strong className='title'>
              <Link href='#' className='link'>
                Community
              </Link>
            </strong>
            <ul className='site_list'>
              <li className='site_item'>
                <Link href='https://discord.gg/MVEAwz9sBy' className='link'>
                  Discord
                </Link>
              </li>
              <li className='site_item'>
                <Link href='https://github.com/yorkie-team' className='link'>
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
