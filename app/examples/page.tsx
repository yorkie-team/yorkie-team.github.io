import { Metadata } from 'next';
import ExamplesPage from './example-page';

export const metadata: Metadata = {
  title: 'Examples · Yorkie',
};

export default async function Page() {
  return <ExamplesPage />;
}
