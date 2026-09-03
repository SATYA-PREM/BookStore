"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useBookStore } from "@/context/BookStoreContext";

const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#8B5CF6"];

export default function CategoryDonut() {
  const { categories, books } = useBookStore();

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
    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Distribution
        </span>
        <h3 className="font-serif font-bold text-xl text-white mt-0.5">
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
                backgroundColor: "#0F172A",
                borderColor: "#334155",
                borderRadius: "12px",
                color: "#F8FAFC",
                fontSize: "12px"
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
            <span className="text-slate-300 truncate">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

