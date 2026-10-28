import "@/styles/globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { BookStoreProvider } from "@/context/BookStoreContext";
import { ThemeProvider } from "@/context/ThemeContext";
import CommandPalette from "@/components/ui/CommandPalette";

export const metadata = {
  title: "BookFlow — SaaS Platform for Book Commerce & Management",
  description: "Complete frontend-only bookstore storefront & seller management dashboard with live simulation and persistent state.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[#FDFBF7] dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 flex flex-col selection:bg-amber-500 selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            <BookStoreProvider>
              {children}
              <CommandPalette />
            </BookStoreProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
