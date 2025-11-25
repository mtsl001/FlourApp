import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  const navItemClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-brand-800 text-white font-bold shadow-md' 
        : 'text-slate-600 hover:bg-brand-50 hover:text-brand-900 font-medium'
    }`;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 md:min-h-screen flex-shrink-0">
        <div className="p-6 border-b border-slate-100">
          <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">Management</span>
          <h2 className="text-2xl font-serif font-bold text-brand-900">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-1">
          <NavLink to="/admin" end className={navItemClass}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={navItemClass}>
            <Package className="w-5 h-5" /> Products
          </NavLink>
          <NavLink to="/admin/orders" className={navItemClass}>
            <ShoppingBag className="w-5 h-5" /> Orders
          </NavLink>
          <NavLink to="/admin/users" className={navItemClass}>
            <Users className="w-5 h-5" /> Users
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
