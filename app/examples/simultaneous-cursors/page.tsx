import { Metadata } from 'next';
import SimultaneousCursorsPage from './simultaneous-cursors-page';

const exampleTitle = 'Simultaneous Cursors';

export const metadata: Metadata = {
  title: `${exampleTitle} · Yorkie Examples`,
};

export default async function Page() {
  return <SimultaneousCursorsPage />;
}
