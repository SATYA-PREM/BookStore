import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useToast } from "./ToastContext";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEYS = {
  USER: "bookflow_auth_user",
  ALL_USERS: "bookflow_all_users",
  ADDRESSES: "bookflow_auth_addresses",
  RECENTLY_VISITED: "bookflow_recently_visited",
};

export const DEMO_USERS = [
  {
    id: "USR-001",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    role: "customer",
    password: "password123",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    bio: "Passionate reader of philosophy, sci-fi and self-growth literature.",
    joinedDate: "January 2026",
    membership: "VIP Gold Reader",
  },
  {
    id: "USR-002",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    role: "customer",
    password: "password123",
    phone: "+91 98765 11223",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    bio: "Book reviewer and founder of City Book Club.",
    joinedDate: "February 2026",
    membership: "Prime Reader",
  },
  {
    id: "USR-ADMIN",
    name: "Charvi Prasad",
    email: "admin@bookflow.com",
    role: "admin",
    password: "admin",
    phone: "+91 99887 76655",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    bio: "Head Administrator & Catalog Director at BookFlow SaaS.",
    joinedDate: "October 2025",
    membership: "Store Owner (Admin)",
  },
];

const INITIAL_ADDRESSES = [
  {
    id: "ADDR-101",
    userId: "USR-001",
    tag: "Home",
    fullName: "Alex Morgan",
    phone: "+91 98765 43210",
    street: "402, Skyline Residency, MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    zip: "560001",
    country: "India",
    isDefault: true,
  },
  {
    id: "ADDR-102",
    userId: "USR-001",
    tag: "Office",
    fullName: "Alex Morgan (Tech Labs)",
    phone: "+91 98765 99887",
    street: "Level 4, Cyber Towers, Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    zip: "560066",
    country: "India",
    isDefault: false,
  },
];

export function AuthProvider({ children }) {
  const { showToast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState(DEMO_USERS);
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [recentlyVisited, setRecentlyVisited] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login"); // 'login' | 'register'

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      } else {
        // Initial state: do not automatically log in any user
        setCurrentUser(null);
      }

      const storedAllUsers = localStorage.getItem(AUTH_STORAGE_KEYS.ALL_USERS);
      if (storedAllUsers) {
        setAllUsers(JSON.parse(storedAllUsers));
      } else {
        localStorage.setItem(AUTH_STORAGE_KEYS.ALL_USERS, JSON.stringify(DEMO_USERS));
      }

      const storedAddresses = localStorage.getItem(AUTH_STORAGE_KEYS.ADDRESSES);
      if (storedAddresses) {
        setAddresses(JSON.parse(storedAddresses));
      } else {
        localStorage.setItem(AUTH_STORAGE_KEYS.ADDRESSES, JSON.stringify(INITIAL_ADDRESSES));
      }

      const storedVisited = localStorage.getItem(AUTH_STORAGE_KEYS.RECENTLY_VISITED);
      if (storedVisited) {
        setRecentlyVisited(JSON.parse(storedVisited));
      }
    } catch (e) {
      console.error("Auth hydration error:", e);
    }
  }, []);

  // Login handler
  const login = (email, password) => {
    if (!email || !password) {
      showToast("Please enter email and password", "error");
      return false;
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = allUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    if (!existing) {
      showToast("No account found with this email. Please register first.", "error");
      return false;
    }

    if (existing.password && existing.password !== password) {
      showToast("Incorrect password. Please try again.", "error");
      return false;
    }

    const userToSet = existing;
    setCurrentUser(userToSet);
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(userToSet));
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${userToSet.name}!`, "success");
    return true;
  };

  // 1-Click Demo Login
  const loginAsDemo = (userRole = "customer") => {
    let target = DEMO_USERS[0]; // Alex Morgan
    if (userRole === "admin") {
      target = DEMO_USERS[2]; // Charvi Prasad
    } else if (userRole === "vip") {
      target = DEMO_USERS[1]; // Priya Sharma
    }

    setCurrentUser(target);
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(target));
    setIsAuthModalOpen(false);
    showToast(`Signed in as ${target.name} (${target.role.toUpperCase()})`, "success");
    return target;
  };

  // Register handler
  const register = ({ name, email, password, phone }) => {
    if (!name || !email || !password) {
      showToast("Please provide name, email and password", "error");
      return false;
    }

    const cleanEmail = email.trim().toLowerCase();
    const exists = allUsers.some((u) => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      showToast("An account with this email already exists", "error");
      return false;
    }

    const newUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      email: cleanEmail,
      password,
      role: "customer",
      phone: phone || "+91 98000 00000",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200",
      bio: "Fresh book enthusiast exploring curated titles.",
      joinedDate: "Today",
      membership: "New Member",
    };

    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    localStorage.setItem(AUTH_STORAGE_KEYS.ALL_USERS, JSON.stringify(updatedUsers));

    setCurrentUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    showToast(`Account registered successfully! Welcome, ${newUser.name}.`, "success");
    return true;
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    showToast("Signed out of your account", "info");
  };

  // Update profile info
  const updateProfile = (updates) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(updatedUser));

    const updatedList = allUsers.map((u) => (u.id === updatedUser.id ? { ...u, ...updates } : u));
    setAllUsers(updatedList);
    localStorage.setItem(AUTH_STORAGE_KEYS.ALL_USERS, JSON.stringify(updatedList));

    showToast("Profile information updated successfully!", "success");
  };

  // Add address
  const addAddress = (addr) => {
    const newAddr = {
      ...addr,
      id: `ADDR-${Date.now().toString().slice(-4)}`,
      userId: currentUser?.id || "GUEST",
    };

    let updated = [newAddr, ...addresses];
    if (newAddr.isDefault) {
      updated = updated.map((a) => ({
        ...a,
        isDefault: a.id === newAddr.id,
      }));
    }

    setAddresses(updated);
    localStorage.setItem(AUTH_STORAGE_KEYS.ADDRESSES, JSON.stringify(updated));
    showToast("New delivery address saved!", "success");
  };

  // Remove address
  const deleteAddress = (addressId) => {
    const updated = addresses.filter((a) => a.id !== addressId);
    setAddresses(updated);
    localStorage.setItem(AUTH_STORAGE_KEYS.ADDRESSES, JSON.stringify(updated));
    showToast("Address deleted", "info");
  };

  // Set default address
  const setDefaultAddress = (addressId) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === addressId,
    }));
    setAddresses(updated);
    localStorage.setItem(AUTH_STORAGE_KEYS.ADDRESSES, JSON.stringify(updated));
    showToast("Default shipping address updated", "success");
  };

  // Track recently visited book
  const trackRecentlyVisited = (book) => {
    if (!book || !book.id) return;
    setRecentlyVisited((prev) => {
      const filtered = prev.filter((b) => b.id !== book.id);
      const updated = [
        {
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price,
          coverImage: book.coverImage,
          category: book.category,
          rating: book.rating,
          visitedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        ...filtered,
      ].slice(0, 10);

      localStorage.setItem(AUTH_STORAGE_KEYS.RECENTLY_VISITED, JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentlyVisited = () => {
    setRecentlyVisited([]);
    localStorage.removeItem(AUTH_STORAGE_KEYS.RECENTLY_VISITED);
    showToast("Browsing history cleared", "info");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === "admin",
        allUsers,
        addresses: addresses.filter((a) => a.userId === currentUser?.id || a.userId === "USR-001"),
        allAddresses: addresses,
        recentlyVisited,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        login,
        loginAsDemo,
        register,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        trackRecentlyVisited,
        clearRecentlyVisited,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

