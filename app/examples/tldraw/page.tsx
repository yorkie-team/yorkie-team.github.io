import { Metadata } from 'next';
import TldrawPage from './tldraw-page';

const exampleTitle = 'tldraw';

export const metadata: Metadata = {
  title: `${exampleTitle} · Yorkie Examples`,
};

export default async function Page() {
  return <TldrawPage />;
}
