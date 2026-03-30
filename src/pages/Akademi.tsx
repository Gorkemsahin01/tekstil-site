import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../contexts/BlogPostsContext';
import { useLocale } from '../contexts/LocaleContext';
import { useUiStrings } from '../hooks/useUiStrings';

export default function Akademi() {
  const { locale } = useLocale();
  const ui = useUiStrings();
  const { posts } = useBlogPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = featured ? posts.filter((p) => p.id !== featured.id) : [];

  if (!featured) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] px-4 pb-20 pt-32 text-center dark:bg-gray-950">
        <p className="text-gray-600 dark:text-gray-400">{ui.akademiEmpty}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20 dark:bg-gray-950">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-brand-500/15 blur-3xl dark:bg-brand-600/20" />
        <div className="absolute -right-32 top-1/3 h-[380px] w-[380px] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-600/15" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 text-center md:mb-20"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 dark:border-brand-400/30 dark:bg-brand-500/15 dark:text-brand-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {ui.akademiBadge}
          </div>
          <h1 className="mb-5 bg-gradient-to-br from-gray-900 via-brand-700 to-violet-700 bg-clip-text text-4xl font-black tracking-tight text-transparent dark:from-white dark:via-brand-300 dark:to-violet-300 md:text-6xl md:leading-[1.1]">
            {ui.akademiTitle}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            {ui.akademiSubtitle}
          </p>
        </motion.header>

        {/* Featured */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mb-16 overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white shadow-[0_24px_80px_-24px_rgba(0,0,0,0.12)] dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-black/40 md:grid md:grid-cols-2 md:gap-0"
        >
          <Link
            to={`/akademi/${featured.slug}`}
            className="relative block aspect-[4/3] md:aspect-auto md:min-h-[320px]"
          >
            <img
              src={featured.image}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-gray-900/30" />
            <span className="absolute left-6 top-6 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-gray-900 shadow-sm backdrop-blur dark:bg-gray-950/90 dark:text-white">
              {ui.akademiFeatured}
            </span>
          </Link>
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              {featured.category[locale]} · {featured.date}
            </p>
            <h2 className="mb-4 text-2xl font-black leading-tight text-gray-900 dark:text-white md:text-3xl">
              {featured.title[locale]}
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">{featured.excerpt[locale]}</p>
            <div className="mt-auto flex flex-wrap items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-500">
                {featured.readMinutes[locale]}
              </span>
              <Link
                to={`/akademi/${featured.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600 dark:bg-white dark:text-gray-900 dark:hover:bg-brand-200"
              >
                {ui.akademiReadMore}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.article>

        {/* Grid */}
        <div className="mb-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200/90 bg-white transition hover:border-brand-300/50 hover:shadow-xl hover:shadow-brand-500/5 dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-brand-500/30"
            >
              <Link to={`/akademi/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {post.category[locale]} · {post.date}
                </p>
                <Link to={`/akademi/${post.slug}`}>
                  <h3 className="mb-3 text-lg font-bold leading-snug text-gray-900 transition group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                    {post.title[locale]}
                  </h3>
                </Link>
                <p className="mb-6 line-clamp-3 flex-1 text-sm text-gray-600 dark:text-gray-400">
                  {post.excerpt[locale]}
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                  <span className="text-xs text-gray-500">{post.readMinutes[locale]}</span>
                  <Link
                    to={`/akademi/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 transition group-hover:translate-x-0.5 dark:text-brand-400"
                  >
                    {ui.akademiReadMore}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gray-900 via-brand-950 to-indigo-950 px-8 py-12 text-center md:px-16"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <BookOpen className="mx-auto mb-4 h-10 w-10 text-brand-300" aria-hidden />
          <h2 className="mb-3 text-2xl font-black text-white md:text-3xl">{ui.akademiNewsletterTitle}</h2>
          <p className="mx-auto mb-8 max-w-lg text-gray-400">{ui.akademiNewsletterSubtitle}</p>
          <form
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={ui.akademiNewsletterPlaceholder}
              className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-5 py-3.5 text-white placeholder:text-gray-500 backdrop-blur focus:outline-none focus:ring-2 focus:ring-brand-400/50"
            />
            <button
              type="submit"
              className="rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-gray-900 transition hover:bg-brand-100"
            >
              {ui.akademiNewsletterButton}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
