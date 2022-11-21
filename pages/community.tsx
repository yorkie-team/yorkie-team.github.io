import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Icon, Layout } from '@/components';
import CommunitySVG from '@/public/assets/icons/community_help.svg';

const Community: NextPage = () => {
  return (
    <Layout className="community_page" gnbPageName="Community">
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
          <br className="br_mo_xs" /> You can sign up for our slack or
          <br className="br_mo" /> raise GitHub
          <br className="br_tablet" /> discussions.
        </p>
        <Button.Box>
          <Button
            icon={<Icon type="slack" />}
            href="https://communityinviter.com/apps/dev-yorkie/yorkie"
            className="gray50"
            as="a"
            outline
            target="_blank"
            rel="noreferrer"
          >
            Slack
          </Button>
          <Button
            icon={<Icon type="github" />}
            href="https://github.com/yorkie-team/yorkie-house/issues"
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
