import React, { useState, useEffect } from "react";
import { useParams, useRouter, Link } from "@/components/common/RouterAdapter";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BookCard from "@/components/storefront/BookCard";
import QuickViewModal from "@/components/storefront/QuickViewModal";
import SEOHead from "@/components/common/SEOHead";
import { useBookStore } from "@/context/BookStoreContext";
import { useAuth } from "@/context/AuthContext";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import styles from "./bookDetails.module.css";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { books, addToCart, toggleWishlist, isInWishlist, reviews } = useBookStore();
  const { trackRecentlyVisited } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("about");

  const book = books.find((b) => b.id === params.id) || books[0];
  const wishlisted = isInWishlist(book?.id);

  // Track into Recently Visited
  useEffect(() => {
    if (book && book.id) {
      trackRecentlyVisited(book);
    }
  }, [book?.id]);

  if (!book) {
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 700 }}>Book Not Found</h2>
            <Link href="/books" style={{ color: "#d97706", fontWeight: 700 }}>Back to Catalog</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedBooks = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  const bookReviews = reviews.filter((r) => r.bookId === book.id && r.status === "approved");

  const handleBuyNow = () => {
    addToCart(book, quantity);
    router.push("/cart");
  };

  // Book Product Schema for Rich Results
  const productSchema = book ? {
    "@context": "https://schema.org",
    "@type": ["Book", "Product"],
    "name": book.title,
    "image": book.coverImage?.startsWith("http") ? book.coverImage : `https://bookflow-store.com${book.coverImage}`,
    "description": book.description || `Read ${book.title} by ${book.author} at BookFlow.`,
    "isbn": book.isbn,
    "author": {
      "@type": "Person",
      "name": book.author
    },
    "offers": {
      "@type": "Offer",
      "price": book.price,
      "priceCurrency": "INR",
      "availability": book.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": book.rating || "4.8",
      "reviewCount": book.reviewCount || 100
    }
  } : null;

  return (
    <div className={styles.pageWrapper}>
      <SEOHead
        title={`${book.title} by ${book.author} — Buy Online | BookFlow`}
        description={book.description ? book.description.substring(0, 160) : `Buy ${book.title} written by ${book.author} on BookFlow.`}
        image={book.coverImage}
        url={`/book/${book.id}`}
        type="book"
        schema={productSchema}
      />
      <Navbar />

      <main className={styles.container}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/books">Books</Link>
          <span>/</span>
          <Link href={`/books?category=${encodeURIComponent(book.category)}`}>{book.category}</Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{book.title}</span>
        </nav>

        {/* Main Product Showcase */}
        <div className={styles.productCard}>
          {/* Left Column: Image */}
          <div className={styles.galleryCol}>
            <div className={styles.coverFrame}>
              <img
                src={book.coverImage}
                alt={book.title}
                className={styles.coverImg}
              />
              <button
                onClick={() => toggleWishlist(book)}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  padding: 10,
                  borderRadius: 9999,
                  backgroundColor: wishlisted ? "#f43f5e" : "rgba(255, 255, 255, 0.9)",
                  color: wishlisted ? "#ffffff" : "#4b5563",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                <Heart style={{ width: 20, height: 20, fill: wishlisted ? "currentColor" : "none" }} />
              </button>
            </div>

            {/* Badges */}
            <div className={styles.guaranteesGrid}>
              <div className={styles.guaranteeBox}>
                <Truck style={{ width: 16, height: 16, color: "#d97706", marginBottom: 4 }} />
                <span style={{ fontWeight: 700 }}>Fast Delivery</span>
                <span style={{ fontSize: "0.625rem", color: "#94a3b8" }}>2-3 Business Days</span>
              </div>
              <div className={styles.guaranteeBox}>
                <ShieldCheck style={{ width: 16, height: 16, color: "#059669", marginBottom: 4 }} />
                <span style={{ fontWeight: 700 }}>100% Genuine</span>
                <span style={{ fontSize: "0.625rem", color: "#94a3b8" }}>Original Print</span>
              </div>
              <div className={styles.guaranteeBox}>
                <RotateCcw style={{ width: 16, height: 16, color: "#4f46e5", marginBottom: 4 }} />
                <span style={{ fontWeight: 700 }}>Easy Returns</span>
                <span style={{ fontSize: "0.625rem", color: "#94a3b8" }}>7 Days Policy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Book Details */}
          <div className={styles.infoCol}>
            <div>
              <span className={styles.categoryTag}>{book.category}</span>
              <h1 className={styles.bookTitle} style={{ marginTop: "0.5rem" }}>{book.title}</h1>
              <div className={styles.authorMeta}>
                Written by <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{book.author}</span> • Publisher: <span>{book.publisher}</span>
              </div>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: "0.875rem" }}>
                <div style={{ display: "flex", alignItems: "center", color: "#f59e0b", fontWeight: 700 }}>
                  <Star style={{ width: 16, height: 16, fill: "#fbbf24", stroke: "#fbbf24", marginRight: 4 }} />
                  <span>{book.rating}</span>
                </div>
                <span style={{ color: "#cbd5e1" }}>|</span>
                <span style={{ color: "#64748b" }}>{book.reviewsCount} Verified Reviews</span>
                <span style={{ color: "#cbd5e1" }}>|</span>
                <span style={{ color: "#059669", fontWeight: 700, backgroundColor: "#ecfdf5", padding: "2px 8px", borderRadius: 4 }}>
                  {book.sales}+ Sold
                </span>
              </div>

              {/* Price Box */}
              <div className={styles.priceBox} style={{ marginTop: 20 }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Retail Price</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span className={styles.mainPrice}>₹{book.price}</span>
                    {book.originalPrice && (
                      <span style={{ fontSize: "1.125rem", color: "#94a3b8", textDecoration: "line-through" }}>
                        ₹{book.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669", backgroundColor: "#ecfdf5", padding: "4px 10px", borderRadius: 9999 }}>
                    In Stock ({book.stock} left)
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 20, lineHeight: 1.6 }}>
                {book.description}
              </p>

              {/* Action Buttons */}
              <div className={styles.actionsRow}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #d1d5db", borderRadius: 12, backgroundColor: "#f9fafb" }}>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{ padding: "10px 14px", fontWeight: 700, color: "#4b5563" }}
                  >
                    -
                  </button>
                  <span style={{ padding: "10px 12px", fontWeight: 700, minWidth: 40, textAlign: "center" }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(book.stock, q + 1))}
                    style={{ padding: "10px 14px", fontWeight: 700, color: "#4b5563" }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(book, quantity)}
                  disabled={book.stock === 0}
                  style={{
                    flex: 1,
                    padding: "14px 20px",
                    borderRadius: 12,
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    cursor: book.stock === 0 ? "not-allowed" : "pointer"
                  }}
                >
                  <ShoppingBag style={{ width: 16, height: 16, color: "#fbbf24" }} />
                  <span>Add to Cart (₹{book.price * quantity})</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={book.stock === 0}
                  className={styles.buyNowBtn}
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Quick Specs Strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, padding: 14, backgroundColor: "#f9fafb", borderRadius: 16, fontSize: "0.75rem", marginTop: 20 }}>
              <div>
                <span style={{ color: "#94a3b8", display: "block", fontWeight: 700, textTransform: "uppercase", fontSize: "0.625rem" }}>ISBN</span>
                <span style={{ fontWeight: 700 }}>{book.isbn}</span>
              </div>
              <div>
                <span style={{ color: "#94a3b8", display: "block", fontWeight: 700, textTransform: "uppercase", fontSize: "0.625rem" }}>Pages</span>
                <span style={{ fontWeight: 700 }}>{book.pages}</span>
              </div>
              <div>
                <span style={{ color: "#94a3b8", display: "block", fontWeight: 700, textTransform: "uppercase", fontSize: "0.625rem" }}>Format</span>
                <span style={{ fontWeight: 700 }}>{book.format}</span>
              </div>
              <div>
                <span style={{ color: "#94a3b8", display: "block", fontWeight: 700, textTransform: "uppercase", fontSize: "0.625rem" }}>Language</span>
                <span style={{ fontWeight: 700 }}>{book.language}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info */}
        <div className={styles.tabSection}>
          <div style={{ display: "flex", gap: 24, borderBottom: "1px solid #e5e7eb", paddingBottom: 12 }}>
            {["about", "specs", "reviews"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                style={{
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  color: activeTab === t ? "#d97706" : "#64748b",
                  borderBottom: activeTab === t ? "2px solid #d97706" : "none",
                  paddingBottom: 8,
                  textTransform: "capitalize"
                }}
              >
                {t === "about" ? "About the Book" : t === "specs" ? "Publishing Specs" : `Reviews (${bookReviews.length})`}
              </button>
            ))}
          </div>

          <div style={{ paddingTop: 20, fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {activeTab === "about" && <p>{book.about || book.description}</p>}
            {activeTab === "specs" && (
              <div style={{ maxWidth: 500 }}>
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Publication Date:</strong> {book.publicationDate}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                {bookReviews.length > 0 ? (
                  bookReviews.map((rev) => (
                    <div key={rev.id} style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                      <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{rev.customerName}</div>
                      <div style={{ color: "#f59e0b", margin: "4px 0" }}>★ {rev.rating} / 5</div>
                      <p style={{ fontStyle: "italic" }}>"{rev.comment}"</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet for this title.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 700, marginBottom: 20 }}>
              Readers Also Explored
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
              {relatedBooks.map((relBook) => (
                <BookCard key={relBook.id} book={relBook} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <QuickViewModal />
    </div>
  );
}
