import { NextPage } from 'next';
import Head from 'next/head';
import { ExampleLayout } from '@/components';
import { BasicExampleView, Sidebar } from '@/components/BasicExample';
import { DocumentStructure, ProjectCode } from '@/examples/profile-stack';

export interface DocChangeInfo {
  type: 'modification' | 'initialize';
  path: string;
}

const ProfileStackExampleView: NextPage = () => {
  return (
    <ExampleLayout breadcrumbTitle="Profile Stack">
      {() => (
        <>
          <Head>
            <title>Profile Stack · Yorkie Examples</title>
          </Head>
          <Sidebar
            title="Profile Stack"
            description="The profile stack shows the list of users currently accessing the Document. Try adding and deleting users to see how the profile stack changes."
            codeURL="https://github.com/yorkie-team/yorkie-js-sdk/tree/main/examples/profile-stack"
            projectCode={ProjectCode}
            documentStructure={DocumentStructure}
            defaultOpened
          />
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
