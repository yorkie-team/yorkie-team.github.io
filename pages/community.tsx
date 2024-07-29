import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Icon, Layout } from '@/components';
import CommunitySVG from '@/public/assets/icons/community_help.svg';
import { Button, Flex } from 'yorkie-ui-test';

const Community: NextPage = () => {
  return (
    <Layout className="community_page">
      <Head>
        <title>Community · Yorkie</title>
      </Head>
      <div className="content">
        <div className="img_box">
          <CommunitySVG />
        </div>
        <h2 className="title">Join our community</h2>
        <p className="desc">
          If you have any questions along the way,
          <br className="br_mo" /> please don’t hesitate to ask us
          <br className="br_tablet" /> through our
          <br className="br_mo" />
          <br className="br_pc" />
          channels.
          <br className="br_mo_xs" /> You can sign up for our Discord or
          <br className="br_mo" /> raise GitHub
          <br className="br_tablet" /> discussions.
        </p>
        <Flex order="4" gap="600" mt="800" width="full">
          <Button asChild variant="outline" size="lg" colorPalette="gray" flex={{ base: '1', md: 'none' }}>
            <Link href="https://discord.gg/MVEAwz9sBy" target="_blank" rel="noreferrer">
              <Icon type="discord" />
              Discord
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" colorPalette="gray" flex={{ base: '1', md: 'none' }}>
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

export default Community;
