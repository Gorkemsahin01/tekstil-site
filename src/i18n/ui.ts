import type { Locale } from './types';

export type UiStrings = {
  navDiscover: string;
  navModules: string;
  navVision: string;
  navAkademi: string;
  navEarlyAccess: string;
  navEarlyAccessMobile: string;
  footerTagline: string;
  footerModules: string;
  footerVision: string;
  footerAkademi: string;
  footerContact: string;
  footerCopyright: string;
  footerPrivacy: string;
  footerTerms: string;
  heroStatProduction: string;
  heroStatWorkshop: string;
  heroMockUrl: string;
  /** Hero görseli alt metni */
  heroImageAlt: string;
  modulesEarlyAccessCta: string;
  contactName: string;
  contactCompany: string;
  contactEmail: string;
  contactSubmit: string;
  contactPlaceholderName: string;
  contactPlaceholderCompany: string;
  contactPlaceholderEmail: string;
  akademiBadge: string;
  akademiTitle: string;
  akademiSubtitle: string;
  akademiReadMore: string;
  akademiFeatured: string;
  akademiNewsletterTitle: string;
  akademiNewsletterSubtitle: string;
  akademiNewsletterPlaceholder: string;
  akademiNewsletterButton: string;
  akademiBackToList: string;
  akademiShare: string;
  akademiPostFooter: string;
  akademiLinkCopied: string;
  akademiEmpty: string;
  themeLight: string;
  themeDark: string;
  langTurkish: string;
  langEnglish: string;
};

const tr: UiStrings = {
  navDiscover: 'Keşfet',
  navModules: 'Modüller',
  navVision: 'Vizyon',
  navAkademi: 'Samplify.tr Akademi',
  navEarlyAccess: 'Erken Erişim',
  navEarlyAccessMobile: 'Erken Erişim Talep Et',
  footerTagline: 'Yeni Nesil Tekstil Ür-Ge Platformu.',
  footerModules: 'Modüller',
  footerVision: 'Vizyon',
  footerAkademi: 'Samplify.tr Akademi',
  footerContact: 'İletişim',
  footerCopyright: 'Tüm hakları saklıdır.',
  footerPrivacy: 'Gizlilik',
  footerTerms: 'Şartlar',
  heroStatProduction: 'Üretim Hızı',
  heroStatWorkshop: 'Aktif Kullanıcı',
  heroMockUrl: 'samplify.tr',
  heroImageAlt: 'Samplify.tr ERP arayüzü',
  modulesEarlyAccessCta: 'Erken Erişim İste',
  contactName: 'Ad Soyad',
  contactCompany: 'Firma Adı',
  contactEmail: 'İş E-postası',
  contactSubmit: 'Bekleme Listesine Katıl',
  contactPlaceholderName: 'Ad Soyad',
  contactPlaceholderCompany: 'Şirketiniz',
  contactPlaceholderEmail: 'isim@sirket.com',
  akademiBadge: 'Samplify.tr Akademi',
  akademiTitle: 'Bilgi, üretimin yanında.',
  akademiSubtitle:
    'Tekstil ERP’si, numune süreçleri ve dijital dönüşüm üzerine makaleler, ipuçları ve sektör haberleri.',
  akademiReadMore: 'Devamını oku',
  akademiFeatured: 'Öne çıkan',
  akademiNewsletterTitle: 'Yeni yazılardan haberdar olun',
  akademiNewsletterSubtitle: 'E-posta listemize katılın; akademi içerikleri e-postanıza gelsin.',
  akademiNewsletterPlaceholder: 'ornek@sirket.com',
  akademiNewsletterButton: 'Kaydol',
  akademiBackToList: 'Akademi’ye dön',
  akademiShare: 'Bağlantıyı kopyala',
  akademiPostFooter:
    'Samplify.tr ile numune ve ölçü süreçlerinizi tek çatı altında toplamak için erken erişim listesine katılabilirsiniz.',
  akademiLinkCopied: 'Bağlantı panoya kopyalandı.',
  akademiEmpty: 'Henüz yayınlanmış yazı yok.',
  themeLight: 'Açık tema',
  themeDark: 'Koyu tema',
  langTurkish: 'Türkçe',
  langEnglish: 'English',
};

