"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, ArrowRight, TrendingUp, CheckCircle, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-[#121927] text-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase shadow-inner">
              <Sparkles className="w-3.5 h-3.5" />
              SaaS-Powered Book Commerce Engine
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight leading-[1.15] text-white">
              Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">Great Read</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover thousands of books from bestselling authors, independent publishers, and emerging writers. Complete client-side shopping with live order tracking and a connected seller SaaS platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/books"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all hover:scale-105 flex items-center gap-2"
              >
                <span>Explore All Books</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/seller"
                className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm sm:text-base transition-all hover:border-slate-500 flex items-center gap-2"
              >
                <span>Open Seller SaaS Center</span>
                <TrendingUp className="w-4 h-4 text-indigo-400" />
              </Link>
            </div>

            {/* Floating Trust Metrics */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-bold font-serif text-white">10K+</div>
                <div className="text-xs text-slate-400">Curated Titles</div>
              </div>
              <div className="space-y-0.5 border-l border-slate-800 pl-4">
                <div className="text-2xl sm:text-3xl font-bold font-serif text-white">5K+</div>
                <div className="text-xs text-slate-400">Happy Readers</div>
              </div>
              <div className="space-y-0.5 border-l border-slate-800 pl-4">
                <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-400">98%</div>
                <div className="text-xs text-slate-400">5-Star Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Visual Floating Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Main Featured Book Card */}
            <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 p-5 border border-slate-700/80 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Bestseller Spotlight
                </span>
                <span className="text-xs font-mono text-slate-400">₹499 only</span>
              </div>

              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl mb-4 group">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600"
                  alt="Atomic Habits"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                  <div className="text-lg font-serif font-bold text-white">Atomic Habits</div>
                  <div className="text-xs text-slate-300">by James Clear</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  ★ ★ ★ ★ ★ <span className="text-slate-300 ml-1">4.8 (1.2k)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                  In Stock (42 left)
                </span>
              </div>
            </div>

            {/* Floating Card 1: Payment Received */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900/95 border border-slate-700 p-3.5 rounded-2xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3 animate-float-slow">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                ₹
              </div>
              <div>
                <div className="text-xs font-bold text-white">₹898 Payment Received</div>
                <div className="text-[11px] text-slate-400">Order #BF-1024 • Verified</div>
              </div>
            </div>

            {/* Floating Card 2: Shipped Badge */}
            <div className="absolute -top-4 -right-4 bg-slate-900/95 border border-slate-700 p-3 rounded-2xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-xs font-bold text-white">Order Packed & Shipped</div>
                <div className="text-[10px] text-slate-400">Tracking #BF-1024</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

