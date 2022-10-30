import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components';
import Error404SVG from '@/public/assets/icons/error_404.svg';
import BackHomeSVG from '@/public/assets/icons/icon_back_home.svg';
import SlackSVG from '@/public/assets/icons/icon_slack.svg';
import GitHubSVG from '@/public/assets/icons/icon_github.svg';

const Custom404: NextPage = () => {
  return (
    <Layout className='error_page' shortFooter>
      <Head>
        <title>Page not found · Yorkie</title>
      </Head>
      <div className='error error404'>
        <div className='img_box'>
          <Error404SVG />
        </div>
        <div className='error_info'>
          <h2 className='blind'>404 : not found</h2>
          <p className='error_title'>
            Oops! Wait a minute... <br />
            Yorkie ate your request
          </p>
          <p className='error_desc'>The page you are looking for might be removed or is temporarily unavailable.</p>
          <div className='btn_box'>
            <Link href='/' className='btn orange_0'>
              <span className='icon'>
                <BackHomeSVG />
              </span>
              <span className='text'>Back to home</span>
            </Link>
            <Link
              href='https://communityinviter.com/apps/dev-yorkie/yorkie'
              className='btn btn_line gray50'
              target='_blank'
              rel='noreferrer'
            >
              <span className='icon'>
                <SlackSVG />
              </span>
              <span className='text'>Slack</span>
            </Link>
            <Link
              href='https://github.com/yorkie-team/yorkie-house/issues'
              className='btn btn_line gray50'
              target='_blank'
              rel='noreferrer'
            >
              <span className='icon'>
                <GitHubSVG />
              </span>
              <span className='text'>GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Custom404;
