"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Sparkles, ShieldAlert, Zap, ShieldCheck } from "lucide-react";

export interface RadarData {
  volatility: number; // 0 to 100
  fiiFlow: number; // in Crores INR (e.g. +2840, -1950)
  momentum: number; // in % (e.g. +2.8, -3.5)
  ticker?: string;
  name?: string;
}

interface SpiderThreatRadarProps {
  data: RadarData;
  interactive?: boolean;
  onChange?: (updated: RadarData) => void;
  size?: number;
  className?: string;
}

export type SpideyModeType = "SPIDEY_MODE" | "VENOM_MODE" | "MILES_MODE" | "PETER_MODE";

export function getSpideyMode(data: RadarData): {
  mode: SpideyModeType;
  title: string;
  verdict: string;
  badgeClass: string;
  icon: any;
  recommendation: string;
  riskRating: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
} {
  const { volatility, fiiFlow, momentum } = data;

  // Venom Mode: High volatility with negative FII flow or negative momentum (Trap)
  if (volatility >= 68 && (fiiFlow < 0 || momentum < -1.5)) {
    return {
      mode: "VENOM_MODE",
      title: "VENOM MODE // TOXIC TRAP",
      verdict: "DON'T BUY THIS STOCK",
      badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
      icon: ShieldAlert,
      recommendation: "Extreme institutional sell wall detected. High risk of liquidation cascade. Stand aside or short hedge.",
      riskRating: "CRITICAL",
    };
  }

  // Spidey Mode: Strong positive FII flow, positive momentum, controlled volatility
  if (fiiFlow >= 1500 && momentum >= 1.5) {
    return {
      mode: "SPIDEY_MODE",
      title: "SPIDEY MODE // ALPHA STRIKE",
      verdict: "BEST TO BUY // 94% ALPHA",
      badgeClass: "bg-sky-500/10 text-sky-600 dark:text-spider-cyan border-sky-500/30",
      icon: Sparkles,
      recommendation: "Optimal harmonic alignment. Institutional accumulation with strong multi-agent consensus.",
      riskRating: "LOW",
    };
  }

  // Miles Morales Mode: High momentum breakout
  if (momentum >= 3.5) {
    return {
      mode: "MILES_MODE",
      title: "MILES MORALES // BREAKOUT",
      verdict: "MOMENTUM SURGE",
      badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
      icon: Zap,
      recommendation: "High kinetic velocity. Options call gamma squeeze underway. Tight stop-loss recommended.",
      riskRating: "MODERATE",
    };
  }

  // Peter Parker Mode: Balanced, conservative value
  return {
    mode: "PETER_MODE",
    title: "PETER PARKER // VALUE",
    verdict: "STEADY ACCUMULATION",
    badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    icon: ShieldCheck,
    recommendation: "Low-beta institutional accumulation. Solid fundamental floor with minimum drawdown vulnerability.",
    riskRating: "LOW",
  };
}

