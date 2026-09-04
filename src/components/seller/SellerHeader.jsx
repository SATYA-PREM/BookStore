"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Plus,
  Menu,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  MessageSquare,
  Package,
  Store,
  Sparkles,
  X
} from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";

export default function SellerHeader({ setIsMobileOpen, onOpenAddBook }) {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useBookStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const notifIcons = {
    order: Package,
    warning: AlertTriangle,
    payment: CreditCard,
    review: MessageSquare
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between text-white transition-all">
      
      {/* Left: Mobile Drawer Trigger + Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative max-w-md w-full hidden sm:block">
          <input
            type="text"
            placeholder="Search orders, books, customers... (Ctrl+K)"
            className="w-full bg-slate-950 text-xs text-slate-200 pl-9 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-3">
        
        {/* Quick Add Book Action */}
        <button
          onClick={onOpenAddBook}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-900/30 transition-all flex items-center gap-1.5 hover:scale-105"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add New Book</span>
          <span className="sm:hidden">Add</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-slide-up">
              <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                {notifications.map((n) => {
                  const Icon = notifIcons[n.type] || Bell;
                  return (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3.5 hover:bg-slate-800/60 transition-colors cursor-pointer flex gap-3 ${
                        !n.read ? "bg-slate-850/80" : ""
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-800 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white truncate">{n.title}</span>
                          <span className="text-[10px] text-slate-500">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{n.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* View Customer Store Button */}
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-amber-400 hover:text-amber-300 text-xs font-bold transition-colors"
        >
          <Store className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Customer Store</span>
        </Link>

      </div>
    </header>
  );
}

