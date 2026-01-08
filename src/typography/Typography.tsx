import { ElementType, ReactNode } from 'react';
import styled from '@emotion/styled';
import type { BuiltUiTheme, BuiltUiThemePalette } from '../theme/createTheme';

export type TypographyVariantName = 'body1' | 'body2' | 'h1' | 'h2' | 'h3';

export type TypographyFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type TypographyPaletteToken = {
  [paletteGroupName in keyof BuiltUiThemePalette]: BuiltUiThemePalette[paletteGroupName] extends Record<string, unknown>
    ? `${paletteGroupName & string}.${keyof BuiltUiThemePalette[paletteGroupName] & string}`
    : never;
}[keyof BuiltUiThemePalette];

export type TypographyProps<TypographyComponent extends ElementType> = {
  component?: TypographyComponent;
  variant?: TypographyVariantName;
  fontFamily?: string;
  fontWeight?: TypographyFontWeight;
  fontVariationSettings?: string;
  colorToken?: TypographyPaletteToken;
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'action' | 'warning' | 'bright' | 'light' | 'pure';
  children: ReactNode;
};

type TypographyBaseProps = {
  variantName: TypographyVariantName;
  overrideFontFamily?: string;
  overrideFontWeight?: TypographyFontWeight;
  overrideFontVariationSettings?: string;
  overrideColorToken?: TypographyPaletteToken;
  overrideColorValue?: string;
};

function resolvePaletteTokenToColorValue(
  builtUiThemePalette: BuiltUiThemePalette,
  typographyPaletteToken: TypographyPaletteToken,
): string | undefined {
  const tokenPartList = typographyPaletteToken.split('.');
  let currentValue: unknown = builtUiThemePalette;

  for (const tokenPart of tokenPartList) {
    if (!currentValue || typeof currentValue !== 'object' || !(tokenPart in (currentValue as Record<string, unknown>)))
      return undefined;
    currentValue = (currentValue as Record<string, unknown>)[tokenPart];
  }

  return typeof currentValue === 'string' ? currentValue : undefined;
}

const TypographyBase = styled('p', {
  shouldForwardProp: (propertyName) =>
    propertyName !== 'variantName' &&
    propertyName !== 'overrideFontFamily' &&
    propertyName !== 'overrideFontWeight' &&
    propertyName !== 'overrideFontVariationSettings' &&
    propertyName !== 'overrideColorToken' &&
    propertyName !== 'overrideColorValue',
})<TypographyBaseProps>(({
  theme,
  variantName,
  overrideFontFamily,
  overrideFontWeight,
  overrideFontVariationSettings,
  overrideColorToken,
  overrideColorValue,
}) => {
  const builtUiTheme = theme as BuiltUiTheme;

  const typographyVariant = builtUiTheme.typography.variants[variantName] ?? builtUiTheme.typography.variants.body1;

  const resolvedFontFamily = overrideFontFamily ?? builtUiTheme.typography.fontFamily;
  const resolvedFontWeight = overrideFontWeight ?? (typographyVariant.fontWeight as TypographyFontWeight);

  const fontVariationSettingsFromTheme =
    builtUiTheme.typography.getFontVariationSettingsByFontWeight?.(resolvedFontWeight);

  const resolvedFontVariationSettings =
    overrideFontVariationSettings ?? fontVariationSettingsFromTheme ?? `"wght" ${resolvedFontWeight}`;

  const resolvedColorFromToken = overrideColorToken
    ? resolvePaletteTokenToColorValue(builtUiTheme.palette, overrideColorToken)
    : undefined;
  const resolvedColorValue = overrideColorValue ?? resolvedColorFromToken ?? builtUiTheme.palette.text.primary;

  const rem = (px: number): string => `${px / 16}rem`;

  return {
    fontFamily: resolvedFontFamily,
    fontSize: rem(typographyVariant.fontSize),
    fontWeight: resolvedFontWeight,
    fontVariationSettings: resolvedFontVariationSettings,
    lineHeight: typographyVariant.lineHeight,
    letterSpacing: `${typographyVariant.letterSpacing}em`,
    color: resolvedColorValue,
  };
});

export function Typography<TypographyComponent extends ElementType = 'p'>(
  typographyProps: TypographyProps<TypographyComponent>,
) {
  const {
    component,
    variant,
    fontFamily,
    fontWeight,
    fontVariationSettings,
    colorToken,
    color,
    children,
    ...remainingProps
  } = typographyProps;

  const Component = component ?? 'p';
  const variantName = variant ?? 'body1';

  return (
    <TypographyBase
      as={Component}
      variantName={variantName}
      overrideFontFamily={fontFamily}
      overrideFontWeight={fontWeight}
      overrideFontVariationSettings={fontVariationSettings}
      overrideColorToken={colorToken}
      overrideColorValue={color}
      {...remainingProps}
    >
      {children}
    </TypographyBase>
  );
}
