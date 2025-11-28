import { ExampleLayout } from '@/components';
import { EXAMPLE_ANDROID_CODE_URL, ProjectCodes, Sidebar } from '@/components/exampleView';
import { FILE_INFO } from '@/examples/android-rich-text-editor/fileInfo';
import { NextPage } from 'next';
import Head from 'next/head';
import { VideoPlayer } from '@/components/exampleView/BasicView/VideoPlayer';

const exampleKey = 'rich-text-editor';
const exampleTitle = 'Rich Text Editor Android';
const RichTextEditorAndroidExampleView: NextPage = () => {
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
                  This is an example of real-time collaborative Rich Text Editor using{' '}
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
                <ProjectCodes
                  files={FILE_INFO}
                  activeFile="/src/main/java/com/example/richtexteditor/MainActivity.kt"
                />
              </Sidebar.TabsPanel>
              <Sidebar.Bottom codeURL={EXAMPLE_ANDROID_CODE_URL + exampleKey} />
            </Sidebar.Tabs>
          </Sidebar>
          <VideoPlayer videoSrc="/assets/videos/examples/android-rich-text-editor.mp4" />
        </>
      )}
    </ExampleLayout>
  );
};

export default RichTextEditorAndroidExampleView;
