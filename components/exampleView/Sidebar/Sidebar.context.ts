import { createSafeContext } from '@/utils/createSafeContext';
import { SIDEBAR_ERRORS } from './Sidebar.errors';

interface SidebarContext {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  wide: boolean;
  // Id of the sidebar element, referenced by the collapse toggle.
  id: string;
}

export const [SidebarContextProvider, useSidebarContext] = createSafeContext<SidebarContext>(SIDEBAR_ERRORS.context);
