"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBookStore } from "@/context/BookStoreContext";
import {
  BookOpen,
  Search,
  Plus,
  Trash2,
  Edit2,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Boxes
} from "lucide-react";

export default function SellerBooksPage() {
  const { books, deleteBook, updateBook } = useBookStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'published' | 'low-stock' | 'out-of-stock'
  const [editingBook, setEditingBook] = useState(null);

  const filteredBooks = books.filter((b) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match = b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q);
      if (!match) return false;
    }

    if (statusFilter === "published" && b.status !== "published") return false;
    if (statusFilter === "low-stock" && (b.stock > (b.lowStockThreshold || 10) || b.stock === 0)) return false;
    if (statusFilter === "out-of-stock" && b.stock > 0) return false;

    return true;
  });

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editingBook) {
      updateBook(editingBook.id, editingBook);
      setEditingBook(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">
            Book Catalog Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your bookstore inventory, pricing, status, and stock levels.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by title, author, ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 text-xs text-white rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
          {[
            { id: "all", label: `All Books (${books.length})` },
            { id: "published", label: "Published" },
            { id: "low-stock", label: "Low Stock" },
            { id: "out-of-stock", label: "Out of Stock" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === tab.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-950 text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Book</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-right">Price</th>
                <th className="py-3.5 px-4 text-center">Stock</th>
                <th className="py-3.5 px-4 text-center">Sales</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBooks.map((book) => {
                const isLow = book.stock <= (book.lowStockThreshold || 10) && book.stock > 0;
                const isOut = book.stock === 0;

                return (
                  <tr key={book.id} className="hover:bg-slate-850/60 transition-colors">
                    {/* Book */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-8 h-11 object-cover rounded shadow"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-white truncate max-w-xs">{book.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono">ISBN: {book.isbn}</div>
                        </div>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="py-3 px-4 text-slate-300 font-medium">
                      {book.author}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {book.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 text-right font-serif font-bold text-white">
                      ₹{book.price}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-mono font-bold px-2 py-0.5 rounded ${
                          isOut
                            ? "bg-rose-500/20 text-rose-400"
                            : isLow
                            ? "bg-amber-500/20 text-amber-400"
                            : "text-slate-200"
                        }`}
                      >
                        {book.stock}
                      </span>
                    </td>

                    {/* Sales */}
                    <td className="py-3 px-4 text-center font-mono font-bold text-amber-400">
                      {book.sales || 0}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      {isOut ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingBook(book)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          title="Edit Book"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${book.title}" from catalog?`)) {
                              deleteBook(book.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400"
                          title="Delete Book"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Book Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl text-xs">
            <h3 className="text-lg font-serif font-bold text-white">Edit Book Details</h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editingBook.title}
                  onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={editingBook.price}
                    onChange={(e) => setEditingBook({ ...editingBook, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingBook.stock}
                    onChange={(e) => setEditingBook({ ...editingBook, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Badge</label>
                <input
                  type="text"
                  value={editingBook.badge || ""}
                  onChange={(e) => setEditingBook({ ...editingBook, badge: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

