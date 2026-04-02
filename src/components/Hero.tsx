import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePublicSiteContent } from '../hooks/usePublicSiteContent';
import { useUiStrings } from '../hooks/useUiStrings';

export default function Hero() {
  const { content } = usePublicSiteContent();
  const h = content.home;
  const ui = useUiStrings();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden pt-32 pb-20">
      <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-blob rounded-full bg-brand-300/30 opacity-70 mix-blend-multiply blur-3xl filter dark:bg-brand-600/25 dark:mix-blend-normal" />
      <div className="animation-delay-2000 absolute right-1/4 top-1/3 h-96 w-96 animate-blob rounded-full bg-blue-300/30 opacity-70 mix-blend-multiply blur-3xl filter dark:bg-blue-600/20 dark:mix-blend-normal" />
      <div className="animation-delay-4000 absolute -bottom-8 left-1/3 h-96 w-96 animate-blob rounded-full bg-purple-300/30 opacity-70 mix-blend-multiply blur-3xl filter dark:bg-purple-600/20 dark:mix-blend-normal" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="mb-8 inline-flex cursor-default items-center gap-2 rounded-full border border-gray-200/50 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm backdrop-blur-sm transition-transform hover:scale-105 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-500" />
              </span>
              {h.heroBadge}
            </div>

            <h1 className="mb-8 text-6xl font-black leading-[1.1] tracking-tighter text-gray-900 dark:text-white md:text-8xl lg:text-[7rem]">
              {h.heroTitleLine1} <br className="hidden md:block" />
              <span className="text-gradient">{h.heroTitleHighlight}</span>
            </h1>

            <p className="mx-auto mb-12 max-w-3xl text-xl font-medium leading-relaxed text-gray-500 dark:text-gray-400 md:text-2xl">
              {h.heroSubtitle}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/iletisim"
                className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gray-900 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,0,0,0.2)] dark:bg-white dark:text-gray-900"
              >
                <span className="relative z-10">{h.primaryCta}</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-brand-600 to-indigo-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-brand-500 dark:to-violet-500" />
              </Link>
              <Link
                to="/moduller"
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-lg font-bold text-gray-900 transition-all hover:bg-gray-50 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
              >
                <Sparkles className="h-5 w-5 text-brand-500" /> {h.secondaryCta}
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-24 w-full max-w-6xl"
        >
          <motion.div
            className="absolute -left-12 top-20 z-20 hidden items-center gap-4 rounded-2xl border border-white/60 p-4 glass-panel lg:flex"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{ui.heroStatProduction}</p>
              <p className="text-xl font-black text-gray-900 dark:text-white">+45%</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-8 bottom-32 z-20 hidden items-center gap-4 rounded-2xl border border-white/60 p-4 glass-panel lg:flex"
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{ui.heroStatWorkshop}</p>
              <p className="text-xl font-black text-gray-900 dark:text-white">12/12</p>
            </div>
          </motion.div>

          <div className="relative rounded-[2rem] border border-white/60 bg-white/40 p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-3xl dark:border-gray-700/50 dark:bg-gray-900/40 dark:shadow-black/30">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-gray-200/80 bg-gray-50 shadow-inner dark:border-gray-700 dark:bg-gray-900">
              <div className="absolute left-0 top-0 z-10 flex h-12 w-full items-center gap-2 border-b border-gray-200/80 bg-white/80 px-6 backdrop-blur-md dark:border-gray-700 dark:bg-gray-950/80">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full border border-red-500/20 bg-red-400" />
                  <div className="h-3 w-3 rounded-full border border-yellow-500/20 bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full border border-green-500/20 bg-green-400" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-md bg-gray-100 px-4 py-1 dark:bg-gray-800">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{ui.heroMockUrl}</span>
                </div>
              </div>

              <div className="group relative pt-12">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80"
                  alt={ui.heroImageAlt}
                  className="h-[400px] w-full object-cover object-top contrast-100 brightness-105 filter md:h-[600px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
