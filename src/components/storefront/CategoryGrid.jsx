"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, Briefcase, Cpu, GraduationCap, UserCheck, ArrowRight } from "lucide-react";
import { useBookStore } from "@/context/BookStoreContext";

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
    <section className="py-16 bg-[#FDFBF7] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Curated Genres
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
              Explore by Category
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-xl">
              Browse our diverse literary universe organized across non-fiction, personal growth, technology, and classical fiction.
            </p>
          </div>
          <Link
            href="/books"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors"
          >
            <span>View all genres</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || BookOpen;
            const actualCount = books.filter((b) => b.category === cat.name).length;

            return (
              <Link
                key={cat.id}
                href={`/books?category=${encodeURIComponent(cat.name)}`}
                className="group p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${cat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-amber-700 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-gray-500 mt-1">
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

