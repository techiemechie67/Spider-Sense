"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CallPutOptionsChartsProps {
  ticker: string;
  basePrice: number;
  isPositive: boolean;
}

export const CallPutOptionsCharts: React.FC<CallPutOptionsChartsProps> = ({
  ticker,
  basePrice,
  isPositive,
}) => {
  const [selectedStrikeType, setSelectedStrikeType] = useState<"ATM" | "OTM" | "ITM">("ATM");

  const strikeMult = selectedStrikeType === "ATM" ? 1.0 : selectedStrikeType === "OTM" ? 1.05 : 0.95;
  const targetStrike = Math.round(basePrice * strikeMult);

  const callPoints = [
    Math.round(basePrice * 0.038),
    Math.round(basePrice * 0.042),
    Math.round(basePrice * 0.039),
    Math.round(basePrice * 0.046),
    Math.round(basePrice * 0.052),
    Math.round(basePrice * 0.049),
    Math.round(basePrice * (isPositive ? 0.058 : 0.035)),
  ];

  const putPoints = [
    Math.round(basePrice * 0.048),
    Math.round(basePrice * 0.044),
    Math.round(basePrice * 0.046),
    Math.round(basePrice * 0.041),
    Math.round(basePrice * 0.038),
    Math.round(basePrice * 0.036),
    Math.round(basePrice * (isPositive ? 0.029 : 0.054)),
  ];

  const chartWidth = 320;
  const chartHeight = 90;

  const renderPath = (pts: number[], color: string) => {
    const minVal = Math.min(...pts) * 0.95;
    const maxVal = Math.max(...pts) * 1.05;
    const range = maxVal - minVal || 1;

    const coords = pts
      .map((val, idx) => {
        const x = (idx / (pts.length - 1)) * chartWidth;
        const y = chartHeight - ((val - minVal) / range) * (chartHeight - 16) - 8;
        return `${x},${y}`;
      })
      .join(" ");

    const area = `M 0,${chartHeight} L ${coords} L ${chartWidth},${chartHeight} Z`;

    return (
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#grad-${color})`} />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={coords}
        />
      </svg>
    );
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 space-y-4">
      {/* Header & Strike Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>F&amp;O Derivatives: Call vs Put Cockpit</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-gray-300 border border-white/20">
              2 GRAPHS PER STOCK
            </span>
          </h3>
          <p className="text-[11px] font-mono text-gray-400">
            Strike Focus: <strong className="text-white">₹{targetStrike}</strong> ({selectedStrikeType})
          </p>
        </div>

        {/* Strike Type Selector - Monochrome */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-white/10 text-xs font-mono">
          {(["ITM", "ATM", "OTM"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedStrikeType(type)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all cursor-target ${
                selectedStrikeType === type
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
              data-cursor-label={`STRIKE // ${type}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Dual Graphs Grid: 1. Call Graph (CE) | 2. Put Graph (PE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* GRAPH 1: CALL OPTIONS (CE) - Profit in Green */}
        <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <TrendingUp className="w-3.5 h-3.5" /> 01. CALL OPTION (CE)
            </span>
            <span className="text-white font-bold">₹{callPoints[callPoints.length - 1]} Premium</span>
          </div>

          <div className="w-full h-[90px] overflow-hidden">
            {renderPath(callPoints, "#10b981")}
          </div>

          <div className="p-2 rounded bg-black/40 border border-white/10 text-[10px] font-mono text-gray-300">
            <strong className="text-white">Insight:</strong> Buying Calls profits when {ticker} goes UP. Heavy Open Interest at this strike signals ceiling resistance.
          </div>
        </div>

        {/* GRAPH 2: PUT OPTIONS (PE) - Loss/Downside in Red */}
        <div className="p-3.5 rounded-xl bg-black/50 border border-rose-500/30 space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="flex items-center gap-1.5 text-rose-400 font-bold">
              <TrendingDown className="w-3.5 h-3.5" /> 02. PUT OPTION (PE)
            </span>
            <span className="text-white font-bold">₹{putPoints[putPoints.length - 1]} Premium</span>
          </div>

          <div className="w-full h-[90px] overflow-hidden">
            {renderPath(putPoints, "#ff003c")}
          </div>

          <div className="p-2 rounded bg-black/40 border border-white/10 text-[10px] font-mono text-gray-300">
            <strong className="text-white">Insight:</strong> Buying Puts acts as insurance or profits when {ticker} drops. Heavy Put writing creates floor support.
          </div>
        </div>
      </div>
    </div>
  );
};