export const SpiderThreatRadar: React.FC<SpiderThreatRadarProps> = ({
  data,
  interactive = false,
  onChange,
  size = 310,
  className = "",
}) => {
  const { volatility, fiiFlow, momentum } = data;
  const modeInfo = useMemo(() => getSpideyMode(data), [data]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Triangular Geometry Calculations
  const cx = size / 2;
  const cy = size / 2 + 8;
  const radius = size * 0.38;

  // Vertex 1: Top (VOLATILITY)
  const v1 = { x: cx, y: cy - radius };
  // Vertex 2: Bottom-Left (FII FLOW)
  const v2 = {
    x: cx - radius * Math.cos(Math.PI / 6),
    y: cy + radius * Math.sin(Math.PI / 6),
  };
  // Vertex 3: Bottom-Right (MOMENTUM)
  const v3 = {
    x: cx + radius * Math.cos(Math.PI / 6),
    y: cy + radius * Math.sin(Math.PI / 6),
  };

  // Normalized values (0.1 to 1)
  const normVol = Math.max(0.12, Math.min(1, volatility / 100));
  const normFii = Math.max(0.12, Math.min(1, (fiiFlow + 4000) / 8000));
  const normMom = Math.max(0.12, Math.min(1, (momentum + 8) / 16));

  // Current polygon points
  const p1 = { x: cx + (v1.x - cx) * normVol, y: cy + (v1.y - cy) * normVol };
  const p2 = { x: cx + (v2.x - cx) * normFii, y: cy + (v2.y - cy) * normFii };
  const p3 = { x: cx + (v3.x - cx) * normMom, y: cy + (v3.y - cy) * normMom };

  const polygonPath = `M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y} Z`;

  const themeColor =
    modeInfo.mode === "VENOM_MODE"
      ? "#a855f7"
      : modeInfo.mode === "SPIDEY_MODE"
      ? isDark
        ? "#00f0ff"
        : "#0284c7"
      : modeInfo.mode === "MILES_MODE"
      ? "#d97706"
      : "#2563eb";

  return (
    <div className={`flex flex-col items-center select-none w-full ${className}`}>
      {/* Mode Tag Header */}
      <motion.div
        key={modeInfo.mode}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`flex items-center gap-2 px-3 py-1 rounded-full border mb-3 backdrop-blur-md ${modeInfo.badgeClass}`}
      >
        <modeInfo.icon className="w-3.5 h-3.5" />
        <span className="text-[11px] font-mono font-bold tracking-wider uppercase">
          {modeInfo.title}
        </span>
      </motion.div>

      {/* SVG Radar */}
      <div className="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="cleanRadarFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff003c" stopOpacity={isDark ? "0.35" : "0.2"} />
              <stop offset="100%" stopColor={themeColor} stopOpacity={isDark ? "0.35" : "0.2"} />
            </linearGradient>
          </defs>

          {/* Concentric Triangular Rings */}
          {[0.25, 0.5, 0.75, 1].map((scale, index) => {
            const sv1 = { x: cx + (v1.x - cx) * scale, y: cy + (v1.y - cy) * scale };
            const sv2 = { x: cx + (v2.x - cx) * scale, y: cy + (v2.y - cy) * scale };
            const sv3 = { x: cx + (v3.x - cx) * scale, y: cy + (v3.y - cy) * scale };
            return (
              <polygon
                key={index}
                points={`${sv1.x},${sv1.y} ${sv2.x},${sv2.y} ${sv3.x},${sv3.y}`}
                fill="none"
                stroke={isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}
                strokeWidth={index === 3 ? 1.5 : 1}
                strokeDasharray={index === 1 ? "3 3" : "none"}
              />
            );
          })}

          {/* Radial Axes */}
          <line x1={cx} y1={cy} x2={v1.x} y2={v1.y} stroke={isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"} strokeWidth="1" />
          <line x1={cx} y1={cy} x2={v2.x} y2={v2.y} stroke={isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"} strokeWidth="1" />
          <line x1={cx} y1={cy} x2={v3.x} y2={v3.y} stroke={isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"} strokeWidth="1" />

          {/* Live Filled Threat Polygon */}
          <motion.path
            d={polygonPath}
            fill="url(#cleanRadarFill)"
            stroke={themeColor}
            strokeWidth="2"
            initial={false}
            animate={{ d: polygonPath }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          />

          {/* Node Vertices */}
          {[p1, p2, p3].map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              fill={themeColor}
              stroke={isDark ? "#ffffff" : "#000000"}
              strokeWidth="1.5"
            />
          ))}

          {/* Center Origin Node */}
          <circle cx={cx} cy={cy} r="2.5" fill={isDark ? "#ffffff" : "#000000"} opacity="0.6" />
        </svg>

        {/* Top: Volatility */}
        <div
          className="absolute flex flex-col items-center text-center cursor-target"
          style={{ top: "0px", left: "50%", transform: "translateX(-50%)" }}
          data-cursor-label="METRIC // VOLATILITY"
        >
          <span className="text-[10px] font-mono tracking-wider text-rose-500 font-semibold">
            VOLATILITY
          </span>
          <span className="text-sm font-bold font-mono text-foreground">
            {volatility} <span className="text-[10px] text-gray-500">/ 100</span>
          </span>
        </div>

        {/* Bottom-Left: FII Flow */}
        <div
          className="absolute flex flex-col items-start text-left cursor-target"
          style={{ bottom: "0px", left: "0px" }}
          data-cursor-label="METRIC // FII FLOW"
        >
          <span className="text-[10px] font-mono tracking-wider text-sky-500 font-semibold">
            FII FLOW
          </span>
          <span
            className={`text-xs font-bold font-mono ${
              fiiFlow >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {fiiFlow >= 0 ? `+₹${fiiFlow.toLocaleString()} Cr` : `-₹${Math.abs(fiiFlow).toLocaleString()} Cr`}
          </span>
        </div>

        {/* Bottom-Right: Momentum */}
        <div
          className="absolute flex flex-col items-end text-right cursor-target"
          style={{ bottom: "0px", right: "0px" }}
          data-cursor-label="METRIC // MOMENTUM"
        >
          <span className="text-[10px] font-mono tracking-wider text-amber-500 font-semibold">
            MOMENTUM
          </span>
          <span
            className={`text-xs font-bold font-mono ${
              momentum >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {momentum >= 0 ? `+${momentum.toFixed(1)}%` : `${momentum.toFixed(1)}%`}
          </span>
        </div>
      </div>

      {/* Actionable Verdict Banner */}
      <div className="w-full max-w-sm mt-3 p-3 rounded-lg bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10">
        <div className="flex items-center justify-between text-xs font-mono mb-1">
          <span className="text-gray-500 dark:text-gray-400 text-[10px] uppercase">VERDICT:</span>
          <span className="font-bold text-xs" style={{ color: themeColor }}>
            {modeInfo.verdict}
          </span>
        </div>
        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
          {modeInfo.recommendation}
        </p>
      </div>

      {/* Interactive Sliders */}
      {interactive && onChange && (
        <div className="w-full max-w-sm mt-3 p-3 rounded-lg bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 space-y-2">
          <div className="text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 uppercase">
            Radar Signal Tuner
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-0.5">
              <span>Volatility</span>
              <span>{volatility} / 100</span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={volatility}
              onChange={(e) => onChange({ ...data, volatility: Number(e.target.value) })}
              className="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded cursor-pointer accent-rose-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-0.5">
              <span>FII Net Flow</span>
              <span>{fiiFlow >= 0 ? `+₹${fiiFlow} Cr` : `-₹${Math.abs(fiiFlow)} Cr`}</span>
            </div>
            <input
              type="range"
              min="-4000"
              max="4000"
              step="100"
              value={fiiFlow}
              onChange={(e) => onChange({ ...data, fiiFlow: Number(e.target.value) })}
              className="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded cursor-pointer accent-sky-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-0.5">
              <span>Momentum</span>
              <span>{momentum >= 0 ? `+${momentum}%` : `${momentum}%`}</span>
            </div>
            <input
              type="range"
              min="-6"
              max="6"
              step="0.1"
              value={momentum}
              onChange={(e) => onChange({ ...data, momentum: Number(e.target.value) })}
              className="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded cursor-pointer accent-amber-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
