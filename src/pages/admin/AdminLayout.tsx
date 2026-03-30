import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-slate-100 via-[#eef1f8] to-slate-200">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(124,58,237,0.09),transparent_55%)]"
        aria-hidden
      />
      <AdminSidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-11 lg:max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
