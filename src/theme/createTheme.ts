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

function createDefaultThemeTypography(): BuiltUiThemeTypography {
  return {
    fontFamily: 'system-ui',
    variants: {
      body1: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 24,
        letterSpacing: 0,
      },
      body2: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 20,
        letterSpacing: 0,
      },
      h1: { fontSize: 32, fontWeight: 700, lineHeight: 40, letterSpacing: 0 },
      h2: { fontSize: 24, fontWeight: 700, lineHeight: 32, letterSpacing: 0 },
    },
  };
}

function createDefaultThemePalette(themeMode: BuiltUiThemeMode): BuiltUiThemePalette {
  if (themeMode === 'dark') {
    return {
      mode: 'dark',
      primary: { main: '#7aa7ff', contrastText: '#0b1020' },
      secondary: { main: '#a78bfa', contrastText: '#0b1020' },
      info: { main: '#38bdf8', contrastText: '#06121a' },
      background: { default: '#0b1020', paper: '#111a33' },
      text: { primary: '#e5e7eb', secondary: '#a3a3a3' },
    };
  }

  return {
    mode: 'light',
    primary: { main: '#2563eb', contrastText: '#ffffff' },
    secondary: { main: '#7c3aed', contrastText: '#ffffff' },
    info: { main: '#0284c7', contrastText: '#ffffff' },
    background: { default: '#ffffff', paper: '#f7f7f7' },
    text: { primary: '#111827', secondary: '#6b7280' },
  };
}

function mergeRecord(
  baseRecord: Record<string, BuiltUiThemeTypographyVariant>,
  overrideRecord?: Record<string, BuiltUiThemeTypographyVariant>,
): Record<string, BuiltUiThemeTypographyVariant> {
  if (!overrideRecord) return baseRecord;
  return { ...baseRecord, ...overrideRecord };
}

export function createTheme(themeMode: BuiltUiThemeMode, builtUiThemeInput?: BuiltUiThemeInput): BuiltUiTheme {
  const defaultPalette = createDefaultThemePalette(themeMode);
  const defaultTypography = createDefaultThemeTypography();

  const spacingUnitValue = builtUiThemeInput?.spacingUnitValue ?? 8;

  const mergedPalette: BuiltUiThemePalette = {
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

  const mergedTypography: BuiltUiThemeTypography = {
    ...defaultTypography,
    ...builtUiThemeInput?.typography,
    variants: mergeRecord(defaultTypography.variants, builtUiThemeInput?.typography?.variants),
  };

  return {
    palette: mergedPalette,
    typography: mergedTypography,
    spacing: (spacingUnit: number) => spacingUnit * spacingUnitValue,
  };
}
