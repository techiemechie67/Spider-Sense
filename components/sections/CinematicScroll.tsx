"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cpu,
  LineChart,
  FileCheck2,
  MessageSquareShare,
  ShieldAlert,
  Zap,
  Radio,
  Database,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const CinematicScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Stage Panel Refs
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);

  const progressRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      return;
    }

    const checkMobile = () => window.innerWidth < 768 || "ontouchstart" in window;
    if (checkMobile()) {
      setIsMobile(true);
    }

    const container = containerRef.current;
    const viewport = viewportRef.current;
    if (!container || !viewport) return;

    const ctx = gsap.context(() => {
      if (checkMobile()) {
        return;
      }

      // Master Pinned Scroll-Scrubbed Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=350%",
          pin: viewport,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = Math.round(self.progress * 100);
            if (progressRef.current) {
              progressRef.current.style.width = `${progress}%`;
            }
            if (labelRef.current) {
              if (progress < 25) {
                labelRef.current.innerText = "STAGE 01 // DATA INGESTION BUS";
              } else if (progress < 55) {
                labelRef.current.innerText = "STAGE 02 // TRI-AGENT PARALLEL DESKS";
              } else if (progress < 80) {
                labelRef.current.innerText = "STAGE 03 // CONSENSUS SYNTHESIS CORE";
              } else {
                labelRef.current.innerText = "STAGE 04 // ACTIONABLE ALPHA DOSSIER";
              }
            }
          },
        },
      });

      // Initial States
      gsap.set(stage1Ref.current, { opacity: 1, y: 0, scale: 1 });
      gsap.set([stage2Ref.current, stage3Ref.current, stage4Ref.current], {
        opacity: 0,
        y: 40,
        scale: 0.95,
      });

      // Stage 1 -> Stage 2
      tl.to(stage1Ref.current, { opacity: 0, y: -40, scale: 0.95, duration: 1.0 }, "stage2");
      tl.to(stage2Ref.current, { opacity: 1, y: 0, scale: 1, duration: 1.0 }, "stage2+=0.2");

      // Stage 2 -> Stage 3
      tl.to(stage2Ref.current, { opacity: 0, y: -40, scale: 0.95, duration: 1.0 }, "stage3");
      tl.to(stage3Ref.current, { opacity: 1, y: 0, scale: 1, duration: 1.0 }, "stage3+=0.2");

      // Stage 3 -> Stage 4
      tl.to(stage3Ref.current, { opacity: 0, y: -40, scale: 0.95, duration: 1.0 }, "stage4");
      tl.to(stage4Ref.current, { opacity: 1, y: 0, scale: 1, duration: 1.0 }, "stage4+=0.2");
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  return (
    <section
      id="cinematic"
      ref={containerRef}
      className="relative w-full bg-transparent text-white select-none overflow-hidden"
      style={{ minHeight: isMobile || prefersReducedMotion ? "100vh" : "380vh" }}
    >
      <div
        ref={viewportRef}
        className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden bg-transparent"
      >
        {/* Subtle Background Glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-white/5 rounded-full blur-[160px]" />

        {/* HUD Scroll Progress Header - Monochrome */}
        <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none max-w-5xl mx-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
            <span
              ref={labelRef}
              className="text-[11px] font-mono tracking-widest text-white font-bold"
            >
              STAGE 01 // DATA INGESTION BUS
            </span>
          </div>

          <div className="w-36 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-white transition-all duration-75"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* Dynamic Multi-Agent Pipeline Stage Container */}
        <div className="relative w-full max-w-4xl h-[480px] flex items-center justify-center px-4">
          {/* ---------------- STAGE 01 ---------------- */}
          <div
            ref={stage1Ref}
            className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-lg">
              <Database className="w-7 h-7" />
            </div>

            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold text-gray-400 tracking-widest uppercase">
                STAGE 01 // REAL-TIME INGESTION BUS
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white uppercase tracking-wide">
                Ingesting Live NSE Feeds &amp; SEBI Disclosures
              </h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                Aggregating 50,000+ options ticks per second, vectorizing SEBI regulatory filings, and streaming FII institutional flow books in real-time.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full max-w-lg text-left text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/10">
                <span className="text-[10px] text-gray-400">NSE Tick Stream</span>
                <p className="text-white font-bold mt-0.5">50k ticks/sec</p>
              </div>
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/10">
                <span className="text-[10px] text-gray-400">SEBI Vector Index</span>
                <p className="text-white font-bold mt-0.5">10k+ Filings</p>
              </div>
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/10">
                <span className="text-[10px] text-gray-400">FII Net Liquidity</span>
                <p className="text-emerald-400 font-bold mt-0.5">Live Cash Book</p>
              </div>
            </div>
          </div>

          {/* ---------------- STAGE 02 ---------------- */}
          <div
            ref={stage2Ref}
            className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-lg">
              <Cpu className="w-7 h-7" />
            </div>

            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold text-gray-400 tracking-widest uppercase">
                STAGE 02 // TRI-AGENT PARALLEL DESKS
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white uppercase tracking-wide">
                Parallel Autonomous Dissection
              </h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                Three specialized intelligence desks analyze options Greeks, corporate governance filings, and sentiment velocity concurrently in &lt;4.2 seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl text-left text-xs font-mono">
              <div className="p-3 rounded-xl glass-panel border border-white/15">
                <div className="flex items-center gap-1.5 text-white font-bold mb-1">
                  <LineChart className="w-3.5 h-3.5" /> 01. QUANT
                </div>
                <p className="text-[11px] text-gray-400 font-sans">Delta, Gamma risk, Put-Call Ratio &amp; Theta time decay.</p>
              </div>

              <div className="p-3 rounded-xl glass-panel border border-white/15">
                <div className="flex items-center gap-1.5 text-white font-bold mb-1">
                  <FileCheck2 className="w-3.5 h-3.5" /> 02. REG RAG
                </div>
                <p className="text-[11px] text-gray-400 font-sans">SEBI compliance, insider activity &amp; auditor reconciliations.</p>
              </div>

              <div className="p-3 rounded-xl glass-panel border border-white/15">
                <div className="flex items-center gap-1.5 text-white font-bold mb-1">
                  <MessageSquareShare className="w-3.5 h-3.5" /> 03. SENTIMENT
                </div>
                <p className="text-[11px] text-gray-400 font-sans">FII cash velocity, India VIX &amp; cross-market macro cues.</p>
              </div>
            </div>
          </div>

          {/* ---------------- STAGE 03 ---------------- */}
          <div
            ref={stage3Ref}
            className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-lg">
              <Zap className="w-7 h-7" />
            </div>

            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold text-gray-400 tracking-widest uppercase">
                STAGE 03 // CONSENSUS SYNTHESIS CORE
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white uppercase tracking-wide">
                Spider-Sense Mode Arbitration
              </h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                Synthesizing multi-agent weights to categorize market setups into distinct execution profiles — locking in transparent risk parameters.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl text-left text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/15 text-white">
                <span className="text-[10px] font-bold block">SPIDEY MODE</span>
                <span className="text-[10px] text-gray-400 font-sans">Safe Accumulation</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/15 text-white">
                <span className="text-[10px] font-bold block">VENOM MODE</span>
                <span className="text-[10px] text-gray-400 font-sans">High-Gamma Breakout</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/15 text-white">
                <span className="text-[10px] font-bold block">MILES MODE</span>
                <span className="text-[10px] text-gray-400 font-sans">Tactical Reversal</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/15 text-white">
                <span className="text-[10px] font-bold block">PETER MODE</span>
                <span className="text-[10px] text-gray-400 font-sans">Defensive Hold</span>
              </div>
            </div>
          </div>

          {/* ---------------- STAGE 04 ---------------- */}
          <div
            ref={stage4Ref}
            className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-lg">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold text-gray-400 tracking-widest uppercase">
                STAGE 04 // ACTIONABLE ALPHA DOSSIER
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white uppercase tracking-wide">
                Institutional Intelligence in &lt;60 Seconds
              </h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                Exporting transparent entry levels, stop loss thresholds, and verifiable SEBI document citations directly to retail investors.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-white/20 w-full max-w-lg text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-white font-bold">
                <span>ALPHA VERDICT: HIGH CONVICTION</span>
                <span className="text-gray-400">EXECUTION: LIVE</span>
              </div>
              <p className="text-[11px] text-gray-300 font-sans">
                Target: <strong className="text-emerald-400">+14.2%</strong> | Stop Loss: <strong className="text-rose-400">-3.8%</strong> | Citations: <strong className="text-white">3 Verified SEBI Disclosures</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
