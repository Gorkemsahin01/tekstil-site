import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { STORAGE_ACCESS_TOKEN } from '../config/abp';
import { clearAbpSession } from '../services/abpAuth';

const LOCAL_ADMIN_KEY = 'tekstil_admin_local_ok';

type AdminAuthContextValue = {
  isAuthenticated: boolean;
  /** Geçici şifre ile giriş (ABP bağlanınca loginAbpLegacy ile değiştirilebilir) */
  loginWithPassword: (password: string) => boolean;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'admin123';

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [localOk, setLocalOk] = useState(() =>
    sessionStorage.getItem(LOCAL_ADMIN_KEY) === '1'
  );

  const hasAbpToken = !!localStorage.getItem(STORAGE_ACCESS_TOKEN);

  const isAuthenticated = localOk || hasAbpToken;

  const loginWithPassword = useCallback((password: string) => {
    if (password === DEFAULT_ADMIN_PASSWORD) {
      sessionStorage.setItem(LOCAL_ADMIN_KEY, '1');
      setLocalOk(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(LOCAL_ADMIN_KEY);
    setLocalOk(false);
    clearAbpSession();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      loginWithPassword,
      logout,
    }),
    [isAuthenticated, loginWithPassword, logout]
  );

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return ctx;
}
