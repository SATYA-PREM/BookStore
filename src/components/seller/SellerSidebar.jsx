import React from "react";
import { Link, usePathname } from "@/components/common/RouterAdapter";
import {
  LayoutDashboard,
  BookOpen,
  Boxes,
  Package,
  Users,
  BarChart3,
  CreditCard,
  Ticket,
  MessageSquare,
  Settings,
  Store,
  RotateCcw,
  X
} from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";
import styles from "./SellerSidebar.module.css";

export default function SellerSidebar({ isMobileOpen, setIsMobileOpen }) {
  const pathname = usePathname();
  const { lowStockCount, orders, resetDemoData } = useBookStore();

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === "processing").length;

  const navGroups = [
    {
      label: "OVERVIEW",
      items: [
        { name: "Executive Dashboard", href: "/seller", icon: LayoutDashboard }
      ]
    },
    {
      label: "CATALOG",
      items: [
        { name: "All Books", href: "/seller/books", icon: BookOpen },
        {
          name: "Inventory & Stock",
          href: "/seller/inventory",
          icon: Boxes,
          badge: lowStockCount > 0 ? `${lowStockCount} low` : null,
          badgeColor: "#fbbf24",
          badgeBg: "rgba(245, 158, 11, 0.2)"
        }
      ]
    },
    {
      label: "SALES & CRM",
      items: [
        {
          name: "Orders & Fulfillment",
          href: "/seller/orders",
          icon: Package,
          badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : null,
          badgeColor: "#818cf8",
          badgeBg: "rgba(99, 102, 241, 0.2)"
        },
        { name: "Customers", href: "/seller/customers", icon: Users },
        { name: "Analytics & Reports", href: "/seller/analytics", icon: BarChart3 }
      ]
    },
    {
      label: "FINANCE & MARKETING",
      items: [
        { name: "Payments & Txns", href: "/seller/payments", icon: CreditCard },
        { name: "Coupons & Discounts", href: "/seller/coupons", icon: Ticket },
        { name: "Reviews Moderation", href: "/seller/reviews", icon: MessageSquare }
      ]
    },
    {
      label: "PREFERENCES",
      items: [
        { name: "Store Settings", href: "/seller/settings", icon: Settings }
      ]
    }
  ];

  const renderNavContent = () => (
    <>
      <div className={styles.brandArea}>
        <Link href="/seller" className={styles.brandLink}>
          <div className={styles.brandLogoBox}>
            <LayoutDashboard style={{ width: 18, height: 18 }} />
          </div>
          <div>
            <div className={styles.brandTitle}>BookFlow</div>
            <span className={styles.badgeSaaS}>Seller Hub</span>
          </div>
        </Link>
        {isMobileOpen && (
          <button onClick={() => setIsMobileOpen(false)} style={{ color: "#94a3b8" }}>
            <X style={{ width: 20, height: 20 }} />
          </button>
        )}
      </div>

      <div className={styles.navContent}>
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className={styles.groupLabel}>{group.label}</div>
            <div className={styles.groupItems}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                  >
                    <div className={styles.navLinkInner}>
                      <Icon className={`${styles.navIcon} ${isActive ? styles.navIconActive : ""}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={styles.badgeCounter}
                        style={{ color: item.badgeColor, backgroundColor: item.badgeBg }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.sidebarFooter}>
        <Link href="/" className={styles.storefrontBtn}>
          <Store style={{ width: 14, height: 14, color: "#f59e0b" }} />
          <span>Switch to Storefront</span>
        </Link>
        <button
          onClick={resetDemoData}
          className={styles.storefrontBtn}
          style={{ color: "#f43f5e", borderColor: "rgba(244, 63, 94, 0.2)" }}
        >
          <RotateCcw style={{ width: 14, height: 14 }} />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className={styles.sidebarDesktop}>
        {renderNavContent()}
      </aside>

      {isMobileOpen && (
        <div className={styles.backdropMobile}>
          <div className={styles.sidebarMobile}>
            {renderNavContent()}
          </div>
        </div>
      )}
    </>
  );
}
