import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LogoSVG from '@/public/assets/icons/logo_horizontal_xs.svg';
import StarsSVG from '@/public/assets/icons/icon_stars.svg';

export function Header(): ReactElement {
  const { pathname } = useRouter();
  return (
    <header className='header_service'>
      <div className='header_inner'>
        <h1 className='logo'>
          <Link href='/'>
            <LogoSVG />
            <span className='blind'>Yorkie</span>
          </Link>
        </h1>
        <nav className='nav'>
          <ul className='gnb'>
            <li className={`gnb_item ${pathname == '/' ? 'is_active' : ''}`}>
              <Link href='/' className='link'>
                Products
              </Link>
            </li>
            <li className={`gnb_item ${pathname == '/docs/[[...slug]]' ? 'is_active' : ''}`}>
              <Link href='/docs' className='link'>
                Documentation
              </Link>
            </li>
            <li className={`gnb_item ${pathname == '/examples' ? 'is_active' : ''}`}>
              <Link href='/examples' className='link'>
                Examples
              </Link>
            </li>
            <li className={`gnb_item ${pathname == '/community' ? 'is_active' : ''}`}>
              <Link href='/community' className='link'>
                Community
              </Link>
            </li>
          </ul>
        </nav>
        <div className='header_util'>
          <Link href='#' className='btn btn_line gray50'>
            Login
          </Link>
          <Link href='#' className='btn orange_0'>
            <span className='icon'>
              <StarsSVG />
            </span>
            <span className='text'>Start for free</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
