import { DEFAULT_UI_BY_LOCALE } from '../i18n/ui';
import {
  DEFAULT_EN_ABOUT,
  DEFAULT_EN_CONTACT,
  DEFAULT_EN_HOME,
  DEFAULT_EN_MODULES,
} from './defaultContentEn';
import type { SiteContent } from './types';

const TR_HOME = {
  heroBadge: 'Geleceğin Ür-Ge Platformu',
  heroTitleLine1: 'Dikişli Ürünler',
  heroTitleLine2: 'Endüstrisinde',
  heroTitleHighlight: 'Yeni Bir Çağ.',
  heroSubtitle:
    'Karmaşık Excel tablolarına, kaybolan proto numunelerine ve bitmeyen redlining revizyonlarına veda edin. Samplify.tr ile Ür-Ge sürecinizi hızlandırın, Critical Path üzerinde tam kontrol sağlayın.',
  heroStatProductionValue: '+45%',
  heroStatWorkshopValue: '148/196',
  primaryCta: 'Bekleme Listesine Katıl',
  secondaryCta: 'Modülleri Keşfet',
  featuresHeading: 'Karmaşayı Reddedin.',
  featuresHeadingAccent: 'Süreci Yönetin.',
  featuresIntro:
    "Samplify.tr, modelhane ile müşteri temsilcisi arasındaki kopukluğu giderir. Tech pack'ten onaya kadar tüm süreci pürüzsüz, dijital bir deneyime dönüştürür.",
  f1Title: 'Esnek Modüler Yapı',
  f1Body:
    'Hantal paketlere zorunlu değilsiniz. Sadece numune departmanınızın bugün ihtiyacı olan çözümlerle başlayın; Ür-Ge süreçleriniz geliştikçe yeni modüller ekleyerek kendi ekosisteminizi adım adım büyütün.',
  f2Title: 'Kesintisiz Senkronizasyon',
  f2Body:
    'Gerçek zamanlı veri akışı ile sahada anında aksiyon alın. Mevcut ERP/PLM sistemlerinizle tam entegrasyon sağlayarak, departmanlar arası çift yönlü veri senkronizasyonu kurun ve manuel veri girişini sıfırlayın.',
  f3Title: 'Banka Düzeyinde Güvenlik',
  f3Body:
    'Tüm tasarımlarınız, tech pack detaylarınız ve fikri mülkiyetiniz bulutta %100 güvende. Verilerinize sadece yetkilendirdiğiniz kişiler ulaşır.',
  f4Title: 'Dinamik Görsel Raporlama',
  f4Body:
    "Süreçteki darboğazları tek bakışta tespit edin. Akıllı dashboard'lar ile karmaşık veriler arasında kaybolmayın; KPI takibini saniyeler içinde yapıp operasyonu yönetin.",
  f4LinkLabel: 'Detayları İncele',
  ctaTitle: 'Gelecek Çok Yakında.',
  ctaSubtitle:
    'Samplify.tr ile Dikişli Ürünler Endüstrisi numune yönetiminde yeni bir standart belirliyoruz. İlk deneyenlerden olmak için yerinizi ayırtın.',
  ctaButton: 'Erken Erişim Talep Et',
} as const;

const TR_MODULES = {
  badge: 'Geliştirme Aşamasında',
  titleLine1: 'Modüler Yapı',
  titleLine2: 'Sıfır Karmaşa',
  intro:
    'Samplify.tr ekosistemi, Dikişli Ürünler Endüstrisinin hızlı ve karmaşık Ür-Ge dinamiklerine tam uyum sağlamak için esnek bir altyapıyla tasarlandı. Kullanmayacağınız hantal özelliklere boğulmayın; sadece ihtiyacınız olan modüllerle başlayın ve operasyonunuz büyüdükçe ekosisteminizi sınır tanımadan genişletin.',
  stTitle: 'Trackify',
  stBody:
    'Numune planlama ve üretim süreçlerinizi şansa bırakmayın. İlk numune talebinden nihai PP Sample onayına kadar her adımı tek bir dijital platformda görselleştirin. İşletme, modelhane ve ofisler arasındaki iletişimsizlik silolarını yıkarak Critical Path üzerinde uçtan uca tam kontrol sağlayın.',
  stFeatures: [
    'Görsel Kanban Panoları ile Süreç Takibi',
    'Gerçek Zamanlı Süreç Planlama',
    'Dinamik Revizyon Zaman Çizelgesi',
  ] as [string, string, string],
  stCardTag: 'v1.0 Çok Yakında',
  stCardTitle: 'Veri Odaklı Numune Yönetimiyle Tanışmaya Hazır Olun.',
  mfTitle: 'Measurify',
  mfBody:
    'Kalıp ve ölçü yönetiminde sıfır hata politikasıyla tanışın. Dinamik ölçü tabloları, otomatik tolerans hesaplamaları ve tek tıkla Tech Pack oluşturma özellikleriyle manuel hataları bitirin, redlining (düzeltme) sürelerini minimuma indirin.',
  mfFeatures: [
    'Akıllı Çekmezlik Hesaplama',
    'Dinamik Versiyon Karşılaştırma',
    'Tek Tıkla PDF Tech Pack Çıktısı',
  ] as [string, string, string],
  mfCardTag: 'v1.0 Çok Yakında',
  mfCardTitle: 'Milimetrik Hassasiyet, Sıfır Hata.',
} as const;

const TR_ABOUT = {
  titleLine1: 'Dikişli Ürünler Endüstrisinin',
  titleLine2: 'Dijital Geleceği',
  visionLabel: 'Vizyonumuz',
  visionTitle:
    'Geleneksel Dikişli Ürünler Endüstrisi Ür-Ge süreçlerini, modern yazılımın gücü ve çevikliğiyle baştan tanımlıyoruz.',
  whyLabel: 'Neden Samplify.tr?',
  whyBody:
    'Çünkü biz sadece masa başında kod yazmıyoruz; sahayı yaşıyoruz. Atölyenin tozunu, o first-hit numuneyi yetiştirme telaşını ve tek bir ölçü hatasının devasa maliyetini çok iyi biliyoruz. Sektörün içinden gelen bu tecrübeyi, karmaşayı bitiren çevik web teknolojileriyle harmanlıyoruz.',
  ctaTitle: 'Hikayenin Parçası Olun',
  ctaBody:
    'Samplify.tr geliştirme aşamasında. Dikişli Ürünler Endüstrisini değiştirecek bu platformun ilk kullanıcılarından olmak için bekleme listemize katılın.',
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
