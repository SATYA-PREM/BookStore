"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BookCard from "@/components/storefront/BookCard";
import QuickViewModal from "@/components/storefront/QuickViewModal";
import { useBookStore } from "@/context/BookStoreContext";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  Calendar,
  Layers,
  Globe,
  Share2,
  CheckCircle2
} from "lucide-react";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { books, addToCart, toggleWishlist, isInWishlist, reviews } = useBookStore();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("about"); // 'about' | 'specs' | 'reviews'

  const book = books.find((b) => b.id === params.id) || books[0];
  const wishlisted = isInWishlist(book?.id);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-serif font-bold">Book Not Found</h2>
            <Link href="/books" className="text-amber-600 font-bold hover:underline">
              Back to Catalog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedBooks = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  const bookReviews = reviews.filter((r) => r.bookId === book.id && r.status === "approved");

  const handleBuyNow = () => {
    addToCart(book, quantity);
    router.push("/cart");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/books" className="hover:text-gray-900 transition-colors">Books</Link>
          <span>/</span>
          <Link href={`/books?category=${encodeURIComponent(book.category)}`} className="hover:text-gray-900 transition-colors">
            {book.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-xs">{book.title}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm">
          
          {/* Left Column: Book Image Showcase */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden p-6 bg-slate-50 border border-slate-100 flex items-center justify-center">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full max-h-[480px] object-cover rounded-xl shadow-2xl book-spine-effect"
              />
              <button
                onClick={() => toggleWishlist(book)}
                className={`absolute top-8 right-8 p-3 rounded-full backdrop-blur-md shadow-lg transition-all ${
                  wishlisted
                    ? "bg-rose-500 text-white shadow-rose-500/30"
                    : "bg-white/90 text-gray-700 hover:text-rose-500"
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-white" : ""}`} />
              </button>
            </div>

            {/* Quick Guarantees Under Image */}
            <div className="grid grid-cols-3 gap-3 w-full mt-6 text-center text-xs text-gray-600">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center">
                <Truck className="w-4 h-4 text-amber-600 mb-1" />
                <span className="font-bold">Fast Delivery</span>
                <span className="text-[10px] text-gray-400">2-3 Business Days</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="font-bold">100% Genuine</span>
                <span className="text-[10px] text-gray-400">Original Print</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-indigo-600 mb-1" />
                <span className="font-bold">Easy Returns</span>
                <span className="text-[10px] text-gray-400">7 Days Policy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Book Details & Actions */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  {book.category}
                </span>
                {book.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-amber-300">
                    {book.badge}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 leading-tight">
                {book.title}
              </h1>

              <div className="text-sm text-gray-600 mt-2">
                Written by <span className="font-bold text-gray-900">{book.author}</span> • Publisher: <span className="text-gray-800">{book.publisher}</span>
              </div>

              {/* Rating Summary */}
              <div className="flex items-center gap-3 mt-3 text-sm">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400 mr-1" />
                  <span>{book.rating}</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600 font-medium">{book.reviewsCount} Verified Reviews</span>
                <span className="text-gray-300">|</span>
                <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded">
                  {book.sales}+ Sold
                </span>
              </div>

              {/* Pricing Box */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-amber-200/60 mt-6 flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-gray-500">Retail Price</div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-serif font-black text-gray-950">
                      ₹{book.price}
                    </span>
                    {book.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ₹{book.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full inline-block">
                    In Stock ({book.stock} left)
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">Free delivery available</div>
                </div>
              </div>

              {/* Short Summary Description */}
              <p className="text-sm text-gray-700 leading-relaxed mt-5">
                {book.description}
              </p>

              {/* Quantity Selector and Cart Buttons */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Quantity controls */}
                  <div className="flex items-center border-2 border-gray-200 rounded-xl bg-gray-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-2.5 text-gray-600 hover:text-black font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-2.5 text-sm font-bold text-gray-900 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(book.stock, q + 1))}
                      className="px-3.5 py-2.5 text-gray-600 hover:text-black font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addToCart(book, quantity)}
                    disabled={book.stock === 0}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>Add to Cart (₹{book.price * quantity})</span>
                  </button>

                  {/* Buy Now */}
                  <button
                    onClick={handleBuyNow}
                    disabled={book.stock === 0}
                    className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all hover:scale-[1.01]"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Book Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-bold block">ISBN</span>
                <span className="font-mono font-bold text-gray-800">{book.isbn}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Pages</span>
                <span className="font-bold text-gray-800">{book.pages} pages</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Format</span>
                <span className="font-bold text-gray-800">{book.format}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Language</span>
                <span className="font-bold text-gray-800">{book.language}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Section: About, Specs, Reviews */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-sm">
          <div className="flex border-b border-gray-200 gap-6">
            {[
              { id: "about", name: "About the Book" },
              { id: "specs", name: "Publishing Specifications" },
              { id: "reviews", name: `Reader Reviews (${bookReviews.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-bold transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-amber-600 text-amber-700"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="pt-6">
            {activeTab === "about" && (
              <div className="space-y-4 max-w-3xl text-sm text-gray-700 leading-relaxed">
                <h3 className="font-serif font-bold text-xl text-gray-900">
                  Comprehensive Overview
                </h3>
                <p>{book.about || book.description}</p>
                <p>
                  Whether you are seeking personal transformation, strategic business insight, or captivating literary storytelling, {book.title} provides timeless value curated for enthusiastic readers.
                </p>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-2xl">
                <table className="w-full text-xs text-left divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="py-2.5 font-bold text-gray-500 w-1/3">Book Title</td><td className="py-2.5 font-semibold text-gray-900">{book.title}</td></tr>
                    <tr><td className="py-2.5 font-bold text-gray-500">Author</td><td className="py-2.5 font-semibold text-gray-900">{book.author}</td></tr>
                    <tr><td className="py-2.5 font-bold text-gray-500">Publisher</td><td className="py-2.5 font-semibold text-gray-900">{book.publisher}</td></tr>
                    <tr><td className="py-2.5 font-bold text-gray-500">Publication Date</td><td className="py-2.5 font-semibold text-gray-900">{book.publicationDate}</td></tr>
                    <tr><td className="py-2.5 font-bold text-gray-500">ISBN-13</td><td className="py-2.5 font-mono text-gray-900">{book.isbn}</td></tr>
                    <tr><td className="py-2.5 font-bold text-gray-500">Page Count</td><td className="py-2.5 font-semibold text-gray-900">{book.pages}</td></tr>
                    <tr><td className="py-2.5 font-bold text-gray-500">Language</td><td className="py-2.5 font-semibold text-gray-900">{book.language}</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6 max-w-3xl">
                {bookReviews.length > 0 ? (
                  bookReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="font-bold text-gray-900">{rev.customerName}</div>
                        <div className="text-gray-400">{rev.date}</div>
                      </div>
                      <div className="flex text-amber-500 gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-500 p-6 text-center bg-gray-50 rounded-2xl">
                    No reviews yet for this title. Be the first reader to review it after purchase!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Readers Also Explored
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {relatedBooks.map((relBook) => (
                <BookCard key={relBook.id} book={relBook} />
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
      <QuickViewModal />
    </div>
  );
}

