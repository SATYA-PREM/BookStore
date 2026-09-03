"use client";

import React from "react";
import { X, Printer, Download, BookOpen, CheckCircle, ShieldCheck } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Top Header Controls */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span className="font-serif font-bold text-sm">Tax Invoice • #{order.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
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

            <div className="text-right">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider inline-flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                PAID INVOICE
              </span>
              <h2 className="text-lg font-mono font-bold text-slate-900 mt-2">
                INV-{order.id}
              </h2>
              <p className="text-slate-500 text-[11px]">Date: {invoiceDate}</p>
              <p className="text-slate-500 text-[11px] font-mono">Txn: {order.transactionId}</p>
            </div>
          </div>

          {/* Billed To */}
          <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Billed To
              </div>
              <div className="font-bold text-sm text-slate-900 mt-1">
                {order.customerName}
              </div>
              <p className="text-slate-600 text-[11px]">{order.customerEmail}</p>
              <p className="text-slate-600 text-[11px]">{order.customerPhone}</p>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Shipping Destination
              </div>
              <p className="text-slate-600 text-[11px] mt-1">
                {order.address?.street}, {order.address?.city}
              </p>
              <p className="text-slate-600 text-[11px]">
                {order.address?.state} - {order.address?.zip}, {order.address?.country}
              </p>
              <p className="text-slate-600 text-[11px]">
                Payment: {order.paymentMethod}
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-300 text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-right">Total</th>
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
          </div>

          {/* Subtotal & Calculations */}
          <div className="border-t border-slate-200 pt-4 flex justify-end">
            <div className="w-64 space-y-2 text-right">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>₹{order.subtotal?.toLocaleString("en-IN")}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Coupon Discount:</span>
                  <span>-₹{order.discount?.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping:</span>
                <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST ({settings.taxRate}%):</span>
                <span>₹{order.tax?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-base font-bold font-serif text-slate-950 border-t border-slate-300 pt-2">
                <span>Total Paid:</span>
                <span>₹{order.total?.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-6 border-t border-slate-100 text-center text-[10px] text-slate-400">
            Thank you for shopping with BookFlow! This is a computer-generated tax invoice and requires no physical signature.
          </div>

        </div>

      </div>
    </div>
  );
}

