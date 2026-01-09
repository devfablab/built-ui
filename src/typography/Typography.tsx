import { ElementType, ReactNode, createElement, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import type { BuiltUiTheme, BuiltUiThemePalette } from '../theme/createTheme';

export type TypographyVariantName = 'body1' | 'body2' | 'h1' | 'h2' | 'h3';

export type TypographyFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type TypographyTextColorName = keyof BuiltUiThemePalette['text'];

export type TypographyProps = {
  component?: ElementType;
  variant?: TypographyVariantName;
  fontFamily?: string;
  fontWeight?: TypographyFontWeight;
  fontVariationSettings?: string;
  color?: TypographyTextColorName;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'color'>;

type TypographyBaseProps = {
  component: ElementType;
  variantName: TypographyVariantName;
  overrideFontFamily?: string;
  overrideFontWeight?: TypographyFontWeight;
  overrideFontVariationSettings?: string;
  overrideTextColorName?: TypographyTextColorName;
};

type TypographyRootProps = {
  component: ElementType;
  className?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'color'>;

function TypographyRoot(typographyRootProps: TypographyRootProps) {
  const { component, ...remainingProps } = typographyRootProps;
  return createElement(component, remainingProps);
}

function resolveDefaultComponentByVariant(variantName: TypographyVariantName): ElementType {
  if (variantName === 'h1' || variantName === 'h2' || variantName === 'h3') return variantName;
  return 'p';
}

const TypographyBase = styled(TypographyRoot, {
  shouldForwardProp: (propertyName) =>
    propertyName !== 'variantName' &&
    propertyName !== 'overrideFontFamily' &&
    propertyName !== 'overrideFontWeight' &&
    propertyName !== 'overrideFontVariationSettings' &&
    propertyName !== 'overrideTextColorName',
})<TypographyBaseProps>(({
  theme,
  variantName,
  overrideFontFamily,
  overrideFontWeight,
  overrideFontVariationSettings,
  overrideTextColorName,
}) => {
  const builtUiTheme = theme as BuiltUiTheme;
  const typographyVariant = builtUiTheme.typography.variants[variantName] ?? builtUiTheme.typography.variants.body1;

  const resolvedFontFamily = overrideFontFamily ?? builtUiTheme.typography.fontFamily;
  const resolvedFontWeight = overrideFontWeight ?? (typographyVariant.fontWeight as TypographyFontWeight);

  const fontVariationSettingsFromTheme =
    builtUiTheme.typography.getFontVariationSettingsByFontWeight?.(resolvedFontWeight);
  const resolvedFontVariationSettings =
    overrideFontVariationSettings ?? fontVariationSettingsFromTheme ?? `"wght" ${resolvedFontWeight}`;

  const resolvedTextColorName = overrideTextColorName ?? 'primary';
  const resolvedTextColor = builtUiTheme.palette.text[resolvedTextColorName] ?? builtUiTheme.palette.text.primary;

  const rem = (px: number): string => `${px / 16}rem`;

  return {
    fontFamily: resolvedFontFamily,
    fontSize: rem(typographyVariant.fontSize),
    fontWeight: resolvedFontWeight,
    fontVariationSettings: resolvedFontVariationSettings,
    lineHeight: typographyVariant.lineHeight,
    letterSpacing: `${typographyVariant.letterSpacing}em`,
    color: resolvedTextColor,
  };
});

export function Typography(typographyProps: TypographyProps) {
  const { component, variant, fontFamily, fontWeight, fontVariationSettings, color, children, ...remainingProps } =
    typographyProps;

  const variantName = variant ?? 'body1';
  const defaultComponent = resolveDefaultComponentByVariant(variantName);
  const resolvedComponent = component ?? defaultComponent;

  return (
    <TypographyBase
      component={resolvedComponent}
      variantName={variantName}
      overrideFontFamily={fontFamily}
      overrideFontWeight={fontWeight}
      overrideFontVariationSettings={fontVariationSettings}
      overrideTextColorName={color}
      {...remainingProps}
    >
      {children}
    </TypographyBase>
  );
}
