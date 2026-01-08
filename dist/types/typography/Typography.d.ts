import { ElementType, ReactNode } from 'react';
import type { BuiltUiThemePalette } from '../theme/createTheme';
export type TypographyVariantName = 'body1' | 'body2' | 'h1' | 'h2' | 'h3';
export type TypographyFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type TypographyPaletteToken = {
    [paletteGroupName in keyof BuiltUiThemePalette]: BuiltUiThemePalette[paletteGroupName] extends Record<string, unknown> ? `${paletteGroupName & string}.${keyof BuiltUiThemePalette[paletteGroupName] & string}` : never;
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
export declare function Typography<TypographyComponent extends ElementType = 'p'>(typographyProps: TypographyProps<TypographyComponent>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Typography.d.ts.map