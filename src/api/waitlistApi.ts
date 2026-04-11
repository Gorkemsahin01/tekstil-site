import { abpClient } from './abpClient';

const APP = '/api/app';

export type WaitlistJobTitleDto = {
  code: string;
  name: string;
};

export type SubmitWaitlistPayload = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  jobTitleCode: string;
};

/** ABP: GetJobTitlesAsync — yaygın rota `job-titles`, bazı sürümlerde `get-job-titles`. */
export async function fetchWaitlistJobTitles(locale: 'tr' | 'en'): Promise<WaitlistJobTitleDto[]> {
  const headers = { 'Accept-Language': locale === 'en' ? 'en' : 'tr' };
  try {
    const { data } = await abpClient.get<WaitlistJobTitleDto[]>(`${APP}/waitlist/job-titles`, {
      headers,
    });
    return Array.isArray(data) ? data : [];
  } catch (e: unknown) {
    const status = (e as { response?: { status?: number } })?.response?.status;
    if (status !== 404) {
      throw e;
    }
    const { data } = await abpClient.get<WaitlistJobTitleDto[]>(`${APP}/waitlist/get-job-titles`, {
      headers,
    });
    return Array.isArray(data) ? data : [];
  }
}

/** Bekleme listesi — backend e-postayı info@samplify.tr (veya Waitlist:RecipientEmail) adresine iletir. */
export async function submitWaitlist(payload: SubmitWaitlistPayload): Promise<void> {
  await abpClient.post(`${APP}/waitlist/submit`, {
    fullName: payload.fullName,
    company: payload.company || undefined,
    email: payload.email,
    phone: payload.phone.trim() || undefined,
    jobTitleCode: payload.jobTitleCode,
  });
}
