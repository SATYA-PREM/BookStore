"use client";

import React from "react";
import { X, Printer, BookOpen, CheckCircle, ShieldCheck } from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";

export default function InvoiceModal({ order, isOpen, onClose }) {
  const { settings } = useBookStore();

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-slide-up border border-gray-200 dark:border-slate-800 flex flex-col max-h-[90vh] transition-colors">
        
        {/* Top Header Controls */}
        <div className="p-4 bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span className="font-serif font-bold text-sm">Tax Invoice • #{order.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body (Always white with dark text for formal tax invoice printing) */}
        <div id="printable-invoice" className="p-8 overflow-y-auto bg-white text-slate-900 flex-1 space-y-6 text-xs">
          
          {/* Invoice Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2 font-serif text-2xl font-black text-slate-950">
                Book<span className="text-amber-600">Flow</span>
              </div>
              <p className="text-slate-500 text-[11px] mt-1">{settings.storeName}</p>
              <p className="text-slate-500 text-[11px]">{settings.storeAddress}</p>
              <p className="text-slate-500 text-[11px] font-mono">GSTIN: {settings.gstin}</p>
            </div>

            <div className="text-right space-y-1">
              <span className="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-bold uppercase tracking-wider text-[10px]">
                ORIGINAL TAX INVOICE
              </span>
              <h2 className="text-lg font-mono font-bold text-slate-900 mt-2">
                INV-{order.id}
              </h2>
              <p className="text-slate-500 text-[11px]">Date: {invoiceDate}</p>
              <p className="text-slate-500 text-[11px] font-mono">Payment: {order.paymentMethod}</p>
            </div>
          </div>

          {/* Billing & Shipping Details */}
          <div className="grid grid-cols-2 gap-8 border-b border-slate-200 pb-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Billed & Shipped To:
              </span>
              <div className="font-bold text-slate-900 text-sm">{order.customerName}</div>
              <div className="text-slate-600">{order.customerEmail}</div>
              <div className="text-slate-600 mt-1 leading-relaxed">
                {order.address?.street}<br />
                {order.address?.city}, {order.address?.state} - {order.address?.zipCode}<br />
                Phone: {order.address?.phone || "+91 98765 43210"}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Order Telemetry
              </span>
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-bold text-slate-800">{order.transactionId || `TXN-${order.id}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Order Status:</span>
                <span className="font-bold uppercase text-emerald-700">{order.orderStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tax Type:</span>
                <span className="text-slate-800 font-mono">IGST @ {settings.taxRate}%</span>
              </div>
            </div>
          </div>

          {/* Order Items Table */}
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-300 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-2">Item Description</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Unit Price</th>
                <th className="py-2 text-right">Total (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {order.items?.map((item, idx) => (
                <tr key={idx} className="text-slate-800">
                  <td className="py-3">
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">SKU: BK-{item.bookId || "001"}</div>
                  </td>
                  <td className="py-3 text-center font-medium">{item.quantity}</td>
                  <td className="py-3 text-right">₹{item.price}</td>
                  <td className="py-3 text-right font-bold">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="border-t border-slate-200 pt-4 flex justify-end">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">₹{order.subtotal?.toLocaleString("en-IN")}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount:</span>
                  <span className="font-mono">-₹{order.discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>GST ({settings.taxRate}%):</span>
                <span className="font-mono">₹{order.tax?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping Fee:</span>
                <span className="font-mono">{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
              </div>
              <div className="flex justify-between text-slate-950 font-bold text-sm pt-2 border-t border-slate-300">
                <span>Grand Total:</span>
                <span className="font-mono text-amber-700">₹{order.total?.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Footer Declaration */}
          <div className="border-t border-slate-200 pt-6 text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center gap-1.5 font-bold text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Computer Generated Tax Invoice • No Physical Signature Required
            </p>
            <p>Thank you for buying from {settings.storeName}. Enjoy reading your books!</p>
          </div>

        </div>

      </div>
    </div>
  );
}
