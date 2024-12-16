'use client';

import { useState } from 'react';
import type { NextPage } from 'next';
import { ExampleLayout, Accordion, CodeBlock } from '@/components';
import { Sidebar, FullView, ShowView, GridView, DualView } from '@/components/exampleView';

const sampleCode = `sample code`;

const ExamplesView: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string | null>('about');
  return (
    <ExampleLayout breadcrumbTitle="Multi Cursor" defaultViewType="split">
      {({ viewType }) => (
        <>
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
