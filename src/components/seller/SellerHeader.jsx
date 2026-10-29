import React, { useState } from "react";
import { Link } from "@/components/common/RouterAdapter";
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
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 sm:px-8 py-3.5 flex items-center justify-between text-gray-900 transition-all shadow-sm">
      
      {/* Left: Mobile Drawer Trigger + Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative max-w-md w-full hidden sm:block">
          <input
            type="text"
            placeholder="Search orders, books, customers... (Ctrl+K)"
            className="w-full bg-gray-50 text-xs text-gray-900 pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-3">
        
        {/* Quick Add Book Action */}
        <button
          onClick={onOpenAddBook}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 hover:scale-105"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add New Book</span>
          <span className="sm:hidden">Add</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-slide-up">
              <div className="p-3.5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-gray-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-indigo-600 hover:text-indigo-700 font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                {notifications.map((n) => {
                  const Icon = notifIcons[n.type] || Bell;
                  return (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3.5 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${
                        !n.read ? "bg-indigo-50/40" : ""
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-900 truncate">{n.title}</span>
                          <span className="text-[10px] text-gray-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{n.message}</p>
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
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition-colors"
        >
          <Store className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden md:inline">Customer Store</span>
        </Link>

      </div>
    </header>
  );
}
