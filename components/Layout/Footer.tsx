import { ReactElement, useEffect, useState } from 'react';
import { Link, Box, Grid, GridItem, Container, Text, Flex, Icon, Icons, Select } from 'yorkie-ui';
import React from 'react';
import { ThemeOption, useTheme } from '@/hooks/useTheme';

const fullYear = new Date(process.env.NEXT_PUBLIC_BUILT_AT!).getFullYear();
export function Footer({ shortFooter }: { shortFooter?: boolean }): ReactElement {
  const { setTheme } = useTheme();
  const [themeOption, setThemeOption] = useState<ThemeOption>('system');
  useEffect(() => {
    const themeOption = (window.localStorage.getItem('theme') || 'system') as ThemeOption;
    setThemeOption(themeOption);
  }, [setTheme]);

  if (shortFooter) {
    return (
      <Flex
        justifyContent="center"
        background="gray.a2"
        paddingBlock={{ base: '4', lg: '6' }}
        paddingInline={{ base: '6', lg: '0' }}
      >
        <Text textAlign="center">Copyright © {fullYear} Yorkie</Text>
      </Flex>
    );
  }

  const setThemeSelect = (value: any) => {
    setThemeOption(value.value);
    setTheme(value.value);
  };
  const items = [
    { label: 'Dark', value: 'dark' },
    { label: 'Light', value: 'light' },
  ];
  return (
    <footer>
      <Box background="gray.a2" paddingInline={{ base: '6', lg: '0' }} className="footer">
        <Container
          margin="auto"
          width={{ sm: 'breakpoint-sm', md: 'breakpoint-md', lg: 'breakpoint-lg', xl: 'breakpoint-xl' }}
        >
          <Grid
            gap={4}
            gridTemplateColumns={{ base: 0, lg: 6 }}
            paddingBlock="20"
            display={{ base: 'block', lg: 'grid' }}
          >
            <GridItem gridColumnStart={1} gridColumnEnd={3}>
              <Link href="/" fontSize="9xl" height="6" className="logo">
                <Icons.IconLogoHorizontalL />
              </Link>
              <Text color="neutral.a12" fontSize="sm" marginBottom="4">
                Copyright &copy; {fullYear} Yorkie
              </Text>
              <Select.Root positioning={{ sameWidth: true }} items={items} width="fit" background="neutral.1">
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={`Theme: ${themeOption == 'dark' ? 'Dark' : 'Light'}`} />
                    <Icon icon={<Icons.IconArrow />} stroke="neutral.10" size="sm" />
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    <Select.ItemGroup id="framework">
                      {items.map((item) => (
                        <Select.Item onClick={(e) => setThemeSelect(item)} key={item.value} item={item}>
                          <Select.ItemText>{item.label}</Select.ItemText>
                          <Select.ItemIndicator>
                            <Icon icon={<Icons.IconArrow />} stroke="neutral.10" size="sm" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.ItemGroup>
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </GridItem>
            <GridItem gridColumnStart={3} gridColumnEnd={4} display="grid" marginTop={{ base: 20, lg: 0 }}>
              <Flex direction="column" gap="6">
                <Link href="/products" fontSize="lg" fontWeight="semibold">
                  Products
                </Link>
                <Link href="/products#document-and-presence" fontSize="sm">
                  Document and Presence
                </Link>
                <Link href="/products#dashboard" fontSize="sm">
                  Dashboard
                </Link>
                <Link href="/products#self-hosted-server" fontSize="sm">
                  Self-hosted server
                </Link>
              </Flex>
            </GridItem>
            <GridItem gridColumnStart={7} gridColumnEnd={9} display="grid" marginTop={{ base: 20, lg: 0 }}>
              <Flex direction="column" gap="6">
                <Link href="/docs" fontSize="lg" fontWeight="semibold">
                  Documentation
                </Link>
                <Link href="/docs" fontSize="sm">
                  About Yorkie
                </Link>
                <Link href="/docs/getting-started" fontSize="sm">
                  Getting Started
                </Link>
                <Link href="/docs/js-sdk" fontSize="sm">
                  JS SDK
                </Link>
                <Link href="/docs/ios-sdk" fontSize="sm">
                  iOS SDK
                </Link>
                <Link href="/docs/android-sdk" fontSize="sm">
                  Android SDK
                </Link>
              </Flex>
            </GridItem>
            <GridItem gridColumnStart={10} gridColumnEnd={12} display="grid" marginTop={{ base: 20, lg: 0 }}>
              <Flex direction="column" gap="6">
                <Link href="/examples" fontSize="lg" fontWeight="semibold">
                  Examples
                </Link>
                <Link href="/examples/kanban" fontSize="sm">
                  Kanban Board
                </Link>
                <Link href="/examples/profile-stack" fontSize="sm">
                  Profile Stack
                </Link>
                <Link href="/examples/todomvc" fontSize="sm">
                  TodoMVC
                </Link>
                <Link href="/examples/codemirror" fontSize="sm">
                  CodeMirror
                </Link>
                <Link href="/examples/tldraw" fontSize="sm">
                  tldraw
                </Link>
                <Link href="/examples/quill" fontSize="sm">
                  Quill
                </Link>
              </Flex>
            </GridItem>
            <GridItem gridColumnStart={13} gridColumnEnd={15} display="grid" marginTop={{ base: 20, lg: 0 }}>
              <Flex direction="column" gap="6">
                <Link href="/community" fontSize="lg" fontWeight="semibold">
                  Community
                </Link>
                <Link href="https://discord.gg/MVEAwz9sBy" fontSize="sm" target="_blank" rel="noreferrer">
                  Discord
                </Link>
                <Link href="https://github.com/yorkie-team" fontSize="sm" target="_blank" rel="noreferrer">
                  GitHub
                </Link>
              </Flex>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}
