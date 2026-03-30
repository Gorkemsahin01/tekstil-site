/**
 * `true` iken site içeriği ve blog ABP API üzerinden okunur/yazılır.
 * Backend çalışmıyorsa `.env` içinde kapatın veya istekler sessizce localStorage’a düşer.
 */
export const USE_CMS_API = import.meta.env.VITE_USE_CMS_API === 'true';
