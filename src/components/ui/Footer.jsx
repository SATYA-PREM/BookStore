"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ShieldCheck, Truck, RotateCcw, Headphones, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-auto">
      {/* Value Proposition Bar */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Free Fast Shipping</h4>
                <p className="text-xs text-slate-400">On all orders over ₹500</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Secure Checkout</h4>
                <p className="text-xs text-slate-400">Client-side mock simulation</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Easy Returns</h4>
                <p className="text-xs text-slate-400">7-day replacement guarantee</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">24/7 Support</h4>
                <p className="text-xs text-slate-400">Dedicated assistance for readers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-xl text-white font-serif tracking-tight">
                Book<span className="text-amber-500">Flow</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              BookFlow is a modern SaaS platform connecting readers with curated bestsellers while empowering book publishers and indie sellers through interactive cloud management.
            </p>
            <div className="text-xs text-slate-500">
              Frontend Heavy Architecture • Pure LocalStorage • Zero Backend API
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Bookstore</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/books" className="hover:text-amber-400 transition-colors">Bestsellers</Link></li>
              <li><Link href="/books?category=Self%20Help" className="hover:text-amber-400 transition-colors">Self Help & Growth</Link></li>
              <li><Link href="/books?category=Business" className="hover:text-amber-400 transition-colors">Business & Finance</Link></li>
              <li><Link href="/books?category=Fiction" className="hover:text-amber-400 transition-colors">Fiction & Novels</Link></li>
              <li><Link href="/books?category=Technology" className="hover:text-amber-400 transition-colors">Technology & Coding</Link></li>
            </ul>
          </div>

          {/* SaaS Management */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Seller SaaS Center</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/seller" className="hover:text-indigo-400 transition-colors">Executive Dashboard</Link></li>
              <li><Link href="/seller/books" className="hover:text-indigo-400 transition-colors">Catalog Manager</Link></li>
              <li><Link href="/seller/inventory" className="hover:text-indigo-400 transition-colors">Inventory & Restocking</Link></li>
              <li><Link href="/seller/orders" className="hover:text-indigo-400 transition-colors">Order Fulfillment</Link></li>
              <li><Link href="/seller/analytics" className="hover:text-indigo-400 transition-colors">Sales & Revenue Charts</Link></li>
            </ul>
          </div>

          {/* Coupons & Promo info */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Demo Promo Codes</h4>
            <p className="text-xs text-slate-400 mb-3">Try these in your shopping cart:</p>
            <div className="space-y-2">
              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-amber-400">BOOK10</span>
                <span className="text-slate-400">10% Off</span>
              </div>
              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-amber-400">WELCOME100</span>
                <span className="text-slate-400">₹100 Flat</span>
              </div>
              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-amber-400">READ20</span>
                <span className="text-slate-400">20% Off Bundle</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 BookFlow SaaS Platform. Built with Next.js, Tailwind CSS & localStorage.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted for Book Lovers & SaaS Sellers</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}

