import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fetchSiteContent, putSiteContent } from '../api/cmsApi';
import { USE_CMS_API } from '../config/cms';
import { DEFAULT_SITE_CONTENT } from '../site/defaultContent';
import type {
  AboutContent,
  ContactContent,
  HomeContent,
  ModulesContent,
  SiteContent,
} from '../site/types';

/** Repo’daki varsayılan içerik değişince eski localStorage’ın üstüne binmemesi için gerektiğinde sürümü artırın. */
const STORAGE_KEY = 'samplify_site_content_v2';

function mergeModules(base: ModulesContent, patch?: Partial<ModulesContent>): ModulesContent {
  if (!patch) return base;
  return {
    ...base,
    ...patch,
    stFeatures: patch.stFeatures ?? base.stFeatures,
    mfFeatures: patch.mfFeatures ?? base.mfFeatures,
  };
}

export function deepMerge(base: SiteContent, patch: Partial<SiteContent>): SiteContent {
  return {
    ...base,
    ...patch,
    brandDisplay: {
      tr: patch.brandDisplay?.tr ?? base.brandDisplay.tr,
      en: patch.brandDisplay?.en ?? base.brandDisplay.en,
    },
    brandFooterWatermark: {
      tr: patch.brandFooterWatermark?.tr ?? base.brandFooterWatermark.tr,
      en: patch.brandFooterWatermark?.en ?? base.brandFooterWatermark.en,
    },
    home: {
      tr: { ...base.home.tr, ...patch.home?.tr },
      en: { ...base.home.en, ...patch.home?.en },
    },
    modules: {
      tr: mergeModules(base.modules.tr, patch.modules?.tr),
      en: mergeModules(base.modules.en, patch.modules?.en),
    },
    about: {
      tr: { ...base.about.tr, ...patch.about?.tr },
      en: { ...base.about.en, ...patch.about?.en },
    },
    contact: {
      tr: { ...base.contact.tr, ...patch.contact?.tr },
      en: { ...base.contact.en, ...patch.contact?.en },
    },
    ui: {
      tr: { ...base.ui.tr, ...patch.ui?.tr },
      en: { ...base.ui.en, ...patch.ui?.en },
    },
  };
}

