export type BuiltUiThemeMode = 'light' | 'dark';
export type BuiltUiThemePaletteColor = {
    main: string;
    contrastText: string;
};
export type BuiltUiThemePalette = {
    mode: BuiltUiThemeMode;
    primary: BuiltUiThemePaletteColor;
    secondary: BuiltUiThemePaletteColor;
    info: BuiltUiThemePaletteColor;
    background: {
        default: string;
        paper: string;
    };
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        accent: string;
        action: string;
        warning: string;
        bright: string;
        light: string;
        pure: string;
    };
};
export type BuiltUiThemeTypographyVariant = {
    fontSize: number;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: number;
};
export type BuiltUiThemeTypography = {
    fontFamily: string;
    getFontVariationSettingsByFontWeight?: (fontWeight: number) => string | undefined;
    variants: Record<string, BuiltUiThemeTypographyVariant>;
};
export type BuiltUiTheme = {
    palette: BuiltUiThemePalette;
    typography: BuiltUiThemeTypography;
    spacing: (spacingUnit: number) => number;
};
export type BuiltUiThemeInput = {
    palette?: Partial<BuiltUiThemePalette>;
    typography?: Partial<BuiltUiThemeTypography>;
    spacingUnitValue?: number;
};
export declare function createTheme(themeMode: BuiltUiThemeMode, builtUiThemeInput?: BuiltUiThemeInput): BuiltUiTheme;
//# sourceMappingURL=createTheme.d.ts.map