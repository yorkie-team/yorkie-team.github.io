import { useRouter } from 'next/router';
import { CATEGORIES, EXAMPLES, Example } from '@/codes/examples';

// Detail pages live at /examples/<id>, so the last path segment is the
// example id. Pages that are not in the catalog get `undefined`.
export function useCurrentExample(): Example | undefined {
  const { pathname } = useRouter();
  const id = pathname.split('/').filter(Boolean).pop();
  return EXAMPLES.find((example) => example.id === id);
}

export type ExampleGuide = { href: string; label: string };

// The getting-started guide that matches the SDK an example is built with.
export function getExampleGuide(example: Example | undefined): ExampleGuide {
  if (!example) return { href: '/docs/getting-started', label: 'Read the guide' };
  if (example.platform === 'ios')
    return { href: '/docs/getting-started/with-ios-sdk', label: 'Read the iOS SDK guide' };
  if (example.platform === 'android')
    return { href: '/docs/getting-started/with-android-sdk', label: 'Read the Android SDK guide' };
  if (example.category.includes(CATEGORIES.REACT))
    return { href: '/docs/getting-started/with-react', label: 'Read the React guide' };
  return { href: '/docs/getting-started/with-js-sdk', label: 'Read the JS SDK guide' };
}
