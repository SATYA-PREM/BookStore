import React, { useState } from "react";
import { Link } from "@/components/common/RouterAdapter";
import { X, Star, ShoppingBag, Heart, BookOpen } from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";
import styles from "./QuickViewModal.module.css";

export default function QuickViewModal() {
  const { quickViewBook, setQuickViewBook, addToCart, toggleWishlist, isInWishlist } = useBookStore();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewBook) return null;

  const book = quickViewBook;
  const wishlisted = isInWishlist(book.id);

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setQuickViewBook(null);
  };

  return (
    <div className={styles.backdrop}>
      <div className={`${styles.modalWindow} animate-slide-up`}>
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewBook(null)}
          className={styles.closeBtn}
        >
          <X style={{ width: 20, height: 20 }} />
        </button>

        {/* Left Book Cover */}
        <div className={styles.coverSide}>
          <img
            src={book.coverImage}
            alt={book.title}
            className={styles.modalCoverImg}
          />
        </div>

        {/* Right Info */}
        <div className={styles.infoSide}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span className={styles.categoryTag}>
                {book.category}
              </span>
              <span className={styles.isbnTag}>ISBN: {book.isbn}</span>
            </div>

            <h2 className={styles.modalTitle}>
              {book.title}
            </h2>
            <p className={styles.modalAuthor}>by <span className={styles.authorBold}>{book.author}</span></p>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <div className={styles.ratingStars}>
                <Star style={{ width: 16, height: 16, fill: "#fbbf24", stroke: "#fbbf24", marginRight: 4 }} />
                <span>{book.rating}</span>
              </div>
              <span style={{ color: "#94a3b8" }}>•</span>
              <span style={{ color: "#64748b" }}>{book.reviewsCount} Reader Reviews</span>
            </div>

            {/* Pricing */}
            <div className={styles.priceRow}>
              <span className={styles.modalPrice}>₹{book.price}</span>
              {book.originalPrice && (
                <span className={styles.modalOriginalPrice}>₹{book.originalPrice}</span>
              )}
              <span className={styles.stockBadge}>
                In Stock ({book.stock} available)
              </span>
            </div>

            <p className={styles.modalDesc}>
              {book.description}
            </p>
          </div>

          {/* Actions */}
          <div className={styles.actionsContainer}>
            <div className={styles.controlsRow}>
              <div className={styles.qtyBox}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className={styles.qtyBtn}
                >
                  -
                </button>
                <span className={styles.qtyVal}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(book.stock, q + 1))}
                  className={styles.qtyBtn}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={styles.addToCartBtn}
              >
                <ShoppingBag style={{ width: 16, height: 16 }} />
                <span>Add to Cart • ₹{book.price * quantity}</span>
              </button>

              <button
                onClick={() => toggleWishlist(book)}
                className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlistBtnActive : ""}`}
              >
                <Heart style={{ width: 20, height: 20, fill: wishlisted ? "currentColor" : "none" }} />
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4 }}>
              <Link
                href={`/book/${book.id}`}
                onClick={() => setQuickViewBook(null)}
                className={styles.detailsLink}
              >
                <BookOpen style={{ width: 14, height: 14 }} />
                <span>View Complete Book Details & Reviews →</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
