import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

const AdminAuthContext = createContext(null);

const ADMIN_STORAGE_KEY = "bookflow_admin_auth";

export const DEMO_ADMIN_ACCOUNTS = [
  {
    id: "ADM-001",
    name: "Charvi Prasad",
    role: "Super Admin",
    email: "admin@bookflow.com",
    password: "admin",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    badge: "Store Owner",
    department: "Executive Management",
  },
  {
    id: "ADM-002",
    name: "Vikram Mehta",
    role: "Inventory & Catalog Manager",
    email: "catalog@bookflow.com",
    password: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    badge: "Operations",
    department: "Logistics & Stock",
  },
];

export function AdminAuthProvider({ children }) {
  const { showToast } = useToast();
  const [adminUser, setAdminUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored) {
        setAdminUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load admin auth session:", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const loginAdmin = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Check against demo accounts or standard admin credentials
    const found = DEMO_ADMIN_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === cleanEmail && acc.password === cleanPass
    );

    if (found) {
      setAdminUser(found);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(found));
      showToast(`Access granted! Welcome, ${found.name}`, "success");
      return { success: true };
    }

    // Allow flexible test admin logins
    if (cleanPass === "admin" || cleanPass === "password" || cleanPass === "123456") {
      const genericAdmin = {
        id: `ADM-${Date.now().toString().slice(-3)}`,
        name: cleanEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        role: "Seller Administrator",
        email: cleanEmail,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        badge: "Seller Hub",
        department: "Commerce Ops",
      };
      setAdminUser(genericAdmin);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(genericAdmin));
      showToast(`Welcome to Seller Hub, ${genericAdmin.name}!`, "success");
      return { success: true };
    }

    showToast("Invalid credentials. Use demo 1-click or password: admin", "error");
    return { success: false, message: "Invalid email or password" };
  };

  const quickDemoLogin = (accountIndex = 0) => {
    const target = DEMO_ADMIN_ACCOUNTS[accountIndex] || DEMO_ADMIN_ACCOUNTS[0];
    setAdminUser(target);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(target));
    showToast(`Logged in as ${target.name} (${target.role})`, "success");
    return true;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    showToast("Admin session ended", "info");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAdminAuthenticated: !!adminUser,
        isInitialized,
        loginAdmin,
        quickDemoLogin,
        logoutAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

// Fallback safe hook that doesn't crash even if HMR mounts temporarily before provider
export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    return {
      adminUser: null,
      isAdminAuthenticated: false,
      isInitialized: true,
      loginAdmin: () => ({ success: false }),
      quickDemoLogin: () => {},
      logoutAdmin: () => {},
    };
  }
  return context;
}
