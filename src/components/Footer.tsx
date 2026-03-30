import React from 'react';
import { Link } from 'react-router-dom';
import { usePublicSiteContent } from '../hooks/usePublicSiteContent';
import { useUiStrings } from '../hooks/useUiStrings';

export default function Footer() {
  const { content } = usePublicSiteContent();
  const ui = useUiStrings();

  return (
    <footer className="border-t border-gray-200/50 bg-[#FAFAFA] pb-10 pt-20 overflow-hidden dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {content.brandDisplay}
            </span>
            <p className="font-medium text-gray-500 dark:text-gray-400">{ui.footerTagline}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-600 dark:text-gray-400">
            <Link to="/moduller" className="transition-colors hover:text-gray-900 dark:hover:text-white">
              {ui.footerModules}
            </Link>
            <Link to="/hakkimizda" className="transition-colors hover:text-gray-900 dark:hover:text-white">
              {ui.footerVision}
            </Link>
            <Link to="/akademi" className="transition-colors hover:text-gray-900 dark:hover:text-white">
              {ui.footerAkademi}
            </Link>
            <Link to="/iletisim" className="transition-colors hover:text-gray-900 dark:hover:text-white">
              {ui.footerContact}
            </Link>
          </div>
        </div>

        <div className="mb-10 flex justify-center overflow-hidden opacity-[0.07] pointer-events-none select-none dark:opacity-[0.12]">
          <span className="text-[15vw] font-black leading-none tracking-tighter text-gray-900 dark:text-white">
            {content.brandFooterWatermark}
          </span>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200/50 pt-8 text-sm font-medium text-gray-400 dark:border-gray-800 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Samplify.tr. {ui.footerCopyright}
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-gray-900 dark:hover:text-white">
              {ui.footerPrivacy}
            </a>
            <a href="#" className="transition-colors hover:text-gray-900 dark:hover:text-white">
              {ui.footerTerms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
