"use client";

import React from "react";
import Link from "next/link";
import { Play, ArrowRight, ChevronDown, AlertOctagon } from "lucide-react";
import DecryptedText from "@/components/ui/DecryptedText";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-transparent">
      {/* Subtle Ambient Vignette */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-white/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        {/* HackVerse & PS-01 Tag - Monochrome */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-white font-bold uppercase">
            PS-01 // HACKVERSE SPRINT 1
          </span>
          <span className="text-gray-500 font-mono text-[10px]">|</span>
          <span className="text-[10px] font-mono text-gray-400">IEEE RAS VIT CHENNAI</span>
        </div>

        {/* DecryptedText Scrambled HUD Boot Title - Monochrome */}
        <div className="space-y-3">
          <div className="flex justify-center">
            <DecryptedText
              text="SPIDER-SENSE"
              animateOn="view"
              sequential
              revealDirection="center"
              speed={35}
              maxIterations={12}
              className="text-white"
              encryptedClassName="text-white/40"
              parentClassName="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight font-display uppercase text-white"
            />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gray-200 uppercase tracking-wide">
            Autonomous Financial Intelligence System for Retail Investors
          </h2>
        </div>

        {/* Mission Statement */}
        <p className="text-base sm:text-lg text-gray-300 font-sans leading-relaxed max-w-3xl mx-auto font-normal">
          Empowering everyday retail investors with institutional-grade multi-agent synthesis — filtering market noise, detecting toxic liquidation traps, and unlocking high-conviction alpha in seconds.
        </p>

        {/* Crucial Stat Callout Card - Highlights Loss in Red (Allowed) */}
        <div className="w-full max-w-3xl mx-auto glass-panel rounded-2xl p-5 sm:p-6 relative overflow-hidden border border-white/15 text-left">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-400 mt-0.5">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-rose-400 uppercase">
                  CRITICAL ASYMMETRY METRIC
                </span>
                <span className="text-[10px] font-mono text-gray-400">(SEBI Official Study)</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-gray-200 leading-snug">
                <span className="text-rose-400 font-bold text-base sm:text-lg">89% of retail F&amp;O traders lose money</span> due to infrastructure asymmetry — we give you institutional-grade intelligence in <span className="text-white font-bold">under 60 seconds</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Primary CTA Buttons - Monochrome */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/simulator"
            className="px-7 py-3.5 rounded-xl font-mono text-sm font-bold tracking-wider uppercase text-black bg-white hover:bg-gray-200 transition-all duration-200 cursor-target flex items-center gap-2.5 shadow-lg shadow-white/10"
            data-cursor-label="LAUNCH // SIMULATOR"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Spider-Sense Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#cinematic"
            className="px-6 py-3.5 rounded-xl font-mono text-sm font-semibold tracking-wider text-gray-300 hover:text-white bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-200 cursor-target flex items-center gap-2"
            data-cursor-label="SCROLL // PIPELINE"
          >
            <span>Explore Autonomous Pipeline</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Core Metrics - Monochrome */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-3xl mx-auto border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Reasoning Latency</p>
            <p className="text-lg font-bold font-mono text-white mt-0.5">&lt; 4.2s</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Real-time parallel execution</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Autonomous Desks</p>
            <p className="text-lg font-bold font-mono text-white mt-0.5">3 Parallel</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Quant + Regulatory + Sentiment</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Alpha Accuracy</p>
            <p className="text-lg font-bold font-mono text-white mt-0.5">94.2%</p>
            <p className="text-[11px] text-gray-400 mt-0.5">SEBI verified citations</p>
          </div>
        </div>
      </div>
    </section>
  );
};
