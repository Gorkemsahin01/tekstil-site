import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePublicSiteContent } from '../hooks/usePublicSiteContent';

/** Örn. "Neden Samplify.tr?" → önek ve son büyük harf, marka doğal: Samplify.tr */
function WhySectionLabel({ label }: { label: string }) {
  const m = label.match(/^(.*?)\s*Samplify\.tr\s*(.*)$/i);
  if (!m) {
    return <>{label}</>;
  }
  const prefix = m[1].trim();
  const suffix = m[2];
  return (
    <>
      <span className="uppercase">{prefix} </span>
      <span className="normal-case tracking-normal">Samplify.tr</span>
      <span className="uppercase">{suffix}</span>
    </>
  );
}

export default function About() {
  const { content } = usePublicSiteContent();
  const a = content.about;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 pt-32 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h1 className="mb-8 text-5xl font-black tracking-tight text-gray-900 dark:text-white md:text-7xl">
            {a.titleLine1} <br />
            <span className="text-gray-400 dark:text-gray-500">{a.titleLine2}</span>
          </h1>
        </motion.div>

        <div className="mb-20 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[3rem] border border-gray-200/80 bg-white shadow-inner dark:border-gray-800 dark:bg-gray-900">
              <img
                src="/about-atelier.jpg"
                alt="Samplify.tr — tekstil ve üretim"
                className="h-full w-full object-cover"
                width={800}
                height={1000}
                loading="lazy"
              />
            </div>
          </motion.div>

          <div className="flex flex-col justify-center gap-12 p-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                {a.visionLabel}
              </h3>
              <p className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">{a.visionTitle}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-4 text-sm font-bold tracking-widest text-brand-600 dark:text-brand-400">
                <WhySectionLabel label={a.whyLabel} />
              </h3>
              <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-400">{a.whyBody}</p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[3rem] bg-gray-900 p-12 text-center text-white md:p-20 dark:bg-gray-900"
        >
          <h2 className="mb-8 text-4xl font-black md:text-5xl">{a.ctaTitle}</h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-400">{a.ctaBody}</p>
          <Link
            to="/iletisim"
            className="inline-block rounded-full bg-white px-10 py-5 text-lg font-bold text-gray-900 transition-transform hover:scale-105 dark:bg-white"
          >
            {a.ctaButton}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
