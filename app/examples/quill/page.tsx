import { Metadata } from 'next';
import QuillPage from './quill-page';

const exampleTitle = 'Quill';

export const metadata: Metadata = {
  title: `${exampleTitle} · Yorkie Examples`,
};

export default async function Page() {
  return <QuillPage />;
}
