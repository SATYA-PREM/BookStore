import React, { useState } from "react";
import { Link, useRouter } from "@/components/common/RouterAdapter";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useAuth } from "@/context/AuthContext";
import { useBookStore } from "@/context/BookStoreContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Package,
  Plus,
  Trash2,
  CheckCircle2,
  LogOut,
  ShieldCheck,
  Edit2,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const {
    currentUser,
    isAuthenticated,
    isAdmin,
    updateProfile,
    addresses,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    recentlyVisited,
    clearRecentlyVisited,
    logout,
    setIsAuthModalOpen,
  } = useAuth();

  const { orders } = useBookStore();

  const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'addresses' | 'orders' | 'history'
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    bio: currentUser?.bio || "",
  });

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    tag: "Home",
    fullName: currentUser?.name || "",
    phone: currentUser?.phone || "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    isDefault: false,
  });

  // Filter addresses belonging to the current user
  const userAddresses = addresses.filter((a) => a.userId === currentUser?.id);

  // Filter orders related to current user
  const userOrders = orders.filter((o) => {
    if (!currentUser) return false;
    return (
      o.customer?.email?.toLowerCase() === currentUser.email?.toLowerCase() ||
      o.customer?.name?.toLowerCase() === currentUser.name?.toLowerCase()
    );
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!addressForm.street || !addressForm.city || !addressForm.zip) {
      alert("Please fill in street, city and ZIP code");
      return;
    }
    addAddress(addressForm);
    setIsAddingAddress(false);
    setAddressForm({
      tag: "Home",
      fullName: currentUser?.name || "",
      phone: currentUser?.phone || "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "India",
      isDefault: false,
    });
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#0B0F19] transition-colors">
        <Navbar />
        <main className="flex-1 max-w-lg mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
            <User className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            Sign In to View Your Profile
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Access your registered profile, saved delivery addresses, order history, and browsing activity.
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            Open Sign In / Demo Window
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* User Banner Header */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">
                  {currentUser.name}
                </h1>
                {isAdmin ? (
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-500 text-[10px] font-bold">
                    STORE ADMIN
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-500 text-[10px] font-bold">
                    {currentUser.membership || "VIP READER"}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-center sm:justify-start gap-4">
                <span>{currentUser.email}</span>
                <span>•</span>
                <span>{currentUser.phone}</span>
              </p>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-2 max-w-md italic">
                "{currentUser.bio || "Avid reader, tech enthusiast & literature lover."}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/seller"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Admin Hub</span>
              </Link>
            )}
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-slate-800 pb-4 mb-8 overflow-x-auto">
          {[
            { id: "profile", label: "Profile Information", icon: User },
            { id: "addresses", label: `Saved Addresses (${addresses.length})`, icon: MapPin },
            { id: "orders", label: `Order History (${userOrders.length})`, icon: Package },
            { id: "history", label: `Recently Visited (${recentlyVisited.length})`, icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  active
                    ? "bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md"
                    : "bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Profile Information */}
        {activeTab === "profile" && (
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm max-w-3xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white">
                  Personal Details
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Manage your personal account profile information.
                </p>
              </div>
              <button
                onClick={() => {
                  setProfileForm({
                    name: currentUser.name,
                    phone: currentUser.phone,
                    bio: currentUser.bio || "",
                  });
                  setIsEditingProfile(!isEditingProfile);
                }}
                className="px-3.5 py-1.5 rounded-xl border border-gray-300 dark:border-slate-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditingProfile ? "Cancel" : "Edit Profile"}</span>
              </button>
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Reader Bio</label>
                  <textarea
                    rows={3}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 space-y-1">
                  <span className="text-gray-400 font-semibold uppercase text-[10px]">Registered Name</span>
                  <div className="font-bold text-gray-900 dark:text-white text-sm">{currentUser.name}</div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 space-y-1">
                  <span className="text-gray-400 font-semibold uppercase text-[10px]">Email Address</span>
                  <div className="font-bold text-gray-900 dark:text-white text-sm">{currentUser.email}</div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 space-y-1">
                  <span className="text-gray-400 font-semibold uppercase text-[10px]">Contact Phone</span>
                  <div className="font-bold text-gray-900 dark:text-white text-sm">{currentUser.phone}</div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 space-y-1">
                  <span className="text-gray-400 font-semibold uppercase text-[10px]">Member Since</span>
                  <div className="font-bold text-gray-900 dark:text-white text-sm">{currentUser.joinedDate || "January 2026"}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Delivery Addresses */}
        {activeTab === "addresses" && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white">
                  Delivery Addresses
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Saved delivery locations for faster checkout experience.
                </p>
              </div>
              <button
                onClick={() => setIsAddingAddress(!isAddingAddress)}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingAddress ? "Cancel" : "Add Address"}</span>
              </button>
            </div>

            {isAddingAddress && (
              <form onSubmit={handleAddressSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">New Delivery Location</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Address Label (Home / Office)</label>
                    <input
                      type="text"
                      required
                      value={addressForm.tag}
                      onChange={(e) => setAddressForm({ ...addressForm, tag: e.target.value })}
                      placeholder="e.g. Home, Work"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="House number, flat, road, landmark"
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">State / Province</label>
                    <input
                      type="text"
                      required
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">ZIP / Postal Code</label>
                    <input
                      type="text"
                      required
                      value={addressForm.zip}
                      onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addressForm.isDefault}
                      onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                      className="rounded border-gray-300 text-amber-500"
                    />
                    <span>Set as primary default shipping address</span>
                  </label>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-bold text-xs"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userAddresses.length === 0 ? (
                <div className="sm:col-span-2 p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800">
                  <MapPin className="w-8 h-8 text-amber-500/50 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">No saved addresses yet</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Add your shipping addresses for rapid checkout.</p>
                </div>
              ) : (
                userAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      addr.isDefault
                        ? "bg-amber-500/5 dark:bg-amber-500/10 border-amber-400 dark:border-amber-500/40 shadow-sm"
                        : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white">
                          {addr.tag}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Default
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="p-1 text-gray-400 hover:text-rose-500 transition-colors"
                        title="Delete address"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs space-y-1 text-gray-600 dark:text-slate-300">
                      <div className="font-bold text-gray-900 dark:text-white">{addr.fullName}</div>
                      <div>{addr.street}</div>
                      <div>
                        {addr.city}, {addr.state} - {addr.zip}
                      </div>
                      <div>Phone: {addr.phone}</div>
                    </div>

                    {!addr.isDefault && (
                      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800">
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
                        >
                          Set as Default Address
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Orders History */}
        {activeTab === "orders" && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white">
                  Order History & Fulfillment
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Track shipment status, view past book purchases, and check receipts.
                </p>
              </div>
              <Link
                href="/orders"
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Open Full Timeline View →
              </Link>
            </div>

            {userOrders.length === 0 ? (
              <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 text-center">
                <Package className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-700 dark:text-slate-300">No Orders Yet</p>
                <Link
                  href="/books"
                  className="mt-3 inline-block px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Browse Books
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {userOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-xs text-gray-900 dark:text-white">
                          #{order.id}
                        </span>
                        <span className="text-xs text-gray-400">• {order.date || "Today"}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 capitalize">
                          {order.orderStatus || "Processing"}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-slate-300">
                        {order.items?.length || 1} Item(s) • Total:{" "}
                        <span className="font-bold text-gray-900 dark:text-white">
                          ₹{order.pricing?.total || 499}
                        </span>
                      </div>
                    </div>

                    <Link
                      href="/orders"
                      className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-bold text-gray-800 dark:text-white hover:border-amber-500 transition-colors"
                    >
                      Track Order
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Recently Visited Books */}
        {activeTab === "history" && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white">
                  Recently Viewed Books
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Titles and bestsellers you've browsed during this session.
                </p>
              </div>
              {recentlyVisited.length > 0 && (
                <button
                  onClick={clearRecentlyVisited}
                  className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors"
                >
                  Clear History
                </button>
              )}
            </div>

            {recentlyVisited.length === 0 ? (
              <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 text-center">
                <Clock className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-700 dark:text-slate-300">No Browsing History</p>
                <p className="text-xs text-gray-500 mt-1">Visit books in the catalog to track them automatically.</p>
                <Link
                  href="/books"
                  className="mt-3 inline-block px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {recentlyVisited.map((book) => (
                  <Link
                    key={book.id}
                    href={`/book/${book.id}`}
                    className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 hover:border-amber-500 transition-all hover:-translate-y-1 flex flex-col group"
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full aspect-[3/4] object-cover rounded-xl mb-2"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase truncate">
                          {book.category}
                        </div>
                        <div className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition-colors">
                          {book.title}
                        </div>
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">
                          by {book.author}
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <span className="font-bold text-gray-900 dark:text-white font-serif">₹{book.price}</span>
                        <span className="text-[10px] text-gray-400">{book.visitedAt}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

