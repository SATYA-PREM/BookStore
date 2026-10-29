import React from "react";
import { Link } from "@/components/common/RouterAdapter";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BookCard from "@/components/storefront/BookCard";
import QuickViewModal from "@/components/storefront/QuickViewModal";
import { useBookStore } from "@/context/BookStoreContext";
import { Heart, ShoppingBag } from "lucide-react";
import styles from "./wishlist.module.css";

export default function WishlistPage() {
  const { wishlist, addToCart } = useBookStore();

  const handleMoveAllToCart = () => {
    wishlist.forEach((book) => addToCart(book, 1));
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              My Saved Wishlist
            </h1>
            <p className={styles.subtitle}>
              You have <span style={{ fontWeight: 700, color: "#111827" }}>{wishlist.length} book(s)</span> saved for later reading.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={handleMoveAllToCart}
              className={styles.addAllBtn}
            >
              <ShoppingBag style={{ width: 16, height: 16 }} />
              <span>Add All to Cart</span>
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className={styles.emptyCard}>
            <div className={styles.emptyIconBox}>
              <Heart style={{ width: 32, height: 32, fill: "currentColor" }} />
            </div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Your Wishlist is Empty
            </h3>
            <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "1.5rem" }}>
              Click the heart icon on any book in our catalog to save it here for later.
            </p>
            <Link
              href="/books"
              style={{ display: "inline-block", padding: "0.75rem 1.5rem", backgroundColor: "#0f172a", color: "#ffffff", borderRadius: 12, fontWeight: 700, fontSize: "0.75rem" }}
            >
              Explore Books Now →
            </Link>
          </div>
        ) : (
          <div className={styles.wishlistGrid}>
            {wishlist.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <QuickViewModal />
    </div>
  );
}
