"use client";

import React, { useState } from "react";
import Link from "next/link";
import StatCard from "@/components/seller/StatCard";
import RevenueChart from "@/components/charts/RevenueChart";
import CategoryDonut from "@/components/charts/CategoryDonut";
import TopBooksBar from "@/components/charts/TopBooksBar";
import InvoiceModal from "@/components/invoice/InvoiceModal";
import { useBookStore } from "@/context/BookStoreContext";
import {
  IndianRupee,
  Package,
  BookOpen,
  Users,
  Boxes,
  ArrowRight,
  TrendingUp,
  FileText,
  Clock,
  Sparkles
} from "lucide-react";

export default function SellerDashboardPage() {
  const {
    totalRevenue,
    totalOrdersCount,
    totalBooksCount,
    totalCustomersCount,
    lowStockCount,
    orders,
    updateOrderStatus
  } = useBookStore();

  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const recentOrders = orders.slice(0, 5);

  const statusColors = {
    processing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    shipped: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Live Cloud Store Metrics
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-white">
            Welcome back, Satya
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Here is your book commerce overview, sales velocity, and fulfillment queue for today.
          </p>
        </div>

        <Link
          href="/seller/orders"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Package className="w-4 h-4" />
          <span>Fulfill Orders ({orders.filter(o => o.orderStatus === 'processing').length})</span>
        </Link>
      </div>

      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Store Revenue"
          value={`₹${(82450 + totalRevenue).toLocaleString("en-IN")}`}
          subtitle="+18.4% vs last month"
          change="+18.4%"
          isPositive={true}
          icon={IndianRupee}
          color="emerald"
        />

        <StatCard
          title="Total Orders"
          value={184 + totalOrdersCount}
          subtitle="+12.2% monthly growth"
          change="+12.2%"
          isPositive={true}
          icon={Package}
          color="indigo"
        />

        <StatCard
          title="Active Book Titles"
          value={1240 + totalBooksCount}
          subtitle={`${lowStockCount} titles on low stock`}
          change={`${lowStockCount} low`}
          isPositive={lowStockCount === 0}
          icon={BookOpen}
          color="amber"
        />

        <StatCard
          title="Registered Readers"
          value={890 + totalCustomersCount}
          subtitle="+8.4% new signups"
          change="+8.4%"
          isPositive={true}
          icon={Users}
          color="indigo"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="space-y-6">
          <TopBooksBar />
          <CategoryDonut />
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Recent Activity
            </span>
            <h3 className="font-serif font-bold text-xl text-white mt-0.5">
              Recent Customer Orders
            </h3>
          </div>

          <Link
            href="/seller/orders"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View all {orders.length} orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-2">Order ID</th>
                <th className="py-3 px-2">Customer</th>
                <th className="py-3 px-2">Books Purchased</th>
                <th className="py-3 px-2">Amount</th>
                <th className="py-3 px-2">Payment</th>
                <th className="py-3 px-2">Fulfillment</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3 px-2 font-mono font-bold text-indigo-300">
                    #{ord.id}
                  </td>
                  <td className="py-3 px-2">
                    <div className="font-bold text-white">{ord.customerName}</div>
                    <div className="text-[10px] text-slate-400">{ord.address?.city}</div>
                  </td>
                  <td className="py-3 px-2 text-slate-300">
                    {ord.items?.length || 1} book(s)
                  </td>
                  <td className="py-3 px-2 font-serif font-bold text-white">
                    ₹{ord.total?.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-2 text-slate-400">
                    {ord.paymentMethod}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        statusColors[ord.orderStatus] || "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => setSelectedInvoiceOrder(ord)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="View Tax Invoice"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        order={selectedInvoiceOrder}
        isOpen={Boolean(selectedInvoiceOrder)}
        onClose={() => setSelectedInvoiceOrder(null)}
      />
    </div>
  );
}

