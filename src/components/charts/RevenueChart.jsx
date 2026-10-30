"use client";

import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTheme } from "@/context/ThemeContext";

const DATA_TIMEFRAMES = {
  "7D": [
    { name: "Mon", revenue: 8400, orders: 18 },
    { name: "Tue", revenue: 11200, orders: 24 },
    { name: "Wed", revenue: 9800, orders: 21 },
    { name: "Thu", revenue: 14600, orders: 32 },
    { name: "Fri", revenue: 16800, orders: 36 },
    { name: "Sat", revenue: 21400, orders: 48 },
    { name: "Sun", revenue: 18900, orders: 40 }
  ],
  "30D": [
    { name: "Week 1", revenue: 54000, orders: 115 },
    { name: "Week 2", revenue: 68000, orders: 142 },
    { name: "Week 3", revenue: 79000, orders: 168 },
    { name: "Week 4", revenue: 92000, orders: 195 }
  ],
  "6M": [
    { name: "May", revenue: 32000, orders: 68 },
    { name: "Jun", revenue: 45000, orders: 98 },
    { name: "Jul", revenue: 58000, orders: 124 },
    { name: "Aug", revenue: 69000, orders: 152 },
    { name: "Sep", revenue: 84000, orders: 184 },
    { name: "Oct", revenue: 98000, orders: 215 }
  ],
  "1Y": [
    { name: "Q1", revenue: 145000, orders: 310 },
    { name: "Q2", revenue: 198000, orders: 430 },
    { name: "Q3", revenue: 254000, orders: 560 },
    { name: "Q4", revenue: 320000, orders: 710 }
  ]
};

export default function RevenueChart() {
  const [timeframe, setTimeframe] = useState("6M");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const data = DATA_TIMEFRAMES[timeframe];

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">
            Sales Performance
          </span>
          <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mt-0.5">
            Revenue Analytics
          </h3>
        </div>

        {/* Timeframe selector pills */}
        <div className="flex bg-gray-100 dark:bg-slate-950 p-1 rounded-xl border border-gray-200 dark:border-slate-800">
          {["7D", "30D", "6M", "1Y"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                timeframe === tf
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#f1f5f9"} vertical={false} />
            <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#0F172A" : "#FFFFFF",
                borderColor: isDark ? "#1E293B" : "#E2E8F0",
                borderRadius: "12px",
                color: isDark ? "#FFFFFF" : "#0F172A",
                fontSize: "12px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)"
              }}
              formatter={(val) => [`₹${val.toLocaleString("en-IN")}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366F1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#revenueGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
