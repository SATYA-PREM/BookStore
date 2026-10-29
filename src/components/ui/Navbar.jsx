import React, { useState, useEffect, useRef } from "react";
import { Link } from "@/components/common/RouterAdapter";
import { usePathname, useRouter } from "@/components/common/RouterAdapter";
import {
  BookOpen,
  ShoppingBag,
  Heart,
  Search,
  LayoutDashboard,
  Menu,
  X,
  User,
  LogOut,
  MapPin,
  Clock,
  Package,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useBookStore } from "@/context/BookStoreContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, wishlist, books } = useBookStore();
  const { currentUser, isAuthenticated, isAdmin, setIsAuthModalOpen, setAuthModalMode, loginAsDemo, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate badge counts
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  // Search logic
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = books
        .filter(
          (b) =>
            b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q)
        )
        .slice(0, 5);
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [searchQuery, books]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      router.push(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    { name: "My Orders", href: "/orders" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 text-gray-900 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-gray-900 font-serif">
                  Book<span className="text-amber-600">Flow</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-300 uppercase tracking-wider">
                  SaaS Store
                </span>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block">Digital Bookstore & Platform</p>
            </div>
          </Link>

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-amber-700 bg-amber-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar with Autocomplete Dropdown */}
          <div className="relative flex-1 max-w-md hidden lg:block">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, author, category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length > 1 && setShowSearchDropdown(true)}
                  className="w-full bg-gray-50 text-sm text-gray-900 pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
            </form>

            {/* Search Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in">
                <div className="p-2 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Matching Books
                </div>
                <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                  {searchResults.map((book) => (
                    <Link
                      key={book.id}
                      href={`/book/${book.id}`}
                      onClick={() => setShowSearchDropdown(false)}
                      className="flex items-center gap-3 p-3 hover:bg-amber-50/60 transition-colors"
                    >
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-8 h-11 object-cover rounded shadow flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">
                          {book.title}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          by {book.author} • <span className="text-amber-700 font-bold">₹{book.price}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/books?search=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setShowSearchDropdown(false)}
                  className="block p-2.5 text-center text-xs font-semibold text-amber-700 bg-amber-50/80 hover:bg-amber-100 transition-colors"
                >
                  View all results for "{searchQuery}" →
                </Link>
              </div>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-fade-in">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-950 transition-all shadow-sm group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-bold hidden md:inline-block text-amber-950">
                Cart
              </span>
            </Link>

            {/* User Profile / Auth Button */}
            {isAuthenticated && currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all text-xs font-semibold"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover border border-amber-500"
                  />
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-gray-900 max-w-[100px] truncate leading-tight font-bold">
                      {currentUser.name}
                    </span>
                    <span className="text-[9px] text-amber-700 font-bold uppercase leading-none">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {/* Account Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-fade-in text-xs">
                    <div className="p-3 border-b border-gray-100 bg-gray-50">
                      <div className="font-bold text-gray-900 truncate">{currentUser.name}</div>
                      <div className="text-[11px] text-gray-500 truncate">{currentUser.email}</div>
                    </div>

                    <div className="p-1.5 space-y-0.5">
                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-amber-50 transition-colors font-medium"
                      >
                        <User className="w-4 h-4 text-amber-600" />
                        <span>My Account & Profile</span>
                      </Link>

                      <Link
                        href="/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-amber-50 transition-colors font-medium"
                      >
                        <Package className="w-4 h-4 text-indigo-600" />
                        <span>My Orders</span>
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-amber-50 transition-colors font-medium"
                      >
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span>Saved Addresses</span>
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-amber-50 transition-colors font-medium"
                      >
                        <Clock className="w-4 h-4 text-rose-600" />
                        <span>Recently Visited</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/seller"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors font-bold"
                        >
                          <ShieldCheck className="w-4 h-4 text-indigo-600" />
                          <span>Seller / Admin Hub</span>
                        </Link>
                      )}
                    </div>

                    <div className="p-1.5 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors font-semibold text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setAuthModalMode("login");
                    setIsAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => {
                    loginAsDemo("admin");
                    router.push("/seller");
                  }}
                  title="1-Click Demo Admin Access"
                  className="hidden sm:flex items-center gap-1 px-2.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Admin</span>
                </button>
              </div>
            )}

            {/* Switch to Seller SaaS Center */}
            <Link
              href="/seller"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs sm:text-sm font-medium shadow-md shadow-indigo-900/30 transition-all hover:scale-[1.02] border border-indigo-400/30"
              title="Switch to Seller Management Center"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-200" />
              <span className="hidden sm:inline">Seller SaaS</span>
              <span className="sm:hidden">SaaS</span>
            </Link>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-4 animate-fade-in shadow-md">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 text-sm text-gray-900 pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </form>

          {isAuthenticated && currentUser ? (
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-xl object-cover border border-amber-500"
                />
                <div>
                  <div className="text-xs font-bold text-gray-900">{currentUser.name}</div>
                  <div className="text-[10px] text-gray-500">{currentUser.email}</div>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold"
              >
                Profile
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              Sign In / Register
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
