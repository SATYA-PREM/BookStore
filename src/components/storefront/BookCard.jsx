"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";

export default function BookCard({ book }) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewBook } = useBookStore();
  const wishlisted = isInWishlist(book.id);

  const discountPercent = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(book);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
            wishlisted
              ? "bg-rose-500 text-white shadow-rose-500/30"
              : "bg-white/90 text-gray-700 hover:bg-white hover:text-rose-500"
          }`}
          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-white" : ""}`} />
        </button>

        {/* Badge (Bestseller, Discount, etc.) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {book.badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/90 text-amber-300 border border-amber-400/30 shadow">
              {book.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px] p-4">
          <button
            onClick={() => setQuickViewBook(book)}
            className="px-3.5 py-2 rounded-xl bg-white/95 text-gray-900 text-xs font-bold hover:bg-white transition-all shadow-lg flex items-center gap-1.5 hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Book Meta Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-1">
            {book.category}
          </div>

          <Link href={`/book/${book.id}`} className="block group/link">
            <h3 className="font-serif font-bold text-base text-gray-900 line-clamp-1 group-hover/link:text-amber-600 transition-colors">
              {book.title}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">by {book.author}</p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 mr-1" />
              <span>{book.rating}</span>
            </div>
            <span className="text-gray-400 text-[11px]">({book.reviewsCount})</span>
            {book.stock <= 5 && book.stock > 0 && (
              <span className="ml-auto text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                Only {book.stock} left
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-gray-900 font-serif">
                ₹{book.price}
              </span>
              {book.originalPrice && book.originalPrice > book.price && (
                <span className="text-xs text-gray-400 line-through font-normal">
                  ₹{book.originalPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(book, 1)}
            disabled={book.stock === 0}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
              book.stock === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-slate-900 hover:bg-amber-600 text-white hover:scale-105 active:scale-95"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{book.stock === 0 ? "Out of Stock" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

