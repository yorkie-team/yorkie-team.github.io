import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import { Popover, Icon } from 'components';

export function MobileGnbDropdown() {
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

  // TODO(hackerwins): Remove examples condition when examples are ready.
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
              >
                <span className="dropdown_text">Products</span>
              </Link>
            </li>
            <li className="dropdown_item">
              <button
                type="button"
                className={classNames('dropdown_menu', { is_active: docsMenuOpened })}
                onClick={() => {
                  setDocsMenuOpened((opened) => !opened);
                }}
              >
                <span className="dropdown_text">Documentation</span>
                <Icon type="arrow" />
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
                      href="/docs/quick-start"
                      className={classNames('navigator_item', 'add_icon', {
                        is_active: asPath.startsWith(`/docs/quick-start`),
                      })}
                    >
                      Quick Start
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
                      href="/docs/project"
                      className={classNames('navigator_item', 'add_icon', {
                        is_active: asPath.startsWith(`/docs/project`),
                      })}
                    >
                      Project
                    </Link>
                  </li>
                  <li className="navigator_group">
                    <Link
                      href="/docs/server"
                      className={classNames('navigator_item', 'add_icon', {
                        is_active: asPath.startsWith(`/docs/server`),
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
                  <li className="navigator_group">
                    <Link href="/docs/sample" className="navigator_menu is_active">
                      <Icon type="arrow" />
                      Docs-Sample
                    </Link>
                    <ul className="navigator_list">
                      <li className="navigator_group">
                        <Link
                          href="/docs/sample/sample-nested"
                          className={classNames('navigator_item', {
                            is_active: asPath.startsWith(`/docs/sample/sample-nested`),
                          })}
                        >
                          Docs-Sample nested
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </li>
            {
              process.env.NODE_ENV === 'development' && (
                <li className="dropdown_item">
                  <Link
                    href="/examples"
                    className={classNames('dropdown_menu', { is_active: asPath.split('#')[0] === '/examples' })}
                  >
                    <span className="dropdown_text">Example</span>
                  </Link>
                </li>
              )
            }
            <li className="dropdown_item">
              <Link
                href="/community"
                className={classNames('dropdown_menu', { is_active: asPath.split('#')[0] === '/community' })}
              >
                <span className="dropdown_text">Community</span>
              </Link>
            </li>
          </ul>
          <ul className="dropdown_list">
            <li className="dropdown_item">
              <a
                href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/login`}
                className={classNames('dropdown_menu', { is_active: asPath.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/login` })}
              >
                <span className="dropdown_text">Login</span>
              </a>
            </li>
            <li className="dropdown_item">
              <a
                href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`}
                className={classNames('dropdown_menu', { is_active: asPath.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup` })}
              >
                <span className="dropdown_text">Start for free</span>
              </a>
            </li>
          </ul>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
