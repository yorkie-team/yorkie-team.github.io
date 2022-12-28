import { NextPage } from 'next';
import Head from 'next/head';
import { ExampleLayout } from '@/components';
import { Sidebar, BasicExampleView, ProjectCodes, COMMON_IGNORE_FILES } from '@/components/exampleView';
import { FILE_INFO } from '@/examples/profile-stack/fileInfo';

const ProfileStackExampleView: NextPage = () => {
  return (
    <ExampleLayout breadcrumbTitle="Profile Stack">
      {() => (
        <>
          <Head>
            <title>Profile Stack · Yorkie Examples</title>
          </Head>
          <Sidebar wide>
            <Sidebar.Tabs defaultTab="code">
              <Sidebar.Top>
                <Sidebar.TabsList>
                  <Sidebar.TabsTab value="code">Code</Sidebar.TabsTab>
                </Sidebar.TabsList>
              </Sidebar.Top>
              <Sidebar.TabsPanel value="code">
                <Sidebar.GuideTitle>Profile Stack</Sidebar.GuideTitle>
                <Sidebar.GuideDescription>
                  The profile stack shows the list of users currently accessing the Document. Try adding and deleting
                  users to see how the profile stack changes.
                </Sidebar.GuideDescription>
                <ProjectCodes
                  files={FILE_INFO}
                  activeFile="/main.js"
                  ignoreFiles={[...COMMON_IGNORE_FILES, '.env', 'vite.config.js']}
                />
              </Sidebar.TabsPanel>
              <Sidebar.Bottom codeURL="https://github.com/yorkie-team/yorkie-js-sdk/tree/main/examples/profile-stack" />
            </Sidebar.Tabs>
          </Sidebar>
          <BasicExampleView
            rpcAddr={process.env.NEXT_PUBLIC_API_ADDR || ''}
            apiKey={process.env.NEXT_PUBLIC_EXAMPLES_API_KEY || ''}
            documentKey="profile-stack"
            iframeURL="https://yorkie.dev/yorkie-js-sdk/examples/profile-stack/"
            userMaxCount={6}
          />
        </>
      )}
    </ExampleLayout>
  );
};

export default ProfileStackExampleView;
