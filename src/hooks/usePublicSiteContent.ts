import { useMemo } from 'react';
import { useSiteContent } from '../contexts/SiteContentContext';
import { useLocale } from '../contexts/LocaleContext';
import { DEFAULT_SITE_CONTENT_EN } from '../site/defaultContentEn';
import type { SiteContent } from '../site/types';

/**
 * Public sayfalar: TR için CMS (localStorage) içeriği; EN için kod içi İngilizce varsayılanlar.
 * Admin düzenlemeleri yalnızca Türkçe görünümde yansır.
 */
export function usePublicSiteContent(): { content: SiteContent } {
  const { content } = useSiteContent();
  const { locale } = useLocale();

  const display = useMemo(
    () => (locale === 'en' ? DEFAULT_SITE_CONTENT_EN : content),
    [locale, content]
  );

  return { content: display };
}
