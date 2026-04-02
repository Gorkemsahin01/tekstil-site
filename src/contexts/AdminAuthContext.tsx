import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { STORAGE_ACCESS_TOKEN } from '../config/abp';
import { USE_CMS_API } from '../config/cms';
import { clearAbpSession, loginAbpPasswordGrant } from '../services/abpAuth';

const LOCAL_ADMIN_KEY = 'tekstil_admin_local_ok';

type AdminAuthContextValue = {
  isAuthenticated: boolean;
  /** CMS API kapalı: yerel şifre. Açık: ABP kullanıcı adı + şifre (OpenIddict password grant). */
  login: (userName: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'admin123';

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [localOk, setLocalOk] = useState(() => sessionStorage.getItem(LOCAL_ADMIN_KEY) === '1');

  const hasAbpToken = !!localStorage.getItem(STORAGE_ACCESS_TOKEN);
  /** CMS açıkken yalnızca geçerli Bearer token admin sayılır; yerel şifre API yazamaz. */
  const isAuthenticated = USE_CMS_API ? hasAbpToken : localOk || hasAbpToken;

  const login = useCallback(
    async (userName: string, password: string): Promise<{ ok: boolean; error?: string }> => {
      if (USE_CMS_API) {
        return loginAbpPasswordGrant(userName, password);
      }
      if (password === DEFAULT_ADMIN_PASSWORD) {
        sessionStorage.setItem(LOCAL_ADMIN_KEY, '1');
        setLocalOk(true);
        return { ok: true };
      }
      return { ok: false, error: 'Şifre hatalı.' };
    },
    []
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(LOCAL_ADMIN_KEY);
    setLocalOk(false);
    clearAbpSession();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated, login, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return ctx;
}
