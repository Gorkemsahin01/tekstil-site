import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: ReactNode;
};

export default function AdminPrimaryButton({ children, icon, className = '', ...rest }: Props) {
  return (
    <button
      type="button"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:from-brand-500 hover:to-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 disabled:opacity-50 ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
