import type { ReactNode } from 'react';

type Props = { children: ReactNode };

export default function AdminSectionTitle({ children }: Props) {
  return (
    <h2 className="border-b border-gray-100 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
      {children}
    </h2>
  );
}
