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
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
          Inventory & Stock Management
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1">
          Monitor physical warehouse stock levels, low-threshold alarms, and trigger restocks.
        </p>
      </div>

      {/* 4 Inventory Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-xs shadow-sm transition-colors">
          <span className="text-gray-500 dark:text-slate-400 uppercase tracking-wider block font-bold">Total Stock Copies</span>
          <span className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-1 block">
            {totalStockCount + 1200}
          </span>
          <span className="text-gray-400 dark:text-slate-500 mt-1 block">Across all warehouses</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-xs shadow-sm transition-colors">
          <span className="text-gray-500 dark:text-slate-400 uppercase tracking-wider block font-bold">In Stock Titles</span>
          <span className="text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
            {books.filter(b => b.stock > b.lowStockThreshold).length}
          </span>
          <span className="text-gray-400 dark:text-slate-500 mt-1 block">Healthy inventory status</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-xs shadow-sm transition-colors">
          <span className="text-gray-500 dark:text-slate-400 uppercase tracking-wider block font-bold">Low Stock Warning</span>
          <span className="text-2xl font-serif font-bold text-amber-600 dark:text-amber-400 mt-1 block">
            {lowStockCount}
          </span>
          <span className="text-gray-400 dark:text-slate-500 mt-1 block">Requires re-ordering</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-xs shadow-sm transition-colors">
          <span className="text-gray-500 dark:text-slate-400 uppercase tracking-wider block font-bold">Out of Stock</span>
          <span className="text-2xl font-serif font-bold text-rose-600 dark:text-rose-400 mt-1 block">
            {outOfStockCount}
          </span>
          <span className="text-gray-400 dark:text-slate-500 mt-1 block">Unavailable for checkout</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-sm transition-colors">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search SKU, title, ISBN..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl text-xs text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-950/60 text-gray-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Book Title & SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Available Stock</th>
                <th className="py-3 px-4">Stock Level Gauge</th>
                <th className="py-3 px-4">Low Threshold</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60">
              {filteredBooks.map((book) => {
                const isOutOfStock = book.stock === 0;
                const isLow = book.stock > 0 && book.stock <= book.lowStockThreshold;
                const percent = Math.min(100, Math.round((book.stock / 50) * 100));

                return (
                  <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-gray-900 dark:text-white">
                      <div>{book.title}</div>
                      <div className="text-[10px] text-gray-500 dark:text-slate-400 font-mono mt-0.5">
                        SKU: BK00{book.id} • ISBN: {book.isbn}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-slate-300">
                      {book.category}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-900 dark:text-white">
                      {book.stock} copies
                    </td>
                    <td className="py-3.5 px-4 w-48">
                      <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isOutOfStock
                              ? "bg-rose-500"
                              : isLow
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 dark:text-slate-400 font-mono">
                      {book.lowStockThreshold} copies
                    </td>
                    <td className="py-3.5 px-4">
                      {isOutOfStock ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 uppercase tracking-wider">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60 uppercase tracking-wider">
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 uppercase tracking-wider">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setRestockingId(book.id);
                          setRestockAmount(25);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Restock
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-serif font-bold text-gray-900 dark:text-white">
              Restock Inventory
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Enter number of fresh copies received from the publisher warehouse for:
              <br />
              <strong className="text-gray-900 dark:text-white mt-1 block">
                {books.find((b) => b.id === restockingId)?.title}
              </strong>
            </p>
            <form onSubmit={handleRestockSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">
                  Copies to Add
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                  autoFocus
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setRestockingId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-colors"
                >
                  Confirm Restock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
