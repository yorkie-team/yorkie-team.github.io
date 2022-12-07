import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Icon } from '@/components';
import { isValidToken } from '@/utils/isValidToken';
import { MobileGnbDropdown } from './MobileGnbDropdown';
import LogoSVG from '@/public/assets/icons/logo_horizontal_xs.svg';
import LogoGnbSVG from '@/public/assets/icons/logo_gnb.svg';

export function Header(): ReactElement {
  const { pathname } = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const isLoggedIn = isValidToken(localStorage.getItem('token'));
    setIsLoggedIn(isLoggedIn);
  }, [setIsLoggedIn])

  // TODO(hackerwins): Remove examples condition when examples are ready.
  return (
    <header className="header_service">
      <div className="header_inner">
        <h1 className="logo">
          <Link href="/">
            <LogoSVG />
            <LogoGnbSVG />
            <span className="blind">Yorkie</span>
          </Link>
        </h1>
        <nav className="nav">
          <ul className="gnb">
            <li className={`gnb_item ${pathname == '/products' ? 'is_active' : ''}`}>
              <Link href="/products" className="link">
                Products
              </Link>
            </li>
            <li className={`gnb_item ${pathname == '/docs/[[...slug]]' ? 'is_active' : ''}`}>
              <Link href="/docs" className="link">
                Documentation
              </Link>
            </li>
            {
              process.env.NODE_ENV === 'development' && (
                <li className={`gnb_item ${pathname == '/examples' ? 'is_active' : ''}`}>
                  <Link href="/examples" className="link">
                    Examples
                  </Link>
                </li>
              )
            }
            <li className={`gnb_item ${pathname == '/community' ? 'is_active' : ''}`}>
              <Link href="/community" className="link">
                Community
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header_util">
          {
            isLoggedIn ? (
                <Button as="a" href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`} outline className="gray50">
                  Dashboard
                </Button>
            ) : (
              <>
                <Button as="a" href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/login`} outline className="gray50">
                  Sign in
                </Button>
                <Button as="a" href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`} className="orange_0" icon={<Icon type="star" />}>
                  Start for free
                </Button>
              </>
            )
          }
          <MobileGnbDropdown isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </header>
  );
}
