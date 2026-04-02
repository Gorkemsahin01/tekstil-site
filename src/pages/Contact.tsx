import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { submitWaitlist } from '../api/waitlistApi';
import { USE_CMS_API } from '../config/cms';
import { usePublicSiteContent } from '../hooks/usePublicSiteContent';
import { useUiStrings } from '../hooks/useUiStrings';

const WAITLIST_MAIL = 'info@samplify.tr';

function openMailtoWaitlist(fullName: string, company: string, email: string) {
  const subject = encodeURIComponent(`[Samplify.tr] Bekleme listesi — ${fullName}`);
  const body = encodeURIComponent(
    `Ad Soyad: ${fullName}\nFirma: ${company || '—'}\nE-posta: ${email}\n`
  );
  window.location.href = `mailto:${WAITLIST_MAIL}?subject=${subject}&body=${body}`;
}

export default function Contact() {
  const { content } = usePublicSiteContent();
  const c = content.contact;
  const ui = useUiStrings();

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast.error('Ad soyad ve e-posta zorunludur.');
      return;
    }

    setSubmitting(true);
    try {
      if (USE_CMS_API) {
        await submitWaitlist({
          fullName: fullName.trim(),
          company: company.trim(),
          email: email.trim(),
        });
        toast.success(ui.waitlistSentTitle, {
          description: ui.waitlistSentApi,
        });
        setFullName('');
        setCompany('');
        setEmail('');
      } else {
        openMailtoWaitlist(fullName.trim(), company.trim(), email.trim());
        toast.success(ui.waitlistSentTitle, {
          description: ui.waitlistSentMailto,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Gönderilemedi', {
        description:
          'API kullanılamıyorsa tarayıcıdan e-posta ile deneyin veya daha sonra tekrar deneyin.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center bg-[#FAFAFA] pb-24 pt-32 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-lg"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-900 dark:bg-gray-800 dark:text-white">
              {c.badge}
            </div>
            <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-gray-900 dark:text-white md:text-7xl">
              {c.titleLine1} <br />
              <span className="text-brand-600 dark:text-brand-400">{c.titleHighlight}</span>
            </h1>
            <p className="mb-12 text-xl font-medium text-gray-500 dark:text-gray-400">{c.intro}</p>

            <div className="space-y-6 font-medium text-gray-900 dark:text-gray-100">
              <p className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl dark:bg-gray-800">
                  📧
                </span>
                <a
                  href={`mailto:${c.email}`}
                  className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                >
                  {c.email}
                </a>
              </p>
              <p className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl dark:bg-gray-800">
                  📍
                </span>
                {c.location}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-panel rounded-[3rem] p-8 md:p-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 ml-2 block text-sm font-bold text-gray-900 dark:text-gray-100">
                      {ui.contactName}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-6 py-4 outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:bg-gray-900"
                      placeholder={ui.contactPlaceholderName}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 ml-2 block text-sm font-bold text-gray-900 dark:text-gray-100">
                      {ui.contactCompany}
                    </label>
                    <input
                      type="text"
                      name="company"
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-6 py-4 outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:bg-gray-900"
                      placeholder={ui.contactPlaceholderCompany}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 ml-2 block text-sm font-bold text-gray-900 dark:text-gray-100">
                    {ui.contactEmail}
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-6 py-4 outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:bg-gray-900"
                    placeholder={ui.contactPlaceholderEmail}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-4 w-full rounded-2xl bg-gray-900 py-5 font-bold text-white transition-all hover:-translate-y-1 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/20 disabled:opacity-60 dark:bg-white dark:text-gray-900 dark:hover:bg-brand-200"
                >
                  {submitting ? '…' : ui.contactSubmit}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
