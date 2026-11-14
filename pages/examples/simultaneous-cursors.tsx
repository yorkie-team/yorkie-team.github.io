import { NextPage } from 'next';
import Head from 'next/head';
import { ExampleLayout } from '@/components';
import {
  Sidebar,
  BasicExampleView,
  ProjectCodes,
  COMMON_IGNORE_FILES,
  EXAMPLE_CODE_URL,
  EXAMPLE_PREVIEW_URL,
} from '@/components/exampleView';
import { FILE_INFO } from '@/examples/simultaneous-cursors/fileInfo';

const exampleKey = 'simultaneous-cursors';
const exampleTitle = 'Simultaneous Cursors';

const SimultaneousExampleView: NextPage = () => {
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
                  Each client shares its cursor position and tool through Presence, so moving the mouse in one pane
                  moves a cursor in the other. Send heart or thumbs-up reactions, or draw with the pen: each peer draws the
                  trail from that Presence, so the ink is ephemeral and never saved in the Document. Built with{' '}
                  <a href="https://react.dev" className="link" target="_blank" rel="noreferrer">
                    React
                  </a>{' '}
                  and <code>@yorkie-js/react</code>.
                </Sidebar.GuideDescription>
                <ProjectCodes files={FILE_INFO} activeFile="/src/App.jsx" ignoreFiles={COMMON_IGNORE_FILES} />
              </Sidebar.TabsPanel>
              <Sidebar.Bottom codeURL={EXAMPLE_CODE_URL + exampleKey} />
            </Sidebar.Tabs>
          </Sidebar>
          <BasicExampleView iframeURL={EXAMPLE_PREVIEW_URL + exampleKey} />
        </>
      )}
    </ExampleLayout>
  );
};
export default SimultaneousExampleView;
