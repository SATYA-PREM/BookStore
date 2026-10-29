import React, { useState, Suspense } from "react";
import { useSearchParams, Link } from "@/components/common/RouterAdapter";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import InvoiceModal from "@/components/invoice/InvoiceModal";
import { useBookStore } from "@/context/BookStoreContext";
import {
  CheckCircle2,
  Package,
  FileText,
  ArrowRight
} from "lucide-react";
import styles from "./success.module.css";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }} />}>
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
      <div className={styles.pageWrapper}>
        <Navbar />
        <main style={{ flex: 1, maxWidth: 400, margin: "0 auto", padding: "5rem 1rem", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 700 }}>No Order Found</h1>
          <Link href="/books" style={{ color: "#d97706", fontWeight: 700, marginTop: "1rem", display: "block" }}>
            Return to Bookstore
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
        <div className={styles.successCard}>
          {/* Animated Success Badge */}
          <div className={styles.iconCircle}>
            <CheckCircle2 style={{ width: 48, height: 48 }} />
          </div>

          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Order Confirmed Successfully
            </span>
            <h1 className={styles.title} style={{ marginTop: "0.5rem" }}>
              Thank You for Your Order!
            </h1>
            <p style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "0.5rem" }}>
              A confirmation receipt and tracking updates have been recorded in your account.
            </p>
          </div>

          <div className={styles.orderPillBox}>
            <Package style={{ width: 16, height: 16 }} />
            <span>Order Reference: #{order.id}</span>
          </div>

          {/* Quick Info Grid */}
          <div className={styles.infoBox}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Customer:</span>
              <span style={{ fontWeight: 600 }}>{order.customerName}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Payment Method:</span>
              <span style={{ fontWeight: 600 }}>{order.paymentMethod}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Total Paid:</span>
              <span style={{ fontWeight: 700, color: "#111827" }}>₹{order.total?.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionRow}>
            <button
              onClick={() => setIsInvoiceOpen(true)}
              className={styles.secondaryBtn}
            >
              <FileText style={{ width: 16, height: 16 }} />
              <span>Download Invoice</span>
            </button>

            <Link href="/orders" className={styles.primaryBtn}>
              <span>Track Live Delivery</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {isInvoiceOpen && (
        <InvoiceModal
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
          order={order}
        />
      )}
    </div>
  );
}
