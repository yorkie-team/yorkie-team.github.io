import { ExampleLayout } from '@/components';
import { KanbanDocumentStructure, KanbanProjectCode } from '@/components/BasicExampleProjects';
import { BasicExampleView } from '@/components/BasicExampleView';
import { NextPage } from 'next';
import Head from 'next/head';

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
            yorkieClientAddress="https://api.yorkie.dev"
            yorkieDocumentKey="vuejs-kanban"
            yorkieApiKey={process.env.VITE_YORKIE_API_KEY ?? ''}
            projectCode={KanbanProjectCode}
            documentStructure={KanbanDocumentStructure}
            iframeUrl="https://yorkie.dev/yorkie-js-sdk/examples/vuejs-kanban/"
          />
        </>
      )}
    </ExampleLayout>
  );
};

export default KanbanExampleView;
