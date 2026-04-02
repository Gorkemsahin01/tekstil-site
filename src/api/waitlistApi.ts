import { abpClient } from './abpClient';

const APP = '/api/app';

export type SubmitWaitlistPayload = {
  fullName: string;
  company: string;
  email: string;
};

/** Bekleme listesi — backend e-postayı info@samplify.tr (veya Waitlist:RecipientEmail) adresine iletir. */
export async function submitWaitlist(payload: SubmitWaitlistPayload): Promise<void> {
  await abpClient.post(`${APP}/waitlist/submit`, {
    fullName: payload.fullName,
    company: payload.company || undefined,
    email: payload.email,
  });
}
