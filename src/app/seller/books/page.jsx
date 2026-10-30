import React, { useState, useRef } from "react";
import { Link as Link } from "@/components/common/RouterAdapter";
import { useBookStore } from "@/context/BookStoreContext";
import { uploadBookImage } from "@/lib/dataService";
import {
  BookOpen,
  Search,
  Plus,
  Trash2,
  Edit2,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Boxes,
  Upload,
  Image as ImageIcon,
  Save,
  X
} from "lucide-react";

export default function SellerBooksPage() {
  const { books, deleteBook, updateBook, categories } = useBookStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'published' | 'low-stock' | 'out-of-stock'
  const [editingBook, setEditingBook] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const editFileInputRef = useRef(null);

  const filteredBooks = books.filter((b) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match = b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || (b.isbn && b.isbn.includes(q));
      if (!match) return false;
    }

    if (statusFilter === "published" && b.status !== "published") return false;
    if (statusFilter === "low-stock" && (b.stock > (b.lowStockThreshold || 10) || b.stock === 0)) return false;
    if (statusFilter === "out-of-stock" && b.stock > 0) return false;

    return true;
  });

  const handleEditImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editingBook) return;

    try {
      setIsUploading(true);
      const url = await uploadBookImage(file);
      setEditingBook((prev) => ({ ...prev, coverImage: url }));
    } catch (err) {
      console.error("Failed to upload image:", err);
      alert("Failed to upload book image: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editingBook) {
      updateBook(editingBook.id, {
        ...editingBook,
        price: Number(editingBook.price),
        originalPrice: Number(editingBook.originalPrice || editingBook.price),
        stock: Number(editingBook.stock),
        lowStockThreshold: Number(editingBook.lowStockThreshold || 10)
      });
      setEditingBook(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
            Book Catalog Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1">
            Real-time synchronization across storefront and saved directly in <code className="text-indigo-600 dark:text-indigo-400 font-mono">public/data/books.json</code>.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm transition-colors">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by title, author, ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-slate-950 text-xs text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-slate-500"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 dark:text-slate-400 absolute left-3 top-2.5" />
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
                  : "bg-gray-100 dark:bg-slate-950 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-950/40 text-gray-500 dark:text-slate-400 font-bold uppercase tracking-wider">
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
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60">
              {filteredBooks.map((book) => {
                const isLow = book.stock <= (book.lowStockThreshold || 10) && book.stock > 0;
                const isOut = book.stock === 0;

                return (
                  <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-slate-850/60 transition-colors">
                    {/* Book */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-9 h-12 object-cover rounded shadow bg-gray-100 dark:bg-slate-800"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 dark:text-white truncate max-w-xs">{book.title}</div>
                          <div className="text-[10px] text-gray-400 dark:text-slate-400 font-mono">ISBN: {book.isbn || "N/A"}</div>
                        </div>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">
                      {book.author}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700">
                        {book.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 text-right font-serif font-bold text-gray-900 dark:text-white">
                      ₹{book.price}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-mono font-bold px-2 py-0.5 rounded ${
                          isOut
                            ? "bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400"
                            : isLow
                            ? "bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {book.stock}
                      </span>
                    </td>

                    {/* Sales */}
                    <td className="py-3 px-4 text-center font-mono font-bold text-amber-600 dark:text-amber-400">
                      {book.sales || 0}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      {isOut ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                          Active
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingBook({ ...book })}
                          className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300"
                          title="Edit Book Details & Image"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${book.title}" from catalog?`)) {
                              deleteBook(book.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950 text-gray-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl text-xs max-h-[90vh] overflow-y-auto text-gray-900 dark:text-white transition-colors">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-serif font-bold text-gray-900 dark:text-white">Edit Book & Cover Image</h3>
              </div>
              <button onClick={() => setEditingBook(null)} className="p-1 text-gray-400 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              
              {/* Image Uploader */}
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950/70 border border-gray-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700 dark:text-slate-300 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Cover Image
                  </span>
                  {isUploading && <span className="text-indigo-600 dark:text-indigo-400 text-[11px] animate-pulse">Uploading image...</span>}
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={editingBook.coverImage}
                    alt={editingBook.title}
                    className="w-14 h-20 object-cover rounded-lg bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow flex-shrink-0"
                  />
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="file"
                      ref={editFileInputRef}
                      accept="image/*"
                      onChange={handleEditImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => editFileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 text-[11px]"
                    >
                      <Upload className="w-3 h-3" />
                      Replace Image from Device
                    </button>
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={editingBook.coverImage || ""}
                      onChange={(e) => setEditingBook({ ...editingBook, coverImage: e.target.value })}
                      className="w-full px-2.5 py-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-gray-900 dark:text-white text-[10px]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Book Title</label>
                <input
                  type="text"
                  required
                  value={editingBook.title}
                  onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={editingBook.author}
                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={editingBook.category}
                    onChange={(e) => setEditingBook({ ...editingBook, category: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingBook.price}
                    onChange={(e) => setEditingBook({ ...editingBook, price: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    value={editingBook.originalPrice || editingBook.price}
                    onChange={(e) => setEditingBook({ ...editingBook, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingBook.stock}
                    onChange={(e) => setEditingBook({ ...editingBook, stock: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Badge</label>
                  <input
                    type="text"
                    value={editingBook.badge || ""}
                    onChange={(e) => setEditingBook({ ...editingBook, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Status</label>
                  <select
                    value={editingBook.status || "published"}
                    onChange={(e) => setEditingBook({ ...editingBook, status: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingBook.description || ""}
                  onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save & Sync Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
