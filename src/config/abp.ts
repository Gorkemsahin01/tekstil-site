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
