"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useBookStore } from "@/context/BookStoreContext";
import { useTheme } from "@/context/ThemeContext";

const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#8B5CF6"];

export default function CategoryDonut() {
  const { categories, books } = useBookStore();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = categories.map((cat) => {
    const totalSales = books
      .filter((b) => b.category === cat.name)
      .reduce((sum, b) => sum + (b.sales || 0), 0);
    return {
      name: cat.name,
      value: totalSales || cat.count
    };
  });

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
      <div>
        <span className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">
          Distribution
        </span>
        <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mt-0.5">
          Sales by Category
        </h3>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#0F172A" : "#FFFFFF",
                borderColor: isDark ? "#1E293B" : "#E2E8F0",
                borderRadius: "12px",
                color: isDark ? "#FFFFFF" : "#0F172A",
                fontSize: "12px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {data.slice(0, 4).map((d, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS[idx % COLORS.length] }}
            />
            <span className="text-gray-700 dark:text-slate-300 font-medium truncate">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
