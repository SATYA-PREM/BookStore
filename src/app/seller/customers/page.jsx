"use client";

import React, { useState } from "react";
import { useBookStore } from "@/context/BookStoreContext";
import { Users, Search, Mail, Phone, MapPin, ShoppingBag, IndianRupee } from "lucide-react";

export default function SellerCustomersPage() {
  const { customers } = useBookStore();
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white">
          Customer Directory & CRM
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review registered book readers, lifetime expenditures, order frequencies, and engagement.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 uppercase tracking-wider block font-bold">Total Readers</span>
          <span className="text-2xl font-serif font-bold text-white mt-1 block">
            {890 + customers.length}
          </span>
          <span className="text-slate-500 mt-1 block">+8.4% this month</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 uppercase tracking-wider block font-bold">Active Buying Customers</span>
          <span className="text-2xl font-serif font-bold text-emerald-400 mt-1 block">
            {740 + customers.length}
          </span>
          <span className="text-slate-500 mt-1 block">Purchased in last 30 days</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 uppercase tracking-wider block font-bold">Avg Lifetime Value (LTV)</span>
          <span className="text-2xl font-serif font-bold text-indigo-400 mt-1 block">
            ₹4,820
          </span>
          <span className="text-slate-500 mt-1 block">High repeat purchase rate</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            placeholder="Search by customer name, email, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 text-xs text-white rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Contact Details</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4 text-center">Orders Count</th>
                <th className="py-3.5 px-4 text-right">Lifetime Spent</th>
                <th className="py-3.5 px-4 text-center">Last Purchase</th>
                <th className="py-3.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-xs">
                        {cust.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white">{cust.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: {cust.id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    <div>{cust.email}</div>
                    <div className="text-[10px] text-slate-500">{cust.phone}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-400">
                    {cust.city || "Bengaluru"}
                  </td>

                  <td className="py-3.5 px-4 text-center font-mono font-bold text-indigo-300">
                    {cust.ordersCount} orders
                  </td>

                  <td className="py-3.5 px-4 text-right font-serif font-bold text-emerald-400 text-sm">
                    ₹{cust.totalSpent?.toLocaleString("en-IN")}
                  </td>

                  <td className="py-3.5 px-4 text-center text-slate-400">
                    {cust.lastOrderDate}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

