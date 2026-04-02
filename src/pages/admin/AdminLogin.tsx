import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Shield, User } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { USE_CMS_API } from '../../config/cms';
import SamplifyLogo from '../../components/branding/SamplifyLogo';

export default function AdminLogin() {
  const { isAuthenticated, login } = useAdminAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/ana-sayfa" replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await login(userName, password);
      if (!result.ok) {
        setError(result.error ?? 'Giriş yapılamadı.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#06080f]">
      {/* Arka plan: mesh + ızgara */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(124,58,237,0.25),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_100%,rgba(34,197,94,0.12),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex w-full flex-col lg:flex-row">
        {/* Sol panel — masaüstü marka alanı */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden flex-1 flex-col justify-between px-10 py-12 text-white lg:flex lg:max-w-[46%] lg:px-14 lg:py-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 via-transparent to-emerald-500/5" />
          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
              <Shield className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
              Yönetim paneli
            </div>
            <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
              İçerik ve site ayarlarını güvenle yönetin.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Bu alan yalnızca yetkili kullanıcılar içindir. Oturumunuz tarayıcıda güvenli şekilde
              sonlandırılır.
            </p>
          </div>
          <p className="relative text-xs text-white/35">© {new Date().getFullYear()} Samplify.tr</p>
        </motion.div>

        {/* Giriş kartı */}
        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-8 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[420px]"
          >
            <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] p-px shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
              <div className="rounded-[1.65rem] bg-gradient-to-b from-white/[0.07] to-transparent px-6 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12">
                <div className="mb-8 flex justify-center">
                  <div className="rounded-2xl bg-white p-6 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
                    <SamplifyLogo
                      variant="full"
                      className="mx-auto max-h-[200px] max-w-[340px] sm:max-h-[230px]"
                    />
                  </div>
                </div>

                <div className="mb-8 text-center">
                  <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    Yönetici girişi
                  </h1>
                  <p className="mt-2 text-sm text-white/45">
                    {USE_CMS_API
                      ? 'ABP hesabınızla giriş yapın (site içeriği sunucuya kaydedilir).'
                      : 'Devam etmek için yönetici şifrenizi girin.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {USE_CMS_API && (
                    <div>
                      <label
                        htmlFor="admin-username"
                        className="mb-2 block text-left text-xs font-semibold uppercase tracking-wider text-white/50"
                      >
                        Kullanıcı adı veya e-posta
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
                          <User className="h-[18px] w-[18px]" aria-hidden />
                        </span>
                        <input
                          id="admin-username"
                          type="text"
                          autoComplete="username"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full rounded-xl border border-white/[0.1] bg-[#0c0f18] py-3.5 pl-12 pr-4 text-[15px] text-white placeholder:text-white/25 outline-none ring-0 transition focus:border-brand-500/50 focus:bg-[#0e121c] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
                          placeholder="admin@abp.io"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="admin-password"
                      className="mb-2 block text-left text-xs font-semibold uppercase tracking-wider text-white/50"
                    >
                      Şifre
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
                        <Lock className="h-[18px] w-[18px]" aria-hidden />
                      </span>
                      <input
                        id="admin-password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-white/[0.1] bg-[#0c0f18] py-3.5 pl-12 pr-4 text-[15px] text-white placeholder:text-white/25 outline-none ring-0 transition focus:border-brand-500/50 focus:bg-[#0e121c] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {error && (
                    <p
                      className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-center text-sm text-red-300"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/30 transition hover:from-brand-500 hover:to-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 disabled:opacity-60"
                  >
                    <span>{submitting ? 'Giriş yapılıyor…' : 'Giriş yap'}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>

               
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
