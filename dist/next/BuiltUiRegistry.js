import { jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { BuiltUiThemeProvider } from '../theme/ThemeProvider.js';

function createEmotionCacheEntry(cacheKey) {
    const cache = createCache({ key: cacheKey });
    cache.compat = true;
    const insertedStyleNameSet = new Set();
    const originalInsertFunction = cache.insert;
    cache.insert = (...argumentList) => {
        const serializedStyle = argumentList[1];
        if (serializedStyle && typeof serializedStyle.name === 'string') {
            insertedStyleNameSet.add(serializedStyle.name);
        }
        return originalInsertFunction(...argumentList);
    };
    function flushInsertedStyleNameList() {
        const insertedStyleNameList = Array.from(insertedStyleNameSet);
        insertedStyleNameSet.clear();
        return insertedStyleNameList;
    }
    return { cache, flushInsertedStyleNameList };
}
function BuiltUiRegistry(builtUiRegistryProps) {
    const { theme, children } = builtUiRegistryProps;
    const cacheKey = 'built-ui';
    const [emotionCacheEntry] = useState(() => createEmotionCacheEntry(cacheKey));
    useServerInsertedHTML(() => {
        const insertedStyleNameList = emotionCacheEntry.flushInsertedStyleNameList();
        if (insertedStyleNameList.length === 0)
            return null;
        const compiledStyles = insertedStyleNameList
            .map((styleName) => emotionCacheEntry.cache.inserted[styleName])
            .join('');
        return (jsx("style", { "data-emotion": `${emotionCacheEntry.cache.key} ${insertedStyleNameList.join(' ')}`, dangerouslySetInnerHTML: { __html: compiledStyles } }));
    });
    return (jsx(CacheProvider, { value: emotionCacheEntry.cache, children: jsx(BuiltUiThemeProvider, { theme: theme, children: children }) }));
}

export { BuiltUiRegistry };
//# sourceMappingURL=BuiltUiRegistry.js.map
