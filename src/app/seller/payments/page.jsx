"use client";

import React, { useState } from "react";
import { useBookStore } from "@/context/BookStoreContext";
import {
  CreditCard,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  IndianRupee
} from "lucide-react";

export default function SellerPaymentsPage() {
  const { transactions } = useBookStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = transactions.filter((t) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        t.id.toLowerCase().includes(q) ||
        t.customerName.toLowerCase().includes(q) ||
        t.orderId.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (statusFilter !== "all" && t.status !== statusFilter) return false;

    return true;
  });

  const successfulTotal = transactions
    .filter((t) => t.status === "successful")
    .reduce((sum, t) => sum + t.amount, 0);

  const failedTotal = transactions
    .filter((t) => t.status === "failed")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white">
          Payment Transactions & Gateway Ledger
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review simulated credit card authorizations, UPI transactions, settlements, and failed payment logs.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 uppercase tracking-wider block font-bold">Successful Settlements</span>
          <span className="text-2xl font-serif font-bold text-emerald-400 mt-1 block">
            ₹{(76420 + successfulTotal).toLocaleString("en-IN")}
          </span>
          <span className="text-slate-500 mt-1 block">Client-side verified</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 uppercase tracking-wider block font-bold">Total Transactions</span>
          <span className="text-2xl font-serif font-bold text-indigo-400 mt-1 block">
            {184 + transactions.length}
          </span>
          <span className="text-slate-500 mt-1 block">Cards, UPI & Netbanking</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 uppercase tracking-wider block font-bold">Failed Authorizations</span>
          <span className="text-2xl font-serif font-bold text-rose-400 mt-1 block">
            ₹{(2830 + failedTotal).toLocaleString("en-IN")}
          </span>
          <span className="text-slate-500 mt-1 block">Card declines / insufficient funds</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            placeholder="Search Transaction ID, Order #, Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 text-xs text-white rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex gap-2">
          {["all", "successful", "failed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                statusFilter === st
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-950 text-slate-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Order Ref</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-300">
                    {txn.id}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    #{txn.orderId}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-white">
                    {txn.customerName}
                  </td>

                  <td className="py-3.5 px-4 text-right font-serif font-bold text-white text-sm">
                    ₹{txn.amount?.toLocaleString("en-IN")}
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    {txn.method}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {txn.status === "successful" ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        SUCCESSFUL
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        FAILED
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right text-slate-400">
                    {txn.date}
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

