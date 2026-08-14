import { CalendarDays } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const pathActive = window.location.pathname === "/";

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
            <Link to="/login" className="text-sm btn-secondary px-4 py-2">
              Sign In
            </Link>
            <Link to="/register" className="text-sm btn-primary px-4 py-2">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
