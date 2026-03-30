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
import type { SiteContent } from '../site/types';

const STORAGE_KEY = 'samplify_site_content';

function loadStored(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_CONTENT;
    const parsed = JSON.parse(raw) as SiteContent;
    return deepMerge(DEFAULT_SITE_CONTENT, parsed);
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

function deepMerge(base: SiteContent, patch: Partial<SiteContent>): SiteContent {
  return {
    ...base,
    ...patch,
    home: { ...base.home, ...patch.home },
    modules: {
      ...base.modules,
      ...patch.modules,
      stFeatures: patch.modules?.stFeatures ?? base.modules.stFeatures,
      mfFeatures: patch.modules?.mfFeatures ?? base.modules.mfFeatures,
    },
    about: { ...base.about, ...patch.about },
    contact: { ...base.contact, ...patch.contact },
  };
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
        const parsed = JSON.parse(contentJson) as Partial<SiteContent>;
        if (!cancelled) {
          const merged = deepMerge(DEFAULT_SITE_CONTENT, parsed);
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
