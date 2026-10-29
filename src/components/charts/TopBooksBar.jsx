
import React from "react";
import { useBookStore } from "@/context/BookStoreContext";

export default function TopBooksBar() {
  const { books } = useBookStore();

  const topBooks = [...books]
    .sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .slice(0, 4);

  const maxSales = Math.max(...topBooks.map((b) => b.sales || 1), 100);

  return (
    <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
      <div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Leaderboard
        </span>
        <h3 className="font-serif font-bold text-xl text-gray-900 mt-0.5">
          Top Selling Books
        </h3>
      </div>

      <div className="space-y-4">
        {topBooks.map((book, idx) => {
          const percent = Math.round(((book.sales || 0) / maxSales) * 100);

          return (
            <div key={book.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="font-mono font-bold text-indigo-600">{idx + 1}.</span>
                  <span className="font-bold text-gray-800 truncate">{book.title}</span>
                </div>
                <span className="font-mono font-bold text-amber-600 flex-shrink-0">
                  {book.sales || 0} sales
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

