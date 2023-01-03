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
const exampleTitle = 'Text Editor (Codemirror)';
const CodemirrorExampleView: NextPage = () => {
  return (
    <ExampleLayout breadcrumbTitle={exampleTitle}>
      {() => (
        <>
          <Head>
            <title>{exampleTitle} · Yorkie Examples</title>
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
                  This is a real-time collaborative version of the{' '}
                  <a href="https://codemirror.net/" className="link" target="_blank" rel="noreferrer">
                    Codemirror
                  </a>{' '}
                  editor. It uses the{' '}
                  <a href="https://yorkie.dev/docs/js-sdk#text" className="link" target="_blank" rel="noreferrer">
                    Text
                  </a>{' '}
                  type, a custom CRDT type from Yorkie.
                </Sidebar.GuideDescription>
                <ProjectCodes
                  files={FILE_INFO}
                  activeFile="/src/main.ts"
                  ignoreFiles={[...COMMON_IGNORE_FILES, '.env', 'vite.config.js', '/src/vite-env.d.ts']}
                />
              </Sidebar.TabsPanel>
              <Sidebar.Bottom codeURL={EXAMPLE_CODE_URL + exampleKey} />
            </Sidebar.Tabs>
          </Sidebar>
          <BasicExampleView
            rpcAddr={process.env.NEXT_PUBLIC_API_ADDR || ''}
            apiKey={process.env.NEXT_PUBLIC_EXAMPLES_API_KEY || ''}
            documentKey={exampleKey}
            iframeURL={EXAMPLE_PREVIEW_URL + exampleKey}
          />
        </>
      )}
    </ExampleLayout>
  );
};

export default CodemirrorExampleView;
