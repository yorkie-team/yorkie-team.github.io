import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Icon, Popover } from '@/components';
import LogoSVG from '@/public/assets/icons/logo_horizontal_xs.svg';
import LogoGnbSVG from '@/public/assets/icons/logo_gnb.svg';

export function Header({
  gnbPageName,
}: {
  gnbPageName?: 'Products' | 'Documentation' | 'Examples' | 'Community';
}): ReactElement {
  const { pathname } = useRouter();

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
          <Button as="link" href="/login" outline className="gray50">
            Login
          </Button>
          <Button as="link" href="/signup" className="orange_0" icon={<Icon type="star" />}>
            Start for free
          </Button>
          <Popover>
            <Popover.Target>
              <button className="btn_uiil_menu">
                <span className="blind">Open menu</span>
                <Icon type="gnbMenu" className="icon_menu" />
              </button>
            </Popover.Target>
            <Popover.Dropdown>
              <div className="util_list_mo dropdown shadow_m">
                <ul className="dropdown_list">
                  <li className="dropdown_item">
                    <Link href="/products" className="dropdown_menu">
                      <span className="dropdown_text">Products</span>
                    </Link>
                  </li>
                  <li className="dropdown_item">
                    <Link href="/docs" className="dropdown_menu">
                      <span className="dropdown_text">Documentation</span>
                    </Link>
                  </li>
                  <li className="dropdown_item">
                    <Link href="/examples" className="dropdown_menu">
                      <span className="dropdown_text">Examples</span>
                    </Link>
                  </li>
                  <li className="dropdown_item">
                    <Link href="/community" className="dropdown_menu">
                      <span className="dropdown_text">Community</span>
                    </Link>
                  </li>
                  <li className="dropdown_item has_border">
                    <Link href="/login" className="dropdown_menu">
                      <span className="dropdown_text">Login</span>
                    </Link>
                  </li>
                  <li className="dropdown_item">
                    <Link href="/signup" className="dropdown_menu">
                      <span className="dropdown_text">Start for free</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>
      </div>
    </header>
  );
}
