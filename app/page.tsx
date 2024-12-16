import { Metadata } from 'next';
import HomePage from './home-page';

export const metadata: Metadata = {
  title: 'Yorkie',
};

export default async function Page() {
  return <HomePage />;
}
