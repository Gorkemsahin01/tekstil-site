import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ModulesPage from './pages/ModulesPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Akademi from './pages/Akademi';
import AkademiPostPage from './pages/AkademiPostPage';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import AdminLogin from './pages/admin/AdminLogin';
import RequireAdmin from './pages/admin/RequireAdmin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminEditHome from './pages/admin/AdminEditHome';
import AdminEditModules from './pages/admin/AdminEditModules';
import AdminEditAbout from './pages/admin/AdminEditAbout';
import AdminEditContact from './pages/admin/AdminEditContact';
import AdminEditBlog from './pages/admin/AdminEditBlog';

function PublicShell() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans text-gray-900 selection:bg-brand-500 selection:text-white dark:bg-gray-950 dark:text-gray-100">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/moduller" element={<ModulesPage />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="/akademi" element={<Akademi />} />
            <Route path="/akademi/:slug" element={<AkademiPostPage />} />
          </Route>

          <Route path="/admin">
            <Route index element={<AdminLogin />} />
            <Route element={<RequireAdmin />}>
              <Route element={<AdminLayout />}>
                <Route path="ana-sayfa" element={<AdminEditHome />} />
                <Route path="moduller" element={<AdminEditModules />} />
                <Route path="hakkimizda" element={<AdminEditAbout />} />
                <Route path="iletisim" element={<AdminEditContact />} />
                <Route path="akademi" element={<AdminEditBlog />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
