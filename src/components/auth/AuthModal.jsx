import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  KeyRound,
} from "lucide-react";
import { useAuth, DEMO_USERS } from "@/context/AuthContext";
import { useRouter } from "@/components/common/RouterAdapter";

export default function AuthModal() {
  const router = useRouter();
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    loginAsDemo,
    register,
  } = useAuth();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const success = login(loginForm.email, loginForm.password);
    if (success && loginForm.email.includes("admin")) {
      router.push("/seller");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register(registerForm);
  };

  const handleOneClickDemo = (role) => {
    const user = loginAsDemo(role);
    if (role === "admin") {
      router.push("/seller");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden animate-slide-up text-gray-900">
        
        {/* Header Bar */}
        <div className="p-6 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 border-b border-gray-100 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-xl bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-gray-900">
                {authModalMode === "login" ? "Sign In & Demo Access" : "Join BookFlow"}
              </h2>
              <p className="text-xs text-gray-500">
                {authModalMode === "login"
                  ? "Access your saved addresses, orders & reading history"
                  : "Create an account for personalized recommendations"}
              </p>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 gap-1.5 mt-5 p-1 bg-gray-100 border border-gray-200 rounded-xl">
            <button
              type="button"
              onClick={() => setAuthModalMode("login")}
              className={`py-2 rounded-lg text-xs font-bold transition-all ${
                authModalMode === "login"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthModalMode("register")}
              className={`py-2 rounded-lg text-xs font-bold transition-all ${
                authModalMode === "register"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-4">
          {authModalMode === "login" ? (
            <>
              {/* One-Click Demo Profiles Box */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    One-Click Demo Logins
                  </span>
                  <span className="text-[10px] text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200 font-semibold">
                    Instant Access
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {/* Admin Demo Button */}
                  <button
                    type="button"
                    onClick={() => handleOneClickDemo("admin")}
                    className="p-2.5 rounded-xl bg-white hover:bg-amber-100/50 border border-amber-300 text-left transition-all group flex flex-col justify-between shadow-sm"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Admin Store
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                        Seller Hub
                      </span>
                    </div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-amber-800">
                      Charvi Prasad
                    </div>
                    <div className="text-[10px] text-gray-500 truncate">
                      admin@bookflow.com
                    </div>
                  </button>

                  {/* Customer Demo Button */}
                  <button
                    type="button"
                    onClick={() => handleOneClickDemo("customer")}
                    className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-300 text-left transition-all group flex flex-col justify-between shadow-sm"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5" />
                        Customer VIP
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        Shopper
                      </span>
                    </div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-800">
                      Alex Morgan
                    </div>
                    <div className="text-[10px] text-gray-500 truncate">
                      alex.morgan@example.com
                    </div>
                  </button>
                </div>
              </div>

              {/* Standard Email/Password Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3 pt-1">
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span>Or enter custom credentials</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setLoginForm({ ...loginForm, password: "password123" })}
                      className="text-[10px] text-amber-700 font-semibold hover:underline"
                    >
                      Fill: password123
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Sign In & Access Account</span>
                </button>
              </form>
            </>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="Create a password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Create Registered Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

