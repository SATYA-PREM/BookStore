import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import CommandPalette from "@/components/ui/CommandPalette";
import AuthModal from "@/components/auth/AuthModal";
import ScrollToTop from "@/components/common/ScrollToTop";

// Pages
import HomePage from "@/app/page";
import BookDetailsPage from "@/app/book/[id]/page";
import BooksCatalogPage from "@/app/books/page";
import CartPage from "@/app/cart/page";
import CheckoutPage from "@/app/checkout/page";
import OrdersPage from "@/app/orders/page";
import SuccessPage from "@/app/success/page";
import WishlistPage from "@/app/wishlist/page";
import ProfilePage from "@/app/profile/page";

// Seller Layout and Pages
import SellerLayout from "@/app/seller/layout";
import SellerDashboardPage from "@/app/seller/page";
import SellerAnalyticsPage from "@/app/seller/analytics/page";
import SellerBooksPage from "@/app/seller/books/page";
import SellerCouponsPage from "@/app/seller/coupons/page";
import SellerCustomersPage from "@/app/seller/customers/page";
import SellerInventoryPage from "@/app/seller/inventory/page";
import SellerOrdersPage from "@/app/seller/orders/page";
import SellerPaymentsPage from "@/app/seller/payments/page";
import SellerReviewsPage from "@/app/seller/reviews/page";
import SellerSettingsPage from "@/app/seller/settings/page";

function SellerWrapper() {
  return (
    <SellerLayout>
      <Outlet />
    </SellerLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="antialiased min-h-screen bg-[#FDFBF7] text-gray-900 flex flex-col selection:bg-amber-500 selection:text-white transition-colors duration-300">
        <Routes>
          {/* Storefront Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksCatalogPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/success" element={<SuccessPage />} />

          {/* Seller Dashboard Routes */}
          <Route path="/seller" element={<SellerWrapper />}>
            <Route index element={<SellerDashboardPage />} />
            <Route path="analytics" element={<SellerAnalyticsPage />} />
            <Route path="books" element={<SellerBooksPage />} />
            <Route path="coupons" element={<SellerCouponsPage />} />
            <Route path="customers" element={<SellerCustomersPage />} />
            <Route path="inventory" element={<SellerInventoryPage />} />
            <Route path="orders" element={<SellerOrdersPage />} />
            <Route path="payments" element={<SellerPaymentsPage />} />
            <Route path="reviews" element={<SellerReviewsPage />} />
            <Route path="settings" element={<SellerSettingsPage />} />
          </Route>
        </Routes>
        
        <CommandPalette />
        <AuthModal />
      </div>
    </BrowserRouter>
  );
}
