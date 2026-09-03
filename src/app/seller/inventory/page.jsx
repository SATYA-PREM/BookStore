"use client";

import React, { useState } from "react";
import { useBookStore } from "@/context/BookStoreContext";
import {
  Boxes,
  AlertTriangle,
  CheckCircle,
  Plus,
  RefreshCw,
  Search,
  ArrowUpRight
} from "lucide-react";

export default function SellerInventoryPage() {
  const {
    books,
    restockBook,
    totalStockCount,
    lowStockCount,
    outOfStockCount
  } = useBookStore();

  const [search, setSearch] = useState("");
  const [restockingId, setRestockingId] = useState(null);
  const [restockAmount, setRestockAmount] = useState(25);

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.isbn.includes(search)
  );

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (restockingId && restockAmount > 0) {
      restockBook(restockingId, restockAmount);
      setRestockingId(null);
      setRestockAmount(25);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-white">
          Inventory & Stock Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Monitor physical warehouse stock levels, low-threshold alarms, and trigger restocks.
        </p>
      </div>

      {/* 4 Inventory Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 uppercase tracking-wider block font-bold">Total Stock Copies</span>
          <span className="text-2xl font-serif font-bold text-white mt-1 block">
            {totalStockCount + 1200}
          </span>
          <span className="text-slate-500 mt-1 block">Across all warehouses</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 uppercase tracking-wider block font-bold">In Stock Titles</span>
          <span className="text-2xl font-serif font-bold text-emerald-400 mt-1 block">
            {books.filter((b) => b.stock > (b.lowStockThreshold || 10)).length}
          </span>
          <span className="text-slate-500 mt-1 block">Healthy inventory status</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 uppercase tracking-wider block font-bold">Low Stock Warning</span>
          <span className="text-2xl font-serif font-bold text-amber-400 mt-1 block">
            {lowStockCount}
          </span>
          <span className="text-slate-500 mt-1 block">Requires re-ordering</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 uppercase tracking-wider block font-bold">Out of Stock</span>
          <span className="text-2xl font-serif font-bold text-rose-400 mt-1 block">
            {outOfStockCount}
          </span>
          <span className="text-slate-500 mt-1 block">Unavailable for checkout</span>
        </div>
      </div>

      {/* Search Filter */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            placeholder="Search SKU, title, ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 text-xs text-white rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Inventory Table with Visual Progress Gauges */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Book Title & SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-center">Available Stock</th>
                <th className="py-3.5 px-4">Stock Level Gauge</th>
                <th className="py-3.5 px-4 text-center">Low Threshold</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBooks.map((book) => {
                const threshold = book.lowStockThreshold || 10;
                const maxExpected = 50;
                const percent = Math.min(100, Math.round((book.stock / maxExpected) * 100));

                let statusBadge = (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    IN STOCK
                  </span>
                );
                let barColor = "from-emerald-500 to-teal-500";

                if (book.stock === 0) {
                  statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      OUT OF STOCK
                    </span>
                  );
                  barColor = "from-rose-500 to-rose-600";
                } else if (book.stock <= threshold) {
                  statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      LOW STOCK
                    </span>
                  );
                  barColor = "from-amber-500 to-orange-500";
                }

                return (
                  <tr key={book.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{book.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">SKU: {book.id} • ISBN: {book.isbn}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      {book.category}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-bold text-white">
                      {book.stock} copies
                    </td>

                    <td className="py-3.5 px-4 w-48">
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-500`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                      {threshold} copies
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {statusBadge}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setRestockingId(book.id)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white font-bold transition-all border border-indigo-500/30 text-xs"
                      >
                        + Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      {restockingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl text-xs">
            <h3 className="text-lg font-serif font-bold text-white">Add Warehouse Stock</h3>
            <p className="text-slate-400">
              Enter number of copies received from the publisher for inventory replenishment:
            </p>

            <form onSubmit={handleRestockSubmit} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Copies to Add</label>
                <input
                  type="number"
                  min={1}
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRestockingId(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Confirm Restock (+{restockAmount})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

