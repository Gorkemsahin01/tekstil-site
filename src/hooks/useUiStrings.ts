import { useLocale } from '../contexts/LocaleContext';
import { useSiteContent } from '../contexts/SiteContentContext';
import { getUiStrings } from '../i18n/ui';

export function useUiStrings() {
  const { locale } = useLocale();
  const { content } = useSiteContent();
  const fallback = getUiStrings(locale);
  const fromSite = content.ui[locale];
  return { ...fallback, ...fromSite };
}
