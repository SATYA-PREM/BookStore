"use client";

import React, { useState } from "react";
import { useBookStore } from "@/context/BookStoreContext";
import { Ticket, Plus, Tag, CheckCircle2, XCircle, Trash2, Calendar } from "lucide-react";

export default function SellerCouponsPage() {
  const { coupons, createCoupon, toggleCouponStatus } = useBookStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 15,
    minOrder: 500,
    maxDiscount: 250,
    usageLimit: 300,
    description: "",
    expiryDate: "2026-12-31"
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.discountValue) return;
    createCoupon({
      ...formData,
      code: formData.code.toUpperCase().trim()
    });
    setIsCreateModalOpen(false);
    setFormData({
      code: "",
      discountType: "percentage",
      discountValue: 15,
      minOrder: 500,
      maxDiscount: 250,
      usageLimit: 300,
      description: "",
      expiryDate: "2026-12-31"
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">
            Promotional Coupons & Discounts
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create discount coupon codes that customers can apply in their shopping cart.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Coupon</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((c) => {
          const isActive = c.status === "active";

          return (
            <div
              key={c.id}
              className={`p-6 rounded-3xl border transition-all ${
                isActive
                  ? "bg-slate-900 border-slate-800 shadow-md"
                  : "bg-slate-900/60 border-slate-800/60 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono font-black text-lg text-amber-400 tracking-wider">
                      {c.code}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {c.discountType === "percentage" ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT OFF`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleCouponStatus(c.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  {isActive ? "ACTIVE" : "PAUSED"}
                </button>
              </div>

              <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                {c.description || `Get discount on orders above ₹${c.minOrder}`}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Minimum Order:</span>
                  <span className="font-bold text-white">₹{c.minOrder}</span>
                </div>
                <div className="flex justify-between">
                  <span>Redemption Usage:</span>
                  <span className="font-mono font-bold text-indigo-400">{c.usedCount} / {c.usageLimit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valid Until:</span>
                  <span>{c.expiryDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Coupon Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl text-xs text-white">
            <h3 className="text-lg font-serif font-bold text-white">Create New Coupon</h3>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE25"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 uppercase font-mono rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Flat (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Min Order (₹)</label>
                  <input
                    type="number"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Max Cap (₹)</label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. 15% off for all weekend readers"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Save & Publish Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

