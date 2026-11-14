import { createSafeContext } from '@/utils/createSafeContext';
import { SIDEBAR_ERRORS } from './Sidebar.errors';

interface SidebarTabsContext {
  activeTab: string | null;
  // True when the sidebar has exactly one tab, which renders without tab chrome.
  single: boolean;
}

export const [SidebarTabsContextProvider, useSidebarTabsContext] = createSafeContext<SidebarTabsContext>(
  SIDEBAR_ERRORS.tabsContext,
);