/** Eski kayıtlı / API JSON’unda kalan ana sayfa metinlerini güncel repo varsayılanına çeker. */
function applyLegacyHomeContentFixes(content: SiteContent): SiteContent {
  const legacyTr = "Geleceğin ERP'si Yapım Aşamasında";
  const legacyEn = 'The Future ERP is in Development';
  let next = content;
  if (next.home.tr.heroBadge === legacyTr) {
    next = {
      ...next,
      home: {
        ...next.home,
        tr: { ...next.home.tr, heroBadge: DEFAULT_SITE_CONTENT.home.tr.heroBadge },
      },
    };
  }
  if (next.home.en.heroBadge === legacyEn) {
    next = {
      ...next,
      home: {
        ...next.home,
        en: { ...next.home.en, heroBadge: DEFAULT_SITE_CONTENT.home.en.heroBadge },
      },
    };
  }
  if (
    next.home.tr.featuresHeading === 'Sıradanlığı' &&
    next.home.tr.featuresHeadingAccent === 'Reddedin.'
  ) {
    next = {
      ...next,
      home: {
        ...next.home,
        tr: {
          ...next.home.tr,
          featuresHeading: DEFAULT_SITE_CONTENT.home.tr.featuresHeading,
          featuresHeadingAccent: DEFAULT_SITE_CONTENT.home.tr.featuresHeadingAccent,
        },
      },
    };
  }
  if (
    next.home.en.featuresHeading === 'Reject' &&
    next.home.en.featuresHeadingAccent === 'Ordinary.'
  ) {
    next = {
      ...next,
      home: {
        ...next.home,
        en: {
          ...next.home.en,
          featuresHeading: DEFAULT_SITE_CONTENT.home.en.featuresHeading,
          featuresHeadingAccent: DEFAULT_SITE_CONTENT.home.en.featuresHeadingAccent,
        },
      },
    };
  }
  const legacyTrFeaturesIntro =
    'Samplify.tr, tekstil üretiminin karmaşık doğasını anlar ve onu pürüzsüz, dijital bir deneyime dönüştürür.';
  if (next.home.tr.featuresIntro === legacyTrFeaturesIntro) {
    next = {
      ...next,
      home: {
        ...next.home,
        tr: {
          ...next.home.tr,
          featuresIntro: DEFAULT_SITE_CONTENT.home.tr.featuresIntro,
        },
      },
    };
  }
  const legacyEnFeaturesIntro =
    'Samplify.tr understands the complexity of textile production and turns it into a smooth, digital experience.';
  if (next.home.en.featuresIntro === legacyEnFeaturesIntro) {
    next = {
      ...next,
      home: {
        ...next.home,
        en: {
          ...next.home.en,
          featuresIntro: DEFAULT_SITE_CONTENT.home.en.featuresIntro,
        },
      },
    };
  }
  if (
    next.home.tr.f1Title === 'Kusursuz Modülerlik' &&
    next.home.tr.f1Body ===
      'Sadece ihtiyacınız olanı kullanın. Sample Tracker ve Measurify ile kendi ekosisteminizi yaratın.'
  ) {
    next = {
      ...next,
      home: {
        ...next.home,
        tr: {
          ...next.home.tr,
          f1Title: DEFAULT_SITE_CONTENT.home.tr.f1Title,
          f1Body: DEFAULT_SITE_CONTENT.home.tr.f1Body,
        },
      },
    };
  }
  if (
    next.home.en.f1Title === 'Flawless modularity' &&
    next.home.en.f1Body ===
      'Use only what you need. Build your ecosystem with Sample Tracker and Measurify.'
  ) {
    next = {
      ...next,
      home: {
        ...next.home,
        en: {
          ...next.home.en,
          f1Title: DEFAULT_SITE_CONTENT.home.en.f1Title,
          f1Body: DEFAULT_SITE_CONTENT.home.en.f1Body,
        },
      },
    };
  }
  const legacyTrCtaSubtitle =
    'Samplify.tr ile tekstil üretiminde yeni bir standart belirliyoruz. İlk deneyenlerden olmak için yerinizi ayırtın.';
  if (next.home.tr.ctaSubtitle === legacyTrCtaSubtitle) {
    next = {
      ...next,
      home: {
        ...next.home,
        tr: {
          ...next.home.tr,
          ctaSubtitle: DEFAULT_SITE_CONTENT.home.tr.ctaSubtitle,
        },
      },
    };
  }
  const legacyEnCtaSubtitle =
    'With Samplify.tr we are setting a new standard in textile production. Reserve your spot among the first to try it.';
  if (next.home.en.ctaSubtitle === legacyEnCtaSubtitle) {
    next = {
      ...next,
      home: {
        ...next.home,
        en: {
          ...next.home.en,
          ctaSubtitle: DEFAULT_SITE_CONTENT.home.en.ctaSubtitle,
        },
      },
    };
  }
  const legacyTrF2Body = 'Gerçek zamanlı veri akışı ile anında aksiyon alın.';
  if (next.home.tr.f2Body === legacyTrF2Body) {
    next = {
      ...next,
      home: {
        ...next.home,
        tr: { ...next.home.tr, f2Body: DEFAULT_SITE_CONTENT.home.tr.f2Body },
      },
    };
  }
  const legacyEnF2Body = 'Act instantly with real-time data flow.';
  if (next.home.en.f2Body === legacyEnF2Body) {
    next = {
      ...next,
      home: {
        ...next.home,
        en: { ...next.home.en, f2Body: DEFAULT_SITE_CONTENT.home.en.f2Body },
      },
    };
  }
  return next;
}

