import { Metadata } from 'next';
import CalendarPage from './calendar-page';

const exampleTitle = 'Calendar';

export const metadata: Metadata = {
  title: `${exampleTitle} · Yorkie Examples`,
};

export default async function Page() {
  return <CalendarPage />;
}
