import { Children, ReactNode, isValidElement, useState } from 'react';
import classNames from 'classnames';
import { Tabs, TabsValue } from '@/components';
import { SidebarTabsContextProvider, useSidebarTabsContext } from './SidebarTabs.context';

// Counts the <SidebarTabsTab> elements written inside <SidebarTabs>, looking
// through wrappers like <Sidebar.Top> and skipping conditional `false` tabs.
function countTabs(children: ReactNode): number {
  let count = 0;
  Children.forEach(children, (child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return;
    if (child.type === SidebarTabsTab) {
      count += 1;
      return;
    }
    count += countTabs(child.props.children);
  });
  return count;
}

export function SidebarTabs({
  defaultTab,
  onTabChange,
  children,
}: {
  defaultTab: string;
  children: React.ReactNode;
  onTabChange?(value: TabsValue): void;
}) {
  const [activeTab, setActiveTab] = useState<TabsValue>(defaultTab);
  // A tablist with one tab switches nothing, so a single panel is rendered
  // as plain content without tab roles or tab chrome.
  const single = countTabs(children) === 1;

  return (
    <SidebarTabsContextProvider
      value={{
        activeTab,
        single,
      }}
    >
      <Tabs
        value={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          onTabChange && onTabChange(tab);
        }}
      >
        {children}
      </Tabs>
    </SidebarTabsContextProvider>
  );
}

export function SidebarTabsList({ children }: { children: React.ReactNode }) {
  const ctx = useSidebarTabsContext();
  if (ctx.single) return null;
  return <Tabs.List className="codeblock_navigator">{children}</Tabs.List>;
}

export function SidebarTabsTab({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useSidebarTabsContext();
  return (
    <Tabs.Tab
      value={value}
      aria-selected={ctx.activeTab === value}
      className={classNames('item', { is_active: ctx.activeTab === value })}
    >
      {children}
    </Tabs.Tab>
  );
}

export function SidebarTabsPanel({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useSidebarTabsContext();
  if (ctx.single) {
    if (ctx.activeTab !== value) return null;
    return <div className="guide_box">{children}</div>;
  }
  return (
    <Tabs.Panel value={value} className="guide_box">
      {children}
    </Tabs.Panel>
  );
}
