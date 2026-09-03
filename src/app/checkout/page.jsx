"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import MockPaymentModal from "@/components/payment/MockPaymentModal";
import { useBookStore } from "@/context/BookStoreContext";
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Truck,
  ArrowLeft,
  Lock,
  Sparkles
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    placeOrder,
    settings
  } = useBookStore();

  // Customer Form State
  const [customer, setCustomer] = useState({
    name: "Satya Prem",
    email: "satya@example.com",
    phone: "+91 98765 43210",
    address: "42 Tech Park, Sector 5",
    city: "Bengaluru",
    state: "Karnataka",
    zip: "560100"
  });

  const [paymentOption, setPaymentOption] = useState("gateway"); // 'gateway' (Razorpay/Cards/UPI demo) | 'cod'
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <h2 className="text-2xl font-serif font-bold mb-2">Your Cart is Empty</h2>
            <Link href="/books" className="text-amber-600 font-bold hover:underline">
              Return to Catalog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (paymentOption === "gateway") {
      setIsPaymentModalOpen(true);
    } else {
      // Cash on Delivery direct flow
      handleCompleteOrder({
        transactionId: `COD-${Math.floor(100000 + Math.random() * 900000)}`,
        method: "Cash on Delivery"
      });
    }
  };

  const handleCompleteOrder = async (paymentResult) => {
    setIsPaymentModalOpen(false);
    const newOrder = await placeOrder({
      customer,
      paymentResult
    });
    router.push(`/success?orderId=${newOrder.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/cart" className="hover:text-gray-900 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Cart
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">Secure Checkout</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-8">
          Checkout & Order Confirmation
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Shipping & Payment Details */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Customer Contact & Delivery */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
                <h2 className="font-serif font-bold text-xl text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-600" />
                  1. Contact & Delivery Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">State / Province</label>
                    <input
                      type="text"
                      required
                      value={customer.state}
                      onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">PIN / Postal Code</label>
                    <input
                      type="text"
                      required
                      value={customer.zip}
                      onChange={(e) => setCustomer({ ...customer, zip: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
                <h2 className="font-serif font-bold text-xl text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                  2. Select Payment Mode
                </h2>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentOption("gateway")}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentOption === "gateway"
                        ? "border-blue-600 bg-blue-50/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentOption === "gateway"}
                      onChange={() => setPaymentOption("gateway")}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-900">
                          Razorpay / Cards / UPI / Netbanking (Simulation)
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Simulate full payment gateway with test cards (4242...), UPI ID, and live order tracking.
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentOption("cod")}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentOption === "cod"
                        ? "border-amber-600 bg-amber-50/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentOption === "cod"}
                      onChange={() => setPaymentOption("cod")}
                      className="mt-1 text-amber-600 focus:ring-amber-500"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-sm text-gray-900">
                        Cash on Delivery (Demo COD)
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Pay cash upon physical delivery at your doorstep.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary Review */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6 sticky top-28">
                <h2 className="font-serif font-bold text-xl text-gray-900 pb-4 border-b border-gray-100">
                  Order Items ({cart.length})
                </h2>

                <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.coverImage} alt={item.title} className="w-10 h-14 object-cover rounded shadow" />
                        <div>
                          <div className="font-bold text-gray-900 line-clamp-1">{item.title}</div>
                          <div className="text-gray-500">Qty: {item.quantity} × ₹{item.price}</div>
                        </div>
                      </div>
                      <div className="font-bold text-gray-900 font-serif">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals & Taxes */}
                <div className="space-y-2.5 text-xs text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold text-gray-900">₹{cartSubtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount:</span>
                      <span>-₹{cartDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{cartShipping === 0 ? "FREE" : `₹${cartShipping}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST ({settings.taxRate}%):</span>
                    <span>₹{cartTax.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-lg font-serif font-bold text-gray-950 border-t border-gray-200 pt-3">
                    <span>Total Payable:</span>
                    <span className="text-2xl font-black text-slate-900">
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Pay Now Action Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {paymentOption === "gateway"
                      ? `Pay ₹${cartTotal.toLocaleString("en-IN")} (Open Simulator)`
                      : `Place Order (COD) • ₹${cartTotal.toLocaleString("en-IN")}`}
                  </span>
                </button>

                <div className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant Order & Stock Sync with Seller Dashboard</span>
                </div>
              </div>
            </div>

          </div>
        </form>
      </main>

      <Footer />

      {/* Mock Payment Gateway Popup Modal */}
      <MockPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={cartTotal}
        orderData={{ customer }}
        onPaymentSuccess={handleCompleteOrder}
      />
    </div>
  );
}

