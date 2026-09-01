"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useScroll, useTransform } from "framer-motion";

export const ScrollHangingSpider: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState(800);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      setWindowHeight(window.innerHeight);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Track global scroll progress (0 at top, 1 at bottom of page)
  const { scrollYProgress } = useScroll();

  // Smooth out scroll progress using spring physics for natural elastic descent
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Minimum thread height (near top navbar) to maximum thread height (touching lower horizontal level)
  const minTop = 45;
  const maxTop = Math.max(minTop + 100, windowHeight - 75);

  // Transform scroll progress to Y-pixel coordinate
  const currentY = useTransform(smoothProgress, [0, 1], [minTop, maxTop]);

  // Subtle rotation sway while scrolling
  const swayRotate = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, 3, -3, 2, 0]);

  return (
    <div
      className="fixed top-0 left-2 sm:left-6 z-40 pointer-events-none select-none"
      style={{ height: "100vh", width: "70px" }}
    >
      <div className="relative w-full h-full">
        {/* Dynamic Silk Thread extending from top: 0 to spider Y */}
        <svg
          className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Glowing Silk Line */}
          <motion.line
            x1="35"
            y1="0"
            x2="35"
            y2={currentY}
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeOpacity="0.7"
            strokeDasharray="3 1"
          />
          {/* Subtle neon crimson silk glow */}
          <motion.line
            x1="35"
            y1="0"
            x2="35"
            y2={currentY}
            stroke="#ff003c"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
        </svg>

        {/* Spider Body Positioned at bottom of thread */}
        <motion.div
          style={{
            y: currentY,
            x: 0,
            rotate: swayRotate,
          }}
          className="absolute top-0 left-0 w-[70px] -translate-x-[0px] -translate-y-[10px] pointer-events-auto cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="70"
            height="75"
            viewBox="0 0 100 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible filter drop-shadow-[0_4px_10px_rgba(255,0,60,0.35)] transition-transform duration-200"
          >
            {/* Top Anchor Ring attached to silk line */}
            <circle cx="50" cy="8" r="3" fill="#ffffff" stroke="#ff003c" strokeWidth="1" />
            <line x1="50" y1="8" x2="50" y2="24" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.9" />

            {/* Spider Silhouette Group with gentle idle sway */}
            <g className="origin-top animate-[spiderSway_5s_ease-in-out_infinite]">
              {/* Abdomen (Upper body when hanging upside down) */}
              <ellipse cx="50" cy="38" rx="14" ry="18" fill="#111319" stroke="#d1d5db" strokeWidth="1.5" />
              {/* Abdomen Spider Emblem marking */}
              <path
                d="M 50,26 L 46,38 L 50,42 L 54,38 Z"
                fill="#ff003c"
                opacity="0.9"
              />
              <line x1="50" y1="26" x2="50" y2="48" stroke="#ff003c" strokeWidth="1" />

              {/* Cephalothorax (Head) */}
              <ellipse cx="50" cy="60" rx="9" ry="8" fill="#1e222d" stroke="#d1d5db" strokeWidth="1.2" />

              {/* Chelicerae / Fangs */}
              <path d="M 47,67 Q 45,74 48,77 Q 49,72 49,67" fill="#d1d5db" />
              <path d="M 53,67 Q 55,74 52,77 Q 51,72 51,67" fill="#d1d5db" />

              {/* Crimson Eyes */}
              <circle cx="47" cy="58" r="1.5" fill="#ff003c" />
              <circle cx="53" cy="58" r="1.5" fill="#ff003c" />
              <circle cx="45" cy="62" r="1" fill="#00f0ff" />
              <circle cx="55" cy="62" r="1" fill="#00f0ff" />

              {/* 8 Articulated Spider Legs (Hanging Downwards) */}
              {/* Left Front Leg 1 */}
              <path
                d="M 44,56 C 24,42 12,16 16,-10 C 18,5 26,32 44,56"
                fill="#111319"
                stroke="#e5e7eb"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Left Leg 2 */}
              <path
                d="M 42,59 C 18,50 4,32 10,8"
                stroke="#e5e7eb"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Left Leg 3 */}
              <path
                d="M 43,62 C 22,70 2,85 14,106"
                stroke="#e5e7eb"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Left Rear Leg 4 */}
              <path
                d="M 45,65 C 30,86 22,114 36,132"
                stroke="#e5e7eb"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Right Front Leg 1 */}
              <path
                d="M 56,56 C 76,42 88,16 84,-10 C 82,5 74,32 56,56"
                fill="#111319"
                stroke="#e5e7eb"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Right Leg 2 */}
              <path
                d="M 58,59 C 82,50 96,32 90,8"
                stroke="#e5e7eb"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Right Leg 3 */}
              <path
                d="M 57,62 C 78,70 98,85 86,106"
                stroke="#e5e7eb"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Right Rear Leg 4 */}
              <path
                d="M 55,65 C 70,86 78,114 64,132"
                stroke="#e5e7eb"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollHangingSpider;
