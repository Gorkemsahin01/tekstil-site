import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function AdminFormCard({ children, className = '' }: Props) {
  return (
    <div
      className={`rounded-2xl border border-gray-200/90 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_-4px_rgba(15,23,42,0.06)] md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
