import { jsx } from 'react/jsx-runtime';
import styled from '@emotion/styled';

function resolvePaletteTokenToColorValue(builtUiThemePalette, typographyPaletteToken) {
    const tokenPartList = typographyPaletteToken.split('.');
    let currentValue = builtUiThemePalette;
    for (const tokenPart of tokenPartList) {
        if (!currentValue || typeof currentValue !== 'object' || !(tokenPart in currentValue))
            return undefined;
        currentValue = currentValue[tokenPart];
    }
    return typeof currentValue === 'string' ? currentValue : undefined;
}
const TypographyBase = styled('p', {
    shouldForwardProp: (propertyName) => propertyName !== 'variantName' &&
        propertyName !== 'overrideFontFamily' &&
        propertyName !== 'overrideFontWeight' &&
        propertyName !== 'overrideFontVariationSettings' &&
        propertyName !== 'overrideColorToken' &&
        propertyName !== 'overrideColorValue',
})(({ theme, variantName, overrideFontFamily, overrideFontWeight, overrideFontVariationSettings, overrideColorToken, overrideColorValue, }) => {
    const builtUiTheme = theme;
    const typographyVariant = builtUiTheme.typography.variants[variantName] ?? builtUiTheme.typography.variants.body1;
    const resolvedFontFamily = overrideFontFamily ?? builtUiTheme.typography.fontFamily;
    const resolvedFontWeight = overrideFontWeight ?? typographyVariant.fontWeight;
    const fontVariationSettingsFromTheme = builtUiTheme.typography.getFontVariationSettingsByFontWeight?.(resolvedFontWeight);
    const resolvedFontVariationSettings = overrideFontVariationSettings ?? fontVariationSettingsFromTheme ?? `"wght" ${resolvedFontWeight}`;
    const resolvedColorFromToken = overrideColorToken
        ? resolvePaletteTokenToColorValue(builtUiTheme.palette, overrideColorToken)
        : undefined;
    const resolvedColorValue = overrideColorValue ?? resolvedColorFromToken ?? builtUiTheme.palette.text.primary;
    const rem = (px) => `${px / 16}rem`;
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
function Typography(typographyProps) {
    const { component, variant, fontFamily, fontWeight, fontVariationSettings, colorToken, color, children, ...remainingProps } = typographyProps;
    const Component = component ?? 'p';
    const variantName = variant ?? 'body1';
    return (jsx(TypographyBase, { as: Component, variantName: variantName, overrideFontFamily: fontFamily, overrideFontWeight: fontWeight, overrideFontVariationSettings: fontVariationSettings, overrideColorToken: colorToken, overrideColorValue: color, ...remainingProps, children: children }));
}

export { Typography };
//# sourceMappingURL=Typography.js.map
