import {
  Briefcase,
  CalendarDays,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { path: "/admin/services", label: "Services", icon: Briefcase },
  { path: "/admin/users", label: "Users", icon: Users },
];

function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center">
            <CalendarDays size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">
            Book<span className="text-blue-700">Iva</span>
          </span>
        </Link>
        <div className="mt-1">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Admin Panel
          </span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all 
                ${active ? "bg-blue-50 text-blue-500" : "text-slate-800 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Icon
                size={18}
                className={
                  active
                    ? "text-blue-500"
                    : "text-slate-400 group-hover:text-slate-800"
                }
              />
              {label}
              {active && (
                <ChevronRight size={18} className="ml-auto text-blue-400" />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div
            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center 
          text-white text-sm font-bold overflow-hidden"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              user?.name?.[0]?.toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {user?.name}
            </p>
            <p className="text-xs font-semibold text-slate-800 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 font-medium transition-colors"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen flex bg-slate-50">
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 fixed inset-y-0 left-0 z-30">
          <Sidebar />
        </aside>

        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            ></div>
            <div className="relative w-64 bg-white flex flex-col">
              <Sidebar />
            </div>
          </div>
        )}

        <div className="flex-1 lg:pl-64">
          <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-100 sticky top-0 z-20">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <Menu size={20} />
            </button>
            <span className="font-bold text-slate-900">
              Book<span className="text-blue-700">Iva</span> Admin
            </span>
          </div>
          <main className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
