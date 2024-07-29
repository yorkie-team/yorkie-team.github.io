import { useState, useEffect } from 'react';

export type ThemeOption = 'system' | 'light' | 'dark';

const handleTheme = (theme: 'light' | 'dark') => {
  if (theme === 'dark') {
    window.document.body.classList.add('dark');
    window.document.body.classList.add('darkmode');
  } else if (theme === 'light') {
    window.document.body.classList.remove('dark');
    window.document.body.classList.remove('darkmode');
  }
};

export function useTheme(initialTheme?: ThemeOption) {
  const [theme, setTheme] = useState<ThemeOption | undefined>(initialTheme);

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      handleTheme(e.matches ? 'dark' : 'light');
    };

    if (theme === 'dark') {
      handleTheme('dark');
      window.localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      handleTheme('light');
      window.localStorage.setItem('theme', 'light');
    } else if (theme === 'system') {
      handleTheme(mediaQueryList.matches ? 'dark' : 'light');
      window.localStorage.setItem('theme', 'system');
      mediaQueryList.addEventListener('change', handleSystemThemeChange);
    }
    return () => {
      mediaQueryList.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  return { setTheme };
}
