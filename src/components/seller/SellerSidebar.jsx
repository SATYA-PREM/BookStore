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
  LogOut,
  X
} from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";
import { useAdminAuth } from "@/context/AdminAuthContext";
import styles from "./SellerSidebar.module.css";

export default function SellerSidebar({ isMobileOpen, setIsMobileOpen }) {
  const pathname = usePathname();
  const { lowStockCount, orders, resetDemoData } = useBookStore();
  const { adminUser, logoutAdmin } = useAdminAuth();

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
      {/* Brand Header */}
      <div className={styles.brandArea}>
        <Link href="/seller" className={styles.brandLink}>
          <div className={styles.brandIconBox}>
            <LayoutDashboard style={{ width: 18, height: 18 }} />
          </div>
          <div className={styles.brandTextGroup}>
            <span className={styles.brandTitle}>
              BookFlow
            </span>
            <span className={styles.brandSubtitle}>SELLER HUB</span>
          </div>
        </Link>

        {setIsMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg border-none bg-transparent cursor-pointer"
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        )}
      </div>

      {/* Admin User Mini Card */}
      {adminUser && (
        <div className={styles.adminCard}>
          <div className={styles.adminInfo}>
            <img
              src={adminUser.avatar}
              alt={adminUser.name}
              className={styles.adminAvatar}
            />
            <div className={styles.adminText}>
              <div className={styles.adminName}>{adminUser.name}</div>
              <div className={styles.adminRole}>{adminUser.role}</div>
            </div>
          </div>
          <button
            onClick={logoutAdmin}
            className={styles.logoutBtn}
            title="Sign out of Admin"
          >
            <LogOut style={{ width: 15, height: 15 }} />
          </button>
        </div>
      )}

      {/* Nav List */}
      <div className={styles.navScrollArea}>
        {navGroups.map((group) => (
          <div key={group.label} className={styles.navGroup}>
            <span className={styles.groupLabel}>{group.label}</span>
            <div className={styles.groupItems}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                  >
                    <Icon style={{ width: 17, height: 17, flexShrink: 0 }} />
                    <span className={styles.navItemName}>{item.name}</span>
                    {item.badge && (
                      <span
                        className={styles.badge}
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
