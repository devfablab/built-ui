import { ElementType, ReactNode } from 'react';
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
export declare function Typography<TypographyComponent extends ElementType = 'p'>(typographyProps: TypographyProps<TypographyComponent>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Typography.d.ts.map