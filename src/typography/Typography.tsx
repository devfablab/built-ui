import React, { ElementType, ReactNode } from 'react';
import styled from '@emotion/styled';
import type { BuiltUiTheme } from '../theme/createTheme';

export type TypographyVariantName = 'body1' | 'body2' | 'h1' | 'h2';

export type TypographyProps<TypographyComponent extends ElementType> = {
  component?: TypographyComponent;
  variant?: TypographyVariantName;
  children: ReactNode;
};

type TypographyBaseProps = {
  variantName: TypographyVariantName;
};

const TypographyBase = styled('span', {
  shouldForwardProp: (propertyName) => propertyName !== 'variantName',
})<TypographyBaseProps>(({ theme, variantName }) => {
  const builtUiTheme = theme as BuiltUiTheme;
  const typographyVariant = builtUiTheme.typography.variants[variantName] ?? builtUiTheme.typography.variants.body1;

  return {
    fontFamily: builtUiTheme.typography.fontFamily,
    fontSize: typographyVariant.fontSize,
    fontWeight: typographyVariant.fontWeight,
    lineHeight: `${typographyVariant.lineHeight}px`,
    letterSpacing: `${typographyVariant.letterSpacing}px`,
    color: builtUiTheme.palette.text.primary,
  };
});

export function Typography<TypographyComponent extends ElementType = 'span'>(
  typographyProps: TypographyProps<TypographyComponent>,
) {
  const { component, variant, children } = typographyProps;
  const Component = component ?? 'span';
  const variantName = variant ?? 'body1';

  return (
    <TypographyBase as={Component} variantName={variantName}>
      {children}
    </TypographyBase>
  );
}
