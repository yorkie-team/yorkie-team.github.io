import { createSafeContext } from '@/utils/createSafeContext';
import { TABS_ERRORS } from './Tabs.errors';
import { TabsValue } from './Tabs';

interface TabsContext {
  value: TabsValue;
  onTabChange(value: TabsValue): void;
  getTabId(value: string): string;
  getPanelId(value: string): string;
}

export const [TabsContextProvider, useTabsContext] = createSafeContext<TabsContext>(TABS_ERRORS.context);
