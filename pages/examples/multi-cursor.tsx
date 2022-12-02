import type { NextPage } from 'next';
import Head from 'next/head';
import { ExampleLayout } from '@/components';
import { Sidebar, FullView, ShowView, GridView, DualView } from '@/components/exampleView';

const sampleCode = `<div>There are currently <span id='peersCount'></span> peers!</div>

<!-- include yorkie js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/yorkie-js-sdk/0.2.16/yorkie-js-sdk.js"></script>
<script>
  async function main() {
    const client = new yorkie.Client('https://api.yorkie.dev', {
      apiKey: 'http://localhost:8080',
    });
    await client.activate();

    const doc = new yorkie.Document('my-first-document');
    await client.attach(doc);

    client.subscribe((event) => {
      if (event.type === 'peers-changed') {
        const peers = event.value[doc.getKey()];
        document.getElementById('peersCount').innerHTML = Object.entries(peers).length;
      }
    });
  }
  main();
</script>`;

const ExamplesView: NextPage = () => {
  return (
    <ExampleLayout breadcrumbTitle="Multi Cursor" defaultViewType="split">
      {({ viewType }) => (
        <>
          <Head>
            <title>Multi Cursor · Yorkie Examples</title>
          </Head>
          <Sidebar
            defaultOpened={viewType !== 'full'}
            title="Multi cursor"
            description="A live cursor is a feature that allows you to view the cursors of other users in real time. If different stakeholders collaborate remotely, you can also mark each user's role with a small tag next to the cursor."
            features={[
              {
                title: 'Select role and check other’s cursor',
                description:
                  'Try choosing your role. You can view the cursors of other users in real time with their role tags.',
              },
            ]}
            code={sampleCode}
          />
          {viewType === 'full' && <FullView />}
          {viewType === 'show' && <ShowView />}
          {viewType === 'grid' && <GridView />}
          {viewType === 'split' && <DualView />}
        </>
      )}
    </ExampleLayout>
  );
};

export default ExamplesView;
