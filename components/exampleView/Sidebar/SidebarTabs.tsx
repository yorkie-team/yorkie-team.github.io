import { useState } from 'react';
import classNames from 'classnames';
import { Tabs, TabsValue } from '@/components';
import { SidebarTabsContextProvider, useSidebarTabsContext } from './SidebarTabs.context';

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

  return (
    <SidebarTabsContextProvider
      value={{
        activeTab,
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
  return <Tabs.List className="codeblock_navigator">{children}</Tabs.List>;
}

export function SidebarTabsTab({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useSidebarTabsContext();
  return (
    <Tabs.Tab value={value} className={classNames('item', { is_active: ctx.activeTab === value })}>
      {children}
    </Tabs.Tab>
  );
}

export function SidebarTabsPanel({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <Tabs.Panel value={value} className="guide_box">
      {children}
    </Tabs.Panel>
  );
}
