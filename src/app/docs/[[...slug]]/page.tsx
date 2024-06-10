'use client';

import MdxLayout from '@/src/mdx-layout';
import { tutorials } from '@/docs';
import { Grid, Box, GridItem, Container, Link, Icon, ChevronRightIcon, DownIcon, Flex, Text } from 'yorkie-ui';
import Head from 'next/head';
import { useEffect, useState } from 'react';

interface OpenSubMenusState {
  [key: string]: boolean;
}

const Nav = ({ slug }: { slug: string[] }) => {
  const [openSubMenus, setOpenSubMenus] = useState<OpenSubMenusState>({});

  const toggleSubMenu = (key: string) => {
    setOpenSubMenus((prevOpenSubMenus) => ({
      ...prevOpenSubMenus,
      [key]: !prevOpenSubMenus[key],
    }));
  };

  return Object.entries(tutorials).map(([key, value]) => {
    const { title, href, subMenu }: any = value;
    const isHref = !subMenu && { href: '/docs/' + href };
    return (
      <Box key={key}>
        <Link
          {...isHref}
          marginLeft="7"
          fontWeight="semibold"
          fontSize="lg"
          color={!subMenu && slug[0] == href ? 'orange.default' : 'black'}
          marginBottom={openSubMenus[key] ? '6' : '8'}
          onClick={(e) => {
            if (subMenu) {
              e.preventDefault();
              toggleSubMenu(key);
            }
          }}
        >
          {!subMenu ? '' : openSubMenus[key] ? <DownIcon stroke="black" /> : <ChevronRightIcon />}{' '}
          <Text marginLeft={!subMenu ? '7' : '0'}>{title}</Text>
        </Link>
        {(slug[0] == href || openSubMenus[key]) &&
          subMenu &&
          Object.entries(subMenu).length > 0 &&
          Object.entries(subMenu).map(([keySub, val]) => (
            <Link
              key={keySub}
              href={href + '/' + val?.href}
              marginLeft="14"
              marginBottom="6"
              fontSize="sm"
              fontWeight="semibold"
              color={slug[slug.length - 1] === val?.href ? 'orange.default' : 'gray.11'}
            >
              {val?.title}
            </Link>
          ))}
      </Box>
    );
  });
};

export default function Docs({ params }: { params: { slug: string[] } }) {
  const activeTutorial = tutorials[params.slug[0]];
  const contentSubmenu = activeTutorial?.subMenu && activeTutorial?.subMenu[params.slug[params.slug.length - 1]];
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <MdxLayout>
      <Head>
        <title>Documentation · Yorkie</title>
      </Head>
      <Container
        margin="auto"
        width={{ sm: 'breakpoint-sm', md: 'breakpoint-md', lg: 'breakpoint-lg', xl: 'breakpoint-2xl' }}
      >
        <Grid
          gap={4}
          gridTemplateColumns={{ base: 0, lg: 6 }}
          paddingBlock="20"
          display={{ base: 'block', lg: 'grid' }}
        >
          <GridItem gridColumn={1}>
            <ul className="navigator_list">
              <Nav slug={params.slug} />
            </ul>
          </GridItem>
          <GridItem gridColumn={4}>
            {activeTutorial?.subMenu && params.slug.length > 1 ? contentSubmenu?.component : activeTutorial.component}
          </GridItem>
          <GridItem gridColumn={1}>hi</GridItem>
        </Grid>
      </Container>
    </MdxLayout>
  );
}
