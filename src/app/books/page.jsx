import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "@/components/common/RouterAdapter";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BookCard from "@/components/storefront/BookCard";
import QuickViewModal from "@/components/storefront/QuickViewModal";
import { useBookStore } from "@/context/BookStoreContext";
import { Search, Filter, RotateCcw } from "lucide-react";
import styles from "./books.module.css";

export default function BooksCatalogPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }} />}>
      <BooksCatalogContent />
    </Suspense>
  );
}

function BooksCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const { books, categories } = useBookStore();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            book.title.toLowerCase().includes(q) ||
            book.author.toLowerCase().includes(q) ||
            book.category.toLowerCase().includes(q) ||
            (book.isbn && book.isbn.includes(q));
          if (!match) return false;
        }

        if (selectedCategory !== "all" && book.category !== selectedCategory) {
          return false;
        }

        if (priceRange === "under300" && book.price >= 300) return false;
        if (priceRange === "300-500" && (book.price < 300 || book.price > 500)) return false;
        if (priceRange === "above500" && book.price <= 500) return false;

        if (minRating > 0 && book.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "newest") return new Date(b.publicationDate || "2020") - new Date(a.publicationDate || "2020");
        return (b.sales || 0) - (a.sales || 0);
      });
  }, [books, searchQuery, selectedCategory, priceRange, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setPriceRange("all");
    setMinRating(0);
    setSortBy("popular");
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.container}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Books Catalog ({filteredBooks.length})
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Explore handpicked titles across diverse genres, filters, and formats.
          </p>
        </div>

        <div className={styles.catalogLayout}>
          {/* Left Column: Filters Sidebar */}
          <aside className={styles.sidebarFilter}>
            <div className={styles.filterHeading}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Filter style={{ width: 16, height: 16, color: "#d97706" }} />
                <span>Filters</span>
              </div>
              <button onClick={handleResetFilters} className={styles.resetBtn}>
                <RotateCcw style={{ width: 12, height: 12 }} />
                <span>Reset</span>
              </button>
            </div>

            {/* Categories */}
            <div>
              <div className={styles.filterGroupTitle}>Categories</div>
              <div className={styles.categoryList}>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`${styles.catBtn} ${selectedCategory === "all" ? styles.catBtnActive : ""}`}
                >
                  <span>All Categories</span>
                  <span>{books.length}</span>
                </button>
                {categories.map((cat) => {
                  const count = books.filter((b) => b.category === cat.name).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`${styles.catBtn} ${selectedCategory === cat.name ? styles.catBtnActive : ""}`}
                    >
                      <span>{cat.name}</span>
                      <span>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Ranges */}
            <div>
              <div className={styles.filterGroupTitle}>Price</div>
              <div className={styles.categoryList}>
                {[
                  { id: "all", label: "All Prices" },
                  { id: "under300", label: "Under ₹300" },
                  { id: "300-500", label: "₹300 – ₹500" },
                  { id: "above500", label: "₹500 & Above" }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriceRange(p.id)}
                    className={`${styles.catBtn} ${priceRange === p.id ? styles.catBtnActive : ""}`}
                  >
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Column: Catalog Grid */}
          <div className={styles.mainCatalog}>
            <div className={styles.topBar}>
              <div className={styles.searchInputWrapper}>
                <Search style={{ position: "absolute", left: 10, top: 10, width: 16, height: 16, color: "#94a3b8" }} />
                <input
                  type="text"
                  placeholder="Search titles, authors, ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.875rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {filteredBooks.length > 0 ? (
              <div className={styles.booksGrid}>
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  No matching books found
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                  Try adjusting your search criteria or clearing selected filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#0f172a", color: "#ffffff", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 700 }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <QuickViewModal />
    </div>
  );
}
