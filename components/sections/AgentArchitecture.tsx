"use client";

import React, { useState } from "react";
import { Cpu, LineChart, FileCheck2, MessageSquareShare, Sparkles, Database, CheckCircle2, ArrowRight } from "lucide-react";

interface AgentDetail {
  id: string;
  name: string;
  codename: string;
  icon: any;
  description: string;
  inputs: string[];
  algorithms: string[];
  sampleThought: string;
}

const AGENTS: AgentDetail[] = [
  {
    id: "technical",
    name: "Quantitative & Technical Desk",
    codename: "DESK 01 // QUANT-GREEKS",
    icon: LineChart,
    description:
      "Deeply dissects high-frequency options chains, Greeks, open interest shifts, and algorithmic order flow to detect institutional support walls.",
    inputs: [
      "NSE / BSE Real-time Tick Data",
      "Options Chain Greeks (Delta, Gamma, Theta, Vega)",
      "Put-Call Ratio (PCR) & Max Pain Thresholds",
      "Order Book Depth & Dark Pool Blocks",
    ],
    algorithms: [
      "Black-Scholes-Merton Volatility Surface",
      "Volume Weighted Average Price (VWAP) Standard Deviation Bands",
      "Support/Resistance Liquidity Clusters",
    ],
    sampleThought:
      "[AGENT_QUANT]: Spotting 2,450 Put Wall buildup (+18% OI). Gamma flip identified at 2,480. Institutional absorption underway.",
  },
  {
    id: "regulatory",
    name: "Regulatory RAG & Filings Desk",
    codename: "DESK 02 // SEBI-RAG",
    icon: FileCheck2,
    description:
      "Performs vector semantic retrieval over thousands of SEBI regulatory filings, auditor notes, and earnings transcripts with verifiable citations.",
    inputs: [
      "SEBI Corporate Disclosures & Circulars",
      "Quarterly Earnings Transcripts & Audio RAG",
      "Insider Trading & Pledge Disclosures",
      "Auditor Qualification Notes & Balance Sheet Red Flags",
    ],
    algorithms: [
      "Vector Semantic Search (Pinecone/Milvus Index)",
      "Named Entity Discrepancy Extractor",
      "Risk Score & Governance Evaluation Model",
    ],
    sampleThought:
      "[AGENT_REGULATORY]: Verified SEBI Filing #SEBI/2026/DISC-094. Promoter pledge reduced from 14% to 4%. No auditor qualifications noted in FY26 Q2.",
  },
  {
    id: "sentiment",
    name: "Sentiment & Alt-Data Desk",
    codename: "DESK 03 // ALT-TELEMETRY",
    icon: MessageSquareShare,
    description:
      "Monitors market psychology across FinTwit, Reddit, news wires, and tracks real-time FII/DII institutional cash market buying pressure.",
    inputs: [
      "Financial News Wire Streams & Press Releases",
      "Retail Velocity (Reddit, FinTwit, Forum chatter)",
      "FII / DII Daily Cash & Futures Net Flows",
      "Global Macro Telemetry (Crude, US Dollar Index, Yields)",
    ],
    algorithms: [
      "Financial Domain Transformer Sentiment Engine (FinBERT)",
      "Noise & Bot Manipulation Filtration",
      "Cross-Asset Macro Correlation Matrix",
    ],
    sampleThought:
      "[AGENT_SENTIMENT]: News sentiment positive (0.84 score). FII Net Cash Inflow +₹2,840 Cr. Social retail buzz normal without speculative euphoria.",
  },
];

export const AgentArchitecture: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState<AgentDetail>(AGENTS[0]);

  return (
    <section id="architecture" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-mono font-bold tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>AUTONOMOUS MULTI-AGENT ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
            Three Parallel Desks. <br />
            <span className="text-gray-400">
              One Unified Consensus Core.
            </span>
          </h2>

          <p className="text-gray-300 font-sans text-base sm:text-lg leading-relaxed">
            Rather than relying on a single black-box model, Spider-Sense runs 3 specialized autonomous agents that cross-examine findings before generating a synthesis.
          </p>
        </div>

        {/* Agent Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AGENTS.map((agent) => {
            const isActive = activeAgent.id === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent)}
                className={`p-5 rounded-xl border text-left transition-all duration-200 relative overflow-hidden cursor-target ${
                  isActive
                    ? "glass-panel border-white/40 shadow-md"
                    : "bg-black/40 border-white/10 hover:border-white/25"
                }`}
                data-cursor-label={`AGENT // ${agent.id.toUpperCase()}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg border border-white/20 bg-white/10 text-white flex items-center justify-center">
                    <agent.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-400">
                    {agent.codename.split("//")[1]?.trim()}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-display mb-1">
                  {agent.name}
                </h3>
                <p className="text-xs text-gray-400 font-sans line-clamp-2">
                  {agent.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Agent Console Details */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded uppercase tracking-wider text-white bg-white/10 border border-white/20">
                  {activeAgent.codename}
                </span>
                <span className="text-xs font-mono text-gray-400">| REAL-TIME DESK</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white">
                {activeAgent.name}
              </h3>

              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                {activeAgent.description}
              </p>

              {/* Ingested Feeds */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-white" /> INGESTED LIVE DATA STREAMS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeAgent.inputs.map((input, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-gray-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-white" />
                      <span className="truncate">{input}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Live Terminal */}
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-[#090b0e] border border-white/10 p-5 shadow-lg space-y-3 font-mono text-xs text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span className="text-[10px] text-gray-400 ml-2">AGENT_REASONING</span>
                  </div>
                  <span className="text-[10px] text-white flex items-center gap-1">
                    ONLINE
                  </span>
                </div>

                <div className="space-y-2 text-gray-300 min-h-[120px]">
                  <p className="text-gray-500">&gt; Streaming verified telemetry...</p>
                  <div className="p-3 rounded bg-black/60 border border-white/20 leading-relaxed text-xs text-gray-200">
                    <span>{activeAgent.sampleThought}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1 pt-1">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    <span>Synthesis consensus lock: 0.94 probability</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Synthesis Core Banner */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                THE SPIDER-SENSE CONSENSUS CORE
              </span>
            </div>
            <h4 className="text-xl font-display font-bold text-white">
              Autonomous Consensus Synthesis in &lt; 60 Seconds
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 font-sans max-w-2xl">
              When all 3 agents finish evaluation, the synthesis engine resolves discrepancies, tags the position with a Spider Mode, calculates risk-adjusted stop losses, and outputs cited explanations.
            </p>
          </div>

          <a
            href="/simulator"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-200 text-black font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-target flex items-center gap-2"
            data-cursor-label="RUN // AGENTS"
          >
            <span>Run Simulation</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
