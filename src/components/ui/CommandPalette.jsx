"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  BookOpen,
  ShoppingBag,
  Heart,
  LayoutDashboard,
  Package,
  Boxes,
  Users,
  BarChart3,
  Ticket,
  RotateCcw,
  CreditCard,
  X
} from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { books, orders, resetDemoData } = useBookStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const staticActions = [
    { title: "Go to Bookstore Catalog", icon: BookOpen, url: "/books", category: "Navigation" },
    { title: "View Shopping Cart", icon: ShoppingBag, url: "/cart", category: "Navigation" },
    { title: "View Wishlist", icon: Heart, url: "/wishlist", category: "Navigation" },
    { title: "Track My Orders", icon: Package, url: "/orders", category: "Navigation" },
    { title: "Seller Executive Dashboard", icon: LayoutDashboard, url: "/seller", category: "Seller SaaS" },
    { title: "Seller Inventory & Stock", icon: Boxes, url: "/seller/inventory", category: "Seller SaaS" },
    { title: "Seller Orders Management", icon: Package, url: "/seller/orders", category: "Seller SaaS" },
    { title: "Seller Customers CRM", icon: Users, url: "/seller/customers", category: "Seller SaaS" },
    { title: "Seller Sales & Revenue Analytics", icon: BarChart3, url: "/seller/analytics", category: "Seller SaaS" },
    { title: "Seller Coupon Manager", icon: Ticket, url: "/seller/coupons", category: "Seller SaaS" },
    { title: "Seller Payment Transactions", icon: CreditCard, url: "/seller/payments", category: "Seller SaaS" }
  ];

  const filteredBooks = query.trim()
    ? books.filter((b) => b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()))
    : [];

  const filteredActions = staticActions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (url) => {
    setIsOpen(false);
    setQuery("");
    router.push(url);
  };

  const handleResetData = () => {
    if (confirm("Are you sure you want to reset all demo orders, inventory, and cart data?")) {
      resetDemoData();
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-amber-400 mr-3" />
          <input
            type="text"
            placeholder="Type a command, book title, or navigate (e.g. 'Orders', 'Atomic Habits')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {/* Books match */}
          {filteredBooks.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Books
              </div>
              {filteredBooks.map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleSelect(`/book/${book.id}`)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-xl hover:bg-slate-800 text-slate-200 transition-colors"
                >
                  <img src={book.coverImage} alt={book.title} className="w-7 h-10 object-cover rounded shadow" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{book.title}</div>
                    <div className="text-xs text-slate-400">{book.author} • ₹{book.price}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Actions match */}
          {filteredActions.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Commands & Pages
              </div>
              {filteredActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(action.url)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-xl hover:bg-slate-800 text-slate-200 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-sm font-medium">{action.title}</div>
                    <span className="text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {action.category}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick Demo Reset */}
          <div className="py-2">
            <button
              onClick={handleResetData}
              className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-xl hover:bg-rose-950/40 text-rose-300 transition-colors"
            >
              <div className="p-2 rounded-lg bg-rose-950/60 text-rose-400">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div className="flex-1 text-sm font-medium">Reset Demo Data to Initial Clean State</div>
              <span className="text-[10px] text-rose-400/80 bg-rose-950 px-2 py-0.5 rounded border border-rose-800/40">
                Action
              </span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Navigate with mouse or enter</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}

