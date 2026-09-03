"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import InvoiceModal from "@/components/invoice/InvoiceModal";
import { useBookStore } from "@/context/BookStoreContext";
import {
  CheckCircle2,
  Package,
  FileText,
  ArrowRight,
  Truck,
  Sparkles,
  ShoppingBag
} from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7]" />}>
      <OrderSuccessContent />
    </Suspense>
  );
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { orders } = useBookStore();

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Navbar />
        <main className="flex-1 max-w-lg mx-auto py-20 px-4 text-center">
          <h1 className="text-2xl font-serif font-bold">No Order Found</h1>
          <Link href="/books" className="text-amber-600 font-bold hover:underline mt-4 block">
            Return to Bookstore
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-xl text-center space-y-8 animate-fade-in">
          
          {/* Animated Success Badge */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Payment & Order Confirmed
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-gray-950 mt-2">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              We've received your order and our bookstore fulfillment team is preparing your package.
            </p>
          </div>

          {/* Key Order Specs Table (As shown in reference image) */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-left text-xs space-y-3">
            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-500 font-medium">Order Reference ID:</span>
              <span className="font-mono font-bold text-gray-900 text-sm">#{order.id}</span>
            </div>

            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-500 font-medium">Total Amount Paid:</span>
              <span className="font-bold text-gray-900 font-serif text-sm">
                ₹{order.total?.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-500 font-medium">Payment Mode:</span>
              <span className="font-semibold text-gray-800">{order.paymentMethod}</span>
            </div>

            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-500 font-medium">Transaction Reference:</span>
              <span className="font-mono font-semibold text-gray-700">{order.transactionId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Estimated Delivery:</span>
              <span className="font-bold text-emerald-700">{order.estimatedDelivery}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/orders"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:scale-105"
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>Track Live Delivery Status</span>
            </Link>

            <button
              onClick={() => setIsInvoiceOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-900 font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-700" />
              <span>View & Download Tax Invoice</span>
            </button>

            <Link
              href="/books"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition-all"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Sync Notice */}
          <div className="text-[11px] text-gray-400 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>
              Order data has been automatically synced to the <strong>Seller SaaS Center</strong> (Inventory decreased by 1, Revenue updated).
            </span>
          </div>

        </div>
      </main>

      <Footer />

      {/* Realistic Tax Invoice Modal */}
      <InvoiceModal
        order={order}
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
      />
    </div>
  );
}
