'use client';

import React from 'react';
import { useUncontrolled } from '@/hooks';
import { getSafeId } from '@/utils/getSafeId';
import { TabsList } from './TabsList';
import { TabsPanel } from './TabsPanel';
import { Tab } from './Tab';
import { TabsContextProvider } from './Tabs.context';
import { TABS_ERRORS } from './Tabs.errors';

export type TabsValue = string | null;
export function Tabs({
  defaultValue,
  value,
  onTabChange,
  children,
}: {
  defaultValue?: TabsValue;
  value?: TabsValue;
  onTabChange?(value: TabsValue): void;
  children: React.ReactNode;
}) {
  const [_value, onChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange: onTabChange,
  });

  return (
    <TabsContextProvider
      value={{
        value: _value,
        getTabId: getSafeId('yorkie-tab', TABS_ERRORS.value),
        getPanelId: getSafeId('yorkie-panel', TABS_ERRORS.value),
        onTabChange: onChange,
      }}
    >
      {children}
    </TabsContextProvider>
  );
}

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabsPanel;
Tabs.displayName = 'Tabs';
