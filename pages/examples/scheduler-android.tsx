import { ExampleLayout } from '@/components';
import {
    EXAMPLE_ANDROID_CODE_URL,
    ProjectCodes,
    Sidebar,
} from '@/components/exampleView';
import { FILE_INFO } from '@/examples/android-scheduler/fileInfo';
import { NextPage } from 'next';
import Head from 'next/head';
import { VideoPlayer } from "@/components/exampleView/BasicView/VideoPlayer";

const exampleKey = 'scheduler';
const exampleTitle = 'Scheduler Android';
const SchedulerAndroidExampleView: NextPage = () => {
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
                  This is an example of real-time collaborative{' '}
                  <a href="https://todomvc.com" className="link" target="_blank" rel="noreferrer">
                    Scheduler
                  </a>{' '}
                  using{' '}
                  <a
                    href="https://github.com/yorkie-team/yorkie-android-sdk"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Yorkie Android SDK
                  </a>
                  .
                </Sidebar.GuideDescription>
                <ProjectCodes files={FILE_INFO} activeFile="/src/main/java/com/example/scheduler/MainActivity.kt" />
              </Sidebar.TabsPanel>
              <Sidebar.Bottom codeURL={EXAMPLE_ANDROID_CODE_URL + exampleKey} />
            </Sidebar.Tabs>
          </Sidebar>
          <VideoPlayer videoSrc="/assets/videos/examples/android-scheduler.mp4" />
        </>
      )}
    </ExampleLayout>
  );
};

export default SchedulerAndroidExampleView;
