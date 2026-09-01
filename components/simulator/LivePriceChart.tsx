"use client";

import React, { useState, useEffect } from "react";

interface LivePriceChartProps {
  ticker: string;
  basePrice: number;
  isPositive: boolean;
}

export const LivePriceChart: React.FC<LivePriceChartProps> = ({
  ticker,
  basePrice,
  isPositive,
}) => {
  const [points, setPoints] = useState<number[]>([]);
  const [currentPrice, setCurrentPrice] = useState(basePrice);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [marketStatusText, setMarketStatusText] = useState("");

  // Check IST Market Hours: 09:15 to 15:30 IST, Monday-Friday
  useEffect(() => {
    const checkMarketHours = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utc + 3600000 * 5.5);
      const day = istDate.getDay();
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const timeInMinutes = hours * 60 + minutes;

      const isWeekday = day >= 1 && day <= 5;
      const isTradingHours = timeInMinutes >= 9 * 60 + 15 && timeInMinutes <= 15 * 60 + 30;

      const open = isWeekday && isTradingHours;
      setIsMarketOpen(open);
      if (open) {
        setMarketStatusText("LIVE NSE MARKET");
      } else {
        setMarketStatusText("Market Closed — last close 15:30 IST");
      }
    };

    checkMarketHours();
    const interval = setInterval(checkMarketHours, 60000);
    return () => clearInterval(interval);
  }, []);

  // Generate smooth price points
  useEffect(() => {
    setCurrentPrice(basePrice);
    const initialPoints: number[] = [];
    let p = basePrice * 0.985;
    for (let i = 0; i < 24; i++) {
      const delta = (Math.random() - 0.48) * (basePrice * 0.004);
      p = Math.max(basePrice * 0.96, Math.min(basePrice * 1.04, p + delta));
      initialPoints.push(p);
    }
    initialPoints[initialPoints.length - 1] = basePrice;
    setPoints(initialPoints);

    if (isMarketOpen) {
      const tickInterval = setInterval(() => {
        setPoints((prev) => {
          const last = prev[prev.length - 1] || basePrice;
          const tick = (Math.random() - 0.49) * (basePrice * 0.0015);
          const next = Math.round((last + tick) * 100) / 100;
          setCurrentPrice(next);
          return [...prev.slice(1), next];
        });
      }, 2000);
      return () => clearInterval(tickInterval);
    }
  }, [ticker, basePrice, isMarketOpen]);

  const width = 460;
  const height = 120;
  const minVal = points.length > 0 ? Math.min(...points) * 0.998 : basePrice * 0.99;
  const maxVal = points.length > 0 ? Math.max(...points) * 1.002 : basePrice * 1.01;
  const range = maxVal - minVal || 1;

  const svgPoints = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1 || 1)) * width;
      const y = height - ((val - minVal) / range) * (height - 20) - 10;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPath = points.length > 0
    ? `M 0,${height} L ${svgPoints} L ${width},${height} Z`
    : "";

  const chartColor = isPositive ? "#10b981" : "#ff003c";

  return (
    <div className="glass-panel rounded-xl p-4 border border-white/10 space-y-2 select-none">
      {/* Header with Live / Market Closed indicator */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          {isMarketOpen ? (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>LIVE</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
              {marketStatusText}
            </span>
          )}
          <span className="text-gray-400">{ticker} INTRADAY TICK STREAM</span>
        </div>

        <div className="text-right">
          <span className="text-sm font-bold text-white">₹{currentPrice.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Minimalist Line/Area Chart */}
      <div className="relative w-full h-[120px] overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`areaGrad-${ticker}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={chartColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          {areaPath && (
            <path d={areaPath} fill={`url(#areaGrad-${ticker})`} />
          )}

          {/* Clean Line */}
          {svgPoints && (
            <polyline
              fill="none"
              stroke={chartColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={svgPoints}
            />
          )}
        </svg>
      </div>

      <div className="flex justify-between text-[10px] font-mono text-gray-500 border-t border-white/5 pt-1">
        <span>09:15 IST</span>
        <span>12:00 IST</span>
        <span>15:30 IST</span>
      </div>
    </div>
  );
};
