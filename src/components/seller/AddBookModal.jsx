"use client";

import React, { useState } from "react";
import { X, Plus, BookOpen, Sparkles, Upload } from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";

export default function AddBookModal({ isOpen, onClose }) {
  const { addNewBook, categories } = useBookStore();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Self Help",
    price: 499,
    originalPrice: 699,
    stock: 25,
    lowStockThreshold: 10,
    isbn: "978" + Math.floor(1000000000 + Math.random() * 9000000000),
    publisher: "Penguin Random House",
    pages: 320,
    language: "English",
    format: "Paperback",
    badge: "New Release",
    description: "",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600"
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.price) return;
    addNewBook(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-slide-up text-white max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white">
                Add New Book to Catalog
              </h2>
              <p className="text-xs text-slate-400">Instantly publishes to customer storefront</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-300 mb-1">Book Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. The Psychology of Selling"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-indigo-500 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Author Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Brian Tracy"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-indigo-500 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-indigo-500 text-white focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Selling Price (₹) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-indigo-500 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Original MRP (₹)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-indigo-500 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-indigo-500 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Low Stock Warning Limit</label>
              <input
                type="number"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-indigo-500 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">ISBN-13</label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Badge Tag</label>
              <input
                type="text"
                placeholder="e.g. Bestseller, Editor Choice"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-300 mb-1">Cover Image URL</label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-300 mb-1">Editorial Description</label>
              <textarea
                rows={3}
                placeholder="Write a captivating summary of the book..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-indigo-500 text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30"
            >
              Publish Book
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

