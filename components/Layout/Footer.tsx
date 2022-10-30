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
                Product
              </a>
            </strong>
            <ul className='site_list'>
              <li className='site_item'>
                <a href='#' className='link'>
                  Yorkie SDK
                </a>
              </li>
              <li className='site_item'>
                <a href='#' className='link'>
                  Yorkie house
                </a>
              </li>
              <li className='site_item'>
                <a href='#' className='link'>
                  Open source package
                </a>
              </li>
            </ul>
          </div>
          <div className='site'>
            <strong className='title'>
              <a href='#' className='link'>
                Documentation
              </a>
            </strong>
            <ul className='site_list'>
              <li className='site_item'>
                <a href='#' className='link'>
                  About Yorkie
                </a>
              </li>
              <li className='site_item'>
                <a href='#' className='link'>
                  Getting started
                </a>
              </li>
              <li className='site_item'>
                <a href='#' className='link'>
                  Tasks
                </a>
              </li>
              <li className='site_item'>
                <a href='#' className='link'>
                  Tutorials
                </a>
              </li>
              <li className='site_item'>
                <a href='#' className='link'>
                  Agent Commands (CLI)
                </a>
              </li>
              <li className='site_item'>
                <a href='#' className='link'>
                  References
                </a>
              </li>
            </ul>
          </div>
          <div className='site'>
            <strong className='title'>
              <a href='#' className='link'>
                Example
              </a>
            </strong>
            <ul className='site_list'>
              <li className='site_item'>
                <a href='#' className='link'>
                  Basic examples
                </a>
              </li>
              <li className='site_item'>
                <a href='#' className='link'>
                  Scenario examples
                </a>
              </li>
            </ul>
          </div>
          <div className='site'>
            <strong className='title'>
              <a href='#' className='link'>
                Community
              </a>
            </strong>
            <ul className='site_list'>
              <li className='site_item'>
                <a href='#' className='link'>
                  Slack
                </a>
              </li>
              <li className='site_item'>
                <a href='#' className='link'>
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
