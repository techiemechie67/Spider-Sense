"use client";

import React from "react";

interface HangingSpiderProps {
  className?: string;
  size?: number;
}

export const HangingSpider: React.FC<HangingSpiderProps> = ({
  className = "w-7 h-16",
  size = 64,
}) => {
  return (
    <div className={`relative inline-flex flex-col items-center select-none pointer-events-none ${className}`}>
      {/* Hanging Spider SVG matching user silhouette */}
      <svg
        width={size}
        height={size * 2.2}
        viewBox="0 0 100 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Silk Thread */}
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="125"
          stroke="#00f0ff"
          strokeWidth="1.2"
          strokeDasharray="2 1"
          strokeOpacity="0.85"
        />

        {/* Spider Group with gentle sway */}
        <g className="origin-top animate-[spiderSway_4s_ease-in-out_infinite]">
          {/* Abdomen / Body */}
          <ellipse cx="50" cy="148" rx="16" ry="20" fill="#d1d5db" />
          {/* Cephalothorax / Head */}
          <ellipse cx="50" cy="172" rx="10" ry="9" fill="#9ca3af" />
          {/* Chelicerae / Fangs */}
          <path d="M 46,180 Q 44,188 47,192 Q 49,186 48,180" fill="#9ca3af" />
          <path d="M 54,180 Q 56,188 53,192 Q 51,186 52,180" fill="#9ca3af" />

          {/* Left Legs */}
          {/* Leg 1 Front */}
          <path
            d="M 44,166 C 25,150 12,120 18,90 C 19,105 28,135 44,166"
            stroke="#d1d5db"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Leg 2 */}
          <path
            d="M 42,169 C 18,162 4,145 10,122"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Leg 3 */}
          <path
            d="M 43,172 C 22,178 2,192 12,215"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Leg 4 Back */}
          <path
            d="M 45,175 C 32,195 24,225 38,245"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right Legs */}
          {/* Leg 1 Front */}
          <path
            d="M 56,166 C 75,150 88,120 82,90 C 81,105 72,135 56,166"
            stroke="#d1d5db"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Leg 2 */}
          <path
            d="M 58,169 C 82,162 96,145 90,122"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Leg 3 */}
          <path
            d="M 57,172 C 78,178 98,192 88,215"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Leg 4 Back */}
          <path
            d="M 55,175 C 68,195 76,225 62,245"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Crimson spider-sense indicator eye dots */}
          <circle cx="47" cy="170" r="1.5" fill="#ff003c" />
          <circle cx="53" cy="170" r="1.5" fill="#ff003c" />
        </g>
      </svg>
    </div>
  );
};
