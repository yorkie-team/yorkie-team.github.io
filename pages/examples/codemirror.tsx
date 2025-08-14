import { NextPage } from 'next';
import Head from 'next/head';
import { ExampleLayout } from '@/components';
import {
  Sidebar,
  BasicExampleView,
  ProjectCodes,
  COMMON_IGNORE_FILES,
  EXAMPLE_CODE_URL,
  EXAMPLE_PREVIEW_URL,
} from '@/components/exampleView';
import { FILE_INFO } from '@/examples/vanilla-codemirror6/fileInfo';

const exampleKey = 'vanilla-codemirror6';
const exampleTitle = 'CodeMirror';
const CodemirrorExampleView: NextPage = () => {
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
                  This is a real-time collaborative example of the{' '}
                  <a href="https://codemirror.net/" className="link" target="_blank" rel="noreferrer">
                    CodeMirror 6
                  </a>{' '}
                  editor. It uses the{' '}
                  <a href="https://yorkie.dev/docs/js-sdk#text" className="link" target="_blank" rel="noreferrer">
                    Text
                  </a>
                  , a custom CRDT type from Yorkie.
                </Sidebar.GuideDescription>
                <ProjectCodes files={FILE_INFO} activeFile="/src/main.ts" ignoreFiles={COMMON_IGNORE_FILES} />
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

export default CodemirrorExampleView;
