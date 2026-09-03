"use client";

import React, { useState } from "react";
import SellerSidebar from "@/components/seller/SellerSidebar";
import SellerHeader from "@/components/seller/SellerHeader";
import AddBookModal from "@/components/seller/AddBookModal";

export default function SellerLayout({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
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

