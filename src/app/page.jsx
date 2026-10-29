import React, { useState } from "react";
import { Link } from "@/components/common/RouterAdapter";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/storefront/Hero";
import CategoryGrid from "@/components/storefront/CategoryGrid";
import BookCard from "@/components/storefront/BookCard";
import QuickViewModal from "@/components/storefront/QuickViewModal";
import { useBookStore } from "@/context/BookStoreContext";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import styles from "./page.module.css";

export default function StorefrontHome() {
  const { books } = useBookStore();
  const [activeTab, setActiveTab] = useState("all");

  const filterTabs = [
    { id: "all", name: "All Bestsellers" },
    { id: "Self Help", name: "Self Help" },
    { id: "Business", name: "Business & Finance" },
    { id: "Fiction", name: "Fiction" },
    { id: "Technology", name: "Technology" }
  ];

  const filteredBooks = activeTab === "all"
    ? books.slice(0, 8)
    : books.filter((b) => b.category === activeTab).slice(0, 8);

  const featuredBook = books[0] || {};

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Categories Grid */}
        <CategoryGrid />

        {/* 3. Popular Books Catalog Section */}
        <section className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>
                <Sparkles style={{ width: 14, height: 14 }} />
                Handpicked Collection
              </span>
              <h2 className={styles.sectionTitle}>
                Popular Bestsellers
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className={styles.filterPills}>
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${styles.pillBtn} ${activeTab === tab.id ? styles.pillBtnActive : ""}`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Book Cards Grid */}
          <div className={styles.booksGrid}>
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className={styles.viewAllWrapper}>
            <Link
              href="/books"
              className={styles.viewAllBtn}
            >
              <span>Explore All {books.length} Books in Catalog</span>
              <ArrowRight style={{ width: 16, height: 16, color: "#d97706" }} />
            </Link>
          </div>
        </section>

        {/* 4. Deal of the Week Spotlight Banner */}
        {featuredBook.id && (
          <section className={styles.spotlightSection}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1rem" }}>
              <div className={styles.spotlightGrid}>
                <div className={styles.spotlightImgWrapper}>
                  <img
                    src={featuredBook.coverImage}
                    alt={featuredBook.title}
                    className={styles.spotlightCover}
                  />
                </div>

                <div className={styles.spotlightContent}>
                  <div className={styles.spotlightBadge}>
                    ★ Editor's Choice of the Month
                  </div>

                  <h3 className={styles.spotlightTitle}>
                    {featuredBook.title}
                  </h3>

                  <p className={styles.spotlightDesc}>
                    {featuredBook.description}
                  </p>

                  <div className={styles.spotlightBuyRow}>
                    <div className={styles.spotlightPriceGroup}>
                      <span className={styles.spotlightPrice}>
                        ₹{featuredBook.price}
                      </span>
                      {featuredBook.originalPrice && (
                        <span className={styles.spotlightOriginalPrice}>
                          ₹{featuredBook.originalPrice}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/book/${featuredBook.id}`}
                      className={styles.spotlightBtn}
                    >
                      Read Book Summary & Buy →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. Customer Testimonials */}
        <section className={styles.container}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className={styles.eyebrow} style={{ justifyContent: "center" }}>
              Reader Testimonials
            </span>
            <h2 className={styles.sectionTitle}>
              Loved by Bookworms Across the Country
            </h2>
          </div>

          <div className={styles.testimonialsGrid}>
            {[
              {
                quote: "BookFlow has transformed how I buy books. The simulated checkout experience is swift, and the catalog is exceptionally well-curated!",
                name: "Charvi Prasad",
                title: "Software Architect & Reader",
                rating: 5
              },
              {
                quote: "I love the clean order tracking and instant discount coupons. Received my copies of Atomic Habits and Deep Work in pristine condition.",
                name: "Rahul Sharma",
                title: "Product Manager",
                rating: 5
              },
              {
                quote: "The dual experience between bookstore and seller management dashboard makes BookFlow a truly outstanding SaaS concept.",
                name: "Priya Patel",
                title: "Book Club Lead",
                rating: 5
              }
            ].map((t, idx) => (
              <div key={idx} className={styles.testimonialCard}>
                <div style={{ display: "flex", color: "#f59e0b", gap: 4 }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} style={{ width: 16, height: 16, fill: "#fbbf24", stroke: "#fbbf24" }} />
                  ))}
                </div>
                <p className={styles.quoteText}>
                  "{t.quote}"
                </p>
                <div className={styles.authorRow}>
                  <div className={styles.authorAvatar}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorTitle}>{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <QuickViewModal />
    </div>
  );
}
