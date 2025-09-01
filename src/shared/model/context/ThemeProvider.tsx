import { useTheme } from '@/shared/hooks/use-theme';
import { useEffect } from 'react';
import { ThemeContext } from './use-theme-ctx';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};
