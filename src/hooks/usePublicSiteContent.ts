import { useMemo } from 'react';
import { useSiteContent } from '../contexts/SiteContentContext';
import { useLocale } from '../contexts/LocaleContext';
import type { SiteContentSlice } from '../site/types';

/**
 * Ziyaretçi sayfaları: seçilen dile göre tek dil dilimi (home, modüller, marka vb.).
 */
export function usePublicSiteContent(): { content: SiteContentSlice } {
  const { content } = useSiteContent();
  const { locale } = useLocale();

  const slice = useMemo(
    (): SiteContentSlice => ({
      brandDisplay: content.brandDisplay[locale],
      brandFooterWatermark: content.brandFooterWatermark[locale],
      home: content.home[locale],
      modules: content.modules[locale],
      about: content.about[locale],
      contact: content.contact[locale],
    }),
    [locale, content]
  );

  return { content: slice };
}
