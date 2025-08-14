import { ExampleLayout } from '@/components';
import {
  BasicExampleView,
  COMMON_IGNORE_FILES,
  EXAMPLE_CODE_URL,
  EXAMPLE_PREVIEW_URL,
  ProjectCodes,
  Sidebar,
} from '@/components/exampleView';
import { FILE_INFO } from '@/examples/react-flow/fileInfo';
import { NextPage } from 'next';
import Head from 'next/head';

const exampleKey = 'react-flow';
const exampleTitle = 'React Flow';
const ReactFlowExampleView: NextPage = () => {
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
                  This is an example of real-time collaborative{' '}
                  <a href="https://reactflow.dev" className="link" target="_blank" rel="noreferrer">
                    React Flow.
                  </a>{' '}
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

export default ReactFlowExampleView;
