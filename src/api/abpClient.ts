import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import {
  ABP_API_URL,
  ABP_TOKEN_PATH,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  STORAGE_ACCESS_TOKEN,
  STORAGE_REFRESH_TOKEN,
} from '../config/abp';

/**
 * ABP HTTP API çağrıları için axios örneği.
 * Geliştirmede Vite proxy kullanıyorsanız baseURL boş bırakıp '/api' ile istek atabilirsiniz.
 */
export const abpClient = axios.create({
  baseURL: ABP_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

/** ABP application-configuration endpoint'ini çağırarak XSRF-TOKEN cookie'sini set eder. */
export function initAbpCsrf(): void {
  abpClient.get('/api/abp/application-configuration').catch(() => {});
}

function getCookieValue(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

abpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const xsrfToken = getCookieValue('XSRF-TOKEN');
  if (xsrfToken) {
    config.headers['RequestVerificationToken'] = xsrfToken;
  }
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  pendingQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  pendingQueue = [];
}

abpClient.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (err.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(err);
    }

    const refreshToken = localStorage.getItem(STORAGE_REFRESH_TOKEN);
    if (!refreshToken || !OIDC_CLIENT_SECRET) {
      localStorage.removeItem(STORAGE_ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_REFRESH_TOKEN);
      return Promise.reject(err);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return abpClient(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const body = new URLSearchParams();
      body.set('grant_type', 'refresh_token');
      body.set('client_id', OIDC_CLIENT_ID);
      body.set('client_secret', OIDC_CLIENT_SECRET);
      body.set('refresh_token', refreshToken);

      const { data } = await axios.post<{ access_token?: string; refresh_token?: string }>(
        `${ABP_API_URL || ''}${ABP_TOKEN_PATH}`,
        body.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      if (data.access_token) {
        localStorage.setItem(STORAGE_ACCESS_TOKEN, data.access_token);
        if (data.refresh_token) {
          localStorage.setItem(STORAGE_REFRESH_TOKEN, data.refresh_token);
        }
        processQueue(null, data.access_token);
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return abpClient(originalRequest);
      }

      throw new Error('Token refresh failed');
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      localStorage.removeItem(STORAGE_ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_REFRESH_TOKEN);
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);
