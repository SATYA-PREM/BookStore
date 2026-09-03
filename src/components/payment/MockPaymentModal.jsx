"use client";

import React, { useState } from "react";
import {
  X,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Lock,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { DEMO_CARDS, processDemoPayment } from "@/lib/mockPaymentEngine";

export default function MockPaymentModal({
  isOpen,
  onClose,
  amount,
  orderData,
  onPaymentSuccess
}) {
  const [activeTab, setActiveTab] = useState("cards"); // 'cards' | 'upi' | 'netbanking' | 'wallets'
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("123");
  const [cardName, setCardName] = useState(orderData?.customer?.name || "Satya Prem");

  // UPI Inputs
  const [upiId, setUpiId] = useState("satya@okaxis");

  // Netbanking
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  // Payment Status State Machine
  // 'form' | 'processing' | 'success' | 'failed'
  const [paymentStatus, setPaymentStatus] = useState("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [completedResult, setCompletedResult] = useState(null);

  if (!isOpen) return null;

  const handlePay = async (e) => {
    e?.preventDefault();
    setPaymentStatus("processing");
    setErrorMessage("");

    let methodInfo = "card";
    if (activeTab === "upi") methodInfo = `UPI (${upiId})`;
    else if (activeTab === "netbanking") methodInfo = `Netbanking (${selectedBank})`;
    else if (activeTab === "wallets") methodInfo = "Wallet (Paytm)";
    else methodInfo = `Visa Card (•••• ${cardNumber.slice(-4) || "4242"})`;

    const result = await processDemoPayment({
      method: activeTab,
      cardNumber,
      upiId,
      amount,
      delayMs: 1800
    });

    if (result.success) {
      setCompletedResult({ ...result, method: methodInfo });
      setPaymentStatus("success");
      // Notify parent after brief confirmation display
      setTimeout(() => {
        onPaymentSuccess({ ...result, method: methodInfo });
      }, 1400);
    } else {
      setErrorMessage(result.error || "Payment could not be processed.");
      setPaymentStatus("failed");
    }
  };

  const fillTestCard = (type) => {
    if (type === "success") {
      setCardNumber("4242 4242 4242 4242");
      setCardExpiry("12/28");
      setCardCvv("123");
    } else if (type === "declined") {
      setCardNumber("4000 0000 0000 0002");
      setCardExpiry("05/27");
      setCardCvv("999");
    } else if (type === "insufficient") {
      setCardNumber("4000 0000 0000 9995");
      setCardExpiry("08/29");
      setCardCvv("777");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up border border-slate-200">
        
        {/* Razorpay / Gateway Simulation Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center font-bold text-lg font-serif">
              ₹
            </div>
            <div>
              <div className="text-xs font-semibold text-blue-100 uppercase tracking-wider flex items-center gap-1">
                <Lock className="w-3 h-3 text-blue-200" />
                BookFlow Secure Checkout
              </div>
              <div className="text-xl font-bold font-serif">
                Pay ₹{amount?.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          {paymentStatus === "form" && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* State 1: Payment Form */}
        {paymentStatus === "form" && (
          <div className="p-6">
            
            {/* Quick Demo Test Card Fillers */}
            <div className="mb-5 p-3 bg-amber-50 border border-amber-200/80 rounded-xl">
              <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Demo Simulator • Quick Test Cards
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => fillTestCard("success")}
                  className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-colors"
                >
                  ✓ Success Card (4242)
                </button>
                <button
                  type="button"
                  onClick={() => fillTestCard("declined")}
                  className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-sm transition-colors"
                >
                  × Declined (4000...02)
                </button>
                <button
                  type="button"
                  onClick={() => fillTestCard("insufficient")}
                  className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-800 text-white font-medium shadow-sm transition-colors"
                >
                  ! No Funds (9995)
                </button>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-4 gap-2 p-1 bg-slate-100 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => setActiveTab("cards")}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                  activeTab === "cards"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("upi")}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                  activeTab === "upi"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("netbanking")}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                  activeTab === "netbanking"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Netbanking</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("wallets")}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                  activeTab === "wallets"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>Wallets</span>
              </button>
            </div>

            {/* Cards Tab Content */}
            {activeTab === "cards" && (
              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <CreditCard className="w-5 h-5 text-slate-400 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Satya Prem"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay ₹{amount?.toLocaleString("en-IN")}</span>
                </button>
              </form>
            )}

            {/* UPI Tab Content */}
            {activeTab === "upi" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Enter Virtual Payment Address (UPI ID)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@okaxis or username@upi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Tip: include "fail" in UPI ID to simulate bank rejection.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Scan QR Code</div>
                    <div className="text-[11px] text-slate-500">Google Pay • PhonePe • Paytm</div>
                  </div>
                  <div className="w-12 h-12 bg-white border border-slate-300 rounded-lg flex items-center justify-center font-mono text-[10px] text-slate-400">
                    [QR CODE]
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePay}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Verify & Pay ₹{amount?.toLocaleString("en-IN")}</span>
                </button>
              </div>
            )}

            {/* Netbanking Tab */}
            {activeTab === "netbanking" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Select Popular Bank
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank"].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                          selectedBank === bank
                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePay}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed with {selectedBank}</span>
                </button>
              </div>
            )}

            {/* Wallets Tab */}
            {activeTab === "wallets" && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800">Paytm Wallet / Amazon Pay</div>
                  <span className="text-xs text-emerald-600 font-bold">Linked</span>
                </div>

                <button
                  type="button"
                  onClick={handlePay}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Pay ₹{amount?.toLocaleString("en-IN")} from Wallet</span>
                </button>
              </div>
            )}

            <div className="mt-4 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Simulated Client-Side Payment Verification (No Real Charge)</span>
            </div>
          </div>
        )}

        {/* State 2: Processing Screen (from user reference design) */}
        {paymentStatus === "processing" && (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative w-20 h-16 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl">
              <CreditCard className="w-8 h-8" />
              <span className="absolute -top-2 -right-2 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500" />
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Processing Payment...
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Please do not close this window or press the back button while we verify your transaction.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* State 3: Success Screen */}
        {paymentStatus === "success" && (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Payment Successful!
              </h3>
              <p className="text-xs text-slate-500">
                Transaction ID: <span className="font-mono font-bold text-slate-700">{completedResult?.transactionId}</span>
              </p>
            </div>

            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-bold text-slate-900">₹{amount?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Method:</span>
                <span className="font-medium text-slate-800">{completedResult?.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-600">CONFIRMED</span>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Redirecting to your order confirmation...
            </p>
          </div>
        )}

        {/* State 4: Failed Screen */}
        {paymentStatus === "failed" && (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
              <XCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Payment Failed
              </h3>
              <p className="text-xs text-rose-600 font-medium">
                {errorMessage}
              </p>
            </div>

            <p className="text-xs text-slate-500 max-w-xs">
              Your account was not charged. Please try again with a valid test card (e.g. 4242 4242 4242 4242).
            </p>

            <button
              onClick={() => setPaymentStatus("form")}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              Try Again with Another Card
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

