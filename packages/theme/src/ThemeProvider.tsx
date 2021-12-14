import React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { useTheme } from './hooks';
import { darkTheme, lightTheme } from './theme';

export const ThemeProvider: React.FC = ({ children }) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>;
};
