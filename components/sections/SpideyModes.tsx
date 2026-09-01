"use client";

import React, { useState } from "react";
import { SpiderThreatRadar, RadarData } from "@/components/ui/SpiderThreatRadar";
import {
  Sparkles,
  ShieldAlert,
  Zap,
  ShieldCheck,
  Activity,
  Search,
} from "lucide-react";

interface PresetStock {
  ticker: string;
  name: string;
  category: string;
  data: RadarData;
  description: string;
  actionTag: string;
}

const PRESET_STOCKS: PresetStock[] = [
  {
    ticker: "RELIANCE.NS",
    name: "Reliance Industries Ltd",
    category: "Energy & Telecom Heavyweight",
    data: { volatility: 38, fiiFlow: 3200, momentum: 2.4 },
    description: "Strong institutional buying, green energy CAPEX approvals, stable low-beta floor. Full consensus active.",
    actionTag: "SPIDEY MODE // STRONG BUY",
  },
  {
    ticker: "PAYTM.NS",
    name: "One97 Communications",
    category: "Fintech High Volatility",
    data: { volatility: 84, fiiFlow: -2450, momentum: -3.8 },
    description: "Regulatory scrutiny on payments bank, heavy institutional liquidation, severe options put-wall pressure.",
    actionTag: "VENOM MODE // DANGER TRAP",
  },
  {
    ticker: "ZOMATO.NS",
    name: "Zomato Ltd (Eternal)",
    category: "Quick-Commerce Growth",
    data: { volatility: 62, fiiFlow: 1800, momentum: 4.8 },
    description: "Blinkit gross order value expansion, aggressive retail velocity, bio-electric momentum surge.",
    actionTag: "MILES MORALES // BREAKOUT",
  },
  {
    ticker: "HDFCBANK.NS",
    name: "HDFC Bank Ltd",
    category: "Banking Bluechip",
    data: { volatility: 28, fiiFlow: 850, momentum: 0.8 },
    description: "Low-drawdown valuation base, deposit ratio stabilization, safe harbor capital preservation.",
    actionTag: "PETER PARKER // VALUE ACCUMULATION",
  },
  {
    ticker: "TATASTEEL.NS",
    name: "Tata Steel Ltd",
    category: "Metals & Commodities",
    data: { volatility: 74, fiiFlow: -1600, momentum: -1.2 },
    description: "Global commodity softening, elevated debt leverage, options delta divergence. High risk.",
    actionTag: "VENOM MODE // DO NOT ENTER",
  },
];

export const SpideyModes: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<PresetStock>(PRESET_STOCKS[0]);
  const [customData, setCustomData] = useState<RadarData>(PRESET_STOCKS[0].data);

  const handleStockSelect = (stock: PresetStock) => {
    setSelectedStock(stock);
    setCustomData(stock.data);
  };

  return (
    <section id="radar-matrix" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-mono font-bold tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5" />
            <span>FINANCIAL SPIDER-SENSE &amp; THREAT RADAR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
            The Spider-Sense <br />
            <span className="text-gray-400">
              Threat Mode Matrix
            </span>
          </h2>

          <p className="text-gray-300 font-sans text-base sm:text-lg leading-relaxed">
            Our multi-agent neural core continuously maps 3 critical vector dimensions into actionable tactical modes — warning you before traps snap shut.
          </p>
        </div>

        {/* 3 Core Indicator Explanations - Monochrome */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-xl p-5 border border-white/15">
            <div className="flex items-center gap-2 text-gray-300 font-mono text-xs font-bold uppercase mb-1.5">
              <span>VOLATILITY (0 - 100)</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">Market Uncertainty &amp; Swings</h4>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Measures realized vs implied volatility, ATM options IV crush risk, and tail-risk dispersion before earnings.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-5 border border-white/15">
            <div className="flex items-center gap-2 text-gray-300 font-mono text-xs font-bold uppercase mb-1.5">
              <span>FII FLOW (₹ Cr)</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">Foreign Institutional Pressure</h4>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Shows institutional net buying or selling volume, dark pool block-deal accumulation, and foreign cash flows.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-5 border border-white/15">
            <div className="flex items-center gap-2 text-gray-300 font-mono text-xs font-bold uppercase mb-1.5">
              <span>MOMENTUM (%)</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">Kinetic Price Velocity</h4>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Calculates rate of change, gamma squeeze trajectory, volume-weighted breakout strength, and multi-timeframe alignment.
            </p>
          </div>
        </div>

        {/* Interactive Threat Radar Lab & Preset Stock Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
          {/* Left: Preset Stocks */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-gray-300 tracking-wider uppercase flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" /> TEST REAL-WORLD SCENARIOS
              </span>
              <span className="text-[10px] font-mono text-gray-400">SELECT TICKER</span>
            </div>

            {/* Stock Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_STOCKS.map((stock) => {
                const isSelected = selectedStock.ticker === stock.ticker;
                const isVenom = stock.data.volatility >= 68 && (stock.data.fiiFlow < 0 || stock.data.momentum < -1.5);
                const isSpidey = stock.data.fiiFlow >= 1500 && stock.data.momentum >= 1.5;
                const isMiles = stock.data.momentum >= 3.5;

                return (
                  <button
                    key={stock.ticker}
                    onClick={() => handleStockSelect(stock)}
                    className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-target ${
                      isSelected
                        ? "glass-panel border-white/40 shadow-sm"
                        : "bg-black/40 border-white/10 hover:border-white/20"
                    }`}
                    data-cursor-label={`SELECT // ${stock.ticker.split('.')[0]}`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-mono font-bold text-white text-xs">
                        {stock.ticker.replace(".NS", "")}
                      </span>
                      <span
                        className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-white/10 text-gray-300 border border-white/10"
                      >
                        {isVenom ? "VENOM" : isSpidey ? "SPIDEY" : isMiles ? "MILES" : "PETER"}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 truncate font-sans">{stock.name}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Scenario Details */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white font-bold">{selectedStock.name}</span>
                <span className="text-[10px] font-mono text-gray-400">{selectedStock.category}</span>
              </div>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                {selectedStock.description}
              </p>
            </div>

            {/* 4 Mode Glossary - Monochrome */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>SPIDEY: Safe Accumulation</span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
                <ShieldAlert className="w-3 h-3 shrink-0" />
                <span>VENOM: Avoid Entry</span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
                <Zap className="w-3 h-3 shrink-0" />
                <span>MILES: Momentum Breakout</span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 shrink-0" />
                <span>PETER: Defensive Value</span>
              </div>
            </div>
          </div>

          {/* Right: Live Threat Radar */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <SpiderThreatRadar
              data={customData}
              interactive={true}
              onChange={setCustomData}
              size={310}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
