import React, { useState } from "react";
import { Link } from "@/components/common/RouterAdapter";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import InvoiceModal from "@/components/invoice/InvoiceModal";
import { useBookStore } from "@/context/BookStoreContext";
import { useAuth } from "@/context/AuthContext";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import styles from "./orders.module.css";

export default function CustomerOrdersPage() {
  const { orders } = useBookStore();
  const { currentUser } = useAuth();

  // If a user is logged in, show their orders; if not, show recent orders or prompt
  const displayOrders = currentUser
    ? orders.filter(
        (o) =>
          o.customer?.email?.toLowerCase() === currentUser.email?.toLowerCase() ||
          o.customer?.name?.toLowerCase() === currentUser.name?.toLowerCase()
      )
    : orders;

  const [expandedOrder, setExpandedOrder] = useState(displayOrders[0]?.id || null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const toggleExpand = (id) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              My Orders & Live Tracking
            </h1>
            <p className={styles.subtitle}>
              Track fulfillment timeline and download official tax invoices for your purchases.
            </p>
          </div>

          <Link
            href="/books"
            className={styles.browseBtn}
          >
            Browse More Books
          </Link>
        </div>

        {displayOrders.length === 0 ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center", backgroundColor: "#ffffff", borderRadius: "1.5rem", border: "1px solid #e5e7eb" }}>
            <Package style={{ width: 48, height: 48, color: "#cbd5e1", margin: "0 auto 1rem" }} />
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 700 }}>No Orders Placed Yet</h3>
            <p style={{ fontSize: "0.875rem", color: "#64748b", margin: "0.5rem auto 1.5rem", maxWidth: 350 }}>
              You haven't completed any book orders yet. Browse our library and purchase your first read!
            </p>
            <Link
              href="/books"
              style={{ display: "inline-block", padding: "0.75rem 1.5rem", backgroundColor: "#f59e0b", color: "#020617", fontWeight: 700, borderRadius: 12, fontSize: "0.875rem" }}
            >
              Start Exploring Books
            </Link>
          </div>
        ) : (
          <div className={styles.ordersList}>
            {displayOrders.map((order) => {
              const isExpanded = expandedOrder === order.id;
              const isDelivered = order.orderStatus === "delivered";

              return (
                <div key={order.id} className={styles.orderCard}>
                  {/* Summary Bar Header */}
                  <div
                    onClick={() => toggleExpand(order.id)}
                    className={styles.orderCardHeader}
                  >
                    <div className={styles.orderMetaGroup}>
                      <div className={styles.orderIconBox}>
                        <Package style={{ width: 20, height: 20 }} />
                      </div>
                      <div>
                        <div className={styles.orderId}>
                          Order #{order.id}
                        </div>
                        <div className={styles.orderDate}>
                          Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span className={`${styles.statusPill} ${isDelivered ? styles.statusDelivered : styles.statusProcessing}`}>
                        {order.orderStatus}
                      </span>
                      <span className={styles.orderTotal}>
                        ₹{order.total?.toLocaleString("en-IN")}
                      </span>
                      {isExpanded ? <ChevronUp style={{ width: 18, height: 18, color: "#94a3b8" }} /> : <ChevronDown style={{ width: 18, height: 18, color: "#94a3b8" }} />}
                    </div>
                  </div>

                  {/* Expanded Timeline & Details */}
                  {isExpanded && (
                    <div className={styles.cardBody}>
                      {/* Timeline */}
                      <div className={styles.timelineRow}>
                        {order.timeline?.map((step, idx) => (
                          <div key={idx} className={styles.timelineStep}>
                            {step.completed ? (
                              <CheckCircle2 className={styles.stepIconDone} style={{ width: 16, height: 16 }} />
                            ) : (
                              <Clock className={styles.stepIconPending} style={{ width: 16, height: 16 }} />
                            )}
                            <div>
                              <div style={{ fontWeight: step.completed ? 700 : 500, color: step.completed ? "#111827" : "#94a3b8" }}>
                                {step.status}
                              </div>
                              <div style={{ fontSize: "0.6875rem", color: "#94a3b8" }}>{step.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Items */}
                      <div className={styles.orderItemsList}>
                        {order.items?.map((item, idx) => (
                          <div key={idx} className={styles.orderItemRow}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <img src={item.coverImage} alt={item.title} className={styles.itemThumb} />
                              <div>
                                <div style={{ fontWeight: 600 }}>{item.title}</div>
                                <div style={{ fontSize: "0.6875rem", color: "#64748b" }}>Qty: {item.quantity} × ₹{item.price}</div>
                              </div>
                            </div>
                            <div style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</div>
                          </div>
                        ))}
                      </div>

                      {/* Invoice Button */}
                      <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                        <button
                          onClick={() => setSelectedInvoiceOrder(order)}
                          className={styles.invoiceBtn}
                        >
                          <FileText style={{ width: 14, height: 14 }} />
                          <span>View Official Invoice</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      {selectedInvoiceOrder && (
        <InvoiceModal
          isOpen={!!selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
          order={selectedInvoiceOrder}
        />
      )}
    </div>
  );
}
