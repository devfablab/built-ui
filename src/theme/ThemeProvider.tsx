import { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import type { BuiltUiTheme } from './createTheme';

export type BuiltUiThemeProviderProps = {
  theme: BuiltUiTheme;
  children: ReactNode;
};

export function BuiltUiThemeProvider(builtUiThemeProviderProps: BuiltUiThemeProviderProps) {
  const { theme, children } = builtUiThemeProviderProps;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
