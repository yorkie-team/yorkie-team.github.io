import { ExampleLayout } from '@/components';
import { EXAMPLE_IOS_CODE_URL, ProjectCodes, Sidebar } from '@/components/exampleView';
import { FILE_INFO } from '@/examples/ios-richtexteditor/fileInfo';
import { NextPage } from 'next';
import Head from 'next/head';
import { VideoPlayer } from '@/components/exampleView/BasicView/VideoPlayer';

const exampleKey = 'RichTextEditor';
const exampleTitle = 'Rich Text Editor iOS';
const RichTextEditorIOSExampleView: NextPage = () => {
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
                  <a
                    href="https://developer.apple.com/documentation/uikit/uitextview"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Rich Text Editor
                  </a>{' '}
                  using{' '}
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
                <ProjectCodes files={FILE_INFO} activeFile="/RichTextEditor/RichTextEditorApp.swift" />
              </Sidebar.TabsPanel>
              <Sidebar.Bottom codeURL={EXAMPLE_IOS_CODE_URL + exampleKey} />
            </Sidebar.Tabs>
          </Sidebar>
          <VideoPlayer videoSrc="/assets/videos/examples/ios-rich-text-editor.mp4" />
        </>
      )}
    </ExampleLayout>
  );
};

export default RichTextEditorIOSExampleView;
