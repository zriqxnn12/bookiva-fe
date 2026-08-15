import {
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathActive = window.location.pathname === "/";

  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-0 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center">
              <CalendarDays size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">
              Book<span className="text-blue-700">Iva</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathActive ? "text-blue-700 bg-blue-100" : "text-slate-700 hover:text-blue-700"}`}
            >
              Home
            </Link>
            <Link
              to="/service"
              className={`px-3 py-2 rounded-md text-sm font-medium ${!pathActive ? "text-blue-700 bg-blue-100" : "text-slate-700 hover:text-blue-700"}`}
            >
              Service
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-300 transition-colors"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {user?.name}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {/* dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 w-52 mt-1 bg-white shadow-xl border border-slate-300 px-2 py-1 rounded-lg">
                    <div className="p-2 border-b border-slate-300">
                      <p className="text-xs text-slate-400">Signed as</p>
                      <p className="text-sm text-slate-700 font-semibold">
                        {user?.email}
                      </p>
                    </div>
                    {user?.role === "ADMIN" ? (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Settings size={15} /> Admin dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <LayoutDashboard size={15} /> My dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-slate-50 transition-colors"
                    >
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm btn-secondary px-4 py-2">
                  Sign In
                </Link>
                <Link to="/register" className="text-sm btn-primary px-4 py-2">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-300 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-300"
            >
              Home
            </Link>
            <Link
              to="/service"
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-300"
            >
              Service
            </Link>
            {isAuthenticated ? (
              <>
                {user?.role === "ADMIN" ? (
                  <Link
                    to="/admin"
                    onClick={() => mobileOpen((prev) => !prev)}
                    className="block px-4 py-2.5 text-sm font-medium text-slate-800"
                  >
                    Admin dashboard
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    onClick={() => mobileOpen((prev) => !prev)}
                    className="block px-4 py-2.5 text-sm font-medium text-slate-800"
                  >
                    My dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-red-500 font-medium"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => mobileOpen((prev) => !prev)}
                  className="flex-1 btn-secondary text-center text-sm"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => mobileOpen((prev) => !prev)}
                  className="flex-1 btn-primary text-center text-sm"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
