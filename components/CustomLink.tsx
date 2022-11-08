import { useCallback, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function CustomLink({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));
  const isHashLink = href && href.startsWith('#');
  const router = useRouter();
  const onClick = useCallback(
    (e: MouseEvent) => {
      if (!isHashLink) return;
      e.preventDefault();

      const element = document.getElementById(href.replace('#', ''))!;
      const yOffset = 64;
      const y = element.getBoundingClientRect().top + document.documentElement.scrollTop - yOffset;

      const [path] = router.asPath.split('#');
      router.push(`${window.origin}${path}${href}`);
      window.setTimeout(() => {
        window.scrollTo({ top: y });
      }, 50);
    },
    [href, router, isHashLink]
  );

  if (isInternalLink) {
    return <Link href={href} {...rest} className='docs_link' onClick={onClick} />;
  }
  return <a href={href} target='_blank' rel='noreferrer' {...rest} className='docs_link'></a>;
}
