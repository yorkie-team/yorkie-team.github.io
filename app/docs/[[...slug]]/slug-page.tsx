import Head from 'next/head';
import { type DocsOrderList } from '@/utils/mdxUtils';
import { Layout, Navigator } from '@/components';
import ScrollPositionIndicator from '../_components/ScrollPositionIndicator';

export default function DocsPage({
  content,
  navList,
  children,
}: {
  content: string;
  navList: DocsOrderList;
  children: React.ReactNode;
}) {
  return (
    <Layout className="documentation_page">
      <Head>
        <title>Documentation · Yorkie</title>
      </Head>
      <ScrollPositionIndicator content={content} />
      <div className="content">
        <Navigator navList={navList} />
        <section className="section">{children}</section>
      </div>
    </Layout>
  );
}
