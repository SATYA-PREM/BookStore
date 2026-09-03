"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const DATA_TIMEFRAMES = {
  "7D": [
    { name: "Mon", revenue: 14200, orders: 28 },
    { name: "Tue", revenue: 18400, orders: 36 },
    { name: "Wed", revenue: 16800, orders: 31 },
    { name: "Thu", revenue: 21200, orders: 42 },
    { name: "Fri", revenue: 24500, orders: 49 },
    { name: "Sat", revenue: 28900, orders: 58 },
    { name: "Sun", revenue: 31200, orders: 63 }
  ],
  "30D": [
    { name: "Week 1", revenue: 72000, orders: 140 },
    { name: "Week 2", revenue: 84500, orders: 168 },
    { name: "Week 3", revenue: 91200, orders: 182 },
    { name: "Week 4", revenue: 104800, orders: 210 }
  ],
  "6M": [
    { name: "Apr", revenue: 42000, orders: 90 },
    { name: "May", revenue: 54000, orders: 115 },
    { name: "Jun", revenue: 68000, orders: 142 },
    { name: "Jul", revenue: 76000, orders: 160 },
    { name: "Aug", revenue: 82450, orders: 184 },
    { name: "Sep", revenue: 94000, orders: 205 }
  ],
  "1Y": [
    { name: "Q1", revenue: 140000, orders: 310 },
    { name: "Q2", revenue: 198000, orders: 430 },
    { name: "Q3", revenue: 254000, orders: 560 },
    { name: "Q4", revenue: 320000, orders: 710 }
  ]
};

export default function RevenueChart() {
  const [timeframe, setTimeframe] = useState("6M");
  const data = DATA_TIMEFRAMES[timeframe];

  return (
    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Sales Performance
          </span>
          <h3 className="font-serif font-bold text-xl text-white mt-0.5">
            Revenue Analytics
          </h3>
        </div>

        {/* Timeframe selector pills */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          {["7D", "30D", "6M", "1Y"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                timeframe === tf
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
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
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0F172A",
                borderColor: "#334155",
                borderRadius: "12px",
                color: "#F8FAFC",
                fontSize: "12px"
              }}
              formatter={(val) => [`₹${val.toLocaleString("en-IN")}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#818CF8"
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

