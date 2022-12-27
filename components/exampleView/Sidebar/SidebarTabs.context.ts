import { createSafeContext } from '@/utils/createSafeContext';
import { SIDEBAR_ERRORS } from './Sidebar.errors';

interface SidebarTabsContext {
  activeTab: string | null;
}

export const [SidebarTabsContextProvider, useSidebarTabsContext] = createSafeContext<SidebarTabsContext>(
  SIDEBAR_ERRORS.tabsContext,
);
