import { createContext, use } from 'react';

interface IThemeProvider {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeProvider | undefined>(
  undefined
);

export const useThemeContext = () => {
  const ctx = use(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return ctx;
};
