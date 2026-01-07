import { jsx } from 'react/jsx-runtime';
import { ThemeProvider } from '@emotion/react';

function BuiltUiThemeProvider(builtUiThemeProviderProps) {
    const { theme, children } = builtUiThemeProviderProps;
    return jsx(ThemeProvider, { theme: theme, children: children });
}

export { BuiltUiThemeProvider };
//# sourceMappingURL=ThemeProvider.js.map
