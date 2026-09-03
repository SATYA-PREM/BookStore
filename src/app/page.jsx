"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/storefront/Hero";
import CategoryGrid from "@/components/storefront/CategoryGrid";
import BookCard from "@/components/storefront/BookCard";
import QuickViewModal from "@/components/storefront/QuickViewModal";
import { useBookStore } from "@/context/BookStoreContext";
import { Sparkles, ArrowRight, BookOpen, Star, TrendingUp, CheckCircle } from "lucide-react";

export default function StorefrontHome() {
  const { books } = useBookStore();
  const [activeTab, setActiveTab] = useState("all");

  const filterTabs = [
    { id: "all", name: "All Bestsellers" },
    { id: "Self Help", name: "Self Help" },
    { id: "Business", name: "Business & Finance" },
    { id: "Fiction", name: "Fiction" },
    { id: "Technology", name: "Technology" }
  ];

  const filteredBooks = activeTab === "all"
    ? books.slice(0, 8)
    : books.filter((b) => b.category === activeTab).slice(0, 8);

  const featuredBook = books[0] || {};

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Categories Grid */}
        <CategoryGrid />

        {/* 3. Popular Books Catalog Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Handpicked Collection
              </span>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mt-1">
                Popular Bestsellers
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-gray-300 hover:border-gray-900 text-gray-900 font-bold text-sm shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <span>Explore All {books.length} Books in Catalog</span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </Link>
          </div>
        </section>

        {/* 4. Deal of the Week Spotlight Banner */}
        {featuredBook.id && (
          <section className="py-12 bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 text-white border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 flex justify-center">
                  <img
                    src={featuredBook.coverImage}
                    alt={featuredBook.title}
                    className="w-48 sm:w-56 rounded-2xl shadow-2xl book-spine-effect border border-slate-700"
                  />
                </div>

                <div className="md:col-span-8 space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    ★ Editor's Choice of the Month
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                    {featuredBook.title}
                  </h3>

                  <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                    {featuredBook.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-serif font-bold text-amber-400">
                        ₹{featuredBook.price}
                      </span>
                      {featuredBook.originalPrice && (
                        <span className="text-base text-slate-500 line-through">
                          ₹{featuredBook.originalPrice}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/book/${featuredBook.id}`}
                      className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                    >
                      Read Book Summary & Buy →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. Customer Testimonials */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Reader Testimonials
            </span>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mt-1">
              Loved by Bookworms Across the Country
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "BookFlow has transformed how I buy books. The simulated checkout experience is swift, and the catalog is exceptionally well-curated!",
                name: "Satya Prem",
                title: "Software Architect & Reader",
                rating: 5
              },
              {
                quote: "I love the clean order tracking and instant discount coupons. Received my copies of Atomic Habits and Deep Work in pristine condition.",
                name: "Rahul Sharma",
                title: "Product Manager",
                rating: 5
              },
              {
                quote: "The dual experience between bookstore and seller management dashboard makes BookFlow a truly outstanding SaaS concept.",
                name: "Priya Patel",
                title: "Book Club Lead",
                rating: 5
              }
            ].map((t, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">{t.name}</div>
                    <div className="text-[11px] text-gray-500">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <QuickViewModal />
    </div>
  );
}

