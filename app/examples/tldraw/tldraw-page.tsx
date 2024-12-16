'use client';

import { NextPage } from 'next';
import { ExampleLayout } from '@/components';
import {
  Sidebar,
  BasicExampleView,
  ProjectCodes,
  COMMON_IGNORE_FILES,
  EXAMPLE_CODE_URL,
  EXAMPLE_PREVIEW_URL,
} from '@/components/exampleView';
import { FILE_INFO } from '@/examples/react-tldraw/fileInfo';

const exampleKey = 'react-tldraw';
const exampleTitle = 'tldraw';
const TldrawExampleView: NextPage = () => {
  return (
    <ExampleLayout breadcrumbTitle={exampleTitle}>
      {() => (
        <>
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
                  <a href="https://tldraw.com" className="link" target="_blank" rel="noreferrer">
                    tldraw
                  </a>{' '}
                  whiteboard editor with{' '}
                  <a
                    href="https://reactjs.org/docs/create-a-new-react-app.html"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    CreateReactApp
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
                  .
                </Sidebar.GuideDescription>
                <ProjectCodes
                  files={FILE_INFO}
                  activeFile="/src/hooks/useMultiplayerState.ts"
                  ignoreFiles={COMMON_IGNORE_FILES}
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
            userMaxCount={30}
          />
        </>
      )}
    </ExampleLayout>
  );
};

export default TldrawExampleView;
