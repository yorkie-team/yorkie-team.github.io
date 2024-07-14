import Link from 'next/link';
import { Icons, Icon } from 'yorkie-ui';

export function Breadcrumb({ menus }: { menus: Array<{ name: string; href: string }> }) {
  return (
    <div className="docs_breadcrumbs">
      <button type="button" className="nav_btn">
        <Icon icon={<Icons.IconMenu />} />
      </button>
      {menus.map(({ name, href }) => (
        <Link href={href} key={name} className="docs_breadcrumbs_link">
          {name}
        </Link>
      ))}
    </div>
  );
}
