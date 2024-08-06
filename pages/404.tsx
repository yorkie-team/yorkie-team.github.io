import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Icon, Layout } from '@/components';
import Error404SVG from '@/public/assets/icons/error_404.svg';
import { Button, Flex } from '@yorkie-ui/core';

const Custom404: NextPage = () => {
  return (
    <Layout className="error_page" shortFooter>
      <Head>
        <title>Page not found · Yorkie</title>
      </Head>
      <div className="content error_404">
        <h2 className="blind">404 : not found</h2>
        <div className="img_box">
          <Error404SVG />
        </div>
        <p className="title">
          Oops! Wait a minute... <br />
          Yorkie ate your request
        </p>
        <p className="desc">
          The page you are looking for might be
          <br className="br_mo" /> removed or is temporarily unavailable.
        </p>
        <Flex order="4" gap="600" mt="800" wrap={{ base: 'wrap', md: 'nowrap' }}>
          <Button asChild size="lg" width={{ base: 'full', md: 'fit' }}>
            <Link href="/">
              <Icon type="backHome" />
              Back to home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" colorPalette="neutral" flex={{ base: '1', md: 'none' }}>
            <Link href="https://discord.gg/MVEAwz9sBy" target="_blank" rel="noreferrer">
              <Icon type="discord" />
              Discord
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" colorPalette="neutral" flex={{ base: '1', md: 'none' }}>
            <Link href="https://github.com/yorkie-team/dashboard/issues" target="_blank" rel="noreferrer">
              <Icon type="github" />
              GitHub
            </Link>
          </Button>
        </Flex>
      </div>
    </Layout>
  );
};

export default Custom404;
