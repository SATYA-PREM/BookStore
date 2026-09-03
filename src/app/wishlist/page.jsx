"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BookCard from "@/components/storefront/BookCard";
import QuickViewModal from "@/components/storefront/QuickViewModal";
import { useBookStore } from "@/context/BookStoreContext";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, addToCart, toggleWishlist } = useBookStore();

  const handleMoveAllToCart = () => {
    wishlist.forEach((book) => addToCart(book, 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              My Saved Wishlist
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              You have <span className="font-bold text-gray-900">{wishlist.length} book(s)</span> saved for later reading.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={handleMoveAllToCart}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Cart</span>
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-gray-200 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-gray-900">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-gray-500">
              Click the heart icon on any book in our catalog to save it here for later.
            </p>
            <Link
              href="/books"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs transition-all inline-block"
            >
              Explore Books Now →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <QuickViewModal />
    </div>
  );
}

