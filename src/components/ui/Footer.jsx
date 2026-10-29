import React from "react";
import { Link } from "@/components/common/RouterAdapter";
import { BookOpen, ShieldCheck, Truck, RotateCcw, Headphones, Heart } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Value Proposition Bar */}
      <div className={styles.propBar}>
        <div className={styles.container}>
          <div className={styles.propGrid}>
            <div className={styles.propItem}>
              <div className={styles.iconBox} style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#fbbf24" }}>
                <Truck style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <h4 className={styles.propTitle}>Free Fast Shipping</h4>
                <p className={styles.propDesc}>On all orders over ₹500</p>
              </div>
            </div>

            <div className={styles.propItem}>
              <div className={styles.iconBox} style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#34d399" }}>
                <ShieldCheck style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <h4 className={styles.propTitle}>Secure Checkout</h4>
                <p className={styles.propDesc}>Client-side mock simulation</p>
              </div>
            </div>

            <div className={styles.propItem}>
              <div className={styles.iconBox} style={{ backgroundColor: "rgba(99, 102, 241, 0.1)", color: "#818cf8" }}>
                <RotateCcw style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <h4 className={styles.propTitle}>Easy Returns</h4>
                <p className={styles.propDesc}>7-day replacement guarantee</p>
              </div>
            </div>

            <div className={styles.propItem}>
              <div className={styles.iconBox} style={{ backgroundColor: "rgba(244, 63, 94, 0.1)", color: "#fb7185" }}>
                <Headphones style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <h4 className={styles.propTitle}>24/7 Support</h4>
                <p className={styles.propDesc}>Dedicated assistance for readers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className={`${styles.container} ${styles.mainSection}`}>
        <div className={styles.linksGrid}>
          
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <div className={styles.brandLogo}>
              <div className={styles.logoIcon}>
                <BookOpen style={{ width: 16, height: 16 }} />
              </div>
              <span className={styles.brandTitle}>
                Book<span className={styles.brandHighlight}>Flow</span>
              </span>
            </div>
            <p className={styles.brandDesc}>
              BookFlow is a modern SaaS platform connecting readers with curated bestsellers while empowering book publishers and indie sellers through interactive cloud management.
            </p>
            <div className={styles.archTag}>
              Frontend Heavy Architecture • Pure LocalStorage • Zero Backend API
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.columnTitle}>Bookstore</h4>
            <ul className={styles.linkList}>
              <li><Link href="/books" className={styles.footerLink}>Bestsellers</Link></li>
              <li><Link href="/books?category=Self%20Help" className={styles.footerLink}>Self Help & Growth</Link></li>
              <li><Link href="/books?category=Business" className={styles.footerLink}>Business & Finance</Link></li>
              <li><Link href="/books?category=Fiction" className={styles.footerLink}>Fiction & Novels</Link></li>
              <li><Link href="/books?category=Technology" className={styles.footerLink}>Technology & Coding</Link></li>
            </ul>
          </div>

          {/* SaaS Management */}
          <div>
            <h4 className={styles.columnTitle}>Seller SaaS Center</h4>
            <ul className={styles.linkList}>
              <li><Link href="/seller" className={`${styles.footerLink} ${styles.sellerLink}`}>Executive Dashboard</Link></li>
              <li><Link href="/seller/books" className={`${styles.footerLink} ${styles.sellerLink}`}>Catalog Manager</Link></li>
              <li><Link href="/seller/inventory" className={`${styles.footerLink} ${styles.sellerLink}`}>Inventory & Restocking</Link></li>
              <li><Link href="/seller/orders" className={`${styles.footerLink} ${styles.sellerLink}`}>Order Fulfillment</Link></li>
              <li><Link href="/seller/analytics" className={`${styles.footerLink} ${styles.sellerLink}`}>Sales & Revenue Charts</Link></li>
            </ul>
          </div>

          {/* Coupons & Promo info */}
          <div>
            <h4 className={styles.columnTitle}>Demo Promo Codes</h4>
            <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "0.75rem" }}>Try these in your shopping cart:</p>
            <div>
              <div className={styles.promoCard}>
                <span className={styles.promoCode}>BOOK10</span>
                <span>10% Off</span>
              </div>
              <div className={styles.promoCard}>
                <span className={styles.promoCode}>WELCOME100</span>
                <span>₹100 Flat</span>
              </div>
              <div className={styles.promoCard}>
                <span className={styles.promoCode}>READ20</span>
                <span>20% Off Bundle</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© 2026 BookFlow SaaS Platform. Component-Scoped CSS Architecture.</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <span>Crafted for Book Lovers & SaaS Sellers</span>
            <Heart style={{ width: 14, height: 14, color: "#f43f5e", fill: "#f43f5e" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
