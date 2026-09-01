"use client";

import React from "react";
import { AlertTriangle, LineChart, FileText, MessageSquareShare, ArrowRight } from "lucide-react";
import Link from "next/link";

export const ProblemStatement: React.FC = () => {
  return (
    <section id="problem" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent">
      {/* Ambient Vignette Glow */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-white/5 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <AlertTriangle className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-[10px] font-mono tracking-widest text-gray-300 uppercase font-bold">
              THE ASYMMETRY PROBLEM (PS-01)
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            Data Is Public. <span className="text-gray-400">The Reasoning Layer Was Missing.</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed max-w-3xl mx-auto">
            India added <strong className="text-white">130M new retail investors in 4 years</strong>, with <strong className="text-white">80% under the age of 30</strong>. The bottleneck was never data access — NSE tick feeds, SEBI filings, FII flows, earnings transcripts, and options chains are all public. The missing link is the <em>autonomous reasoning layer</em> that synthesizes disparate feeds into actionable, risk-governed decisions in seconds.
          </p>
        </div>

        {/* Contrast Card: Institutional vs Retail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Institutional Side */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                THE HEDGE FUND DESK
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300 border border-white/20">
                ASYMMETRIC ADVANTAGE
              </span>
            </div>
            <p className="text-sm text-gray-300 font-sans leading-relaxed">
              A hedge fund runs parallel analyst teams across fundamentals, technical Greeks, regulatory compliance, and macro flows before committing capital to a single position.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-gray-400 space-y-1">
              <div className="flex justify-between"><span>Execution Time:</span> <strong className="text-white">&lt; 100ms Colocated</strong></div>
              <div className="flex justify-between"><span>Team Size:</span> <strong className="text-white">4 Specialized Desks</strong></div>
              <div className="flex justify-between"><span>Risk Framework:</span> <strong className="text-white">Real-Time Greeks &amp; Vector RAG</strong></div>
            </div>
          </div>

          {/* Retail Side - Highlight Loss in Red (Allowed) */}
          <div className="glass-panel rounded-2xl p-6 border border-rose-500/30 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-rose-400 uppercase">
                THE RETAIL REALITY
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
                89% LOSS RATE
              </span>
            </div>
            <p className="text-sm text-gray-300 font-sans leading-relaxed">
              A retail investor gets a basic delayed price chart, noisy social sentiment, and an unvetted Telegram tip — trading blind into high-gamma expiry traps.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-gray-400 space-y-1">
              <div className="flex justify-between"><span>Research Time:</span> <strong className="text-rose-400">4-6 Hours Manual</strong></div>
              <div className="flex justify-between"><span>Information:</span> <strong className="text-rose-400">Fragmented &amp; Unverified</strong></div>
              <div className="flex justify-between"><span>Outcome:</span> <strong className="text-rose-400 font-bold">Severe Capital Drawdown</strong></div>
            </div>
          </div>
        </div>

        {/* 3-Icon Row Previewing Multi-Agent Approach - Monochrome */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl glass-panel border border-white/10 text-left space-y-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <LineChart className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-display font-bold text-white tracking-wide">
              1. Quantitative &amp; Options Desk
            </h3>
            <p className="text-xs text-gray-400 font-sans">
              Calculates real-time Options Greeks (Delta, Gamma, Theta decay) and evaluates Put-Call Ratio dynamics.
            </p>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-white/10 text-left space-y-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-display font-bold text-white tracking-wide">
              2. Regulatory RAG &amp; Filings
            </h3>
            <p className="text-xs text-gray-400 font-sans">
              Semantic vector indexing of SEBI disclosures, insider pledges, auditor notes, and corporate governance filings.
            </p>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-white/10 text-left space-y-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <MessageSquareShare className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-display font-bold text-white tracking-wide">
              3. Sentiment &amp; Macro Flows
            </h3>
            <p className="text-xs text-gray-400 font-sans">
              Tracks institutional FII/DII cash flow velocity, global macro sentiment, and cross-market volatility.
            </p>
          </div>
        </div>

        {/* Action Link to Simulator */}
        <div className="text-center pt-2">
          <Link
            href="/simulator"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-gray-300 uppercase tracking-wider transition-colors cursor-target"
            data-cursor-label="GO // SIMULATOR"
          >
            <span>Experience the Tri-Agent Engine in the Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
