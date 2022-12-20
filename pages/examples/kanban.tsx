import { NextPage } from 'next';
import Head from 'next/head';
import { ExampleLayout } from '@/components';
import { BasicExampleView, Sidebar } from '@/components/BasicExample';
import { DocumentStructure, ProjectCode } from '@/examples/kanban';

export interface DocChangeInfo {
  type: 'modification' | 'initialize';
  path: string;
}

const KanbanExampleView: NextPage = () => {
  return (
    <ExampleLayout breadcrumbTitle="Kanban Board">
      {({ viewType }) => (
        <>
          <Head>
            <title>Kanban Board · Yorkie Examples</title>
          </Head>
          <Sidebar
            title="Kanban Board"
            description="Kanban Board is a tool for managing tasks and workflow. It is a visual way to manage tasks and workflow."
            codeURL="https://github.com/yorkie-team/yorkie-js-sdk/tree/main/examples/vuejs-kanban"
            projectCode={ProjectCode}
            documentStructure={DocumentStructure}
            defaultOpened
          />
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
