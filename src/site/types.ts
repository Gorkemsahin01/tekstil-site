import type { UiStrings } from '../i18n/ui';

export type HomeContent = {
  heroBadge: string;
  heroTitleLine1: string;
  /** İkinci satır (ör. “Endüstrisinde”) — boş bırakılırsa Hero’da gösterilmez */
  heroTitleLine2: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  /** Hero sol yüzen kart — istatistik değeri (örn. +45%) */
  heroStatProductionValue: string;
  /** Hero sağ yüzen kart — istatistik değeri (örn. 148/196) */
  heroStatWorkshopValue: string;
  primaryCta: string;
  secondaryCta: string;
  featuresHeading: string;
  featuresHeadingAccent: string;
  featuresIntro: string;
  f1Title: string;
  f1Body: string;
  f2Title: string;
  f2Body: string;
  f3Title: string;
  f3Body: string;
  f4Title: string;
  f4Body: string;
  f4LinkLabel: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
};

export type ModulesContent = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  intro: string;
  stTitle: string;
  stBody: string;
  stFeatures: [string, string, string];
  stCardTag: string;
  stCardTitle: string;
  mfTitle: string;
  mfBody: string;
  mfFeatures: [string, string, string];
  mfCardTag: string;
  mfCardTitle: string;
};

export type AboutContent = {
  titleLine1: string;
  titleLine2: string;
  visionLabel: string;
  visionTitle: string;
  whyLabel: string;
  whyBody: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

export type ContactContent = {
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  intro: string;
  email: string;
  location: string;
};

/** localStorage / API’de saklanan tam yapı (TR + EN) */
export type SiteContent = {
  brandDisplay: { tr: string; en: string };
  brandFooterWatermark: { tr: string; en: string };
  ui: { tr: UiStrings; en: UiStrings };
  home: { tr: HomeContent; en: HomeContent };
  modules: { tr: ModulesContent; en: ModulesContent };
  about: { tr: AboutContent; en: AboutContent };
  contact: { tr: ContactContent; en: ContactContent };
};

/** Seçilen dile göre düz görünüm (Hero, sayfalar) */
export type SiteContentSlice = {
  brandDisplay: string;
  brandFooterWatermark: string;
  home: HomeContent;
  modules: ModulesContent;
  about: AboutContent;
  contact: ContactContent;
};
