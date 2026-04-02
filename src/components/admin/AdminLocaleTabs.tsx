import type { Locale } from '../../i18n/types';

type Props = {
  locale: Locale;
  onChange: (locale: Locale) => void;
  className?: string;
};

export default function AdminLocaleTabs({ locale, onChange, className = '' }: Props) {
  return (
    <div className={`inline-flex rounded-xl border border-gray-200 bg-white p-0.5 shadow-sm ${className}`}>
      {(['tr', 'en'] as const).map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => onChange(loc)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            locale === loc ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {loc === 'tr' ? 'Türkçe' : 'English'}
        </button>
      ))}
    </div>
  );
}
