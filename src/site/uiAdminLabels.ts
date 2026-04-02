import type { UiStrings } from '../i18n/ui';

/** Admin formunda gösterilen Türkçe alan başlıkları */
export const UI_ADMIN_LABELS: Record<keyof UiStrings, string> = {
  navDiscover: 'Menü: Keşfet',
  navModules: 'Menü: Modüller',
  navVision: 'Menü: Vizyon',
  navAkademi: 'Menü: Akademi',
  navEarlyAccess: 'Üst bar: Erken erişim butonu',
  navEarlyAccessMobile: 'Mobil menü: Erken erişim',
  footerTagline: 'Footer: kısa slogan',
  footerModules: 'Footer link: Modüller',
  footerVision: 'Footer link: Vizyon',
  footerAkademi: 'Footer link: Akademi',
  footerContact: 'Footer link: İletişim',
  footerCopyright: 'Footer: telif cümlesi (marka adından sonra)',
  footerPrivacy: 'Footer: Gizlilik',
  footerTerms: 'Footer: Şartlar',
  heroStatProduction: 'Hero: istatistik — üretim etiketi',
  heroStatWorkshop: 'Hero: istatistik — kullanıcı etiketi',
  heroMockUrl: 'Hero: tarayıcı çubuğu örnek URL',
  heroImageAlt: 'Hero: ana görsel alt metni',
  modulesEarlyAccessCta: 'Modüller sayfası: erken erişim linki',
  contactName: 'İletişim formu: Ad Soyad etiketi',
  contactCompany: 'İletişim formu: Firma etiketi',
  contactEmail: 'İletişim formu: E-posta etiketi',
  contactSubmit: 'İletişim formu: Gönder butonu',
  contactPlaceholderName: 'İletişim formu: Ad placeholder',
  contactPlaceholderCompany: 'İletişim formu: Firma placeholder',
  contactPlaceholderEmail: 'İletişim formu: E-posta placeholder',
  akademiBadge: 'Akademi: üst rozet',
  akademiTitle: 'Akademi: ana başlık',
  akademiSubtitle: 'Akademi: alt başlık',
  akademiReadMore: 'Akademi: Devamını oku',
  akademiFeatured: 'Akademi: Öne çıkan etiketi',
  akademiNewsletterTitle: 'Akademi: bülten başlığı',
  akademiNewsletterSubtitle: 'Akademi: bülten açıklaması',
  akademiNewsletterPlaceholder: 'Akademi: bülten e-posta placeholder',
  akademiNewsletterButton: 'Akademi: bülten butonu',
  akademiBackToList: 'Yazı: Akademi’ye dön',
  akademiShare: 'Yazı: Bağlantıyı kopyala',
  akademiPostFooter: 'Yazı altı: bilgi paragrafı',
  akademiLinkCopied: 'Toast: bağlantı kopyalandı',
  akademiEmpty: 'Yazı yokken gösterilen metin',
  themeLight: 'Erişilebilirlik: Açık tema',
  themeDark: 'Erişilebilirlik: Koyu tema',
  langTurkish: 'Erişilebilirlik: Türkçe',
  langEnglish: 'Erişilebilirlik: English',
};

const MULTILINE_KEYS = new Set<keyof UiStrings>([
  'footerTagline',
  'akademiSubtitle',
  'akademiPostFooter',
  'akademiNewsletterSubtitle',
]);

export function isUiFieldMultiline(key: keyof UiStrings): boolean {
  return MULTILINE_KEYS.has(key);
}
