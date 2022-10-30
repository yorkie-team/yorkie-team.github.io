import { AnchorHTMLAttributes } from 'react';

export function CustomLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} className='docs_link'></a>;
}
