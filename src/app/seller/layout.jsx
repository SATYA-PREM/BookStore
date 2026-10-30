"use client";

import React, { useState } from "react";
import SellerSidebar from "@/components/seller/SellerSidebar";
import SellerHeader from "@/components/seller/SellerHeader";
import AddBookModal from "@/components/seller/AddBookModal";
import AdminLoginPage from "@/components/seller/AdminLoginPage";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function SellerLayout({ children }) {
  const { isAdminAuthenticated, isInitialized } = useAdminAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  // Loading state while checking localStorage
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex items-center justify-center text-gray-500 dark:text-gray-400 font-mono text-xs">
        Checking Admin Permissions...
      </div>
    );
  }

  // If not logged in as Admin, show the Admin Login Screen with 1-click Demo accounts
  if (!isAdminAuthenticated) {
    return <AdminLoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 flex transition-colors">
      {/* Sidebar Navigation */}
      <SellerSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <SellerHeader
          setIsMobileOpen={setIsMobileOpen}
          onOpenAddBook={() => setIsAddBookOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Add Book Modal */}
      <AddBookModal
        isOpen={isAddBookOpen}
        onClose={() => setIsAddBookOpen(false)}
      />
    </div>
  );
}
