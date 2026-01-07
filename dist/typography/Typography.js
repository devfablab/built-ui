import { jsx } from 'react/jsx-runtime';
import styled from '@emotion/styled';

const TypographyBase = styled('p', {
    shouldForwardProp: (propertyName) => propertyName !== 'variantName' &&
        propertyName !== 'overrideFontFamily' &&
        propertyName !== 'overrideFontWeight' &&
        propertyName !== 'overrideFontVariationSettings',
})(({ theme, variantName, overrideFontFamily, overrideFontWeight, overrideFontVariationSettings, }) => {
    const builtUiTheme = theme;
    const typographyVariant = builtUiTheme.typography.variants[variantName] ?? builtUiTheme.typography.variants.body1;
    const resolvedFontFamily = overrideFontFamily ?? builtUiTheme.typography.fontFamily;
    const resolvedFontWeight = overrideFontWeight ?? typographyVariant.fontWeight;
    const fontVariationSettingsFromTheme = builtUiTheme.typography.getFontVariationSettingsByFontWeight?.(resolvedFontWeight);
    const resolvedFontVariationSettings = overrideFontVariationSettings ?? fontVariationSettingsFromTheme ?? `"wght" ${resolvedFontWeight}`;
    const rem = (px) => `${px / 16}rem`;
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
function Typography(typographyProps) {
    const { component, variant, fontFamily, fontWeight, fontVariationSettings, children, ...remainingProps } = typographyProps;
    const Component = component ?? 'p';
    const variantName = variant ?? 'body1';
    return (jsx(TypographyBase, { as: Component, variantName: variantName, overrideFontFamily: fontFamily, overrideFontWeight: fontWeight, overrideFontVariationSettings: fontVariationSettings, ...remainingProps, children: children }));
}

export { Typography };
//# sourceMappingURL=Typography.js.map
