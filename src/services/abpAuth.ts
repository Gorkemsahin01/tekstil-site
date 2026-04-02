import { abpClient } from '../api/abpClient';
import {
  ABP_TOKEN_PATH,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_SCOPE,
  STORAGE_ACCESS_TOKEN,
  STORAGE_REFRESH_TOKEN,
} from '../config/abp';

/** ABP klasik şablon: POST /api/TokenAuth/Authenticate */
export type LegacyAbpAuthResult = {
  result?: {
    accessToken?: string;
    expireInSeconds?: number;
  };
};

export async function loginAbpLegacy(
  userNameOrEmailAddress: string,
  password: string
): Promise<LegacyAbpAuthResult> {
  const { data } = await abpClient.post<LegacyAbpAuthResult>(
    '/api/TokenAuth/Authenticate',
    { userNameOrEmailAddress, password }
  );
  const token = data.result?.accessToken;
  if (token) {
    localStorage.setItem(STORAGE_ACCESS_TOKEN, token);
  }
  return data;
}

/** OpenIddict password grant — parametreleri ABP AuthServer ayarlarınıza göre doldurun */
export async function loginAbpOpenIddict(formBody: URLSearchParams) {
  const { data } = await abpClient.post<{ access_token?: string }>(
    ABP_TOKEN_PATH,
    formBody.toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
  if (data.access_token) {
    localStorage.setItem(STORAGE_ACCESS_TOKEN, data.access_token);
  }
  return data;
}

/**
 * ABP Identity kullanıcısı + OpenIddict password grant.
 * CMS API yazma izinleri bu token ile gelir (admin rolü + izinler seed’de).
 */
export async function loginAbpPasswordGrant(
  userName: string,
  password: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!OIDC_CLIENT_SECRET) {
    return {
      ok: false,
      error:
        'OAuth istemci sırrı eksik. Canlıda VITE_ABP_OIDC_CLIENT_SECRET tanımlayın (backend OpenIddict ile aynı).',
    };
  }
  const body = new URLSearchParams();
  body.set('grant_type', 'password');
  body.set('username', userName.trim());
  body.set('password', password);
  body.set('client_id', OIDC_CLIENT_ID);
  body.set('client_secret', OIDC_CLIENT_SECRET);
  body.set('scope', OIDC_SCOPE);

  try {
    const { data } = await abpClient.post<{
      access_token?: string;
      refresh_token?: string;
      error?: string;
      error_description?: string;
    }>(ABP_TOKEN_PATH, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (data.access_token) {
      localStorage.setItem(STORAGE_ACCESS_TOKEN, data.access_token);
      if (data.refresh_token) {
        localStorage.setItem(STORAGE_REFRESH_TOKEN, data.refresh_token);
      }
      return { ok: true };
    }
    return {
      ok: false,
      error: data.error_description ?? data.error ?? 'Token alınamadı.',
    };
  } catch (e: unknown) {
    const err = e as {
      response?: { data?: { error_description?: string; error?: string } };
      message?: string;
    };
    const msg =
      err.response?.data?.error_description ??
      err.response?.data?.error ??
      err.message ??
      'Giriş başarısız.';
    return { ok: false, error: String(msg) };
  }
}

export function clearAbpSession() {
  localStorage.removeItem(STORAGE_ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_REFRESH_TOKEN);
}
