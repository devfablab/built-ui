import { ReactNode, useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { BuiltUiThemeProvider } from '../theme/ThemeProvider';
import type { BuiltUiTheme } from '../theme/createTheme';

export type BuiltUiRegistryProps = {
  theme: BuiltUiTheme;
  children: ReactNode;
};

type EmotionCacheEntry = {
  cache: ReturnType<typeof createCache>;
  flushInsertedStyleNameList: () => string[];
};

function createEmotionCacheEntry(cacheKey: string): EmotionCacheEntry {
  const cache = createCache({ key: cacheKey });
  cache.compat = true;

  const insertedStyleNameSet = new Set<string>();
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

export function BuiltUiRegistry(builtUiRegistryProps: BuiltUiRegistryProps) {
  const { theme, children } = builtUiRegistryProps;

  const cacheKey = 'built-ui';

  const [emotionCacheEntry] = useState<EmotionCacheEntry>(() => createEmotionCacheEntry(cacheKey));

  useServerInsertedHTML(() => {
    const insertedStyleNameList = emotionCacheEntry.flushInsertedStyleNameList();
    if (insertedStyleNameList.length === 0) return null;

    const compiledStyles = insertedStyleNameList
      .map((styleName) => emotionCacheEntry.cache.inserted[styleName])
      .join('');

    return (
      <style
        data-emotion={`${emotionCacheEntry.cache.key} ${insertedStyleNameList.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: compiledStyles }}
      />
    );
  });

  return (
    <CacheProvider value={emotionCacheEntry.cache}>
      <BuiltUiThemeProvider theme={theme}>{children}</BuiltUiThemeProvider>
    </CacheProvider>
  );
}
