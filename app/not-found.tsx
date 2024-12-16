import { Metadata } from 'next';
import NotFoundPage from './not-found-page';

export const metadata: Metadata = {
  title: 'Page not found · Yorkie',
};

export default async function NotFound() {
  return <NotFoundPage />;
}
