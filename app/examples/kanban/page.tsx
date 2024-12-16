import { Metadata } from 'next';
import KanbanPage from './kanban-page';

const exampleTitle = 'Kanban Board';

export const metadata: Metadata = {
  title: `${exampleTitle} · Yorkie Examples`,
};

export default async function Page() {
  return <KanbanPage />;
}
