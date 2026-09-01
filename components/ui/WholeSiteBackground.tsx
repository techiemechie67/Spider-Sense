"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export const WholeSiteBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const gridSize = 48;
    let tick = 0;

    const draw = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === "dark";
      const baseLineColor = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.035)";
      const dotColor = isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.08)";
      const activeLineColor = isDark ? "rgba(0, 240, 255, 0.15)" : "rgba(0, 110, 255, 0.18)";
      const activeDotColor = isDark ? "rgba(0, 240, 255, 0.6)" : "rgba(0, 110, 255, 0.6)";

      // Draw subtle base grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = baseLineColor;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw intersection nodes with mouse proximity reveal
      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            const factor = 1 - dist / 160;

            // Highlight intersecting crosshairs
            ctx.beginPath();
            ctx.strokeStyle = activeLineColor;
            ctx.lineWidth = 1.2;
            ctx.moveTo(x - 8, y);
            ctx.lineTo(x + 8, y);
            ctx.moveTo(x, y - 8);
            ctx.lineTo(x, y + 8);
            ctx.stroke();

            // Highlight node dot
            ctx.beginPath();
            ctx.arc(x, y, 1.8 + factor * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = activeDotColor;
            ctx.fill();
          } else {
            // Subtle standard dot
            if (x % (gridSize * 2) === 0 && y % (gridSize * 2) === 0) {
              ctx.beginPath();
              ctx.arc(x, y, 1, 0, Math.PI * 2);
              ctx.fillStyle = dotColor;
              ctx.fill();
            }
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-300"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
