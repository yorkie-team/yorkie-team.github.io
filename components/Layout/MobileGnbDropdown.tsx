import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { Button, Box, Menu, Link, IconGnbMenu, IconClose, Flex } from 'yorkie-ui';
import React from 'react';

export function MobileGnbDropdown({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [gnbOpened, setGnbOpened] = useState(false);
  const [docsMenuOpened, setDocsMenuOpened] = useState(false);
  const asPath = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setGnbOpened(false);
        setDocsMenuOpened(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box>
      <Box
        width="12"
        padding="4"
        display={{ base: 'block', lg: 'none' }}
        onClick={() => setDocsMenuOpened(!docsMenuOpened)}
      >
        {gnbOpened ? <IconClose /> : <IconGnbMenu />}
      </Box>
      <Flex
        display={docsMenuOpened ? 'flex' : 'none'}
        marginTop="4"
        flexDirection="column"
        position="absolute"
        width="100w"
        left="0"
        background="neutral.2"
      >
        <Link
          href="/products"
          bg={asPath?.split('#')[0] === '/products' ? 'orange.default' : 'white.11'}
          paddingBlock="3"
          paddingInline="6"
        >
          <span className="dropdown_text">Products</span>
        </Link>
        <Link
          paddingInline="6"
          href="/examples"
          bg={asPath?.split('#')[0] === '/examples' ? 'orange.default' : 'white.11'}
          paddingBlock="3"
        >
          <span className="dropdown_text">Example</span>
        </Link>
        <Link
          paddingInline="6"
          href="/community"
          bg={asPath?.split('#')[0] === '/community' ? 'orange.default' : 'white.11'}
          paddingBlock="3"
        >
          <span className="dropdown_text">Community</span>
        </Link>
        {isLoggedIn ? (
          <Link
            href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}
            bg={asPath?.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}` ? 'orange.default' : 'white.11'}
            paddingBlock="3"
            paddingInline="6"
          >
            <span className="dropdown_text">Dashboard</span>
          </Link>
        ) : (
          <>
            <Link
              href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/login`}
              bg={
                asPath?.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/login`
                  ? 'orange.default'
                  : 'white.11'
              }
              paddingBlock="3"
              paddingInline="6"
            >
              <span className="dropdown_text">Sign in</span>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`}
              bg={
                asPath?.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`
                  ? 'orange.default'
                  : 'white.11'
              }
              paddingBlock="3"
              paddingInline="6"
            >
              <span className="dropdown_text">Start for free</span>
            </Link>
          </>
        )}
      </Flex>
    </Box>
  );
}