function applyLegacyUiStringFixes(content: SiteContent): SiteContent {
  const legacyTrFooter = "Tekstil ERP'sinin Yeni Yüzü.";
  const legacyEnFooter = 'The new face of textile ERP.';
  let next = content;
  if (next.ui.tr.footerTagline === legacyTrFooter) {
    next = {
      ...next,
      ui: {
        ...next.ui,
        tr: { ...next.ui.tr, footerTagline: DEFAULT_SITE_CONTENT.ui.tr.footerTagline },
      },
    };
  }
  if (next.ui.en.footerTagline === legacyEnFooter) {
    next = {
      ...next,
      ui: {
        ...next.ui,
        en: { ...next.ui.en, footerTagline: DEFAULT_SITE_CONTENT.ui.en.footerTagline },
      },
    };
  }
  if (next.ui.tr.heroStatWorkshop === 'Aktif Atölye') {
    next = {
      ...next,
      ui: {
        ...next.ui,
        tr: { ...next.ui.tr, heroStatWorkshop: DEFAULT_SITE_CONTENT.ui.tr.heroStatWorkshop },
      },
    };
  }
  if (next.ui.en.heroStatWorkshop === 'Active workshops') {
    next = {
      ...next,
      ui: {
        ...next.ui,
        en: { ...next.ui.en, heroStatWorkshop: DEFAULT_SITE_CONTENT.ui.en.heroStatWorkshop },
      },
    };
  }
  return next;
}

function applyLegacyModulesContentFixes(content: SiteContent): SiteContent {
  const legacyTrIntro =
    'Samplify.tr ekosistemi, tekstil üretiminin en kritik iki damarına odaklanarak tasarlandı. Yakında sizinle.';
  const legacyEnIntro =
    'The Samplify.tr ecosystem is designed around the two most critical veins of textile production. Coming soon.';
  let next = content;
  if (
    next.modules.tr.titleLine1 === 'İki Güçlü Modül.' &&
    next.modules.tr.titleLine2 === 'Sınırsız Olasılık.' &&
    next.modules.tr.intro === legacyTrIntro
  ) {
    next = {
      ...next,
      modules: {
        ...next.modules,
        tr: mergeModules(next.modules.tr, {
          titleLine1: DEFAULT_SITE_CONTENT.modules.tr.titleLine1,
          titleLine2: DEFAULT_SITE_CONTENT.modules.tr.titleLine2,
          intro: DEFAULT_SITE_CONTENT.modules.tr.intro,
        }),
      },
    };
  }
  if (
    next.modules.en.titleLine1 === 'Two powerful modules.' &&
    next.modules.en.titleLine2 === 'Unlimited possibility.' &&
    next.modules.en.intro === legacyEnIntro
  ) {
    next = {
      ...next,
      modules: {
        ...next.modules,
        en: mergeModules(next.modules.en, {
          titleLine1: DEFAULT_SITE_CONTENT.modules.en.titleLine1,
          titleLine2: DEFAULT_SITE_CONTENT.modules.en.titleLine2,
          intro: DEFAULT_SITE_CONTENT.modules.en.intro,
        }),
      },
    };
  }
  const legacyTrStBody =
    'Numune üretim sürecini bir sanat eserine dönüştürün. Kumaş girişinden son onaya kadar her adımı görselleştirin, atölye ve ofis arasındaki duvarları yıkın.';
  const legacyEnStBody =
    'Turn sample production into a masterpiece. Visualize every step from fabric intake to final approval and break down walls between workshop and office.';
  if (next.modules.tr.stTitle === 'Sample Tracker' && next.modules.tr.stBody === legacyTrStBody) {
    next = {
      ...next,
      modules: {
        ...next.modules,
        tr: mergeModules(next.modules.tr, {
          stTitle: DEFAULT_SITE_CONTENT.modules.tr.stTitle,
          stBody: DEFAULT_SITE_CONTENT.modules.tr.stBody,
          stFeatures: DEFAULT_SITE_CONTENT.modules.tr.stFeatures,
        }),
      },
    };
  }
  if (next.modules.en.stTitle === 'Sample Tracker' && next.modules.en.stBody === legacyEnStBody) {
    next = {
      ...next,
      modules: {
        ...next.modules,
        en: mergeModules(next.modules.en, {
          stTitle: DEFAULT_SITE_CONTENT.modules.en.stTitle,
          stBody: DEFAULT_SITE_CONTENT.modules.en.stBody,
          stFeatures: DEFAULT_SITE_CONTENT.modules.en.stFeatures,
        }),
      },
    };
  }
  return next;
}

