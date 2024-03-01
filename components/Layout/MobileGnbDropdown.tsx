import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import { Popover, Icon } from 'components';

export function MobileGnbDropdown({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [gnbOpened, setGnbOpened] = useState(false);
  const [docsMenuOpened, setDocsMenuOpened] = useState(false);
  const { asPath } = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setGnbOpened(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Popover opened={gnbOpened} onChange={setGnbOpened}>
      <Popover.Target>
        <button className="btn_menu">
          <span className="blind">Open menu</span>
          <Icon type="gnbMenu" className={classNames('icon_menu', { is_active: !gnbOpened })} />
          <Icon type="close" className={classNames('icon_close', { is_active: gnbOpened })} />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="menu_list_mo dropdown">
          <ul className="dropdown_list">
            <li className="dropdown_item">
              <Link
                href="/products"
                className={classNames('dropdown_menu', { is_active: asPath.split('#')[0] === '/products' })}
                legacyBehavior>
                <span className="dropdown_text">Products</span>
              </Link>
            </li>
            <li className="dropdown_item">
              <button
                type="button"
                className={classNames('dropdown_menu', 'btn_docs', { is_show: docsMenuOpened })}
                onClick={() => {
                  setDocsMenuOpened((opened) => !opened);
                }}
              >
                <Icon type="arrow" className="icon_toggle" />
                <span className="dropdown_text">Documentation</span>
              </button>
              <nav
                className="navigator"
                onClick={() => {
                  setGnbOpened(false);
                }}
              >
                <ul className="navigator_list">
                  <li className="navigator_group">
                    <Link
                      href="/docs"
                      className={classNames('navigator_item', 'add_icon', {
                        is_active: asPath.split('#')[0] === '/docs',
                      })}
                    >
                      About Yorkie
                    </Link>
                  </li>
                  <li className="navigator_group">
                    <Link
                      href="/docs/getting-started"
                      className={classNames('navigator_item', 'add_icon', {
                        is_active: asPath.startsWith(`/docs/getting-started`),
                      })}
                    >
                      Getting Started
                    </Link>
                  </li>
                  <li className="navigator_group">
                    <Link
                      href="/docs/js-sdk"
                      className={classNames('navigator_item', 'add_icon', {
                        is_active: asPath.startsWith(`/docs/js-sdk`),
                      })}
                    >
                      JS SDK
                    </Link>
                  </li>
                  <li className="navigator_group">
                    <Link
                      href="/docs/ios-sdk"
                      className={classNames('navigator_item', 'add_icon', {
                        is_active: asPath.startsWith(`/docs/ios-sdk`),
                      })}
                    >
                      iOS SDK
                    </Link>
                  </li>
                  <li className="navigator_group">
                    <Link
                      href="/docs/android-sdk"
                      className={classNames('navigator_item', 'add_icon', {
                        is_active: asPath.startsWith(`/docs/android-sdk`),
                      })}
                    >
                      Android SDK
                    </Link>
                  </li>
                  <li className="navigator_group">
                    <Link
                      href="/docs/devtools"
                      className={classNames('navigator_item', 'add_icon', {
                        is_active: asPath.startsWith(`/docs/devtools`),
                      })}
                    >
                      Devtools
                    </Link>
                  </li>
                  <li className="navigator_group">
                    <Link
                      href="/docs/cli"
                      className={classNames('navigator_item', 'add_icon', {
                        is_active: asPath.startsWith(`/docs/cli`),
                      })}
                    >
                      CLI
                    </Link>
                  </li>
                  <li className="navigator_group">
                    <Link
                      href="/docs/self-hosted-server"
                      className={classNames('navigator_item', 'add_icon', {
                        is_active: asPath.startsWith(`/docs/self-hosted-server`),
                      })}
                    >
                      Self-Hosted Server
                    </Link>
                  </li>
                  <li className="navigator_group">
                    <Link
                      href="/docs/internals"
                      className={classNames('navigator_item', 'add_icon', {
                        is_active: asPath.startsWith(`/docs/internals`),
                      })}
                    >
                      Internals
                    </Link>
                  </li>
                </ul>
              </nav>
            </li>
            <li className="dropdown_item">
              <Link
                href="/examples"
                className={classNames('dropdown_menu', { is_active: asPath.split('#')[0] === '/examples' })}
                legacyBehavior>
                <span className="dropdown_text">Examples</span>
              </Link>
            </li>
            <li className="dropdown_item">
              <Link
                href="/community"
                className={classNames('dropdown_menu', { is_active: asPath.split('#')[0] === '/community' })}
                legacyBehavior>
                <span className="dropdown_text">Community</span>
              </Link>
            </li>
          </ul>
          <ul className="dropdown_list">
            {isLoggedIn ? (
              <li className="dropdown_item">
                <a
                  href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}
                  className={classNames('dropdown_menu', {
                    is_active: asPath.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`,
                  })}
                >
                  <span className="dropdown_text">Dashboard</span>
                </a>
              </li>
            ) : (
              <>
                <li className="dropdown_item">
                  <a
                    href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/login`}
                    className={classNames('dropdown_menu', {
                      is_active: asPath.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/login`,
                    })}
                  >
                    <span className="dropdown_text">Sign in</span>
                  </a>
                </li>
                <li className="dropdown_item">
                  <a
                    href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`}
                    className={classNames('dropdown_menu', {
                      is_active: asPath.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`,
                    })}
                  >
                    <span className="dropdown_text">Start for free</span>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
