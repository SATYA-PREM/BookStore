"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useBookStore } from "@/context/BookStoreContext";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  CheckCircle2,
  X
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    settings
  } = useBookStore();

  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput("");
    }
  };

  const handleApplyDemoCode = (code) => {
    applyCoupon(code);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 mb-6 shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-sm text-gray-500 max-w-sm mb-8">
            Looks like you haven't added any books to your cart yet. Explore our curated catalog of bestsellers!
          </p>
          <Link
            href="/books"
            className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-sm shadow-lg transition-all hover:scale-105"
          >
            Explore Bestselling Books →
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              You have <span className="font-bold text-gray-900">{cart.length} unique book(s)</span> in your bag
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold transition-colors"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex items-center gap-4 sm:gap-6">
                  {/* Book Image */}
                  <Link href={`/book/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-16 h-22 sm:w-20 sm:h-28 object-cover rounded-xl shadow-md book-spine-effect"
                    />
                  </Link>

                  {/* Title & Author */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <Link href={`/book/${item.id}`} className="block">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 hover:text-amber-600 transition-colors truncate">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 truncate">by {item.author}</p>
                    <div className="text-sm font-bold text-gray-900 font-serif mt-1">
                      ₹{item.price} each
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 text-gray-600 hover:text-black font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-2.5 py-1.5 text-xs font-bold text-gray-900 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 text-gray-600 hover:text-black font-bold text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Total Line Price */}
                  <div className="text-right min-w-[4.5rem]">
                    <div className="font-serif font-bold text-base text-gray-900">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Demo Coupon Picker Strip */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Quick Apply Demo Coupons:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleApplyDemoCode("BOOK10")}
                  className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-xs font-mono font-bold text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  BOOK10 (10%)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyDemoCode("WELCOME100")}
                  className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-xs font-mono font-bold text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  WELCOME100 (₹100)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyDemoCode("READ20")}
                  className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-xs font-mono font-bold text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  READ20 (20%)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Order Financials & Checkout */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-6">
              <h2 className="font-serif font-bold text-xl text-gray-900 pb-4 border-b border-gray-100">
                Order Summary
              </h2>

              {/* Coupon Code Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Have a Coupon Code?
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-mono font-bold">{appliedCoupon.code}</span>
                        <span className="block text-[11px] text-emerald-600">{appliedCoupon.description}</span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-emerald-900 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. BOOK10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs uppercase font-mono rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Financial Calculations */}
              <div className="space-y-3 text-xs text-gray-600 border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-gray-900">₹{cartSubtotal.toLocaleString("en-IN")}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{cartDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping Estimate</span>
                  <span>{cartShipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${cartShipping}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated GST ({settings.taxRate}%)</span>
                  <span>₹{cartTax.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-base font-serif font-bold text-gray-950 border-t border-gray-200 pt-3">
                  <span>Total Amount</span>
                  <span className="text-2xl font-black text-slate-900">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => router.push("/checkout")}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulated Secure Local Checkout</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

