import React from "react";
import { Link } from "@/components/common/RouterAdapter";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";
import styles from "./BookCard.module.css";

export default function BookCard({ book }) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewBook } = useBookStore();
  const wishlisted = isInWishlist(book.id);

  const discountPercent = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  return (
    <div className={styles.card}>
      {/* Top Image Container */}
      <div className={styles.imageWrapper}>
        <img
          src={book.coverImage}
          alt={book.title}
          className={styles.coverImage}
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(book);
          }}
          className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlistBtnActive : ""}`}
          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart style={{ width: 16, height: 16, fill: wishlisted ? "currentColor" : "none" }} />
        </button>

        {/* Badges */}
        <div className={styles.badgesContainer}>
          {book.badge && (
            <span className={styles.badge}>
              {book.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className={styles.discountBadge}>
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick View Overlay */}
        <div className={styles.quickViewOverlay}>
          <button
            onClick={() => setQuickViewBook(book)}
            className={styles.quickViewBtn}
          >
            <Eye style={{ width: 14, height: 14, color: "#d97706" }} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Book Meta Content */}
      <div className={styles.content}>
        <div>
          <div className={styles.category}>
            {book.category}
          </div>

          <Link href={`/book/${book.id}`} style={{ display: "block" }}>
            <h3 className={styles.title}>
              {book.title}
            </h3>
          </Link>

          <p className={styles.author}>by {book.author}</p>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <div className={styles.ratingValue}>
              <Star style={{ width: 14, height: 14, fill: "#fbbf24", stroke: "#fbbf24", marginRight: 4 }} />
              <span>{book.rating}</span>
            </div>
            <span className={styles.reviewsCount}>({book.reviewsCount})</span>
            {book.stock <= 5 && book.stock > 0 && (
              <span className={styles.stockAlert}>
                Only {book.stock} left
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className={styles.footer}>
          <div className={styles.priceWrapper}>
            <span className={styles.currentPrice}>
              ₹{book.price}
            </span>
            {book.originalPrice && book.originalPrice > book.price && (
              <span className={styles.originalPrice}>
                ₹{book.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(book, 1)}
            disabled={book.stock === 0}
            className={styles.addBtn}
          >
            <ShoppingBag style={{ width: 14, height: 14 }} />
            <span>{book.stock === 0 ? "Out of Stock" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
