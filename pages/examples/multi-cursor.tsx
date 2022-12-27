import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ExampleLayout, Accordion, CodeBlock } from '@/components';
import { Sidebar, FullView, ShowView, GridView, DualView } from '@/components/exampleView';

const sampleCode = `
<div>There are currently <span id='peersCount'></span> peers!</div>

<!-- include yorkie js -->
<script src="${process.env.NEXT_PUBLIC_JS_SDK_URL}"></script>
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
  const [activeTab, setActiveTab] = useState<string | null>('about');
  return (
    <ExampleLayout breadcrumbTitle="Multi Cursor" defaultViewType="split">
      {({ viewType }) => (
        <>
          <Head>
            <title>Multi Cursor · Yorkie Examples</title>
          </Head>
          <Sidebar defaultOpened={viewType !== 'full'}>
            <Sidebar.Tabs defaultTab="about" onTabChange={setActiveTab}>
              <Sidebar.Top>
                <Sidebar.TabsList>
                  <Sidebar.TabsTab value="about">About</Sidebar.TabsTab>
                  <Sidebar.TabsTab value="code">Live Code</Sidebar.TabsTab>
                </Sidebar.TabsList>
              </Sidebar.Top>
              <Sidebar.TabsPanel value="about">
                <Sidebar.GuideTitle>Multi cursor</Sidebar.GuideTitle>
                <Sidebar.GuideDescription>
                  A live cursor is a feature that allows you to view the cursors of other users in real time. If
                  different stakeholders collaborate remotely, you can also mark each user&apos;s role with a small tag
                  next to the cursor.
                </Sidebar.GuideDescription>
                <Sidebar.GuideSubTitle>Try this!</Sidebar.GuideSubTitle>
                <Accordion defaultValue={[]} multiple>
                  {[
                    {
                      title: "Select role and check other's cursor",
                      description:
                        'Try choosing your role. You can view the cursors of other users in real time with their role tags.',
                    },
                  ].map(({ title, description }) => (
                    <Accordion.Item key={title} value={title}>
                      <Accordion.Control>{title}</Accordion.Control>
                      <Accordion.Panel>{description}</Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Sidebar.TabsPanel>
              <Sidebar.TabsPanel value="code">
                <div className="codeblock_box">
                  <CodeBlock code={sampleCode} language="javascript" withLineNumbers />
                </div>
              </Sidebar.TabsPanel>
              <Sidebar.Bottom
                codeURL="https://github.com/yorkie-team/yorkie-js-sdk/tree/main/examples/"
                shareButton={activeTab === 'about'}
              >
                <Sidebar.GuideDescription>Last updated 4 days ago</Sidebar.GuideDescription>
              </Sidebar.Bottom>
            </Sidebar.Tabs>
          </Sidebar>
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
