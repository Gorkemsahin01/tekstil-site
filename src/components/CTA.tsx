import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePublicSiteContent } from '../hooks/usePublicSiteContent';

export default function CTA() {
  const { content } = usePublicSiteContent();
  const h = content.home;

  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] py-32 dark:bg-gray-950">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] bg-gray-900 p-12 text-center md:p-24 dark:bg-gray-900"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-gray-900 to-indigo-950/80" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.07]" />
          
          <div className="relative z-10">
            <h2 className="mb-8 text-4xl font-black tracking-tight text-white md:text-6xl">{h.ctaTitle}</h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl font-medium text-gray-400">{h.ctaSubtitle}</p>
            <Link
              to="/iletisim"
              className="inline-block rounded-full bg-white px-10 py-5 text-lg font-bold text-gray-900 shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:scale-105 hover:bg-brand-50 dark:bg-white dark:text-gray-900"
            >
              {h.ctaButton}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
