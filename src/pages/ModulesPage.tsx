import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Ruler, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocale } from '../contexts/LocaleContext';
import { usePublicSiteContent } from '../hooks/usePublicSiteContent';
import { useUiStrings } from '../hooks/useUiStrings';

export default function ModulesPage() {
  const { locale } = useLocale();
  const { content } = usePublicSiteContent();
  const m = content.modules;
  const ui = useUiStrings();

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 pt-32 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-32 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 dark:bg-brand-950/50 dark:text-brand-300"
          >
            {m.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-5xl font-black tracking-tight text-gray-900 dark:text-white md:text-7xl"
          >
            {m.titleLine1} <br />
            <span className="text-gray-400 dark:text-gray-500">{m.titleLine2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-medium text-gray-500 dark:text-gray-400"
          >
            {m.intro}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative mb-16 overflow-hidden rounded-[3rem] border border-gray-200/80 p-8 glass-panel md:p-16 dark:border-gray-800"
        >
          <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-indigo-100 opacity-50 mix-blend-multiply blur-3xl filter dark:bg-indigo-900/30 dark:mix-blend-normal" />

          <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gray-900 shadow-xl dark:bg-white">
                <ClipboardList className="h-10 w-10 text-white dark:text-gray-900" />
              </div>
              <h2 className="mb-6 text-4xl font-black text-gray-900 dark:text-white md:text-5xl">{m.stTitle}</h2>
              <p className="mb-8 text-xl leading-relaxed text-gray-600 dark:text-gray-400">{m.stBody}</p>
              <div className="mb-10 space-y-4">
                {m.stFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                  >
                    <div className="h-2 w-2 rounded-full bg-brand-500" />
                    <span className="font-bold text-gray-800 dark:text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/iletisim"
                className="inline-flex items-center gap-2 text-lg font-bold text-brand-600 transition-all hover:gap-4 dark:text-brand-400"
              >
                {ui.modulesEarlyAccessCta} <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-gray-200/80 bg-gray-100 shadow-2xl dark:border-gray-700">
                <img
                  src="/module-sample.jpg"
                  alt={
                    locale === 'tr'
                      ? `${m.stTitle} — operasyon paneli önizlemesi`
                      : `${m.stTitle} — operations panel preview`
                  }
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  width={1000}
                  height={1000}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end p-10">
                  <div className="text-white">
                    <p className="mb-2 font-mono text-sm text-brand-300">{m.stCardTag}</p>
                    <p className="text-2xl font-bold">{m.stCardTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative overflow-hidden rounded-[3rem] bg-gray-900 p-8 text-white md:p-16 dark:bg-gray-900"
        >
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full bg-brand-900 opacity-50 mix-blend-screen blur-3xl filter" />

          <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-gray-700 bg-gray-900 shadow-2xl">
                <img
                  src="/module-measure.jpg"
                  alt="Üretim ve hassas ölçüm — Measurify"
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
                  width={1000}
                  height={1000}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
                <div className="absolute inset-0 flex items-end p-10">
                  <div className="text-white">
                    <p className="mb-2 font-mono text-sm text-brand-400">{m.mfCardTag}</p>
                    <p className="text-2xl font-bold">{m.mfCardTitle}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-md">
                <Ruler className="h-10 w-10 text-white" />
              </div>
              <h2 className="mb-6 text-4xl font-black md:text-5xl">{m.mfTitle}</h2>
              <p className="mb-8 text-xl leading-relaxed text-gray-400">{m.mfBody}</p>
              <div className="mb-10 space-y-4">
                {m.mfFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="h-2 w-2 rounded-full bg-brand-400" />
                    <span className="font-bold text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/iletisim"
                className="inline-flex items-center gap-2 text-lg font-bold text-white transition-all hover:gap-4"
              >
                {ui.modulesEarlyAccessCta} <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
