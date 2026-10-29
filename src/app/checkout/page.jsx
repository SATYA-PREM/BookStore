import React, { useState, useEffect } from "react";
import { useRouter, Link } from "@/components/common/RouterAdapter";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import MockPaymentModal from "@/components/payment/MockPaymentModal";
import { useBookStore } from "@/context/BookStoreContext";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowLeft,
  Lock,
  Sparkles,
  MapPin
} from "lucide-react";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, setIsAuthModalOpen, setAuthModalMode, addresses } = useAuth();
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    placeOrder
  } = useBookStore();

  const userAddresses = currentUser ? addresses.filter(a => a.userId === currentUser.id) : [];
  const defaultAddr = userAddresses.find((a) => a.isDefault) || userAddresses[0];

  const [customer, setCustomer] = useState({
    name: currentUser?.name || defaultAddr?.fullName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || defaultAddr?.phone || "",
    address: defaultAddr?.street || "",
    city: defaultAddr?.city || "",
    state: defaultAddr?.state || "",
    zip: defaultAddr?.zip || ""
  });

  // Autofill when user or saved addresses update
  useEffect(() => {
    if (currentUser) {
      setCustomer((prev) => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email,
        phone: currentUser.phone || defaultAddr?.phone || prev.phone,
        address: defaultAddr?.street || prev.address,
        city: defaultAddr?.city || prev.city,
        state: defaultAddr?.state || prev.state,
        zip: defaultAddr?.zip || prev.zip,
      }));
    }
  }, [currentUser, defaultAddr]);

  const [paymentOption, setPaymentOption] = useState("gateway");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Your Cart is Empty</h2>
            <Link href="/books" style={{ color: "#d97706", fontWeight: 700 }}>
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

    if (!isAuthenticated) {
      setAuthModalMode("login");
      setIsAuthModalOpen(true);
      return;
    }

    if (paymentOption === "gateway") {
      setIsPaymentModalOpen(true);
    } else {
      handleCompleteOrder({
        transactionId: `COD-${Date.now().toString().slice(-6)}`,
        method: "Cash on Delivery (Simulated)"
      });
    }
  };

  const handleCompleteOrder = async (paymentResult) => {
    const newOrder = await placeOrder({
      customer,
      paymentResult
    });
    setIsPaymentModalOpen(false);
    router.push(`/success?orderId=${newOrder.id}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.container}>
        <Link href="/cart" className={styles.headerBack}>
          <ArrowLeft style={{ width: 14, height: 14 }} />
          <span>Back to Shopping Cart</span>
        </Link>

        <h1 className={styles.title}>
          Checkout & Order Confirmation
        </h1>

        {!isAuthenticated && (
          <div className="mb-6 p-4 rounded-xl border border-amber-300 dark:border-amber-700/50 bg-amber-50/80 dark:bg-amber-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
                <Lock className="w-5 h-5" />
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  Account Required to Place Order
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Please log in or register so we can validate and save your order history and address.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode("login");
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-colors"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode("register");
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg border border-amber-400 dark:border-amber-700 hover:bg-amber-100/50 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-200 transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          <div className={styles.layoutGrid}>
            
            {/* Left Column: Form Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              {/* Delivery Details */}
              <div className={styles.formCard}>
                <h2 className={styles.sectionHeader}>
                  <Truck style={{ width: 20, height: 20, color: "#d97706" }} />
                  <span>1. Contact & Delivery Address</span>
                </h2>

                <div className={styles.inputGrid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.inputGroup} style={{ gridColumn: "span 2" }}>
                    <label className={styles.label}>Phone Number</label>
                    <input
                      type="text"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.inputGroup} style={{ gridColumn: "span 2" }}>
                    <label className={styles.label}>Street Address</label>
                    <input
                      type="text"
                      required
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>City</label>
                    <input
                      type="text"
                      required
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>State / Province</label>
                    <input
                      type="text"
                      required
                      value={customer.state}
                      onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                      className={styles.inputField}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className={styles.formCard}>
                <h2 className={styles.sectionHeader}>
                  <CreditCard style={{ width: 20, height: 20, color: "#d97706" }} />
                  <span>2. Payment Option</span>
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div
                    onClick={() => setPaymentOption("gateway")}
                    className={`${styles.paymentOption} ${paymentOption === "gateway" ? styles.paymentOptionActive : ""}`}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input
                        type="radio"
                        checked={paymentOption === "gateway"}
                        onChange={() => setPaymentOption("gateway")}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>Online Payment Simulator</div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Cards, UPI, NetBanking simulation</div>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentOption("cod")}
                    className={`${styles.paymentOption} ${paymentOption === "cod" ? styles.paymentOptionActive : ""}`}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input
                        type="radio"
                        checked={paymentOption === "cod"}
                        onChange={() => setPaymentOption("cod")}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>Cash on Delivery</div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Pay upon book delivery</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className={styles.summaryCard}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 700 }}>
                Order Summary
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.title}</div>
                      <div style={{ fontSize: "0.6875rem", color: "#64748b" }}>Qty: {item.quantity} × ₹{item.price}</div>
                    </div>
                    <div style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString("en-IN")}</span>
                </div>
                {cartDiscount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#059669" }}>
                    <span>Discount</span>
                    <span>-₹{cartDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Shipping</span>
                  <span>{cartShipping === 0 ? "FREE" : `₹${cartShipping}`}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Estimated Tax</span>
                  <span>₹{cartTax.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.125rem", paddingTop: 8, borderTop: "1px solid #f1f5f9" }}>
                  <span>Total Amount</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <Lock style={{ width: 16, height: 16 }} />
                <span>
                  {isAuthenticated
                    ? `Pay ₹${cartTotal.toLocaleString("en-IN")} & Complete Order`
                    : "Sign In / Register to Place Order"}
                </span>
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: "0.75rem", color: "#64748b" }}>
                <ShieldCheck style={{ width: 16, height: 16, color: "#10b981" }} />
                <span>Simulated Secure Payment</span>
              </div>
            </div>

          </div>
        </form>
      </main>

      <Footer />

      {/* Mock Payment Simulator Modal */}
      <MockPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={cartTotal}
        onSuccess={handleCompleteOrder}
      />
    </div>
  );
}