function applyLegacyAboutContentFixes(content: SiteContent): SiteContent {
  const legacyTrVision =
    'Geleneksel tekstil üretimini, modern yazılımın zarafetiyle buluşturuyoruz.';
  const legacyTrWhy =
    'Çünkü biz sadece kod yazmıyoruz. Atölyenin tozunu, numune yetişme telaşını ve kalıp hatalarının maliyetini biliyoruz. Sektörün içinden gelen tecrübeyi, en son web teknolojileriyle harmanlıyoruz.';
  const legacyEnVision =
    'We bring traditional textile production together with the elegance of modern software.';
  const legacyEnWhy =
    'Because we do not just write code. We know the dust of the workshop, the rush to meet sample deadlines, and the cost of pattern errors. We blend industry experience with the latest web technologies.';
  let next = content;
  if (next.about.tr.visionTitle === legacyTrVision) {
    next = {
      ...next,
      about: {
        ...next.about,
        tr: { ...next.about.tr, visionTitle: DEFAULT_SITE_CONTENT.about.tr.visionTitle },
      },
    };
  }
  if (next.about.tr.whyBody === legacyTrWhy) {
    next = {
      ...next,
      about: {
        ...next.about,
        tr: { ...next.about.tr, whyBody: DEFAULT_SITE_CONTENT.about.tr.whyBody },
      },
    };
  }
  if (next.about.en.visionTitle === legacyEnVision) {
    next = {
      ...next,
      about: {
        ...next.about,
        en: { ...next.about.en, visionTitle: DEFAULT_SITE_CONTENT.about.en.visionTitle },
      },
    };
  }
  if (next.about.en.whyBody === legacyEnWhy) {
    next = {
      ...next,
      about: {
        ...next.about,
        en: { ...next.about.en, whyBody: DEFAULT_SITE_CONTENT.about.en.whyBody },
      },
    };
  }
  return next;
}

function applyLegacyBrandFooterWatermark(content: SiteContent): SiteContent {
  const legacy = 'SAMPLIFY.TR';
  let next = content;
  if (next.brandFooterWatermark.tr === legacy) {
    next = {
      ...next,
      brandFooterWatermark: {
        ...next.brandFooterWatermark,
        tr: DEFAULT_SITE_CONTENT.brandFooterWatermark.tr,
      },
    };
  }
  if (next.brandFooterWatermark.en === legacy) {
    next = {
      ...next,
      brandFooterWatermark: {
        ...next.brandFooterWatermark,
        en: DEFAULT_SITE_CONTENT.brandFooterWatermark.en,
      },
    };
  }
  return next;
}

function isLegacyFlatSiteContent(parsed: unknown): boolean {
  if (!parsed || typeof parsed !== 'object') return false;
  const p = parsed as Record<string, unknown>;
  const home = p.home;
  if (!home || typeof home !== 'object' || home === null) return false;
  return 'heroBadge' in home && !('tr' in home);
}

