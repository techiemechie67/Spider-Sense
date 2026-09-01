"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus, Globe2 } from "lucide-react";

export interface MacroIndicator {
  name: string;
  value: string;
  change: string;
  status: "BULLISH" | "BEARISH" | "NEUTRAL";
}

export const MACRO_STRIP_DATA: MacroIndicator[] = [
  {
    name: "India VIX",
    value: "13.42",
    change: "-1.8%",
    status: "BULLISH",
  },
  {
    name: "Brent Crude",
    value: "$74.15/bbl",
    change: "+0.4%",
    status: "NEUTRAL",
  },
  {
    name: "USD / INR",
    value: "₹84.18",
    change: "-0.04%",
    status: "BULLISH",
  },
  {
    name: "S&P 500 / Global",
    value: "5,885.20",
    change: "+0.72%",
    status: "BULLISH",
  },
  {
    name: "FII Cash 10D Net",
    value: "+₹14,820 Cr",
    change: "Inflow",
    status: "BULLISH",
  },
];

export const MacroSentimentStrip: React.FC = () => {
  return (
    <div className="glass-panel rounded-xl p-3 border border-white/10 select-none">
      <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none text-xs font-mono">
        <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-white/10">
          <Globe2 className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            MACRO OVERLAY
          </span>
        </div>

        {MACRO_STRIP_DATA.map((item, idx) => {
          const isBullish = item.status === "BULLISH";
          const isBearish = item.status === "BEARISH";
          return (
            <div
              key={idx}
              className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/40 border border-white/5 shrink-0"
            >
              <span className="text-gray-400 text-[11px]">{item.name}:</span>
              <span className="text-white font-bold">{item.value}</span>
              <span
                className={`flex items-center text-[10px] font-bold ${
                  isBullish
                    ? "text-emerald-400"
                    : isBearish
                    ? "text-rose-400"
                    : "text-gray-400"
                }`}
              >
                {isBullish && <TrendingUp className="w-3 h-3 mr-0.5 inline" />}
                {isBearish && <TrendingDown className="w-3 h-3 mr-0.5 inline" />}
                {item.status === "NEUTRAL" && <Minus className="w-3 h-3 mr-0.5 inline" />}
                {item.change}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
