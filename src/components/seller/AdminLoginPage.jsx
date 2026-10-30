"use client";

import React, { useState } from "react";
import { Link } from "@/components/common/RouterAdapter";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  BookOpen,
  KeyRound,
  Store
} from "lucide-react";
import { useAdminAuth, DEMO_ADMIN_ACCOUNTS } from "@/context/AdminAuthContext";

export default function AdminLoginPage() {
  const { loginAdmin } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const accountsList = DEMO_ADMIN_ACCOUNTS || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    const result = loginAdmin(email, password);
    if (!result.success) {
      setErrorMsg(result.message || "Invalid credentials");
    }
  };

  const quickDemoLogin = (index) => {
    const acc = accountsList[index];
    if (acc) {
      setEmail(acc.email);
      setPassword(acc.password);
      loginAdmin(acc.email, acc.password);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden font-sans transition-colors">
      
      {/* Background Ambient Lighting */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[15%] w-[450px] h-[350px] bg-amber-500/10 dark:bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Top Header */}
      <header className="p-6 sm:px-12 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif font-bold text-xl text-gray-900 dark:text-white tracking-tight">
              Book<span className="text-amber-500">Flow</span>
            </span>
            <span className="block text-[10px] text-indigo-600 dark:text-indigo-400 font-mono uppercase tracking-widest font-semibold">
              Seller Admin Portal
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 text-xs font-semibold text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 shadow-sm transition-all"
          >
            <Store className="w-4 h-4 text-amber-500" />
            <span>Customer Store</span>
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md bg-white dark:bg-slate-900/90 backdrop-blur-md border border-gray-200 dark:border-slate-800 rounded-3xl shadow-xl dark:shadow-2xl p-6 sm:p-8 space-y-6 animate-slide-up transition-colors">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
              Seller Hub Authentication
            </h1>
            <p className="text-xs text-gray-500 dark:text-slate-400 max-w-xs mx-auto">
              Secure administrative access for store operations, catalog management, and revenue analytics.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1.5">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 dark:text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-slate-500"
                  placeholder="admin@bookflow.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-bold text-gray-700 dark:text-slate-300">Password</label>
                <span className="text-[10px] text-gray-500 dark:text-slate-400 font-mono">Demo: admin</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 dark:text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-slate-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Unlock Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Instant Demo Login Accounts */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-bold">
                <KeyRound className="w-3.5 h-3.5" />
                Instant 1-Click Demo Login
              </span>
              <span className="text-[10px] text-gray-400 dark:text-slate-500">No typing needed</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {accountsList.map((acc, index) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => quickDemoLogin(index)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-slate-950/70 hover:bg-indigo-50/60 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-slate-700 transition-all text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-8 h-8 rounded-lg object-cover border border-gray-200 dark:border-slate-700"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 dark:text-white text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        <span>{acc.name}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800/50">
                          {acc.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-slate-400 truncate">
                        {acc.role} • {acc.email}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-[11px] text-gray-500 dark:text-slate-500 relative z-10">
        BookFlow Commerce Cloud • Secured with Role-Based Access Control
      </footer>

    </div>
  );
}
