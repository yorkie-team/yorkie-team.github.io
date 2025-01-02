import { useState, useEffect } from 'react';

export type ThemeOption = 'system' | 'light' | 'dark';
const applyTheme = (theme: 'light' | 'dark') => {
  if (theme === 'light') {
    window.document.documentElement.classList.remove('darkmode');
    window.document.documentElement.style.colorScheme = 'light';
  } else {
    window.document.documentElement.classList.add('darkmode');
    window.document.documentElement.style.colorScheme = 'dark';
  }
};
export function useTheme(initialTheme?: ThemeOption) {
  const [theme, setTheme] = useState<ThemeOption | undefined>(initialTheme);

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches ? 'dark' : 'light');
    };

    if (theme === 'dark') {
      applyTheme('dark');
      window.localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      applyTheme('light');
      window.localStorage.setItem('theme', 'light');
    } else if (theme === 'system') {
      window.localStorage.setItem('theme', 'system');
      applyTheme(mediaQueryList.matches ? 'dark' : 'light');
      mediaQueryList.addEventListener('change', handleSystemThemeChange);
    }
    return () => {
      mediaQueryList.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  return { setTheme };
}
