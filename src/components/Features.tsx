import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Shield, BarChart3, ArrowUpRight } from 'lucide-react';
import { usePublicSiteContent } from '../hooks/usePublicSiteContent';

export default function Features() {
  const { content } = usePublicSiteContent();
  const h = content.home;

  return (
    <section className="relative z-20 -mt-10 rounded-t-[3rem] bg-white py-32 shadow-[0_-20px_40px_rgba(0,0,0,0.02)] dark:bg-gray-900 dark:shadow-black/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 items-end justify-between md:flex">
          <div className="max-w-2xl">
            <h2 className="mb-6 text-5xl font-black tracking-tight text-gray-900 dark:text-white">
              {h.featuresHeading} <br />
              <span className="text-brand-600 dark:text-brand-400">{h.featuresHeadingAccent}</span>
            </h2>
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400">{h.featuresIntro}</p>
          </div>
        </div>

        <div className="grid auto-rows-[300px] grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-[2rem] bg-gray-50 p-10 transition-colors hover:bg-gray-100 dark:bg-gray-800/80 dark:hover:bg-gray-800 md:col-span-2"
          >
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-200 opacity-0 mix-blend-multiply blur-3xl filter transition-opacity duration-700 group-hover:opacity-50 dark:bg-brand-600/30 dark:mix-blend-normal" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-gray-900">
                <Layers className="h-7 w-7 text-gray-900 dark:text-white" />
              </div>
              <div>
                <h3 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">{h.f1Title}</h3>
                <p className="max-w-md text-lg text-gray-600 dark:text-gray-400">{h.f1Body}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative overflow-hidden rounded-[2rem] bg-gray-900 p-10 dark:bg-gray-950"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">{h.f2Title}</h3>
                <p className="text-gray-400">{h.f2Body}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group rounded-[2rem] border border-gray-200 bg-white p-10 shadow-sm transition-colors hover:border-brand-300 hover:shadow-xl hover:shadow-brand-100/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-500/40 dark:hover:shadow-brand-900/20"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 transition-transform group-hover:scale-110 dark:bg-brand-950/50">
                <Shield className="h-7 w-7 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{h.f3Title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{h.f3Body}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative overflow-hidden rounded-[2rem] bg-[#F3F4F6] p-10 dark:bg-gray-800/50 md:col-span-2"
          >
            <div className="relative z-10 max-w-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-gray-900">
                <BarChart3 className="h-7 w-7 text-gray-900 dark:text-white" />
              </div>
              <h3 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">{h.f4Title}</h3>
              <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">{h.f4Body}</p>
              <button
                type="button"
                className="flex items-center gap-2 font-bold text-gray-900 transition-colors hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
              >
                {h.f4LinkLabel} <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute right-0 top-1/2 hidden h-96 w-96 translate-x-1/4 -translate-y-1/2 rounded-full bg-white opacity-50 blur-2xl dark:bg-gray-600/30 md:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
