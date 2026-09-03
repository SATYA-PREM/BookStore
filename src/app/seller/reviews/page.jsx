"use client";

import React, { useState } from "react";
import { useBookStore } from "@/context/BookStoreContext";
import { Star, MessageSquare, CheckCircle, Trash2, Search } from "lucide-react";

export default function SellerReviewsPage() {
  const { reviews, updateReviewStatus } = useBookStore();
  const [filterRating, setFilterRating] = useState("all");

  const filtered = reviews.filter((r) => {
    if (filterRating !== "all" && r.rating !== Number(filterRating)) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white">
          Customer Reviews & Feedback Moderation
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Moderate verified reader reviews, ratings, and reader testimonials across your bookstore.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["all", "5", "4", "3"].map((star) => (
          <button
            key={star}
            onClick={() => setFilterRating(star)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterRating === star
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            {star === "all" ? "All Stars" : `${star} Star Reviews`}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filtered.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{rev.customerName}</span>
                <span className="text-slate-500 text-xs">• {rev.date}</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold">
                  on "{rev.bookTitle}"
                </span>
              </div>

              <div className="flex text-amber-400 gap-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                ))}
              </div>

              <p className="text-xs text-slate-300 italic leading-relaxed max-w-2xl">
                "{rev.comment}"
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                APPROVED
              </span>
              <button
                onClick={() => updateReviewStatus(rev.id, "deleted")}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
                title="Delete review"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

