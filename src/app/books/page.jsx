"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BookCard from "@/components/storefront/BookCard";
import QuickViewModal from "@/components/storefront/QuickViewModal";
import { useBookStore } from "@/context/BookStoreContext";
import { Search, Filter, SlidersHorizontal, RotateCcw, BookOpen, Star } from "lucide-react";

export default function BooksCatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7]" />}>
      <BooksCatalogContent />
    </Suspense>
  );
}

function BooksCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const { books, categories } = useBookStore();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState("all"); // 'all' | 'under300' | '300-500' | 'above500'
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular"); // 'popular' | 'newest' | 'price-asc' | 'price-desc' | 'rating'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            book.title.toLowerCase().includes(q) ||
            book.author.toLowerCase().includes(q) ||
            book.category.toLowerCase().includes(q) ||
            (book.isbn && book.isbn.includes(q));
          if (!match) return false;
        }

        // Category Filter
        if (selectedCategory !== "all" && book.category !== selectedCategory) {
          return false;
        }

        // Price Filter
        if (priceRange === "under300" && book.price >= 300) return false;
        if (priceRange === "300-500" && (book.price < 300 || book.price > 500)) return false;
        if (priceRange === "above500" && book.price <= 500) return false;

        // Rating Filter
        if (minRating > 0 && book.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return b.id.localeCompare(a.id);
        // Default: Popular (sales)
        return (b.sales || 0) - (a.sales || 0);
      });
  }, [books, searchQuery, selectedCategory, priceRange, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setPriceRange("all");
    setMinRating(0);
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                Book Catalog & Store
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Showing <span className="font-bold text-gray-900">{filteredBooks.length}</span> of {books.length} available books
              </p>
            </div>

            {/* Mobile Filter Toggle & Sort selector */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                <span>Filters</span>
              </button>

              <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs">
                <span className="text-gray-500 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-gray-900 focus:outline-none cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid with Sidebar Filter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar Filters Desktop & Mobile Drawer */}
          <aside
            className={`md:block space-y-6 ${
              mobileFilterOpen ? "block" : "hidden"
            }`}
          >
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="font-serif font-bold text-base text-gray-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-amber-600" />
                  Filter Books
                </span>
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Search Within Catalog */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Search Catalog
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Title, author, ISBN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Category Radio Group */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Category
                </label>
                <div className="space-y-1.5 max-h-52 overflow-y-auto">
                  <label className="flex items-center justify-between text-xs text-gray-700 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === "all"}
                        onChange={() => setSelectedCategory("all")}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>All Categories</span>
                    </div>
                    <span className="text-gray-400 text-[11px]">({books.length})</span>
                  </label>

                  {categories.map((cat) => {
                    const count = books.filter((b) => b.category === cat.name).length;
                    return (
                      <label
                        key={cat.id}
                        className="flex items-center justify-between text-xs text-gray-700 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === cat.name}
                            onChange={() => setSelectedCategory(cat.name)}
                            className="text-amber-600 focus:ring-amber-500"
                          />
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-gray-400 text-[11px]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Price Range
                </label>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under300", label: "Under ₹300" },
                    { id: "300-500", label: "₹300 – ₹500" },
                    { id: "above500", label: "₹500 & Above" }
                  ].map((p) => (
                    <label key={p.id} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={priceRange === p.id}
                        onChange={() => setPriceRange(p.id)}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Minimum Rating
                </label>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {[
                    { val: 0, label: "All Ratings" },
                    { val: 4.5, label: "4.5★ and above" },
                    { val: 4.0, label: "4.0★ and above" }
                  ].map((r) => (
                    <label key={r.val} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="minRating"
                        checked={minRating === r.val}
                        onChange={() => setMinRating(r.val)}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span className="flex items-center gap-1">
                        {r.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Book Catalog Results Grid */}
          <div className="md:col-span-3">
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center space-y-4">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="font-serif font-bold text-xl text-gray-900">
                  No matching books found
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try adjusting your search keywords, price filters, or category selection to find more titles.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-amber-600 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer />
      <QuickViewModal />
    </div>
  );
}
