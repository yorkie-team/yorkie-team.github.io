import { ExampleLayout } from '@/components';
import {
  BasicExampleView,
  COMMON_IGNORE_FILES,
  EXAMPLE_CODE_URL,
  EXAMPLE_PREVIEW_URL,
  ProjectCodes,
  Sidebar,
} from '@/components/exampleView';
import { FILE_INFO } from '@/examples/react-chat/fileInfo';
import { NextPage } from 'next';
import Head from 'next/head';

const exampleKey = 'react-chat';
const exampleTitle = 'Chat';
const ChatExampleView: NextPage = () => {
  return (
    <ExampleLayout breadcrumbTitle={exampleTitle}>
      {() => (
        <>
          <Head>
            <title>{`${exampleTitle} · Yorkie Examples`}</title>
          </Head>
          <Sidebar wide>
            <Sidebar.Tabs defaultTab="code">
              <Sidebar.Top>
                <Sidebar.TabsList>
                  <Sidebar.TabsTab value="code">Code</Sidebar.TabsTab>
                </Sidebar.TabsList>
              </Sidebar.Top>
              <Sidebar.TabsPanel value="code">
                <Sidebar.GuideTitle>{exampleTitle}</Sidebar.GuideTitle>
                <Sidebar.GuideDescription>
                  A Slack-like chat with channels, reactions and threads, built with{' '}
                  <a href="https://react.dev" className="link" target="_blank" rel="noreferrer">
                    React
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://github.com/yorkie-team/yorkie-js-sdk"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Yorkie JS SDK
                  </a>
                  . The rail shows who is in which channel, two people reacting at once both count, and a pane switched
                  offline catches up when it returns.
                </Sidebar.GuideDescription>
                <ProjectCodes files={FILE_INFO} activeFile="/src/App.tsx" ignoreFiles={COMMON_IGNORE_FILES} />
              </Sidebar.TabsPanel>
              <Sidebar.Bottom codeURL={EXAMPLE_CODE_URL + exampleKey} />
            </Sidebar.Tabs>
          </Sidebar>
          <BasicExampleView iframeURL={EXAMPLE_PREVIEW_URL + exampleKey} />
        </>
      )}
    </ExampleLayout>
  );
};

export default ChatExampleView;
