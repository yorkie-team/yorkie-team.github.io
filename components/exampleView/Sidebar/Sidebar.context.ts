import { createSafeContext } from '@/utils/createSafeContext';
import { SIDEBAR_ERRORS } from './Sidebar.errors';

interface SidebarContext {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  wide: boolean;
}

export const [SidebarContextProvider, useSidebarContext] = createSafeContext<SidebarContext>(SIDEBAR_ERRORS.context);
