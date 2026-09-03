"use client";

import React, { useState } from "react";
import { useBookStore } from "@/context/BookStoreContext";
import InvoiceModal from "@/components/invoice/InvoiceModal";
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
  Filter,
  Eye
} from "lucide-react";

export default function SellerOrdersPage() {
  const { orders, updateOrderStatus } = useBookStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const filteredOrders = orders.filter((o) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        (o.transactionId && o.transactionId.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (statusFilter !== "all" && o.orderStatus !== statusFilter) return false;

    return true;
  });

  const statusOptions = [
    { id: "all", label: `All Orders (${orders.length})` },
    { id: "processing", label: "Processing" },
    { id: "packed", label: "Packed" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-white">
          Orders & Fulfillment Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review customer purchases, change fulfillment stages, and trigger live customer delivery tracking updates.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search Order ID, customer, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 text-xs text-white rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
          {statusOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setStatusFilter(opt.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === opt.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-950 text-slate-400 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Master Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer & Destination</th>
                <th className="py-3.5 px-4">Books In Order</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-center">Payment</th>
                <th className="py-3.5 px-4 text-center">Fulfillment Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-850/60 transition-colors">
                  
                  {/* Order & Date */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-indigo-300 text-sm">
                      #{order.id}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{order.customerName}</div>
                    <div className="text-[11px] text-slate-400">{order.customerEmail}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {order.address?.city}, {order.address?.state}
                    </div>
                  </td>

                  {/* Items */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="text-slate-300 truncate max-w-xs">
                          • {item.title} <span className="text-slate-500">(×{item.quantity})</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4 text-right font-serif font-bold text-white text-sm">
                    ₹{order.total?.toLocaleString("en-IN")}
                  </td>

                  {/* Payment */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {order.paymentStatus?.toUpperCase()}
                    </span>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {order.paymentMethod}
                    </div>
                  </td>

                  {/* Fulfillment Status Switcher (Syncs with Customer Tracker) */}
                  <td className="py-3.5 px-4 text-center">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="bg-slate-950 text-indigo-300 text-xs font-bold border border-slate-700 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <option value="processing">Processing</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="packed">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold transition-colors flex items-center gap-1.5 ml-auto"
                      title="Tax Invoice"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-500" />
                      <span>Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        order={selectedInvoiceOrder}
        isOpen={Boolean(selectedInvoiceOrder)}
        onClose={() => setSelectedInvoiceOrder(null)}
      />
    </div>
  );
}

