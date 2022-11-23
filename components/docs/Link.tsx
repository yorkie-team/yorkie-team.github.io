import { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

export function CustomLink({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return <Link href={href} {...rest} className="docs_link" />;
  }
  return <a href={href} target="_blank" rel="noreferrer" {...rest} className="docs_link icon_link"></a>;
}
