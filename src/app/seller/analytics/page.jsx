"use client";

import React from "react";
import RevenueChart from "@/components/charts/RevenueChart";
import CategoryDonut from "@/components/charts/CategoryDonut";
import TopBooksBar from "@/components/charts/TopBooksBar";
import StatCard from "@/components/seller/StatCard";
import { useBookStore } from "@/context/BookStoreContext";
import {
  TrendingUp,
  IndianRupee,
  ShoppingBag,
  Users,
  Repeat,
  Percent,
  Sparkles
} from "lucide-react";

export default function SellerAnalyticsPage() {
  const { totalRevenue, totalOrdersCount, customers } = useBookStore();

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white">
          Sales & Commercial Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Deep telemetry on revenue trends, average order value, reader retention, and genre distribution.
        </p>
      </div>

      {/* 4 Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Gross Merchandise Value"
          value={`₹${(82450 + totalRevenue).toLocaleString("en-IN")}`}
          subtitle="Processed this quarter"
          change="+18.4%"
          isPositive={true}
          icon={IndianRupee}
          color="emerald"
        />

        <StatCard
          title="Average Order Value (AOV)"
          value="₹448"
          subtitle="+4.7% vs last month"
          change="+4.7%"
          isPositive={true}
          icon={ShoppingBag}
          color="indigo"
        />

        <StatCard
          title="Customer Retention Rate"
          value="74.2%"
          subtitle="Repeat book buyers"
          change="+5.1%"
          isPositive={true}
          icon={Repeat}
          color="indigo"
        />

        <StatCard
          title="Cart Checkout Conversion"
          value="68.5%"
          subtitle="Completed payment funnel"
          change="+2.3%"
          isPositive={true}
          icon={Percent}
          color="amber"
        />
      </div>

      {/* Main Revenue Chart */}
      <div>
        <RevenueChart />
      </div>

      {/* Secondary Visual Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopBooksBar />
        <CategoryDonut />
      </div>

      {/* Customer Growth & Retention Summary */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-xl text-white">
          Customer Cohort Insights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400">New Readers (This Month)</span>
            <div className="text-2xl font-bold font-serif text-white">84 Readers</div>
            <span className="text-emerald-400 text-[11px]">+14% acquisition growth</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400">Returning Customer Ratio</span>
            <div className="text-2xl font-bold font-serif text-indigo-400">61%</div>
            <span className="text-slate-500 text-[11px]">2+ book purchases per user</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400">Purchase Frequency</span>
            <div className="text-2xl font-bold font-serif text-amber-400">18.4 Days</div>
            <span className="text-slate-500 text-[11px]">Average return interval</span>
          </div>
        </div>
      </div>
    </div>
  );
}

