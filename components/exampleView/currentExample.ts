import { useRouter } from 'next/router';
import { EXAMPLES, Example } from '@/codes/examples';

// Detail pages live at /examples/<id>, so the last path segment is the
// example id. Pages that are not in the catalog get `undefined`.
export function useCurrentExample(): Example | undefined {
  const { pathname } = useRouter();
  const id = pathname.split('/').filter(Boolean).pop();
  return EXAMPLES.find((example) => example.id === id);
}
