import { useState, useEffect } from 'react';

export type ThemeOption = 'system' | 'light' | 'dark';
export function useTheme(initialTheme?: ThemeOption) {
  const [theme, setTheme] = useState<ThemeOption | undefined>(initialTheme);

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        window.document.body.classList.add('darkmode');
      } else {
        window.document.body.classList.remove('darkmode');
      }
    };

    if (theme === 'dark') {
      window.document.body.classList.add('darkmode');
      document.documentElement.setAttribute('data-theme', 'dark');
      window.localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      window.document.body.classList.remove('darkmode');
      window.localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else if (theme === 'system') {
      window.localStorage.setItem('theme', 'system');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        window.document.body.classList.add('darkmode');
      }
      mediaQueryList.addEventListener('change', handleSystemThemeChange);
    }
    return () => {
      mediaQueryList.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  return { setTheme };
}
