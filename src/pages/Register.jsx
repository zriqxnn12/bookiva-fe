import {
  CalendarDays,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <Helmet>
        <title>BookIva - Register</title>

        <meta property="og:title" content="BookIva - Register" />
        <meta property="og:description" content="BookIva - Register" />
      </Helmet>

      <div className="min-h-screen flex bg-slate-50">
        {/* left side */}
        <div className="hidden flex-col lg:flex lg:w-1/2 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden justify-between p-12 text-white">
          <div className="relative">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <CalendarDays size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold">BookIva</span>
            </Link>
          </div>
          <div className="relative">
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Start booking in seconds
            </h2>
            <p className="text-lg leading-relaxed text-blue-200">
              Create your free account and get access to hundreds of premium
              services near you
            </p>
            <ul className="mt-6 space-y-3 text-blue-200">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center">
                  <Check size={12} className="text-white w-2.5 h-2.5" />
                </span>
                Free to create account
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center">
                  <Check size={12} className="text-white w-2.5 h-2.5" />
                </span>
                No hidden fees
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center">
                  <Check size={12} className="text-white w-2.5 h-2.5" />
                </span>
                Instant booking confirmation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center">
                  <Check size={12} className="text-white w-2.5 h-2.5" />
                </span>
                Secure payment with xendit
              </li>
            </ul>
          </div>
          <div className="relative text-sm text-blue-200">
            © 2026 BookIva. All rights reserved.
          </div>
        </div>

        {/* right side */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link to="/" className="flex items-center gap-2 lg:hidden mb-8">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center">
                  <CalendarDays size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">
                  Book<span className="text-blue-700">Iva</span>
                </span>
              </Link>
              <h1 className="text-2xl font-bold text-slate-900">
                Create your account
              </h1>
              <p className="text-sm text-slate-800 mt-1">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700">
                  Sign in
                </Link>
              </p>
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-xl mt-4 text-sm hover:bg-slate-100 transition-all shadow-sm mb-6">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.433.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with google
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-xs text-slate-400">OR</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              <form action="#" className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-800 mb-1.5 block">
                    Full name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      className="input pl-10"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-800 mb-1.5 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      className="input pl-10"
                      placeholder="you@gmail.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-800 mb-1.5 block">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="phone"
                      className="input pl-10"
                      placeholder="+62 812 3456 7890"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-800 mb-1.5 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="password"
                      className="input pl-10"
                      placeholder="Min 6 characters"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full mt-2">
                  Create account
                </button>
              </form>

              <p className="text-center text-xs text-slate-300 mt-4">
                By signing up, you agree to our{" "}
                <span className="text-blue-500">Terms of our Service</span> and{" "}
                <span className="text-blue-500">Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
