import { ExampleLayout } from '@/components';
import {
  BasicExampleView,
  COMMON_IGNORE_FILES,
  EXAMPLE_CODE_URL,
  EXAMPLE_PREVIEW_URL,
  ProjectCodes,
  Sidebar,
} from '@/components/exampleView';
import { FILE_INFO } from '@/examples/react-todomvc/fileInfo';
import { NextPage } from 'next';
import Head from 'next/head';

const exampleKey = 'react-todomvc';
const exampleTitle = 'TodoMVC';
const TodoListExampleView: NextPage = () => {
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
                  <a href="https://todomvc.com" className="link" target="_blank" rel="noreferrer">
                    TodoMVC
                  </a>{' '}
                  using{' '}
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

export default TodoListExampleView;
