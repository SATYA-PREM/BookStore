"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  color = "indigo"
}) {
  const colorStyles = {
    indigo: "from-indigo-500/10 to-indigo-600/5 text-indigo-400 border-indigo-500/20",
    emerald: "from-emerald-500/10 to-emerald-600/5 text-emerald-400 border-emerald-500/20",
    amber: "from-amber-500/10 to-amber-600/5 text-amber-400 border-amber-500/20",
    rose: "from-rose-500/10 to-rose-600/5 text-rose-400 border-rose-500/20"
  };

  return (
    <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {value}
          </div>
        </div>

        {Icon && (
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center border shadow-inner ${colorStyles[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="text-slate-400">{subtitle}</div>

        {change && (
          <div className={`flex items-center gap-1 font-bold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
}

