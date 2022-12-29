import { NextPage } from 'next';
import Head from 'next/head';
import { ExampleLayout, CodeBlock } from '@/components';
import { Sidebar, BasicExampleView, ProjectCodes, COMMON_IGNORE_FILES } from '@/components/exampleView';
import { FILE_INFO } from '@/examples/vuejs-kanban/fileInfo';
import { DOCUMENT_STRUCTURE } from '@/examples/vuejs-kanban/documentStructure';

const KanbanExampleView: NextPage = () => {
  // TODO(hackerwins): Uncomment the document structure view when the how it works is ready.
  return (
    <ExampleLayout breadcrumbTitle="Kanban Board">
      {() => (
        <>
          <Head>
            <title>Kanban Board · Yorkie Examples</title>
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
                <Sidebar.GuideTitle>Kanban Board</Sidebar.GuideTitle>
                <Sidebar.GuideDescription>
                  Kanban Board is a tool for managing tasks and workflow. It is a visual way to manage tasks and
                  workflow.
                </Sidebar.GuideDescription>
                <ProjectCodes
                  files={FILE_INFO}
                  activeFile="/src/App.vue"
                  ignoreFiles={[...COMMON_IGNORE_FILES, '.env']}
                />
              </Sidebar.TabsPanel>
              <Sidebar.TabsPanel value="documentStructure">
                <div className="codeblock_box">
                  <CodeBlock code={DOCUMENT_STRUCTURE} language="typescript" />
                </div>
              </Sidebar.TabsPanel>
              <Sidebar.Bottom codeURL="https://github.com/yorkie-team/yorkie-js-sdk/tree/main/examples/vuejs-kanban" />
            </Sidebar.Tabs>
          </Sidebar>
          <BasicExampleView
            rpcAddr={process.env.NEXT_PUBLIC_API_ADDR || ''}
            apiKey={process.env.NEXT_PUBLIC_EXAMPLES_API_KEY || ''}
            documentKey="vuejs-kanban"
            iframeURL="https://yorkie.dev/yorkie-js-sdk/examples/vuejs-kanban/"
          />
        </>
      )}
    </ExampleLayout>
  );
};

export default KanbanExampleView;
