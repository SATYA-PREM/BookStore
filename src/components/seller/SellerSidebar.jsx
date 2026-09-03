"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Boxes,
  Package,
  Users,
  BarChart3,
  CreditCard,
  Ticket,
  MessageSquare,
  Settings,
  Store,
  RotateCcw,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";

export default function SellerSidebar({ isMobileOpen, setIsMobileOpen }) {
  const pathname = usePathname();
  const { lowStockCount, orders, resetDemoData } = useBookStore();

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === "processing").length;

  const navGroups = [
    {
      label: "OVERVIEW",
      items: [
        { name: "Executive Dashboard", href: "/seller", icon: LayoutDashboard }
      ]
    },
    {
      label: "CATALOG",
      items: [
        { name: "All Books", href: "/seller/books", icon: BookOpen },
        {
          name: "Inventory & Stock",
          href: "/seller/inventory",
          icon: Boxes,
          badge: lowStockCount > 0 ? `${lowStockCount} low` : null,
          badgeColor: "bg-amber-500/20 text-amber-300"
        }
      ]
    },
    {
      label: "SALES & CRM",
      items: [
        {
          name: "Orders Fulfillment",
          href: "/seller/orders",
          icon: Package,
          badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : null,
          badgeColor: "bg-indigo-500/30 text-indigo-200"
        },
        { name: "Customers CRM", href: "/seller/customers", icon: Users },
        { name: "Payments & Txns", href: "/seller/payments", icon: CreditCard },
        { name: "Coupon Codes", href: "/seller/coupons", icon: Ticket }
      ]
    },
    {
      label: "INSIGHTS",
      items: [
        { name: "Revenue & Analytics", href: "/seller/analytics", icon: BarChart3 },
        { name: "Customer Reviews", href: "/seller/reviews", icon: MessageSquare }
      ]
    },
    {
      label: "SYSTEM",
      items: [
        { name: "Store Settings", href: "/seller/settings", icon: Settings }
      ]
    }
  ];

  const handleReset = () => {
    if (confirm("Reset all store data, revenue, orders, inventory back to default demo state?")) {
      resetDemoData();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Top Logo */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <Link href="/seller" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-900/50">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <div className="font-serif font-black text-white text-lg tracking-tight">
                  Book<span className="text-amber-500">Flow</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                  Seller Center
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-210px)]">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  {group.label}
                </div>

                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-900/30"
                          : "text-slate-300 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                        <span>{item.name}</span>
                      </div>

                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom User & Storefront Switcher */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 space-y-3">
          <Link
            href="/"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white text-xs font-semibold transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-amber-500" />
              <span>Customer Storefront</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-xs">
                S
              </div>
              <div className="truncate">
                <div className="font-bold text-white text-[11px] truncate">Satya Prem</div>
                <div className="text-[10px] text-slate-400">Store Admin</div>
              </div>
            </div>

            <button
              onClick={handleReset}
              title="Reset Demo Data"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

