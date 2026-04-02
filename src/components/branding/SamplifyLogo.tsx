type Props = {
  /** mark: üst bar / dar alanlar — tam logo (ikon + wordmark), küçük yükseklik */
  variant?: 'full' | 'mark';
  className?: string;
  alt?: string;
};

export default function SamplifyLogo({
  variant = 'full',
  className = '',
  alt = 'Samplify.tr',
}: Props) {
  const src = '/samplify-logo.png';

  if (variant === 'mark') {
    return (
      <img
        src={src}
        alt={alt}
        className={`h-12 w-auto max-w-[280px] object-contain object-left md:h-14 ${className}`}
        loading="eager"
        decoding="async"
        width={280}
        height={56}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`h-auto max-h-16 w-auto max-w-[320px] object-contain object-left md:max-h-20 md:max-w-[360px] ${className}`}
      loading="lazy"
      decoding="async"
      width={360}
      height={120}
    />
  );
}
