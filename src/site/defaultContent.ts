import { DEFAULT_UI_BY_LOCALE } from '../i18n/ui';
import {
  DEFAULT_EN_ABOUT,
  DEFAULT_EN_CONTACT,
  DEFAULT_EN_HOME,
  DEFAULT_EN_MODULES,
} from './defaultContentEn';
import type { SiteContent } from './types';

const TR_HOME = {
  heroBadge: "Geleceğin Ür-Ge ve Numune Platformu",
  heroTitleLine1: 'Tekstilde',
  heroTitleHighlight: 'Yeni Bir Çağ.',
  heroSubtitle:
    'Karmaşık Excel tablolarına, kaybolan proto numunelerine ve bitmeyen redlining revizyonlarına veda edin. Samplify.tr ile Ür-Ge sürecinizi hızlandırın, critical path üzerinde tam kontrol sağlayın.',
  primaryCta: 'Bekleme Listesine Katıl',
  secondaryCta: 'Modülleri Keşfet',
  featuresHeading: 'Karmaşayı Reddedin.',
  featuresHeadingAccent: 'Süreci Yönetin.',
  featuresIntro:
    "Samplify.tr, modelhane ile müşteri temsilcisi arasındaki kopukluğu giderir. Tech pack'ten onaya kadar tüm süreci pürüzsüz, dijital bir deneyime dönüştürür.",
  f1Title: 'Esnek Modüler Yapı',
  f1Body:
    'Hantal paketlere zorunlu değilsiniz. Sadece numune departmanınızın bugün ihtiyacı olan çözümlerle başlayın; Ür-Ge süreçleriniz geliştikçe yeni modüller ekleyerek kendi ekosisteminizi adım adım büyütün.',
  f2Title: 'Işık Hızında',
  f2Body:
    'Gerçek zamanlı veri akışı ile anında aksiyon alın. ERP/PLM entegrasyonlarıyla çift yönlü veri senkronizasyonu sağlayın.',
  f3Title: 'Banka Düzeyinde Güvenlik',
  f3Body: 'Tüm tasarımlarınız ve verileriniz bulutta güvende.',
  f4Title: 'Görsel Raporlama',
  f4Body:
    'Verileri okumak hiç bu kadar keyifli olmamıştı. Akıllı dashboardlar ile kontrol sizde.',
  f4LinkLabel: 'Detayları İncele',
  ctaTitle: 'Gelecek Çok Yakında.',
  ctaSubtitle:
    'Samplify.tr ile tekstil numune yönetiminde yeni bir standart belirliyoruz. İlk deneyenlerden olmak için yerinizi ayırtın.',
  ctaButton: 'Erken Erişim Talep Et',
} as const;

const TR_MODULES = {
  badge: 'Geliştirme Aşamasında',
  titleLine1: 'Modüler Yapı.',
  titleLine2: 'Sıfır Karmaşa.',
  intro:
    "Samplify.tr ekosistemi, tekstil Ür-Ge'sinin dinamiklerine uyum sağlayacak esnek bir altyapıyla tasarlandı. İhtiyacınız olan modüllerle başlayın, yeni çözümlerimizle ekosisteminizi sınır tanımadan genişletin.",
  stTitle: 'Trackify',
  stBody:
    'Numune planlama ve üretim sürecini şansa bırakmayın. Kumaş girişinden PP Sample onayına kadar her adımı tek bir platformda planlayın ve görselleştirin. Atölye, modelhane ve ofis arasındaki duvarları yıkarak critical path üzerinde tam kontrol sağlayın.',
  stFeatures: [
    'Görsel Kanban Panoları',
    'Gerçek Zamanlı Süreç Planlama',
    'Revizyon Zaman Çizelgesi',
  ] as [string, string, string],
  stCardTag: 'v1.0 Yakında',
  stCardTitle: 'Numune Yönetimi Yeniden Tanımlanıyor',
  mfTitle: 'Measurify',
  mfBody:
    'Kalıp ve ölçü yönetiminde sıfır hata politikası. Dinamik ölçü tabloları, otomatik tolerans hesaplamaları ve tek tıkla Tech Pack oluşturma.',
  mfFeatures: [
    'Akıllı Çekmezlik Hesaplama',
    'Versiyon Karşılaştırma',
    'PDF Tech Pack Çıktısı',
  ] as [string, string, string],
  mfCardTag: 'v1.0 Yakında',
  mfCardTitle: 'Milimetrik Hassasiyet',
} as const;

const TR_ABOUT = {
  titleLine1: 'Tekstilin',
  titleLine2: 'Dijital Geleceği.',
  visionLabel: 'Vizyonumuz',
  visionTitle:
    "Geleneksel tekstil Ür-Ge'sini, modern yazılımın gücü ve çevikliğiyle baştan yaratıyoruz.",
  whyLabel: 'Neden Samplify.tr?',
  whyBody:
    'Çünkü biz sadece masa başında kod yazmıyoruz; sahayı yaşıyoruz. Atölyenin tozunu, o first-hit numuneyi yetiştirme telaşını ve tek bir ölçü hatasının devasa maliyetini çok iyi biliyoruz. Sektörün içinden gelen bu tecrübeyi, karmaşayı bitiren çevik web teknolojileriyle harmanlıyoruz.',
  ctaTitle: 'Hikayenin Parçası Olun',
  ctaBody:
    'Samplify.tr geliştirme aşamasında. Sektörü değiştirecek bu ürünün ilk kullanıcılarından olmak için bekleme listemize katılın.',
  ctaButton: 'Erken Erişim Talep Et',
} as const;

const TR_CONTACT = {
  badge: 'Erken Erişim',
  titleLine1: 'Geleceğe',
  titleHighlight: 'Yer Ayırtın.',
  intro:
    'Samplify.tr kapalı beta sürecine girmek üzere. Sınırlı sayıdaki ilk kullanıcılarımızdan olmak ve lansman avantajlarından yararlanmak için formu doldurun.',
  email: 'info@samplify.tr',
  location: 'İstanbul, Türkiye',
} as const;

export const DEFAULT_SITE_CONTENT: SiteContent = {
  brandDisplay: { tr: 'Samplify.tr', en: 'Samplify.tr' },
  brandFooterWatermark: { tr: 'Samplify.tr', en: 'Samplify.tr' },
  ui: {
    tr: { ...DEFAULT_UI_BY_LOCALE.tr },
    en: { ...DEFAULT_UI_BY_LOCALE.en },
  },
  home: { tr: { ...TR_HOME }, en: { ...DEFAULT_EN_HOME } },
  modules: { tr: { ...TR_MODULES }, en: { ...DEFAULT_EN_MODULES } },
  about: { tr: { ...TR_ABOUT }, en: { ...DEFAULT_EN_ABOUT } },
  contact: { tr: { ...TR_CONTACT }, en: { ...DEFAULT_EN_CONTACT } },
};
