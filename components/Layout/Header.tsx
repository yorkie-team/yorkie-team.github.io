import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Button, Icon } from '@/components';
import { MobileGnbDropdown } from './MobileGnbDropdown';
import LogoSVG from '@/public/assets/icons/logo_horizontal_xs.svg';
import LogoGnbSVG from '@/public/assets/icons/logo_gnb.svg';

// isValidToken checks if the given token is valid. This function is used to
// check if the token is expired or not.
function isValidToken(token: string | null) {
  if (!token) {
    return false;
  }
  
  const decoded = jwt_decode<JwtPayload>(token);
  const currentTime = new Date().getTime() / 1000;
  if (!decoded || decoded.exp! < currentTime) {
    return false;
  }

  return true
}

export function Header(): ReactElement {
  const { pathname } = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        {
          isLoggedIn ? (
            <div className="header_util">
              <Button as="a" href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`} outline className="gray50">
                Dashboard
              </Button>
            </div>
          ) : (
            <div className="header_util">
              <Button as="a" href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/login`} outline className="gray50">
                Login
              </Button>
              <Button as="a" href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`} className="orange_0" icon={<Icon type="star" />}>
                Start for free
              </Button>
              <MobileGnbDropdown />
            </div>
          )
        }
      </div>
    </header>
  );
}
