import { ExampleLayout } from '@/components';
import { KanbanDocumentStructure, KanbanProject, ProjectFile } from '@/components/BasicExampleProjects';
import { BasicExampleView } from '@/components/BasicExampleView';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export interface DocChangeInfo {
  type: 'modification' | 'initialize';
  path: string;
}

const KanbanExampleView: NextPage = () => {
  const [docChangeInfos, setDocChangeInfos] = useState<DocChangeInfo[]>([]);
  useEffect(() => {
    const activate = async () => {
      const yorkie = await import('yorkie-js-sdk');
      const client = new yorkie.Client('https://api.yorkie.dev');
      await client.activate();
      const doc = new yorkie.Document('vuejs-kanban');
      await client.attach(doc);
      setDocChangeInfos((prev) => [...prev, { type: 'initialize', path: 'Connection has been established!' }]);
      doc.subscribe((event) => {
        if (event.type === 'remote-change') {
          for (const changeInfo of event.value) {
            for (const path of changeInfo.paths) {
              setDocChangeInfos((prev) => [...prev, { type: 'modification', path }]);
            }
          }
        }
      });
    };
    activate();
  }, []);
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
            projectCode={KanbanProject}
            documentStructure={KanbanDocumentStructure}
            iframeUrl="https://yorkie.dev/yorkie-js-sdk/examples/vuejs-kanban/"
            defaultOpenFile={KanbanProject.children[0].children?.[1] as ProjectFile}
          />
        </>
      )}
    </ExampleLayout>
  );
};

export default KanbanExampleView;
