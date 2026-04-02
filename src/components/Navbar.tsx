import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePublicSiteContent } from '../hooks/usePublicSiteContent';
import { useLocale } from '../contexts/LocaleContext';
import { useTheme } from '../contexts/ThemeContext';
import { useUiStrings } from '../hooks/useUiStrings';
import SamplifyLogo from './branding/SamplifyLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content } = usePublicSiteContent();
  const { locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const ui = useUiStrings();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/akademi') {
      return location.pathname === '/akademi' || location.pathname.startsWith('/akademi/');
    }
    return location.pathname === path;
  };

  const navLinks = [
    { name: ui.navDiscover, path: '/' },
    { name: ui.navModules, path: '/moduller' },
    { name: ui.navVision, path: '/hakkimizda' },
    { name: ui.navAkademi, path: '/akademi' },
  ];

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50 flex w-full justify-center px-4 pt-6">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`pointer-events-auto w-full max-w-5xl transition-all duration-500 rounded-full ${
          scrolled
            ? 'glass-panel py-3 px-4 md:px-6'
            : 'bg-transparent py-4 px-4 md:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <Link
            to="/"
            className="flex min-w-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 rounded-xl shrink-0"
            aria-label={content.brandDisplay}
          >
            <SamplifyLogo variant="mark" />
          </Link>

          <div className="hidden md:flex flex-1 justify-center px-2 min-w-0">
            <div className="flex flex-wrap justify-center gap-0.5 rounded-full border border-gray-200/50 bg-gray-100/50 p-1 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`whitespace-nowrap px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300 xl:px-4 xl:text-sm ${
                    isActive(link.path)
                      ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-white/50 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <div
              className="flex rounded-full border border-gray-200/80 bg-white/60 p-0.5 dark:border-gray-600 dark:bg-gray-800/80"
              role="group"
              aria-label="Dil seçimi"
            >
              <button
                type="button"
                onClick={() => setLocale('tr')}
                className={`rounded-full px-2.5 py-1.5 text-xs font-bold transition ${
                  locale === 'tr'
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`rounded-full px-2.5 py-1.5 text-xs font-bold transition ${
                  locale === 'en'
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/80 bg-white/80 text-gray-800 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-amber-200 dark:hover:bg-gray-700"
              aria-label={theme === 'dark' ? ui.themeLight : ui.themeDark}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="/iletisim"
              className="whitespace-nowrap rounded-full bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5 dark:bg-white dark:text-gray-900 dark:hover:bg-brand-200"
            >
              {ui.navEarlyAccess}
            </Link>
          </div>

          {/* Tablet: compact controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            <div className="flex rounded-full border border-gray-200/80 bg-white/70 p-0.5 dark:border-gray-600 dark:bg-gray-800/90">
              <button
                type="button"
                onClick={() => setLocale('tr')}
                className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                  locale === 'tr' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'text-gray-500'
                }`}
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                  locale === 'en' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'text-gray-500'
                }`}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-amber-200"
              aria-label={theme === 'dark' ? ui.themeLight : ui.themeDark}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full bg-gray-100 p-2 text-gray-900 dark:bg-gray-800 dark:text-white"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="glass-panel overflow-hidden rounded-3xl md:hidden"
            >
              <div className="space-y-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block rounded-2xl px-4 py-3 text-lg font-semibold ${
                      isActive(link.path)
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/iletisim"
                  className="mt-3 block w-full rounded-2xl bg-gray-900 px-4 py-4 text-center text-lg font-bold text-white dark:bg-white dark:text-gray-900"
                >
                  {ui.navEarlyAccessMobile}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