const en: UiStrings = {
  navDiscover: 'Discover',
  navModules: 'Modules',
  navVision: 'Vision',
  navAkademi: 'Samplify.tr Academy',
  navEarlyAccess: 'Early access',
  navEarlyAccessMobile: 'Request early access',
  footerTagline: 'The new generation textile R&D platform.',
  footerModules: 'Modules',
  footerVision: 'Vision',
  footerAkademi: 'Samplify.tr Academy',
  footerContact: 'Contact',
  footerCopyright: 'All rights reserved.',
  footerPrivacy: 'Privacy',
  footerTerms: 'Terms',
  heroStatProduction: 'Production pace',
  heroStatWorkshop: 'Active users',
  heroMockUrl: 'samplify.tr',
  heroImageAlt: 'Samplify.tr ERP interface preview',
  modulesEarlyAccessCta: 'Request early access',
  contactName: 'Full name',
  contactCompany: 'Company',
  contactEmail: 'Work email',
  contactSubmit: 'Join the waitlist',
  contactPlaceholderName: 'Jane Doe',
  contactPlaceholderCompany: 'Your company',
  contactPlaceholderEmail: 'you@company.com',
  akademiBadge: 'Samplify.tr Academy',
  akademiTitle: 'Knowledge beside production.',
  akademiSubtitle:
    'Articles, tips, and industry news on textile ERP, sample workflows, and digital transformation.',
  akademiReadMore: 'Read more',
  akademiFeatured: 'Featured',
  akademiNewsletterTitle: 'Stay in the loop',
  akademiNewsletterSubtitle: 'Join our list to get new academy posts in your inbox.',
  akademiNewsletterPlaceholder: 'you@company.com',
  akademiNewsletterButton: 'Subscribe',
  akademiBackToList: 'Back to Academy',
  akademiShare: 'Copy link',
  akademiPostFooter:
    'Join the early access list to bring sample and measurement workflows under one roof with Samplify.tr.',
  akademiLinkCopied: 'Link copied to clipboard.',
  akademiEmpty: 'No posts yet.',
  themeLight: 'Light mode',
  themeDark: 'Dark mode',
  langTurkish: 'Türkçe',
  langEnglish: 'English',
};

const byLocale: Record<Locale, UiStrings> = { tr, en };

/** Varsayılan site içeriği + admin düzenlemesi için */
export const DEFAULT_UI_BY_LOCALE: Record<Locale, UiStrings> = { tr, en };

export function getUiStrings(locale: Locale): UiStrings {
  return byLocale[locale];
}

/** Admin formunda tüm alanları sırayla göstermek için */
export const UI_STRING_KEYS = [
  'navDiscover',
  'navModules',
  'navVision',
  'navAkademi',
  'navEarlyAccess',
  'navEarlyAccessMobile',
  'footerTagline',
  'footerModules',
  'footerVision',
  'footerAkademi',
  'footerContact',
  'footerCopyright',
  'footerPrivacy',
  'footerTerms',
  'heroStatProduction',
  'heroStatWorkshop',
  'heroMockUrl',
  'heroImageAlt',
  'modulesEarlyAccessCta',
  'contactName',
  'contactCompany',
  'contactEmail',
  'contactSubmit',
  'contactPlaceholderName',
  'contactPlaceholderCompany',
  'contactPlaceholderEmail',
  'akademiBadge',
  'akademiTitle',
  'akademiSubtitle',
  'akademiReadMore',
  'akademiFeatured',
  'akademiNewsletterTitle',
  'akademiNewsletterSubtitle',
  'akademiNewsletterPlaceholder',
  'akademiNewsletterButton',
  'akademiBackToList',
  'akademiShare',
  'akademiPostFooter',
  'akademiLinkCopied',
  'akademiEmpty',
  'themeLight',
  'themeDark',
  'langTurkish',
  'langEnglish',
] as const satisfies readonly (keyof UiStrings)[];
