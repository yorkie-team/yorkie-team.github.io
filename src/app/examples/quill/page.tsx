'use client';
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
import { FILE_INFO } from '@/examples/vanilla-quill/fileInfo';

const exampleKey = 'vanilla-quill';
const exampleTitle = 'Quill';

const QuillExampleView: NextPage = () => {
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
                  This demo shows the real-time collaborative version of the{' '}
                  <a href="https://quilljs.com/" className="link" target="_blank" rel="noreferrer">
                    Quill
                  </a>{' '}
                  editor with{' '}
                  <a href="https://yorkie.dev/" className="link" target="_blank" rel="noreferrer">
                    Yorkie
                  </a>{' '}
                  and{' '}
                  <a href="https://vitejs.dev/" className="link" target="_blank" rel="noreferrer">
                    Vite
                  </a>
                  .
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
export default QuillExampleView;
