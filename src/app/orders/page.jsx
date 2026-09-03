"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import InvoiceModal from "@/components/invoice/InvoiceModal";
import { useBookStore } from "@/context/BookStoreContext";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  FileText,
  ChevronDown,
  ChevronUp,
  MapPin,
  ExternalLink,
  ShoppingBag
} from "lucide-react";

export default function CustomerOrdersPage() {
  const { orders } = useBookStore();
  const [expandedOrder, setExpandedOrder] = useState(orders[0]?.id || null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const toggleExpand = (id) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              My Orders & Live Tracking
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Track fulfillment timeline and download official tax invoices for your purchases.
            </p>
          </div>

          <Link
            href="/books"
            className="px-4 py-2 bg-white border border-gray-300 hover:border-gray-900 rounded-xl text-xs font-bold text-gray-800 transition-colors self-start sm:self-auto"
          >
            Browse More Books
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-gray-200 text-center space-y-4">
            <Package className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-serif font-bold text-xl text-gray-900">No Orders Placed Yet</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              You haven't completed any book orders yet. Browse our library and purchase your first read!
            </p>
            <Link
              href="/books"
              className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-amber-600 transition-colors inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isExpanded = expandedOrder === order.id;

              const statusBadgeStyles = {
                processing: "bg-amber-100 text-amber-800 border-amber-200",
                shipped: "bg-blue-100 text-blue-800 border-blue-200",
                delivered: "bg-emerald-100 text-emerald-800 border-emerald-200"
              };

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden transition-all"
                >
                  {/* Order Summary Header */}
                  <div className="p-6 bg-slate-50/60 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-base text-gray-950">
                            #{order.id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              statusBadgeStyles[order.orderStatus] || "bg-gray-100 text-gray-800 border-gray-200"
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right sm:mr-3">
                        <div className="text-xs text-gray-400">Total Amount</div>
                        <div className="font-serif font-bold text-base text-gray-950">
                          ₹{order.total?.toLocaleString("en-IN")}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:border-gray-900 text-xs font-bold text-gray-800 transition-colors flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-600" />
                        <span>Invoice</span>
                      </button>

                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="p-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-gray-600"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Order Items Summary */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/70 border border-gray-100">
                          <div className="w-10 h-14 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.coverImage ? (
                              <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <ShoppingBag className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-gray-900 truncate">{item.title}</div>
                            <div className="text-[11px] text-gray-500">Qty: {item.quantity} × ₹{item.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Expandable Live Tracking Timeline */}
                    {isExpanded && (
                      <div className="pt-6 border-t border-gray-100 space-y-6 animate-fade-in">
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-amber-600" />
                            Live Delivery Progress Tracker
                          </h4>

                          {/* Progressive Stepper Bar */}
                          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                            {order.timeline?.map((step, sIdx) => (
                              <div key={sIdx} className="relative flex items-start gap-4">
                                <span
                                  className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                                    step.completed
                                      ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20"
                                      : "bg-white border-gray-300 text-gray-400"
                                  }`}
                                >
                                  {step.completed ? "✓" : sIdx + 1}
                                </span>
                                <div>
                                  <div
                                    className={`text-xs font-bold ${
                                      step.completed ? "text-gray-900" : "text-gray-400"
                                    }`}
                                  >
                                    {step.status}
                                  </div>
                                  <div className="text-[11px] text-gray-500">{step.date}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Delivery Destination */}
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-3 text-xs text-gray-600">
                          <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-gray-900 block">Shipping Destination</span>
                            <span>{order.address?.street}, {order.address?.city}, {order.address?.state} - {order.address?.zip}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      {/* Invoice Modal */}
      <InvoiceModal
        order={selectedInvoiceOrder}
        isOpen={Boolean(selectedInvoiceOrder)}
        onClose={() => setSelectedInvoiceOrder(null)}
      />
    </div>
  );
}

