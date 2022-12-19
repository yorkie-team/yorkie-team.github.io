import { NextPage } from 'next';
import Head from 'next/head';
import { ExampleLayout } from '@/components';
import { BasicExampleView } from '@/components/BasicExample';
import { DocumentStructure, ProjectCode } from '../../examples/kanban';

export interface DocChangeInfo {
  type: 'modification' | 'initialize';
  path: string;
}

const KanbanExampleView: NextPage = () => {
  return (
    <ExampleLayout breadcrumbTitle="Kanban Board" defaultViewType="split">
      {({ viewType }) => (
        <>
          <Head>
            <title>Kanban Board · Yorkie Examples</title>
          </Head>
          <BasicExampleView
            rpcAddr={process.env.NEXT_PUBLIC_API_ADDR || ''}
            apiKey={process.env.NEXT_PUBLIC_EXAMPLES_API_KEY || ''}
            documentKey="vuejs-kanban"
            projectCode={ProjectCode}
            documentStructure={DocumentStructure}
            iframeURL="https://yorkie.dev/yorkie-js-sdk/examples/vuejs-kanban/"
            codeURL="https://github.com/yorkie-team/yorkie-js-sdk/tree/main/examples/vuejs-kanban"
          />
        </>
      )}
    </ExampleLayout>
  );
};

export default KanbanExampleView;
