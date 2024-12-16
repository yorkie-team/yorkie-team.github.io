import { Metadata } from 'next';
import WebtoonsPage from './webtoons-page';

export const metadata: Metadata = {
  title: 'Creating Webtoons · Yorkie Examples',
};

export default async function Page() {
  return <WebtoonsPage />;
}
