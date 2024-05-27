import Link from 'next/link';
import { Button } from 'yorkie-ui';
import { GnbMenuIcon } from '@/components/Icons/Icons';

export function Breadcrumb({ menus }: { menus: Array<{ name: string; href: string }> }) {
  return (
    <div className="docs_breadcrumbs">
      <Button icon={<GnbMenuIcon />} position="start" />
      {menus.map(({ name, href }) => (
        <Link href={href} key={name} className="docs_breadcrumbs_link">
          {name}
        </Link>
      ))}
    </div>
  );
}
