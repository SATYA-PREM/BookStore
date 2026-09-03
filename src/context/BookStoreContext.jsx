"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  INITIAL_BOOKS,
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_TRANSACTIONS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  STORE_SETTINGS
} from "@/lib/initialData";
import { useToast } from "./ToastContext";

const BookStoreContext = createContext(null);

const STORAGE_KEYS = {
  BOOKS: "bookflow_books",
  CATEGORIES: "bookflow_categories",
  COUPONS: "bookflow_coupons",
  ORDERS: "bookflow_orders",
  CUSTOMERS: "bookflow_customers",
  TRANSACTIONS: "bookflow_transactions",
  REVIEWS: "bookflow_reviews",
  NOTIFICATIONS: "bookflow_notifications",
  SETTINGS: "bookflow_settings",
  CART: "bookflow_cart",
  WISHLIST: "bookflow_wishlist",
  APPLIED_COUPON: "bookflow_applied_coupon"
};

export function BookStoreProvider({ children }) {
  const { showToast } = useToast();
  const [isHydrated, setIsHydrated] = useState(false);

  // Core State
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [settings, setSettings] = useState(STORE_SETTINGS);

  // Customer Shopping State
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Quick View Modal
  const [quickViewBook, setQuickViewBook] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedBooks = localStorage.getItem(STORAGE_KEYS.BOOKS);
      if (storedBooks) setBooks(JSON.parse(storedBooks));

      const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (storedCategories) setCategories(JSON.parse(storedCategories));

      const storedCoupons = localStorage.getItem(STORAGE_KEYS.COUPONS);
      if (storedCoupons) setCoupons(JSON.parse(storedCoupons));

      const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedCustomers = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      if (storedCustomers) setCustomers(JSON.parse(storedCustomers));

      const storedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (storedTransactions) setTransactions(JSON.parse(storedTransactions));

      const storedReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (storedReviews) setReviews(JSON.parse(storedReviews));

      const storedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (storedNotifs) setNotifications(JSON.parse(storedNotifs));

      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) setSettings(JSON.parse(storedSettings));

      const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedCoupon = localStorage.getItem(STORAGE_KEYS.APPLIED_COUPON);
      if (storedCoupon) setAppliedCoupon(JSON.parse(storedCoupon));
    } catch (err) {
      console.error("Failed to load initial data from localStorage:", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save changes to localStorage
  const saveStorage = useCallback((key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error(`Failed to save ${key} to localStorage:`, err);
    }
  }, []);

  // Sync state helpers
  const updateBooksState = useCallback((newBooks) => {
    setBooks(newBooks);
    saveStorage(STORAGE_KEYS.BOOKS, newBooks);
  }, [saveStorage]);

  const updateOrdersState = useCallback((newOrders) => {
    setOrders(newOrders);
    saveStorage(STORAGE_KEYS.ORDERS, newOrders);
  }, [saveStorage]);

  const updateCustomersState = useCallback((newCustomers) => {
    setCustomers(newCustomers);
    saveStorage(STORAGE_KEYS.CUSTOMERS, newCustomers);
  }, [saveStorage]);

  const updateTransactionsState = useCallback((newTransactions) => {
    setTransactions(newTransactions);
    saveStorage(STORAGE_KEYS.TRANSACTIONS, newTransactions);
  }, [saveStorage]);

  const updateCouponsState = useCallback((newCoupons) => {
    setCoupons(newCoupons);
    saveStorage(STORAGE_KEYS.COUPONS, newCoupons);
  }, [saveStorage]);

  const updateNotificationsState = useCallback((newNotifs) => {
    setNotifications(newNotifs);
    saveStorage(STORAGE_KEYS.NOTIFICATIONS, newNotifs);
  }, [saveStorage]);

  const updateCartState = useCallback((newCart) => {
    setCart(newCart);
    saveStorage(STORAGE_KEYS.CART, newCart);
  }, [saveStorage]);

  const updateWishlistState = useCallback((newWishlist) => {
    setWishlist(newWishlist);
    saveStorage(STORAGE_KEYS.WISHLIST, newWishlist);
  }, [saveStorage]);

  // Cart Operations
  const addToCart = useCallback((book, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === book.id);
      let updated;
      if (existing) {
        updated = prevCart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, book.stock) }
            : item
        );
      } else {
        updated = [...prevCart, { ...book, quantity: Math.min(quantity, book.stock) }];
      }
      saveStorage(STORAGE_KEYS.CART, updated);
      return updated;
    });
    showToast(`Added "${book.title}" to your cart!`, "success");
  }, [saveStorage, showToast]);

  const updateCartQuantity = useCallback((bookId, quantity) => {
    setCart((prevCart) => {
      let updated;
      if (quantity <= 0) {
        updated = prevCart.filter((item) => item.id !== bookId);
      } else {
        const book = books.find((b) => b.id === bookId);
        const maxStock = book ? book.stock : 99;
        updated = prevCart.map((item) =>
          item.id === bookId
            ? { ...item, quantity: Math.min(quantity, maxStock) }
            : item
        );
      }
      saveStorage(STORAGE_KEYS.CART, updated);
      return updated;
    });
  }, [books, saveStorage]);

  const removeFromCart = useCallback((bookId) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((item) => item.id !== bookId);
      saveStorage(STORAGE_KEYS.CART, updated);
      return updated;
    });
    showToast("Item removed from cart", "info");
  }, [saveStorage, showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon(null);
    saveStorage(STORAGE_KEYS.CART, []);
    saveStorage(STORAGE_KEYS.APPLIED_COUPON, null);
  }, [saveStorage]);

  // Wishlist Operations
  const toggleWishlist = useCallback((book) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === book.id);
      let updated;
      if (exists) {
        updated = prev.filter((item) => item.id !== book.id);
        showToast(`Removed "${book.title}" from wishlist`, "info");
      } else {
        updated = [...prev, book];
        showToast(`Added "${book.title}" to wishlist!`, "success");
      }
      saveStorage(STORAGE_KEYS.WISHLIST, updated);
      return updated;
    });
  }, [saveStorage, showToast]);

  const isInWishlist = useCallback((bookId) => {
    return wishlist.some((item) => item.id === bookId);
  }, [wishlist]);

  // Coupon Logic
  const applyCoupon = useCallback((code) => {
    const found = coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.status === "active"
    );
    if (!found) {
      showToast("Invalid or expired coupon code", "error");
      return { success: false, message: "Invalid or expired coupon code" };
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (subtotal < found.minOrder) {
      const msg = `Minimum order amount of ₹${found.minOrder} required for this coupon`;
      showToast(msg, "warning");
      return { success: false, message: msg };
    }

    setAppliedCoupon(found);
    saveStorage(STORAGE_KEYS.APPLIED_COUPON, found);
    showToast(`Coupon "${found.code}" applied successfully!`, "success");
    return { success: true, coupon: found };
  }, [coupons, cart, saveStorage, showToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    saveStorage(STORAGE_KEYS.APPLIED_COUPON, null);
    showToast("Coupon removed", "info");
  }, [saveStorage, showToast]);

  // Dynamic Cart Financials
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      cartDiscount = Math.min(
        Math.round((cartSubtotal * appliedCoupon.discountValue) / 100),
        appliedCoupon.maxDiscount
      );
    } else {
      cartDiscount = Math.min(appliedCoupon.discountValue, appliedCoupon.maxDiscount);
    }
  }

  const cartShipping = cartSubtotal >= settings.freeShippingThreshold || cartSubtotal === 0 ? 0 : settings.shippingFee;
  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const cartTax = Math.round((taxableAmount * settings.taxRate) / 100);
  const cartTotal = cartSubtotal > 0 ? taxableAmount + cartShipping + cartTax : 0;

  // Interconnected Place Order Flow (Customer Action -> Updates Seller Dashboard)
  const placeOrder = useCallback(async ({ customer, paymentResult }) => {
    const newOrderId = `BF-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();

    const orderItems = cart.map((item) => ({
      bookId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      coverImage: item.coverImage
    }));

    const newOrder = {
      id: newOrderId,
      customerId: customer.id || `CUS-${Date.now().toString().slice(-4)}`,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      address: {
        street: customer.address,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
        country: "India"
      },
      items: orderItems,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      tax: cartTax,
      total: cartTotal,
      paymentMethod: paymentResult.method || "Demo Payment",
      paymentStatus: "paid",
      orderStatus: "processing",
      transactionId: paymentResult.transactionId,
      createdAt: now.toISOString(),
      estimatedDelivery: "Sep 08 - Sep 10, 2026",
      timeline: [
        { status: "Order Placed", date: "Just now", completed: true },
        { status: "Payment Confirmed", date: "Just now", completed: true },
        { status: "Order Packed", date: "In Progress", completed: false },
        { status: "Shipped", date: "Pending", completed: false },
        { status: "Out for Delivery", date: "Pending", completed: false },
        { status: "Delivered", date: "Pending", completed: false }
      ]
    };

    // 1. Decrement Stock & Increment Sales in Books Catalog
    const updatedBooks = books.map((b) => {
      const purchased = cart.find((item) => item.id === b.id);
      if (purchased) {
        return {
          ...b,
          stock: Math.max(0, b.stock - purchased.quantity),
          sales: (b.sales || 0) + purchased.quantity
        };
      }
      return b;
    });
    updateBooksState(updatedBooks);

    // 2. Add Transaction
    const newTransaction = {
      id: paymentResult.transactionId,
      orderId: newOrderId,
      customerName: customer.name,
      amount: cartTotal,
      method: paymentResult.method || "Demo Gateway",
      status: "successful",
      date: now.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
    };
    const updatedTransactions = [newTransaction, ...transactions];
    updateTransactionsState(updatedTransactions);

    // 3. Update or Add Customer Record
    const existingCustIndex = customers.findIndex(
      (c) => c.email.toLowerCase() === customer.email.toLowerCase()
    );
    let updatedCustomers = [...customers];
    if (existingCustIndex >= 0) {
      updatedCustomers[existingCustIndex] = {
        ...updatedCustomers[existingCustIndex],
        ordersCount: updatedCustomers[existingCustIndex].ordersCount + 1,
        totalSpent: updatedCustomers[existingCustIndex].totalSpent + cartTotal,
        lastOrderDate: now.toISOString().split("T")[0]
      };
    } else {
      updatedCustomers = [
        {
          id: newOrder.customerId,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          city: customer.city,
          ordersCount: 1,
          totalSpent: cartTotal,
          lastOrderDate: now.toISOString().split("T")[0],
          status: "active"
        },
        ...updatedCustomers
      ];
    }
    updateCustomersState(updatedCustomers);

    // 4. Record Seller Notification
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title: "New Order Received",
      message: `Order #${newOrderId} received from ${customer.name} for ₹${cartTotal.toLocaleString("en-IN")}.`,
      type: "order",
      time: "Just now",
      read: false
    };
    updateNotificationsState([newNotif, ...notifications]);

    // 5. Update Orders List
    const updatedOrders = [newOrder, ...orders];
    updateOrdersState(updatedOrders);

    // 6. Update Coupon Usage if applied
    if (appliedCoupon) {
      const updatedCoupons = coupons.map((c) =>
        c.id === appliedCoupon.id ? { ...c, usedCount: c.usedCount + 1 } : c
      );
      updateCouponsState(updatedCoupons);
    }

    // 7. Clear Cart & Coupon
    clearCart();

    showToast(`Order #${newOrderId} confirmed successfully!`, "success");
    return newOrder;
  }, [
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    books,
    transactions,
    customers,
    notifications,
    orders,
    coupons,
    appliedCoupon,
    updateBooksState,
    updateTransactionsState,
    updateCustomersState,
    updateNotificationsState,
    updateOrdersState,
    updateCouponsState,
    clearCart,
    showToast
  ]);

  // Seller Dashboard Actions
  const updateOrderStatus = useCallback((orderId, newStatus) => {
    const updatedOrders = orders.map((ord) => {
      if (ord.id === orderId) {
        const statusMap = ["processing", "confirmed", "packed", "shipped", "out_for_delivery", "delivered"];
        const currentIndex = statusMap.indexOf(newStatus.toLowerCase());

        const updatedTimeline = ord.timeline.map((step, idx) => {
          if (idx <= currentIndex + 1) {
            return {
              ...step,
              completed: true,
              date: step.completed ? step.date : "Just now"
            };
          }
          return { ...step, completed: false };
        });

        return {
          ...ord,
          orderStatus: newStatus.toLowerCase(),
          timeline: updatedTimeline
        };
      }
      return ord;
    });

    updateOrdersState(updatedOrders);
    showToast(`Order #${orderId} status updated to ${newStatus.toUpperCase()}`, "success");
  }, [orders, updateOrdersState, showToast]);

  const addNewBook = useCallback((newBookData) => {
    const newBook = {
      ...newBookData,
      id: `BK${String(books.length + 1).padStart(3, "0")}`,
      rating: 5.0,
      reviewsCount: 0,
      sales: 0,
      status: newBookData.status || "published",
      lowStockThreshold: Number(newBookData.lowStockThreshold) || 10,
      price: Number(newBookData.price),
      originalPrice: Number(newBookData.originalPrice || newBookData.price),
      stock: Number(newBookData.stock)
    };

    const updated = [newBook, ...books];
    updateBooksState(updated);
    showToast(`Book "${newBook.title}" added to catalog!`, "success");
    return newBook;
  }, [books, updateBooksState, showToast]);

  const updateBook = useCallback((bookId, updatedFields) => {
    const updated = books.map((b) => (b.id === bookId ? { ...b, ...updatedFields } : b));
    updateBooksState(updated);
    showToast("Book updated successfully", "success");
  }, [books, updateBooksState, showToast]);

  const deleteBook = useCallback((bookId) => {
    const updated = books.filter((b) => b.id !== bookId);
    updateBooksState(updated);
    showToast("Book removed from catalog", "info");
  }, [books, updateBooksState, showToast]);

  const restockBook = useCallback((bookId, addStock) => {
    const updated = books.map((b) =>
      b.id === bookId ? { ...b, stock: b.stock + Number(addStock) } : b
    );
    updateBooksState(updated);
    showToast(`Stock updated (+${addStock})`, "success");
  }, [books, updateBooksState, showToast]);

  const createCoupon = useCallback((couponData) => {
    const newCoupon = {
      ...couponData,
      id: `CPN${String(coupons.length + 1).padStart(3, "0")}`,
      usedCount: 0,
      status: "active"
    };
    const updated = [newCoupon, ...coupons];
    updateCouponsState(updated);
    showToast(`Coupon "${newCoupon.code}" created!`, "success");
  }, [coupons, updateCouponsState, showToast]);

  const toggleCouponStatus = useCallback((couponId) => {
    const updated = coupons.map((c) =>
      c.id === couponId
        ? { ...c, status: c.status === "active" ? "inactive" : "active" }
        : c
    );
    updateCouponsState(updated);
    showToast("Coupon status updated", "info");
  }, [coupons, updateCouponsState, showToast]);

  const updateReviewStatus = useCallback((reviewId, newStatus) => {
    if (newStatus === "deleted") {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } else {
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, status: newStatus } : r))
      );
    }
    showToast(`Review ${newStatus}`, "info");
  }, [showToast]);

  const markNotificationRead = useCallback((notifId) => {
    const updated = notifications.map((n) => (n.id === notifId ? { ...n, read: true } : n));
    updateNotificationsState(updated);
  }, [notifications, updateNotificationsState]);

  const markAllNotificationsRead = useCallback(() => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    updateNotificationsState(updated);
    showToast("All notifications marked as read", "info");
  }, [notifications, updateNotificationsState, showToast]);

  const resetDemoData = useCallback(() => {
    localStorage.clear();
    setBooks(INITIAL_BOOKS);
    setCategories(INITIAL_CATEGORIES);
    setCoupons(INITIAL_COUPONS);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setTransactions(INITIAL_TRANSACTIONS);
    setReviews(INITIAL_REVIEWS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSettings(STORE_SETTINGS);
    setCart([]);
    setWishlist([]);
    setAppliedCoupon(null);
    showToast("Demo data successfully reset to initial state!", "success");
  }, [showToast]);

  // Aggregate SaaS Metrics
  const totalRevenue = orders.reduce((sum, o) => (o.paymentStatus === "paid" ? sum + o.total : sum), 0);
  const totalOrdersCount = orders.length;
  const totalCustomersCount = customers.length;
  const totalBooksCount = books.length;
  const totalStockCount = books.reduce((sum, b) => sum + b.stock, 0);
  const lowStockCount = books.filter((b) => b.stock <= (b.lowStockThreshold || 10) && b.stock > 0).length;
  const outOfStockCount = books.filter((b) => b.stock === 0).length;

  return (
    <BookStoreContext.Provider
      value={{
        isHydrated,
        books,
        categories,
        coupons,
        orders,
        customers,
        transactions,
        reviews,
        notifications,
        settings,
        // Cart & Wishlist
        cart,
        wishlist,
        appliedCoupon,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTax,
        cartTotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        placeOrder,
        // Quick View
        quickViewBook,
        setQuickViewBook,
        // Seller actions
        updateOrderStatus,
        addNewBook,
        updateBook,
        deleteBook,
        restockBook,
        createCoupon,
        toggleCouponStatus,
        updateReviewStatus,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData,
        // Metrics
        totalRevenue,
        totalOrdersCount,
        totalCustomersCount,
        totalBooksCount,
        totalStockCount,
        lowStockCount,
        outOfStockCount
      }}
    >
      {children}
    </BookStoreContext.Provider>
  );
}

export function useBookStore() {
  const context = useContext(BookStoreContext);
  if (!context) {
    throw new Error("useBookStore must be used within BookStoreProvider");
  }
  return context;
}

