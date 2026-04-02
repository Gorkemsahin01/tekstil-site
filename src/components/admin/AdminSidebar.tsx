import { NavLink } from 'react-router-dom';
import { BookOpen, FileText, Home, Languages, Layers, Mail, LogOut } from 'lucide-react';
import SamplifyLogo from '../branding/SamplifyLogo';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const nav = [
  { to: '/admin/ana-sayfa', label: 'Ana sayfa', icon: Home },
  { to: '/admin/moduller', label: 'Modüller', icon: Layers },
  { to: '/admin/hakkimizda', label: 'Hakkımızda', icon: FileText },
  { to: '/admin/iletisim', label: 'İletişim', icon: Mail },
  { to: '/admin/akademi', label: 'Akademi (blog)', icon: BookOpen },
  { to: '/admin/arayuz', label: 'Arayüz metinleri', icon: Languages },
];

export default function AdminSidebar() {
  const { logout } = useAdminAuth();

  return (
    <aside className="sticky top-0 z-30 flex h-screen w-[288px] shrink-0 flex-col border-r border-white/[0.06] bg-gradient-to-b from-[#0c0f18] via-gray-950 to-[#06080f] text-gray-100 shadow-[8px_0_40px_-12px_rgba(0,0,0,0.5)]">
      <div className="border-b border-white/5 px-5 py-7">
        <div className="flex items-center gap-3">
          <div className="flex min-h-[3.25rem] min-w-0 shrink-0 items-center justify-center rounded-2xl bg-white/95 p-2 ring-1 ring-white/15">
            <SamplifyLogo variant="mark" className="!h-11 !max-w-[180px] md:!h-12 md:!max-w-[200px]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">
              Yönetim
            </p>
            <p className="text-[13px] font-medium leading-snug text-gray-400">İçerik paneli</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          Site metinleri ve akademi yazılarını buradan güncelleyin.
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
          İçerik
        </p>
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-brand-600 to-violet-600 text-white shadow-lg shadow-brand-900/30'
                  : 'text-gray-400 hover:bg-white/[0.06] hover:text-white',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isActive ? 'bg-white/15' : 'bg-white/5 group-hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/5 p-3">
        <button
          type="button"
          onClick={() => {
            logout();
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
            <LogOut className="h-4 w-4" aria-hidden />
          </span>
          Çıkış
        </button>
      </div>
    </aside>
  );
}
