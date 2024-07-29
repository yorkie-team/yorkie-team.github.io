import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Icon } from '@/components';
import { Button, Flex } from 'yorkie-ui-test';
import { isValidToken } from '@/utils/isValidToken';
import { MobileGnbDropdown } from './MobileGnbDropdown';
import LogoSVG from '@/public/assets/icons/logo_horizontal_xs.svg';
import LogoGnbSVG from '@/public/assets/icons/logo_gnb.svg';

export function Header(): ReactElement {
  const { pathname } = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const isLoggedIn = isValidToken(localStorage.getItem('token'));
    setIsLoggedIn(isLoggedIn);
  }, [setIsLoggedIn]);

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
            <li className={`gnb_item ${pathname == '/examples' ? 'is_active' : ''}`}>
              <Link href="/examples" className="link">
                Examples
              </Link>
            </li>
            <li className={`gnb_item ${pathname == '/community' ? 'is_active' : ''}`}>
              <Link href="/community" className="link">
                Community
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header_util">
          <Flex gap="200" hideBelow="md">
            {!!isLoggedIn ? (
              <Button asChild variant="outline" colorPalette="gray">
                <Link href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}>Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" colorPalette="gray">
                  <Link href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/login`}>Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`}>
                    <Icon type="star" />
                    Start for free
                  </Link>
                </Button>
              </>
            )}
          </Flex>
          <MobileGnbDropdown isLoggedIn={!!isLoggedIn} />
        </div>
      </div>
    </header>
  );
}
