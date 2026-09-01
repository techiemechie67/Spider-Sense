"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { SpiderSlingLogo } from "@/components/ui/SpiderSlingLogo";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#090a0f]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 relative pl-12 sm:pl-10">
          <Link
            href="/"
            className="flex items-center gap-3 cursor-target group"
            data-cursor-label="NAV // HOME"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 p-[1px] flex items-center justify-center shadow-sm border border-white/20">
              <div className="w-full h-full bg-[#090a0f] rounded-[7px] flex items-center justify-center">
                <SpiderSlingLogo size={20} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg tracking-wider font-extrabold text-white">
                  SPIDER-SENSE
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-white/10 text-gray-300 border border-white/20">
                  PS-01
                </span>
              </div>
              <p className="text-[9px] font-mono text-gray-400">
                BY TECHIE-MECHIE
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation to Separate Pages */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1 backdrop-blur-md">
          <Link
            href="/pipeline"
            className="px-3.5 py-1 text-xs font-mono text-gray-300 hover:text-white transition-colors cursor-target"
            data-cursor-label="NAV // PIPELINE"
          >
            Pipeline
          </Link>
          <Link
            href="/problem"
            className="px-3.5 py-1 text-xs font-mono text-gray-300 hover:text-white transition-colors cursor-target"
            data-cursor-label="NAV // PROBLEM"
          >
            Problem PS-01
          </Link>
          <Link
            href="/team"
            className="px-3.5 py-1 text-xs font-mono text-gray-300 hover:text-white transition-colors cursor-target"
            data-cursor-label="NAV // TEAM"
          >
            Team
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* HackVerse Tag */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>HACKVERSE SPRINT 1</span>
          </div>

          {/* Launch Simulator Button */}
          <Link
            href="/simulator"
            className="px-4 py-2 rounded-lg font-mono text-xs font-bold tracking-wider uppercase text-black bg-white hover:bg-gray-200 transition-all duration-200 cursor-target flex items-center gap-1.5 shadow-sm"
            data-cursor-label="LAUNCH // SIMULATOR"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulator</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
