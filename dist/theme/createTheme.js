function createDefaultThemeTypography() {
    return {
        fontFamily: 'system-ui',
        getFontVariationSettingsByFontWeight: undefined,
        variants: {
            body1: { fontSize: 16, fontWeight: 400, lineHeight: 24, letterSpacing: 0 },
            body2: { fontSize: 14, fontWeight: 400, lineHeight: 20, letterSpacing: 0 },
            h1: { fontSize: 32, fontWeight: 700, lineHeight: 40, letterSpacing: 0 },
            h2: { fontSize: 24, fontWeight: 700, lineHeight: 32, letterSpacing: 0 },
        },
    };
}
function createDefaultThemePalette(themeMode) {
    if (themeMode === 'dark') {
        return {
            mode: 'dark',
            primary: { main: '#7aa7ff', contrastText: '#0b1020' },
            secondary: { main: '#a78bfa', contrastText: '#0b1020' },
            info: { main: '#38bdf8', contrastText: '#06121a' },
            background: { default: '#0b1020', paper: '#111a33' },
            text: {
                primary: '#333333',
                secondary: '#777777',
                tertiary: '#B0B0B0',
                accent: '#8C5EFF',
                action: '#3A5EFF',
                warning: '#E74C3C',
                bright: '#FCFCFB',
                light: '#F5F5F5',
                pure: '#EDEDED',
            },
        };
    }
    return {
        mode: 'light',
        primary: { main: '#2563eb', contrastText: '#ffffff' },
        secondary: { main: '#7c3aed', contrastText: '#ffffff' },
        info: { main: '#0284c7', contrastText: '#ffffff' },
        background: { default: '#ffffff', paper: '#f7f7f7' },
        text: {
            primary: '#F2F2F2',
            secondary: '#F6F6F6',
            tertiary: '#EDEDED',
            accent: '#8C5EFF',
            action: '#3A5EFF',
            warning: '#E74C3C',
            bright: '#212529',
            light: '#222327',
            pure: '#575757',
        },
    };
}
function mergeRecord(baseRecord, overrideRecord) {
    if (!overrideRecord)
        return baseRecord;
    return { ...baseRecord, ...overrideRecord };
}
function createTheme(themeMode, builtUiThemeInput) {
    const defaultPalette = createDefaultThemePalette(themeMode);
    const defaultTypography = createDefaultThemeTypography();
    const spacingUnitValue = builtUiThemeInput?.spacingUnitValue ?? 8;
    const mergedPalette = {
        ...defaultPalette,
        ...builtUiThemeInput?.palette,
        mode: themeMode,
        primary: {
            ...defaultPalette.primary,
            ...builtUiThemeInput?.palette?.primary,
        },
        secondary: {
            ...defaultPalette.secondary,
            ...builtUiThemeInput?.palette?.secondary,
        },
        info: { ...defaultPalette.info, ...builtUiThemeInput?.palette?.info },
        background: {
            ...defaultPalette.background,
            ...builtUiThemeInput?.palette?.background,
        },
        text: { ...defaultPalette.text, ...builtUiThemeInput?.palette?.text },
    };
    const mergedTypography = {
        ...defaultTypography,
        ...builtUiThemeInput?.typography,
        variants: mergeRecord(defaultTypography.variants, builtUiThemeInput?.typography?.variants),
    };
    return {
        palette: mergedPalette,
        typography: mergedTypography,
        spacing: (spacingUnit) => spacingUnit * spacingUnitValue,
    };
}

export { createTheme };
//# sourceMappingURL=createTheme.js.map
