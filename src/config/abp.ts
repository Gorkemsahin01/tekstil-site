/**
 * ABP backend ile uyum için merkezi ayarlar.
 * .env içinde VITE_ABP_API_URL tanımlayın (örn. https://localhost:44301).
 */
export const ABP_API_URL =
  import.meta.env.VITE_ABP_API_URL?.replace(/\/$/, '') ?? '';

/** OpenIddict / OAuth token endpoint — ABP şablonunuza göre güncelleyin */
export const ABP_TOKEN_PATH =
  import.meta.env.VITE_ABP_TOKEN_PATH ?? '/connect/token';

/** Eski ABP JWT endpoint’i (şablon kullanıyorsanız) */
export const ABP_LEGACY_TOKEN_AUTH =
  import.meta.env.VITE_ABP_USE_LEGACY_TOKEN_AUTH === 'true';

export const STORAGE_ACCESS_TOKEN = 'tekstil_abp_access_token';
export const STORAGE_REFRESH_TOKEN = 'tekstil_abp_refresh_token';

/** OpenIddict `Samplify_React` istemcisi — DbMigrator’daki ClientSecret ile aynı olmalı */
export const OIDC_CLIENT_ID =
  import.meta.env.VITE_ABP_OIDC_CLIENT_ID ?? 'Samplify_React';

/** Üretimde build zamanı env ile verin; boşsa sadece yerel şifre modu (CMS API kapalı) kullanılabilir */
export const OIDC_CLIENT_SECRET = import.meta.env.VITE_ABP_OIDC_CLIENT_SECRET ?? '';

/** Password grant isteğinde gönderilen scope listesi */
export const OIDC_SCOPE =
  import.meta.env.VITE_ABP_OIDC_SCOPE ??
  'openid offline_access Samplify profile email roles address phone';
