import { ExampleLayout } from '@/components';
import {
  EXAMPLE_IOS_CODE_URL,
  ProjectCodes,
  Sidebar,
} from '@/components/exampleView';
import { FILE_INFO } from '@/examples/ios-simultaneous-cursors/fileInfo';
import { NextPage } from 'next';
import Head from 'next/head';
import { VideoPlayer } from "@/components/exampleView/BasicView/VideoPlayer";

const exampleKey = 'simultaneous-cursors';
const exampleTitle = 'Simultaneous Cursors iOS';
const SimultaneousCursorsIOSExampleView: NextPage = () => {
  return (
    <ExampleLayout breadcrumbTitle={exampleTitle}>
      {() => (
        <>
          <Head>
            <title>{`${exampleTitle} · Yorkie Examples`}</title>
          </Head>
          <Sidebar wide>
            <Sidebar.Tabs defaultTab="code">
              <Sidebar.Top>
                <Sidebar.TabsList>
                  <Sidebar.TabsTab value="code">Code</Sidebar.TabsTab>
                </Sidebar.TabsList>
              </Sidebar.Top>
              <Sidebar.TabsPanel value="code">
                <Sidebar.GuideTitle>{exampleTitle}</Sidebar.GuideTitle>
                <Sidebar.GuideDescription>
                  This demo shows the real-time collaborative version of simple drawing, cursor animation with{' '}
                  <a
                    href="https://github.com/yorkie-team/yorkie-ios-sdk"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Yorkie iOS SDK
                  </a>
                  .
                </Sidebar.GuideDescription>
                <ProjectCodes files={FILE_INFO} activeFile="/Sources/SimultaneousCursors/SimultaneousCursorsApp.swift" />
              </Sidebar.TabsPanel>
              <Sidebar.Bottom codeURL={EXAMPLE_IOS_CODE_URL + exampleKey} />
            </Sidebar.Tabs>
          </Sidebar>
          <VideoPlayer videoSrc="/assets/videos/examples/ios-simultaneous-cursors.mp4" />
        </>
      )}
    </ExampleLayout>
  );
};

export default SimultaneousCursorsIOSExampleView;
