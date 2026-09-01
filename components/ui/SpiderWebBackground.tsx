"use client";

import React from "react";

interface SpiderWebBackgroundProps {
  variant?: "hero" | "subtle" | "venom";
  className?: string;
}

export const SpiderWebBackground: React.FC<SpiderWebBackgroundProps> = ({
  variant = "subtle",
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
    >
      <svg
        className="w-full h-full opacity-30"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="webGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ff003c" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="webGradVenom" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#ff003c" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Web Strands & Organic Line Lattice */}
        <g stroke={variant === "venom" ? "url(#webGradVenom)" : "url(#webGradCyan)"} strokeWidth="0.8">
          {/* Concentric Web Arcs */}
          <path d="M-100,-100 C 400,250 800,200 1540,-50" strokeDasharray="3 3" />
          <path d="M-100,200 C 350,550 950,500 1540,150" />
          <path d="M-100,500 C 300,850 1100,750 1540,400" strokeDasharray="6 4" />
          <path d="M100,950 C 600,600 1200,950 1600,750" />

          {/* Radial Spokes / Web Anchors */}
          <line x1="720" y1="0" x2="200" y2="900" />
          <line x1="720" y1="0" x2="1240" y2="900" />
          <line x1="0" y1="450" x2="1440" y2="450" strokeDasharray="2 4" />
          <line x1="0" y1="150" x2="1440" y2="750" />
          <line x1="0" y1="750" x2="1440" y2="150" strokeDasharray="4 4" />

          {/* Polygon Intersections */}
          <polygon points="720,200 900,320 820,480 620,480 540,320" strokeWidth="0.6" strokeDasharray="2 2" />
          <polygon points="720,120 1020,280 920,580 520,580 420,280" strokeWidth="0.6" />
        </g>

        {/* Glow Nodes at intersections */}
        <circle cx="720" cy="200" r="2.5" fill="#00f0ff" className="animate-ping" style={{ animationDuration: "4s" }} />
        <circle cx="900" cy="320" r="2" fill="#ff003c" />
        <circle cx="540" cy="320" r="2" fill="#00f0ff" />
        <circle cx="820" cy="480" r="2" fill="#ffe600" />
        <circle cx="620" cy="480" r="2" fill="#a855f7" />
      </svg>
    </div>
  );
};
