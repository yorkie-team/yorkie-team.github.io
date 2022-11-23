import Link from 'next/link';
import { Icon } from '@/components';

export function Breadcrumb({ menus }: { menus: Array<{ name: string; href: string }> }) {
  return (
    <div className="docs_breadcrumbs">
      <button type="button" className="nav_btn">
        <Icon type="menu" />
      </button>
      {menus.map(({ name, href }) => (
        <Link href={href} key={name} className="docs_breadcrumbs_link">
          {name}
        </Link>
      ))}
    </div>
  );
}
