'use client';

import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Icon, Layout } from '@/components';
import CommunitySVG from '@/public/assets/icons/community_help.svg';

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
        <Button.Box>
          <Button
            icon={<Icon type="discord" />}
            href="https://discord.gg/MVEAwz9sBy"
            className="gray50"
            as="a"
            outline
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </Button>
          <Button
            icon={<Icon type="github" />}
            href="https://github.com/yorkie-team/dashboard/issues"
            className="gray50"
            as="a"
            outline
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Button>
        </Button.Box>
      </div>
    </Layout>
  );
};

export default Community;
