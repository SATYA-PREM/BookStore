import "@/styles/globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { BookStoreProvider } from "@/context/BookStoreContext";
import CommandPalette from "@/components/ui/CommandPalette";

export const metadata = {
  title: "BookFlow — SaaS Platform for Book Commerce & Management",
  description: "Complete frontend-only bookstore storefront & seller management dashboard with live simulation and persistent state.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#FDFBF7] text-gray-900 flex flex-col selection:bg-amber-500 selection:text-white">
        <ToastProvider>
          <BookStoreProvider>
            {children}
            <CommandPalette />
          </BookStoreProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

