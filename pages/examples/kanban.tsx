import { NextPage } from 'next';
import Head from 'next/head';
import { ExampleLayout, CodeBlock } from '@/components';
import {
  Sidebar,
  BasicExampleView,
  ProjectCodes,
  COMMON_IGNORE_FILES,
  EXAMPLE_CODE_URL,
  EXAMPLE_PREVIEW_URL,
} from '@/components/exampleView';
import { FILE_INFO } from '@/examples/vuejs-kanban/fileInfo';
import { DOCUMENT_STRUCTURE } from '@/examples/vuejs-kanban/documentStructure';

const exampleKey = 'vuejs-kanban';
const exampleTitle = 'Kanban Board';
const KanbanExampleView: NextPage = () => {
  // TODO(hackerwins): Uncomment the document structure view when the how it works is ready.
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
                  {process.env.NODE_ENV === 'development' && (
                    <Sidebar.TabsTab value="documentStructure">Document Structure</Sidebar.TabsTab>
                  )}
                </Sidebar.TabsList>
              </Sidebar.Top>
              <Sidebar.TabsPanel value="code">
                <Sidebar.GuideTitle>{exampleTitle}</Sidebar.GuideTitle>
                <Sidebar.GuideDescription>
                  A{' '}
                  <a href="https://vuejs.org" className="link" target="_blank" rel="noreferrer">
                    Vue
                  </a>{' '}
                  board whose lists and cards are Yorkie Arrays. Add, move and delete cards in one pane and watch the
                  same Array operations arrive in the other.
                </Sidebar.GuideDescription>
                <ProjectCodes files={FILE_INFO} activeFile="/src/App.vue" ignoreFiles={COMMON_IGNORE_FILES} />
              </Sidebar.TabsPanel>
              <Sidebar.TabsPanel value="documentStructure">
                <div className="codeblock_box">
                  <CodeBlock code={DOCUMENT_STRUCTURE} language="typescript" />
                </div>
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

export default KanbanExampleView;
