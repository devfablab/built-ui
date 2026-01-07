import { ElementType, ReactNode } from 'react';
import styled from '@emotion/styled';
import type { BuiltUiTheme } from '../theme/createTheme';

export type TypographyVariantName = 'body1' | 'body2' | 'h1' | 'h2' | 'h3';

export type TypographyFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type TypographyProps<TypographyComponent extends ElementType> = {
  component?: TypographyComponent;
  variant?: TypographyVariantName;
  fontFamily?: string;
  fontWeight?: TypographyFontWeight;
  fontVariationSettings?: string;
  children: ReactNode;
};

type TypographyBaseProps = {
  variantName: TypographyVariantName;
  overrideFontFamily?: string;
  overrideFontWeight?: TypographyFontWeight;
  overrideFontVariationSettings?: string;
};

const TypographyBase = styled('p', {
  shouldForwardProp: (propertyName) =>
    propertyName !== 'variantName' &&
    propertyName !== 'overrideFontFamily' &&
    propertyName !== 'overrideFontWeight' &&
    propertyName !== 'overrideFontVariationSettings',
})<TypographyBaseProps>(({
  theme,
  variantName,
  overrideFontFamily,
  overrideFontWeight,
  overrideFontVariationSettings,
}) => {
  const builtUiTheme = theme as BuiltUiTheme;

  const typographyVariant = builtUiTheme.typography.variants[variantName] ?? builtUiTheme.typography.variants.body1;

  const resolvedFontFamily = overrideFontFamily ?? builtUiTheme.typography.fontFamily;
  const resolvedFontWeight = overrideFontWeight ?? (typographyVariant.fontWeight as TypographyFontWeight);

  const fontVariationSettingsFromTheme =
    builtUiTheme.typography.getFontVariationSettingsByFontWeight?.(resolvedFontWeight);

  const resolvedFontVariationSettings =
    overrideFontVariationSettings ?? fontVariationSettingsFromTheme ?? `"wght" ${resolvedFontWeight}`;

  const rem = (px: number): string => `${px / 16}rem`;

  return {
    fontFamily: resolvedFontFamily,
    fontSize: typographyVariant.fontSize,
    fontWeight: resolvedFontWeight,
    fontVariationSettings: resolvedFontVariationSettings,
    lineHeight: rem(typographyVariant.lineHeight),
    letterSpacing: rem(typographyVariant.letterSpacing),
    color: builtUiTheme.palette.text.primary,
  };
});

export function Typography<TypographyComponent extends ElementType = 'p'>(
  typographyProps: TypographyProps<TypographyComponent>,
) {
  const { component, variant, fontFamily, fontWeight, fontVariationSettings, children, ...remainingProps } =
    typographyProps;

  const Component = component ?? 'p';
  const variantName = variant ?? 'body1';

  return (
    <TypographyBase
      as={Component}
      variantName={variantName}
      overrideFontFamily={fontFamily}
      overrideFontWeight={fontWeight}
      overrideFontVariationSettings={fontVariationSettings}
      {...remainingProps}
    >
      {children}
    </TypographyBase>
  );
}
