import React from "react";
import { Link } from "@/components/common/RouterAdapter";
import { Sparkles, ArrowRight, TrendingUp, CheckCircle } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      {/* Background ambient lighting */}
      <div className={styles.ambientLightAmber} />
      <div className={styles.ambientLightIndigo} />

      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Left Hero Text */}
          <div className={styles.leftCol}>
            <div className={styles.pillBadge}>
              <Sparkles style={{ width: 14, height: 14 }} />
              <span>SaaS-Powered Book Commerce Engine</span>
            </div>

            <h1 className={styles.heading}>
              Find Your Next <span className={styles.headingGradient}>Great Read</span>
            </h1>

            <p className={styles.subheading}>
              Discover thousands of books from bestselling authors, independent publishers, and emerging writers. Complete client-side shopping with live order tracking and a connected seller SaaS platform.
            </p>

            {/* Action Buttons */}
            <div className={styles.actionRow}>
              <Link
                href="/books"
                className={styles.primaryBtn}
              >
                <span>Explore All Books</span>
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              
              <Link
                href="/seller"
                className={styles.secondaryBtn}
              >
                <span>Open Seller SaaS Center</span>
                <TrendingUp style={{ width: 16, height: 16, color: "#818cf8" }} />
              </Link>
            </div>

            {/* Floating Trust Metrics */}
            <div className={styles.metricsRow}>
              <div className={styles.metricItem}>
                <div className={styles.metricValue}>10K+</div>
                <div className={styles.metricLabel}>Curated Titles</div>
              </div>
              <div className={`${styles.metricItem} ${styles.metricItemBordered}`}>
                <div className={styles.metricValue}>5K+</div>
                <div className={styles.metricLabel}>Happy Readers</div>
              </div>
              <div className={`${styles.metricItem} ${styles.metricItemBordered}`}>
                <div className={styles.metricValue} style={{ color: "#fbbf24" }}>98%</div>
                <div className={styles.metricLabel}>5-Star Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Visual Floating Showcase */}
          <div className={styles.rightCol}>
            
            {/* Main Featured Book Card */}
            <div className={styles.spotlightCard}>
              <div className={styles.spotlightHeader}>
                <span className={styles.spotlightPill}>
                  <span className={styles.pingDot} />
                  Bestseller Spotlight
                </span>
                <span className={styles.spotlightPrice}>₹499 only</span>
              </div>

              <div className={styles.imageFrame}>
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600"
                  alt="Atomic Habits"
                  className={styles.featuredImage}
                />
                <div className={styles.imageOverlay}>
                  <div className={styles.bookOverlayTitle}>Atomic Habits</div>
                  <div className={styles.bookOverlayAuthor}>by James Clear</div>
                </div>
              </div>

              <div className={styles.spotlightFooter}>
                <div className={styles.stars}>
                  ★ ★ ★ ★ ★ <span style={{ color: "#cbd5e1", marginLeft: 4 }}>4.8 (1.2k)</span>
                </div>
                <span className={styles.stockBadge}>
                  In Stock (42 left)
                </span>
              </div>
            </div>

            {/* Floating Card 1: Payment Received */}
            <div className={styles.floatingCard1}>
              <div className={styles.currencyIconBox}>
                ₹
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ffffff" }}>₹898 Payment Received</div>
                <div style={{ fontSize: "0.6875rem", color: "#94a3b8" }}>Order #BF-1024 • Verified</div>
              </div>
            </div>

            {/* Floating Card 2: Shipped Badge */}
            <div className={styles.floatingCard2}>
              <CheckCircle style={{ width: 20, height: 20, color: "#818cf8" }} />
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ffffff" }}>Order Packed & Shipped</div>
                <div style={{ fontSize: "0.625rem", color: "#94a3b8" }}>Tracking #BF-1024</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
