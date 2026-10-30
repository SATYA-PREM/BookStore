"use client";

import React, { useState, useRef } from "react";
import { X, Upload, BookOpen, Image as ImageIcon, Check } from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";
import { uploadBookImage } from "@/lib/dataService";

export default function AddBookModal({ isOpen, onClose }) {
  const { addNewBook, categories } = useBookStore();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Self Help",
    price: 399,
    originalPrice: 599,
    rating: 4.8,
    reviewsCount: 120,
    coverImage: "/images/books/book1.jpg",
    badge: "New Arrival",
    status: "published",
    stock: 45,
    lowStockThreshold: 10,
    isbn: "9780143452120",
    description: "",
    about: "",
    publishedYear: 2024,
    pages: 280,
    language: "English",
    publisher: "Penguin Random House",
    sales: 0
  });

  const [imagePreview, setImagePreview] = useState(formData.coverImage);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadBookImage(file);
      setFormData((prev) => ({ ...prev, coverImage: url }));
      setImagePreview(url);
    } catch (err) {
      console.error("Failed to upload image:", err);
      alert("Failed to upload image: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.price) return;
    addNewBook({
      ...formData,
      about: formData.about || formData.description
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-slide-up text-gray-900 dark:text-white max-h-[90vh] flex flex-col transition-colors">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-gray-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-gray-900 dark:text-white">
                Add New Book to Catalog
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-400">Instantly saves to JSON and syncs real-time with storefront</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* Image Upload Box */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-gray-700 dark:text-slate-300 flex items-center gap-1.5 text-xs">
                <ImageIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Book Cover Image
              </label>
              {isUploading && <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] animate-pulse">Uploading & saving...</span>}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-20 h-28 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 flex-shrink-0 flex items-center justify-center shadow-sm">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400 dark:text-slate-500" />
                )}
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 transition-all text-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload from Device
                  </button>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400">Saved to <code className="text-indigo-600 dark:text-indigo-400 font-mono">/public/images/books/</code></span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 dark:text-slate-400">Or enter Image URL:</span>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={formData.coverImage}
                    onChange={(e) => {
                      setFormData({ ...formData, coverImage: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-800 text-gray-900 dark:text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Book Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. The Psychology of Selling"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Author Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Brian Tracy"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Selling Price (₹) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Original MRP (₹)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Low Stock Warning Limit</label>
              <input
                type="number"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">ISBN-13</label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 font-mono text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Badge Tag</label>
              <input
                type="text"
                placeholder="e.g. Bestseller, Editor Choice"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Short Description</label>
              <textarea
                rows={2}
                placeholder="Write a brief overview of the book..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">About / Long Summary</label>
              <textarea
                rows={3}
                placeholder="Detailed author overview and book insights..."
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Publish Book
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
