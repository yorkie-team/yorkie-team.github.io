import { Metadata } from 'next';
import TodomvcPage from './todomvc-page';

const exampleTitle = 'TodoMVC';

export const metadata: Metadata = {
  title: `${exampleTitle} · Yorkie Examples`,
};

export default async function Page() {
  return <TodomvcPage />;
}
