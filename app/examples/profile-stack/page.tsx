import { Metadata } from 'next';
import ProfileStackPage from './profile-stack-page';

const exampleTitle = 'Profile Stack';

export const metadata: Metadata = {
  title: `${exampleTitle} · Yorkie Examples`,
};

export default async function Page() {
  return <ProfileStackPage />;
}
