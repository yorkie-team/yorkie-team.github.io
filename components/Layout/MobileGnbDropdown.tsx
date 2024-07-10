import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button, Box, Menu, Link, Icon, Icons, Flex, Text } from 'yorkie-ui';
import React from 'react';

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
    <Box>
      <Box
        width="12"
        padding="4"
        cursor="pointer"
        display={{ base: 'block', lg: 'none' }}
        onClick={() => setGnbOpened(!gnbOpened)}
        stroke="neutral.12"
        className="fillSVG"
      >
        {gnbOpened ? <Icons.IconClose /> : <Icons.IconGnbMenu />}
      </Box>
      <Flex
        display={gnbOpened ? 'flex' : 'none'}
        marginTop="4"
        flexDirection="column"
        position="absolute"
        width="100w"
        left="0"
        background="neutral.2"
        height="100vh"
      >
        <Link
          href="/products"
          bg={asPath?.split('#')[0] === '/products' ? 'orange.default' : 'white.11'}
          paddingBlock="3"
          paddingInline="8"
        >
          <span>Products</span>
        </Link>
        <Box paddingRight="6">
          <Flex
            alignItems="center"
            fontWeight="medium"
            onClick={() => setDocsMenuOpened(!docsMenuOpened)}
            cursor="pointer"
          >
            <Icon
              icon={docsMenuOpened ? <Icons.IconArrow /> : <Icons.IconChevRight />}
              paddingInline="2"
              size="2xl"
              stroke="neutral.12"
            />
            <Text>Document</Text>
          </Flex>
          <Box display={docsMenuOpened ? 'block' : 'none'}>
            <Link
              href="/docs"
              color={asPath?.split('#')[0] === '/docs' ? 'orange.default' : 'white.11'}
              paddingBlock="3"
              paddingInline="8"
              fontSize="sm"
              display="block"
            >
              <span>About Yorkie</span>
            </Link>
            <Link
              href="/docs/getting-started"
              color={asPath?.startsWith(`/docs/getting-started`) ? 'orange.default' : 'white.11'}
              paddingBlock="3"
              paddingInline="8"
              fontSize="sm"
              display="block"
            >
              <span>Getting Started</span>
            </Link>
            <Link
              href="/docs/js-sdk"
              color={asPath?.startsWith(`/docs/js-sdk`) ? 'orange.default' : 'white.11'}
              paddingBlock="3"
              paddingInline="8"
              fontSize="sm"
              display="block"
            >
              <span>JS SDK</span>
            </Link>
            <Link
              href="/docs/ios-sdk"
              color={asPath?.startsWith(`/docs/ios-sdk`) ? 'orange.default' : 'white.11'}
              paddingBlock="3"
              paddingInline="8"
              fontSize="sm"
              display="block"
            >
              <span>iOS SDK</span>
            </Link>
            <Link
              href="/docs/android-sdk"
              color={asPath?.startsWith(`docs/android-sdk`) ? 'orange.default' : 'white.11'}
              paddingBlock="3"
              paddingInline="8"
              fontSize="sm"
              display="block"
            >
              <span>Android SDK</span>
            </Link>
            <Link
              href="/docs/devtools"
              color={asPath?.startsWith(`/docs/devtools`) ? 'orange.default' : 'white.11'}
              paddingBlock="3"
              paddingInline="8"
              fontSize="sm"
              display="block"
            >
              <span>Devtools</span>
            </Link>
            <Link
              href="/docs/cli"
              color={asPath?.startsWith(`/docs/cli`) ? 'orange.default' : 'white.11'}
              paddingBlock="3"
              paddingInline="8"
              fontSize="sm"
              display="block"
            >
              <span>CLI</span>
            </Link>
            <Link
              href="/docs/self-hosted-server"
              color={asPath?.startsWith(`/docs/self-hosted-server`) ? 'orange.default' : 'white.11'}
              paddingBlock="3"
              paddingInline="8"
              fontSize="sm"
              display="block"
            >
              <span>Self-Hosted Server</span>
            </Link>
            <Link
              href="/docs/internals"
              color={asPath?.startsWith(`/docs/internals`) ? 'orange.default' : 'white.11'}
              paddingBlock="3"
              paddingInline="8"
              fontSize="sm"
              display="block"
            >
              <span>Internals</span>
            </Link>
          </Box>
        </Box>
        <Link
          paddingInline="8"
          href="/examples"
          bg={asPath?.split('#')[0] === '/examples' ? 'orange.default' : 'white.11'}
          paddingBlock="3"
        >
          <span>Example</span>
        </Link>
        <Link
          paddingInline="8"
          href="/community"
          bg={asPath?.split('#')[0] === '/community' ? 'orange.default' : 'white.11'}
          paddingBlock="3"
        >
          <span>Community</span>
        </Link>
        <Box borderWidth="1px" borderColor="gray.5" borderTop="none" borderInline="none" />
        {isLoggedIn ? (
          <Link
            href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}
            bg={asPath?.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}` ? 'orange.default' : 'white.11'}
            paddingBlock="3"
            paddingInline="8"
          >
            <span>Dashboard</span>
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
              paddingInline="8"
            >
              <span>Sign in</span>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`}
              bg={
                asPath?.split('#')[0] === `${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`
                  ? 'orange.default'
                  : 'white.11'
              }
              paddingBlock="3"
              paddingInline="8"
            >
              <span>Start for free</span>
            </Link>
          </>
        )}
      </Flex>
    </Box>
  );
}
