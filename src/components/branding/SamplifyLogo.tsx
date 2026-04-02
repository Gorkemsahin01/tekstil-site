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
  const src = '/samplify-logo.jpg';

  if (variant === 'mark') {
    return (
      <img
        src={src}
        alt={alt}
        className={`h-12 w-auto max-w-[260px] object-contain object-left md:h-14 md:max-w-[280px] ${className}`}
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
      className={`h-auto max-h-14 w-auto max-w-[240px] object-contain object-left md:max-h-16 md:max-w-[260px] ${className}`}
      loading="lazy"
      decoding="async"
      width={260}
      height={100}
    />
  );
}
