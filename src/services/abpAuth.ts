import { abpClient } from '../api/abpClient';
import { STORAGE_ACCESS_TOKEN } from '../config/abp';

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
    '/connect/token',
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

export function clearAbpSession() {
  localStorage.removeItem(STORAGE_ACCESS_TOKEN);
}
