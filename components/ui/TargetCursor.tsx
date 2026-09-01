"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "./ThemeProvider";

interface TargetCursorProps {
  hideDefaultCursor?: boolean;
  parallaxOn?: boolean;
  cursorColorOnTarget?: string;
  defaultColor?: string;
}

export const TargetCursor: React.FC<TargetCursorProps> = ({
  hideDefaultCursor = true,
  cursorColorOnTarget = "#00f0ff",
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHoveringTarget, setIsHoveringTarget] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Touch detection
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    if (hideDefaultCursor) {
      document.body.classList.add("hide-cursor");
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Direct, ultra-responsive gsap quickSetter for instant tracking without sluggish drag
    const setCursorX = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power2.out" });
    const setCursorY = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power2.out" });
    
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");

    let isTargetActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: mx, clientY: my } = e;

      // Laser dot is always 100% pixel-accurate at exact mouse point
      setDotX(mx);
      setDotY(my);

      // Outer targeting reticle smoothly follows cursor
      setCursorX(mx);
      setCursorY(my);

      // Check if current hovered element or ancestor is a cursor target
      const target = (e.target as HTMLElement)?.closest(".cursor-target") as HTMLElement | null;

      if (target && !isTargetActive) {
        isTargetActive = true;
        setIsHoveringTarget(true);

        gsap.to(cursor, {
          scale: 1.25,
          rotation: 90,
          duration: 0.2,
          ease: "power2.out",
        });
      } else if (!target && isTargetActive) {
        isTargetActive = false;
        setIsHoveringTarget(false);

        gsap.to(cursor, {
          scale: 1,
          rotation: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    const handleMouseDown = () => {
      if (!cursor) return;
      gsap.to(cursor, { scale: 0.85, duration: 0.1 });
    };

    const handleMouseUp = () => {
      if (!cursor) return;
      gsap.to(cursor, { scale: isTargetActive ? 1.25 : 1, duration: 0.15 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.classList.remove("hide-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [hideDefaultCursor]);

  if (isTouchDevice) return null;

  const isDark = theme === "dark";
  const primaryColor = isHoveringTarget
    ? cursorColorOnTarget
    : isDark
    ? "#ff003c"
    : "#e11d48";

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* 1. Precision Center Dot (Always perfectly positioned at mouse tip) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[3px] -mt-[3px] w-1.5 h-1.5 rounded-full pointer-events-none transition-colors duration-150"
        style={{
          backgroundColor: primaryColor,
          boxShadow: isDark
            ? `0 0 8px ${primaryColor}`
            : `0 0 4px ${primaryColor}`,
        }}
      />

      {/* 2. Sleek Corner-Bracket HUD Reticle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 -ml-[16px] -mt-[16px] w-8 h-8 pointer-events-none flex items-center justify-center"
      >
        {/* Corner Brackets */}
        <span
          className="absolute top-0 left-0 w-2 h-2 border-t-[1.5px] border-l-[1.5px] transition-colors duration-150"
          style={{ borderColor: primaryColor }}
        />
        <span
          className="absolute top-0 right-0 w-2 h-2 border-t-[1.5px] border-r-[1.5px] transition-colors duration-150"
          style={{ borderColor: primaryColor }}
        />
        <span
          className="absolute bottom-0 left-0 w-2 h-2 border-b-[1.5px] border-l-[1.5px] transition-colors duration-150"
          style={{ borderColor: primaryColor }}
        />
        <span
          className="absolute bottom-0 right-0 w-2 h-2 border-b-[1.5px] border-r-[1.5px] transition-colors duration-150"
          style={{ borderColor: primaryColor }}
        />

        {/* Reticle Center Cross (Faint) */}
        <div
          className="w-2.5 h-[1px] opacity-40 transition-colors duration-150"
          style={{ backgroundColor: primaryColor }}
        />
        <div
          className="absolute h-2.5 w-[1px] opacity-40 transition-colors duration-150"
          style={{ backgroundColor: primaryColor }}
        />
      </div>
    </div>
  );
};
