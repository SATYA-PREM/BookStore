"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Star, ShoppingBag, Heart, Check, BookOpen, Truck, ShieldCheck } from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";

export default function QuickViewModal() {
  const { quickViewBook, setQuickViewBook, addToCart, toggleWishlist, isInWishlist } = useBookStore();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewBook) return null;

  const book = quickViewBook;
  const wishlisted = isInWishlist(book.id);

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setQuickViewBook(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up border border-gray-100 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewBook(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 text-gray-600 hover:bg-slate-200 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Book Cover */}
        <div className="md:w-5/12 bg-slate-100 relative p-8 flex items-center justify-center">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-48 max-h-72 object-cover rounded-xl shadow-2xl book-spine-effect"
          />
        </div>

        {/* Right Info */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full">
                {book.category}
              </span>
              <span className="text-xs text-gray-500 font-mono">ISBN: {book.isbn}</span>
            </div>

            <h2 className="text-2xl font-serif font-bold text-gray-900 leading-tight">
              {book.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">by <span className="font-semibold text-gray-800">{book.author}</span></p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3 text-sm">
              <div className="flex items-center text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400 mr-1" />
                <span>{book.rating}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{book.reviewsCount} Reader Reviews</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-serif font-bold text-gray-900">₹{book.price}</span>
              {book.originalPrice && (
                <span className="text-base text-gray-400 line-through">₹{book.originalPrice}</span>
              )}
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                In Stock ({book.stock} available)
              </span>
            </div>

            <p className="text-xs text-gray-600 mt-3 line-clamp-3 leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-black font-bold"
                >
                  -
                </button>
                <span className="px-3 py-2 text-sm font-bold text-gray-900 min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(book.stock, q + 1))}
                  className="px-3 py-2 text-gray-600 hover:text-black font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • ₹{book.price * quantity}</span>
              </button>

              <button
                onClick={() => toggleWishlist(book)}
                className={`p-3 rounded-xl border transition-colors ${
                  wishlisted
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-rose-600" : ""}`} />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
              <Link
                href={`/book/${book.id}`}
                onClick={() => setQuickViewBook(null)}
                className="text-amber-700 font-semibold hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                View Complete Book Details & Reviews →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

