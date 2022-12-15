import { ExampleLayout } from '@/components';
import { KanbanProject } from '@/components/BasicExampleCodes';
import { BasicExampleView } from '@/components/BasicExampleView';
import { FullView, Sidebar } from '@/components/exampleView';
import { SimpleDualView } from '@/components/exampleView/SimpleDualView';
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
            projectStructure={KanbanProject}
            iframeUrl="https://hunkim98.github.io/vuejs-kanban-yorkie/"
          />
        </>
      )}
    </ExampleLayout>
  );
};

export default KanbanExampleView;
