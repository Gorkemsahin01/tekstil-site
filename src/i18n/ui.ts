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
  contactPhone: string;
  contactSubmit: string;
  contactPlaceholderName: string;
  contactPlaceholderCompany: string;
  contactPlaceholderEmail: string;
  contactPlaceholderPhone: string;
  contactJobTitle: string;
  contactPlaceholderJobTitle: string;
  /** Bekleme listesi — API ile gönderildiğinde toast */
  waitlistSentTitle: string;
  waitlistSentApi: string;
  /** API kapalıyken mailto açıldığında toast (gönder kullanıcıda) */
  waitlistSentMailto: string;
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
  navAkademi: 'Academify',
  navEarlyAccess: 'Erken Erişim',
  navEarlyAccessMobile: 'Erken Erişim Talep Et',
  footerTagline: 'Dikişli Ürünler Endüstrisi için Yeni Nesil Ür-Ge Platformu.',
  footerModules: 'Modüller',
  footerVision: 'Vizyon',
  footerAkademi: 'Academify',
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
  contactPhone: 'Telefon',
  contactSubmit: 'Bekleme Listesine Katıl',
  contactPlaceholderName: 'Ad Soyad',
  contactPlaceholderCompany: 'Şirketiniz',
  contactPlaceholderEmail: 'isim@sirket.com',
  contactPlaceholderPhone: '+90 5xx xxx xx xx',
  contactJobTitle: 'Görev / Unvan',
  contactPlaceholderJobTitle: 'Görev seçin',
  waitlistSentTitle: 'Başarılı',
  waitlistSentApi:
    'Başvurunuz başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.',
  waitlistSentMailto:
    'E-posta uygulamanız açıldı. Gönder düğmesine basarak başvurunuzu tamamlayın.',
  akademiBadge: 'ACADEMİFY BİLGİ HAVUZU',
  akademiTitle: 'Bilgi, Sahada Yanınızda.',
  akademiSubtitle:
    'Dikişli Ürünler Endüstrisinin karmaşık Ür-Ge dinamiklerini çözüyoruz. Numune süreçleri, critical path yönetimi ve dijital dönüşüm üzerine pratik makaleler, saha ipuçları ve güncel sektör haberleri.',
  akademiReadMore: 'Devamını oku',
  akademiFeatured: 'Öne çıkan',
  akademiNewsletterTitle: 'Yeni yazılardan haberdar olun',
  akademiNewsletterSubtitle: 'E-posta listemize katılın; akademi içerikleri e-postanıza gelsin.',
  akademiNewsletterPlaceholder: 'ornek@sirket.com',
  akademiNewsletterButton: 'Kaydol',
  akademiBackToList: 'Academify’a dön',
  akademiShare: 'Bağlantıyı kopyala',
  akademiPostFooter:
    'Dikişli Ürünler Endüstrisinde numune sürecini Excel tabloları ve mailler arasına sıkıştırmak, büyüyen ekipler için en büyük darboğazdır. “Kim, neyi onayladı?” karmaşasına son verip, görünmeyen gecikmelerin maliyetini nasıl sıfırlayabileceğinizi keşfedin.',
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
  navAkademi: 'Academify',
  navEarlyAccess: 'Early access',
  navEarlyAccessMobile: 'Request early access',
  footerTagline: 'A new-generation R&D platform for the stitched products industry.',
  footerModules: 'Modules',
  footerVision: 'Vision',
  footerAkademi: 'Academify',
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
  contactPhone: 'Phone',
  contactSubmit: 'Join the waitlist',
  contactPlaceholderName: 'Jane Doe',
  contactPlaceholderCompany: 'Your company',
  contactPlaceholderEmail: 'you@company.com',
  contactPlaceholderPhone: '+90 5xx xxx xx xx',
  contactJobTitle: 'Role / title',
  contactPlaceholderJobTitle: 'Select your role',
  waitlistSentTitle: 'Success',
  waitlistSentApi: 'Your application was sent successfully. We will get back to you shortly.',
  waitlistSentMailto:
    'Your email app should open. Press Send to finish submitting your application.',
  akademiBadge: 'ACADEMIFY KNOWLEDGE HUB',
  akademiTitle: 'Knowledge with you in the field.',
  akademiSubtitle:
    'We untangle the complex R&D dynamics of the sewn products industry. Practical articles, field tips, and up-to-date industry news on sample workflows, critical path management, and digital transformation.',
  akademiReadMore: 'Read more',
  akademiFeatured: 'Featured',
  akademiNewsletterTitle: 'Stay in the loop',
  akademiNewsletterSubtitle: 'Join our list to get new academy posts in your inbox.',
  akademiNewsletterPlaceholder: 'you@company.com',
  akademiNewsletterButton: 'Subscribe',
  akademiBackToList: 'Back to Academify',
  akademiShare: 'Copy link',
  akademiPostFooter:
    'Squeezing the sample process between Excel sheets and emails is the biggest bottleneck for growing teams in the sewn products industry. End the “who approved what?” chaos and discover how you can reset the cost of invisible delays.',
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
  'contactPhone',
  'contactSubmit',
  'contactPlaceholderName',
  'contactPlaceholderCompany',
  'contactPlaceholderEmail',
  'contactPlaceholderPhone',
  'contactJobTitle',
  'contactPlaceholderJobTitle',
  'waitlistSentTitle',
  'waitlistSentApi',
  'waitlistSentMailto',
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
