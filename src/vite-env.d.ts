/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ABP_API_URL?: string;
  readonly VITE_ABP_TOKEN_PATH?: string;
  readonly VITE_ABP_USE_LEGACY_TOKEN_AUTH?: string;
  readonly VITE_ADMIN_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
