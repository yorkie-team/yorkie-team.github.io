import { Metadata } from 'next';
import CodemirrorPage from './codemirror-page';

const exampleTitle = 'CodeMirror';

export const metadata: Metadata = {
  title: `${exampleTitle} · Yorkie Examples`,
};

export default async function Page() {
  return <CodemirrorPage />;
}
