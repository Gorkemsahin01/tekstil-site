type Props = {
  variant?: 'full' | 'mark';
  className?: string;
  alt?: string;
};

/**
 * mark: Küçük kare (navbar / footer) — logo dosyasının üst bölümüne odaklanır
 * full: Tam logo
 */
export default function SamplifyLogo({
  variant = 'full',
  className = '',
  alt = 'Samplify.tr',
}: Props) {
  const src = '/samplify-logo.png';

  if (variant === 'mark') {
    return (
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/90 dark:bg-gray-900 dark:ring-gray-700 ${className}`}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-top"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`h-auto w-auto max-w-full object-contain object-left ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}
