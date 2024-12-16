import { Metadata } from 'next';
import MultiCursorPage from './multi-cursor-page';

export const metadata: Metadata = {
  title: 'Multi Cursor · Yorkie Examples',
};

export default async function Page() {
  return <MultiCursorPage />;
}
