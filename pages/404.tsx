import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Icon, Layout } from '@/components';
import Error404SVG from '@/public/assets/icons/error_404.svg';

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
        <Button.Box>
          <Button as="link" href="/" className="orange_0" icon={<Icon type="backHome" />}>
            Back to home
          </Button>
          <Button
            as="a"
            href="https://discord.gg/MVEAwz9sBy"
            className="gray50"
            outline
            target="_blank"
            rel="noreferrer"
            icon={<Icon type="discord" />}
          >
            Slack
          </Button>
          <Button
            as="a"
            href="https://github.com/yorkie-team/yorkie-house/issues"
            className="gray50"
            outline
            target="_blank"
            rel="noreferrer"
            icon={<Icon type="github" />}
          >
            GitHub
          </Button>
        </Button.Box>
      </div>
    </Layout>
  );
};

export default Custom404;
