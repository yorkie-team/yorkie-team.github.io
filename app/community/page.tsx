import { Metadata } from 'next';
import CommunityPage from './community-page';

export const metadata: Metadata = {
  title: 'Community · Yorkie',
};

export default async function Page() {
  return <CommunityPage />;
}
