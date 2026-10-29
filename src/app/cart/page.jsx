import React, { useState } from "react";
import { Link, useRouter } from "@/components/common/RouterAdapter";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useBookStore } from "@/context/BookStoreContext";
import { useAuth } from "@/context/AuthContext";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  X,
  Lock,
} from "lucide-react";
import styles from "./cart.module.css";

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated, setIsAuthModalOpen, setAuthModalMode } = useAuth();
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    settings
  } = useBookStore();

  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput("");
    }
  };

  const handleApplyDemoCode = (code) => {
    applyCoupon(code);
  };

  if (cart.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.emptyState}>
          <div className={styles.emptyIconBox}>
            <ShoppingBag style={{ width: 40, height: 40 }} />
          </div>
          <h1 className={styles.pageTitle}>
            Your Cart is Empty
          </h1>
          <p className={styles.pageSubtitle}>
            Looks like you haven't added any books to your shopping cart yet.
          </p>
          <Link
            href="/books"
            className={styles.checkoutBtn}
            style={{ width: "auto", padding: "0.875rem 2rem" }}
          >
            <span>Explore Books Catalog</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.container}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 className={styles.pageTitle}>
            Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)
          </h1>
          <p className={styles.pageSubtitle}>
            Review your selected titles, apply discount coupons, and proceed to checkout.
          </p>
        </div>

        <div className={styles.cartGrid}>
          {/* Left Column: Cart Items */}
          <div className={styles.itemsCard}>
            <div className={styles.cartHeader}>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#64748b" }}>Book Details</span>
              <button
                onClick={clearCart}
                style={{ fontSize: "0.75rem", color: "#f43f5e", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
              >
                <Trash2 style={{ width: 14, height: 14 }} />
                <span>Clear All</span>
              </button>
            </div>

            <div>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItemRow}>
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className={styles.itemThumb}
                  />

                  <div className={styles.itemDetails}>
                    <Link href={`/book/${item.id}`}>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                    </Link>
                    <p className={styles.itemAuthor}>by {item.author}</p>
                    <div className={styles.itemUnitPrice}>₹{item.price} each</div>
                  </div>

                  {/* Quantity Control */}
                  <div className={styles.qtyControl}>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className={styles.qtyBtn}
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className={styles.itemTotalPrice}>
                    ₹{item.price * item.quantity}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.deleteBtn}
                  >
                    <Trash2 style={{ width: 16, height: 16 }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            {/* Promo Code Input */}
            <div>
              <form onSubmit={handleApplyCoupon} className={styles.couponForm}>
                <input
                  type="text"
                  placeholder="Enter Promo Code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className={styles.couponInput}
                />
                <button type="submit" className={styles.couponBtn}>
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div style={{ marginTop: "0.75rem", padding: "0.5rem 0.75rem", backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "#065f46" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Tag style={{ width: 14, height: 14 }} />
                    <span style={{ fontWeight: 700 }}>{appliedCoupon.code}</span>
                    <span>({appliedCoupon.discountType === "percentage" ? `${appliedCoupon.discountValue}% off` : `₹${appliedCoupon.discountValue} flat`})</span>
                  </div>
                  <button onClick={removeCoupon} style={{ color: "#065f46" }}>
                    <X style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>₹{cartSubtotal.toLocaleString("en-IN")}</span>
              </div>

              {cartDiscount > 0 && (
                <div className={styles.summaryRow} style={{ color: "#059669" }}>
                  <span>Discount</span>
                  <span>-₹{cartDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{cartShipping === 0 ? <span style={{ color: "#059669", fontWeight: 700 }}>FREE</span> : `₹${cartShipping}`}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Estimated Tax (5%)</span>
                <span>₹{cartTax.toLocaleString("en-IN")}</span>
              </div>

              <div className={styles.summaryTotalRow}>
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  setAuthModalMode("login");
                  setIsAuthModalOpen(true);
                } else {
                  router.push("/checkout");
                }
              }}
              className={styles.checkoutBtn}
            >
              <span>{isAuthenticated ? "Proceed to Checkout" : "Sign In to Checkout"}</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: "0.75rem", color: "#64748b" }}>
              <ShieldCheck style={{ width: 16, height: 16, color: "#10b981" }} />
              <span>Safe & Secure Client Simulator</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
