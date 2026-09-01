"use client";

import React from "react";
import Link from "next/link";
import { Play, ArrowRight, Zap } from "lucide-react";

export const SimulatorCTA: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent">
      {/* Ambient Radial Accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 glass-panel rounded-3xl p-8 sm:p-12 border border-white/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <Zap className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-gray-300 uppercase font-bold">
            INTERACTIVE BENCHMARK CONSOLE
          </span>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
            See Parallel Multi-Agent Intelligence in Action
          </h2>
          <p className="text-sm sm:text-base text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Experience real-time Quant Greeks calculation, SEBI vector RAG citations, macro sentiment overlays, and Options Skew detection across 150+ equities with instant cited alpha dossiers.
          </p>
        </div>

        {/* 3 Core Workflow Highlights - Monochrome */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
          <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
            <span className="text-[10px] font-mono text-gray-300 font-bold uppercase">01 // PARALLEL INGESTION</span>
            <p className="text-xs text-gray-400 mt-1 font-sans">Tick streams, SEBI filings &amp; FII liquidity ingested simultaneously.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
            <span className="text-[10px] font-mono text-gray-300 font-bold uppercase">02 // CONSENSUS CORE</span>
            <p className="text-xs text-gray-400 mt-1 font-sans">Tri-agent arbitration tags Spidey, Venom, Miles, or Peter modes.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
            <span className="text-[10px] font-mono text-gray-300 font-bold uppercase">03 // CITED DOSSIER</span>
            <p className="text-xs text-gray-400 mt-1 font-sans">Generates transparent target, stop loss &amp; verifiable regulatory citations.</p>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="pt-4 flex justify-center">
          <Link
            href="/simulator"
            className="px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider uppercase text-black bg-white hover:bg-gray-200 transition-all duration-200 cursor-target flex items-center gap-3 shadow-xl shadow-white/10"
            data-cursor-label="LAUNCH // SIMULATOR"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Spider-Sense Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
