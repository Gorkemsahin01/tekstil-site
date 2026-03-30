import { useLocale } from '../contexts/LocaleContext';
import { getUiStrings } from '../i18n/ui';

export function useUiStrings() {
  const { locale } = useLocale();
  return getUiStrings(locale);
}
