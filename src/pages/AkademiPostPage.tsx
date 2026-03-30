import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useBlogPosts } from '../contexts/BlogPostsContext';
import { getAkademiPostBySlug } from '../data/akademiPosts';
import { useLocale } from '../contexts/LocaleContext';
import { useUiStrings } from '../hooks/useUiStrings';

export default function AkademiPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = useBlogPosts();
  const post = getAkademiPostBySlug(slug, posts);
  const { locale } = useLocale();
  const ui = useUiStrings();

  if (!post) {
    return <Navigate to="/akademi" replace />;
  }

  const paragraphs = post.body[locale];

  function copyLink() {
    const url = window.location.href;
    void navigator.clipboard.writeText(url).then(() => {
      toast.success(ui.akademiLinkCopied);
    });
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 pt-24 dark:bg-gray-950 md:pt-28">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute right-0 top-0 h-[min(60vh,480px)] w-[min(60vw,480px)] rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-600/15" />
      </div>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/akademi"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition hover:gap-3 dark:text-brand-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {ui.akademiBackToList}
          </Link>
        </motion.div>

        <header className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {post.category[locale]}
          </p>
          <h1 className="mb-6 text-3xl font-black leading-[1.15] tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            {post.title[locale]}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>{post.date}</time>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {post.readMinutes[locale]}
            </span>
            <button
              type="button"
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={copyLink}
            >
              <Share2 className="h-3.5 w-3.5" aria-hidden />
              {ui.akademiShare}
            </button>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="relative mb-12 overflow-hidden rounded-[1.75rem] border border-gray-200/80 shadow-2xl shadow-gray-900/10 dark:border-gray-800 dark:shadow-black/40"
        >
          <div className="aspect-[21/9] max-h-[420px] w-full md:aspect-[2.4/1]">
            <img
              src={post.image}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/30 to-transparent dark:from-gray-950/50" />
        </motion.div>

        <div className="max-w-none">
          <div className="space-y-6 text-lg leading-[1.75] text-gray-700 dark:text-gray-300">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.2) }}
                className={
                  i === 0
                    ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-0.5 first-letter:font-black first-letter:text-brand-600 first-letter:[font-size:3.25rem] first-letter:[line-height:0.85] dark:first-letter:text-brand-400'
                    : undefined
                }
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 dark:border-gray-800 dark:from-gray-900 dark:to-gray-950"
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Samplify.tr
          </p>
          <p className="text-gray-600 dark:text-gray-400">{ui.akademiPostFooter}</p>
          <Link
            to="/iletisim"
            className="mt-6 inline-flex rounded-full bg-gray-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600 dark:bg-white dark:text-gray-900 dark:hover:bg-brand-200"
          >
            {ui.navEarlyAccess}
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
