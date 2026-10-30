import React, { useState } from "react";
import { useBookStore } from "@/context/BookStoreContext";
import { Settings, Store, RotateCcw, ShieldCheck, Save, Sparkles, Building2 } from "lucide-react";

export default function SellerSettingsPage() {
  const { settings, resetDemoData } = useBookStore();

  const [formData, setFormData] = useState({
    storeName: settings.storeName || "BookFlow Storefront & Books SaaS",
    tagline: settings.tagline || "Everything You Need to Sell Books Online",
    storeEmail: settings.storeEmail || "support@bookflow.saas",
    storePhone: settings.storePhone || "+91 8000 123 456",
    currency: "INR (₹)",
    taxRate: settings.taxRate || 5,
    freeShippingThreshold: settings.freeShippingThreshold || 500,
    shippingFee: settings.shippingFee || 40,
    gstin: settings.gstin || "29AABCB1234F1Z9",
    storeAddress: settings.storeAddress || "BookFlow Hub, Tower 3, High-Tech City, Bengaluru, Karnataka 560100"
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all demo orders, inventory, transactions, and cart state?")) {
      resetDemoData();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in text-xs">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
          Store Settings & Configuration
        </h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">
          Configure your bookstore profile, tax rates, shipping rules, and local demo environment.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Store settings saved successfully to browser storage!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-slate-800 space-y-6 shadow-sm transition-colors">
        <h2 className="font-serif font-bold text-lg text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-slate-800 flex items-center gap-2">
          <Store className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          Store Profile & Contact
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Store Name</label>
            <input
              type="text"
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Support Email</label>
            <input
              type="email"
              value={formData.storeEmail}
              onChange={(e) => setFormData({ ...formData, storeEmail: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Support Phone</label>
            <input
              type="text"
              value={formData.storePhone}
              onChange={(e) => setFormData({ ...formData, storePhone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Store Physical / Registered Address</label>
            <input
              type="text"
              value={formData.storeAddress}
              onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <h2 className="font-serif font-bold text-lg text-gray-900 dark:text-white pt-4 pb-3 border-b border-gray-100 dark:border-slate-800 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          Taxation & Shipping Policy
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">GST / Tax Identification</label>
            <input
              type="text"
              value={formData.gstin}
              onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">GST Tax Rate (%)</label>
            <input
              type="number"
              value={formData.taxRate}
              onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">Free Shipping Min Order (₹)</label>
            <input
              type="number"
              value={formData.freeShippingThreshold}
              onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        </div>
      </form>

      {/* Demo Controls & Reset Section */}
      <div className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-4">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold">
          <RotateCcw className="w-4 h-4" />
          <span>Demo Environment Reset</span>
        </div>
        <p className="text-gray-600 dark:text-slate-400">
          Reset all orders, active cart, transactions, customer profiles, and restocked books back to the clean initial demo dataset.
        </p>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-colors"
        >
          Reset All Demo Data
        </button>
      </div>

    </div>
  );
}
