import { type ThemeOption, useTheme } from '@/hooks/useTheme';
import { useEffect } from 'react';

function UserStoreInitializer() {
  const { setTheme } = useTheme();
  useEffect(() => {
    const themeOption = (window.localStorage.getItem('theme') || 'system') as ThemeOption;
    setTheme(themeOption);
  }, [setTheme]);

  return null;
}

export default UserStoreInitializer;
