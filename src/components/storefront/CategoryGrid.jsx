import React from "react";
import { Link } from "@/components/common/RouterAdapter";
import { BookOpen, Sparkles, Briefcase, Cpu, GraduationCap, UserCheck, ArrowRight } from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";
import styles from "./CategoryGrid.module.css";

const ICON_MAP = {
  BookOpen: BookOpen,
  Sparkles: Sparkles,
  Briefcase: Briefcase,
  Cpu: Cpu,
  GraduationCap: GraduationCap,
  UserCheck: UserCheck
};

export default function CategoryGrid() {
  const { categories, books } = useBookStore();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>
              Curated Genres
            </span>
            <h2 className={styles.title}>
              Explore by Category
            </h2>
            <p className={styles.description}>
              Browse our diverse literary universe organized across non-fiction, personal growth, technology, and classical fiction.
            </p>
          </div>
          <Link
            href="/books"
            className={styles.viewAllLink}
          >
            <span>View all genres</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>

        <div className={styles.grid}>
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || BookOpen;
            const actualCount = books.filter((b) => b.category === cat.name).length;

            return (
              <Link
                key={cat.id}
                href={`/books?category=${encodeURIComponent(cat.name)}`}
                className={styles.itemCard}
              >
                <div
                  className={styles.iconBox}
                  style={{
                    backgroundColor: cat.color ? undefined : "#fef3c7",
                    color: cat.color ? undefined : "#b45309"
                  }}
                >
                  <Icon style={{ width: 24, height: 24 }} />
                </div>
                <h3 className={styles.catName}>
                  {cat.name}
                </h3>
                <span className={styles.catCount}>
                  {actualCount || cat.count} Titles
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
