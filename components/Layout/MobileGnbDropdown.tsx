import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { Button, Menu, Link } from 'yorkie-ui';
import React from 'react';
import { GnbMenuIcon } from '@/components/Icons/Icons';

export function MobileGnbDropdown({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [gnbOpened, setGnbOpened] = useState(false);
  const [docsMenuOpened, setDocsMenuOpened] = useState(false);
  const asPath = usePathname();

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
    <Menu.Root>
      <Menu.Trigger>
        <Button
          variant="ghost"
          icon={<GnbMenuIcon />}
          position="start"
          display={{ base: !gnbOpened ? 'block' : 'none', lg: 'none' }}
        />
        <Button
          variant="ghost"
          icon={<GnbMenuIcon />}
          position="start"
          display={{ base: gnbOpened ? 'block' : 'none', lg: 'none' }}
        />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item id="products" width="screen">
            <Link
              href="/products"
              className={classNames('dropdown_menu', { is_active: asPath.split('#')[0] === '/products' })}
            >
              <span className="dropdown_text">Products</span>
            </Link>
          </Menu.Item>
          <Menu.Item id="example">
            <Link
              href="/products"
              className={classNames('dropdown_menu', { is_active: asPath.split('#')[0] === '/products' })}
            >
              <span className="dropdown_text">Example</span>
            </Link>
          </Menu.Item>
          <Menu.Item id="community">
            <Link
              href="/community"
              className={classNames('dropdown_menu', { is_active: asPath.split('#')[0] === '/community' })}
            >
              <span className="dropdown_text">Community</span>
            </Link>
          </Menu.Item>
          <Menu.Separator />
          {isLoggedIn ? (
            <Menu.Item id="dashboard">
              <Link
                href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}
                className={classNames('dropdown_menu', {
                  is_active: asPath.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`,
                })}
              >
                <span className="dropdown_text">Dashboard</span>
              </Link>
            </Menu.Item>
          ) : (
            <>
              <Menu.Item id="sign-in">
                <Link
                  href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/login`}
                  className={classNames('dropdown_menu', {
                    is_active: asPath.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/login`,
                  })}
                >
                  <span className="dropdown_text">Sign in</span>
                </Link>
              </Menu.Item>
              <Menu.Item id="startForFree">
                <Link
                  href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`}
                  className={classNames('dropdown_menu', {
                    is_active: asPath.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`,
                  })}
                >
                  <span className="dropdown_text">Start for free</span>
                </Link>
              </Menu.Item>
            </>
          )}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