/** Eski tek-dilli JSON → TR + EN (EN varsayılanlarıyla) */
function migrateLegacyToSiteContent(parsed: unknown): SiteContent {
  const p = parsed as Record<string, unknown>;
  const legacyBrand = p.brandDisplay;
  const legacyBrandW = p.brandFooterWatermark;

  return deepMerge(DEFAULT_SITE_CONTENT, {
    brandDisplay:
      typeof legacyBrand === 'string'
        ? { tr: legacyBrand, en: DEFAULT_SITE_CONTENT.brandDisplay.en }
        : undefined,
    brandFooterWatermark:
      typeof legacyBrandW === 'string'
        ? { tr: legacyBrandW, en: DEFAULT_SITE_CONTENT.brandFooterWatermark.en }
        : undefined,
    home:
      p.home && typeof p.home === 'object' && !('tr' in p.home)
        ? {
            tr: p.home as HomeContent,
            en: DEFAULT_SITE_CONTENT.home.en,
          }
        : undefined,
    modules:
      p.modules && typeof p.modules === 'object' && !('tr' in p.modules)
        ? {
            tr: p.modules as ModulesContent,
            en: DEFAULT_SITE_CONTENT.modules.en,
          }
        : undefined,
    about:
      p.about && typeof p.about === 'object' && !('tr' in p.about)
        ? {
            tr: p.about as AboutContent,
            en: DEFAULT_SITE_CONTENT.about.en,
          }
        : undefined,
    contact:
      p.contact && typeof p.contact === 'object' && !('tr' in p.contact)
        ? {
            tr: p.contact as ContactContent,
            en: DEFAULT_SITE_CONTENT.contact.en,
          }
        : undefined,
  });
}

function parseAndMergeStored(raw: string): SiteContent {
  const parsed = JSON.parse(raw) as unknown;
  let merged: SiteContent;
  if (isLegacyFlatSiteContent(parsed)) {
    merged = migrateLegacyToSiteContent(parsed);
  } else {
    const p = parsed as Record<string, unknown>;
    const { brandDisplay: bdRaw, brandFooterWatermark: bwRaw, ...rest } = p;
    const restParsed = rest as Partial<SiteContent>;
    const extra: Partial<SiteContent> = {};
    if (typeof bdRaw === 'string') {
      extra.brandDisplay = { tr: bdRaw, en: DEFAULT_SITE_CONTENT.brandDisplay.en };
    }
    if (typeof bwRaw === 'string') {
      extra.brandFooterWatermark = {
        tr: bwRaw,
        en: DEFAULT_SITE_CONTENT.brandFooterWatermark.en,
      };
    }
    merged = deepMerge(DEFAULT_SITE_CONTENT, { ...restParsed, ...extra });
  }
  return applyLegacyBrandFooterWatermark(
    applyLegacyAboutContentFixes(
      applyLegacyModulesContentFixes(
        applyLegacyUiStringFixes(applyLegacyHomeContentFixes(merged))
      )
    )
  );
}

function loadStored(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_CONTENT;
    return parseAndMergeStored(raw);
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

type SiteContentContextValue = {
  content: SiteContent;
  updateContent: (patch: Partial<SiteContent>) => void;
  resetToDefaults: () => void;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadStored);

  useEffect(() => {
    if (!USE_CMS_API) return;
    let cancelled = false;
    void (async () => {
      try {
        const { contentJson } = await fetchSiteContent();
        const merged = parseAndMergeStored(contentJson);
        if (!cancelled) {
          setContent(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        }
      } catch {
        /* çevrimdışı / CORS — loadStored zaten state’te */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((next: SiteContent) => {
    setContent(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    if (USE_CMS_API) {
      void putSiteContent(JSON.stringify(next)).catch(() => {});
    }
  }, []);

  const updateContent = useCallback(
    (patch: Partial<SiteContent>) => {
      persist(deepMerge(content, patch));
    },
    [content, persist]
  );

  const resetToDefaults = useCallback(() => {
    persist(DEFAULT_SITE_CONTENT);
  }, [persist]);

  const value = useMemo(
    () => ({ content, updateContent, resetToDefaults }),
    [content, updateContent, resetToDefaults]
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent must be used within SiteContentProvider');
  }
  return ctx;
}
