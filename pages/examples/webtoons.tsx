import type { NextPage } from 'next';
import Head from 'next/head';
import { ExampleLayout } from '@/components';
import { Sidebar, FullView, ShowView, GridView, DualView } from '@/components/exampleView';

const sampleCode = `<div>There are currently <span id='peersCount'></span> peers!</div>

<!-- include yorkie js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/yorkie-js-sdk/0.2.16/yorkie-js-sdk.js"></script>
<script>
  async function main() {
    const client = new yorkie.Client('${process.env.NEXT_PUBLIC_API_ADDR}', {
      apiKey: 'MY_API_KEY',
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
    <ExampleLayout breadcrumbTitle="Creating Webtoons" viewTypes={['full', 'show', 'grid']} defaultViewType="show">
      {({ viewType }) => (
        <>
          <Head>
            <title>Creating Webtoons · Yorkie Examples</title>
          </Head>
          <Sidebar
            defaultOpened={viewType !== 'full'}
            title="Webtoon scenario maker"
            description="Because drawing a webtoon requires several steps, experts in various roles often collaborate. There is a lot
            of discussion and feedback in creating a scenario. Webtoon Scenario Maker includes 'drawing
            comments', 'comments view', 'mini map' and 'character library.'"
            features={[
              {
                title: 'Drawing comments',
                description:
                  "Press the 'comment' button on the bottom or the 'C key' on the keyboard, and then press any space on the screen. You can leave text comments and drawing comments on that location. Feel free to generate drawing comments by moving your cursor out of the text window.",
              },
              {
                title: 'Comments view',
                description:
                  'Try pressing the top left toggle button to open the comment view. You can collect and view all comments for each cut of the cartoon.',
              },
              {
                title: 'Mini map',
                description:
                  'Use the mini-map feature in the upper right corner to see what other users are viewing. You can identify the location of each user in real time.',
              },
              {
                title: 'Character library',
                description:
                  "In the text content area on the left, add a description of the new cut and write the characters' lines. Once you have registered your characters, they can be stored in the library and reused.",
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
