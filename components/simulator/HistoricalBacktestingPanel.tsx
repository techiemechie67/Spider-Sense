"use client";

import React, { useState } from "react";
import { History, Sparkles } from "lucide-react";

export interface MacroEvent {
  id: string;
  name: string;
  dateRange: string;
  niftyMove: string;
  description: string;
  sectorReturns: {
    sector: string;
    returnPct: number;
  }[];
  synthesisCitation: string;
}

export const MACRO_EVENTS: MacroEvent[] = [
  {
    id: "covid-2020",
    name: "COVID-19 Global Crash",
    dateRange: "Feb – Mar 2020",
    niftyMove: "-38.4%",
    description: "Unprecedented global liquidity shock followed by historic fiscal stimulus & pharma super-cycle.",
    sectorReturns: [
      { sector: "Pharma", returnPct: +18.4 },
      { sector: "IT", returnPct: -14.2 },
      { sector: "FMCG", returnPct: -18.5 },
      { sector: "Energy", returnPct: -32.8 },
      { sector: "Auto", returnPct: -41.2 },
      { sector: "Banking", returnPct: -46.5 },
    ],
    synthesisCitation: "Pattern match: Severe liquidity flight to defensive healthcare & high-cash IT reserves.",
  },
  {
    id: "demonetization-2016",
    name: "2016 Demonetization Shock",
    dateRange: "Nov – Dec 2016",
    niftyMove: "-6.3%",
    description: "Sudden cash ban impacting unorganized retail and real estate; kickstarted digital fintech adoption.",
    sectorReturns: [
      { sector: "IT", returnPct: +3.2 },
      { sector: "Pharma", returnPct: +1.8 },
      { sector: "Energy", returnPct: -2.1 },
      { sector: "FMCG", returnPct: -5.4 },
      { sector: "Auto", returnPct: -11.2 },
      { sector: "Real Estate", returnPct: -21.4 },
    ],
    synthesisCitation: "Pattern match: Disruption in cash-heavy sectors with rapid rerouting into formal financial assets.",
  },
  {
    id: "ilfs-2018",
    name: "2018 IL&FS & NBFC Liquidity Crisis",
    dateRange: "Sep – Oct 2018",
    niftyMove: "-14.8%",
    description: "Default by infrastructure financier triggered credit freeze across shadow banks and commercial paper.",
    sectorReturns: [
      { sector: "IT", returnPct: +4.5 },
      { sector: "FMCG", returnPct: -3.2 },
      { sector: "Pharma", returnPct: -6.8 },
      { sector: "Energy", returnPct: -12.4 },
      { sector: "Auto", returnPct: -16.8 },
      { sector: "NBFC / Fin", returnPct: -34.2 },
    ],
    synthesisCitation: "Pattern match: Severe collateral spread widening; high-tier banks absorbed shadow banking market share.",
  },
  {
    id: "tradewar-2018",
    name: "US–China Tariff Escalation",
    dateRange: "Jul 2018 – May 2019",
    niftyMove: "+8.2%",
    description: "Protectionist trade tariffs redirected global supply-chains towards Indian specialty chemicals and EMS.",
    sectorReturns: [
      { sector: "EMS / Tech", returnPct: +24.6 },
      { sector: "Banking", returnPct: +14.2 },
      { sector: "FMCG", returnPct: +9.8 },
      { sector: "Auto", returnPct: -8.4 },
      { sector: "Metals", returnPct: -18.2 },
    ],
    synthesisCitation: "Pattern match: Global tariff friction triggering domestic manufacturing PLI outperformance.",
  },
  {
    id: "ukraine-2022",
    name: "Russia–Ukraine War Outbreak",
    dateRange: "Feb – Mar 2022",
    niftyMove: "-7.4%",
    description: "Crude oil spiked above $130/bbl causing rapid inflation spikes across energy import nations.",
    sectorReturns: [
      { sector: "Metals", returnPct: +16.2 },
      { sector: "Energy", returnPct: +11.4 },
      { sector: "Pharma", returnPct: -2.1 },
      { sector: "Banking", returnPct: -8.6 },
      { sector: "Paints / FMCG", returnPct: -14.8 },
      { sector: "Auto", returnPct: -16.2 },
    ],
    synthesisCitation: "Pattern match: Extreme crude cost pass-through pressure on consumer margins with upstream energy hedge.",
  },
  {
    id: "ratehike-2022",
    name: "Global Fed & RBI Rate-Hike Cycle",
    dateRange: "May – Dec 2022",
    niftyMove: "+4.1%",
    description: "Aggressive 500bps global rate hikes; Indian domestic banking margins peaked on credit expansion.",
    sectorReturns: [
      { sector: "Banking", returnPct: +21.4 },
      { sector: "Auto", returnPct: +15.8 },
      { sector: "FMCG", returnPct: +8.2 },
      { sector: "Pharma", returnPct: -4.6 },
      { sector: "IT Services", returnPct: -24.8 },
    ],
    synthesisCitation: "Pattern match: Valuations de-rated in high-multiple tech while private banking net interest margins surged.",
  },
  {
    id: "svb-2023",
    name: "SVB & US Regional Banking Crisis",
    dateRange: "Mar 2023",
    niftyMove: "-3.2%",
    description: "HTM bond duration losses caused rapid deposit run on Silicon Valley Bank and Credit Suisse bailout.",
    sectorReturns: [
      { sector: "Pharma", returnPct: +4.2 },
      { sector: "FMCG", returnPct: +2.8 },
      { sector: "Energy", returnPct: -1.4 },
      { sector: "Indian Banking", returnPct: -2.2 },
      { sector: "IT Services", returnPct: -8.9 },
    ],
    synthesisCitation: "Pattern match: Indian banking showed zero systemic contagion due to robust RBI LCR liquidity buffers.",
  },
];

interface HistoricalBacktestingPanelProps {
  onSelectEvent?: (event: MacroEvent) => void;
}

export const HistoricalBacktestingPanel: React.FC<HistoricalBacktestingPanelProps> = ({
  onSelectEvent,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<MacroEvent>(MACRO_EVENTS[0]);

  const handleSelect = (ev: MacroEvent) => {
    setSelectedEvent(ev);
    if (onSelectEvent) onSelectEvent(ev);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-white" />
          <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
            Historical Macro Event Backtesting
          </h3>
        </div>
        <span className="text-[10px] font-mono text-gray-400">
          Decade-Long Stress Window Analysis
        </span>
      </div>

      {/* Event Selector Chips - Monochrome */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {MACRO_EVENTS.map((ev) => {
          const isSelected = selectedEvent.id === ev.id;
          return (
            <button
              key={ev.id}
              onClick={() => handleSelect(ev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shrink-0 cursor-target ${
                isSelected
                  ? "bg-white text-black shadow-sm"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
              data-cursor-label={`EVENT // ${ev.name}`}
            >
              <span>{ev.name}</span>
              <span className="text-[10px] text-gray-400 ml-1.5 font-normal">({ev.dateRange})</span>
            </button>
          );
        })}
      </div>

      {/* Event Summary Box */}
      <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1 text-xs">
        <div className="flex items-center justify-between font-mono">
          <span className="text-white font-bold">{selectedEvent.name}</span>
          <span
            className={`font-bold ${
              selectedEvent.niftyMove.startsWith("+") ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            NIFTY 50: {selectedEvent.niftyMove}
          </span>
        </div>
        <p className="text-gray-300 font-sans text-[11px] leading-relaxed">
          {selectedEvent.description}
        </p>
      </div>

      {/* Sector Returns - Profit in Green, Loss in Red */}
      <div className="space-y-2">
        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
          Sector Relative Performance During Episode:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {selectedEvent.sectorReturns.map((item, idx) => {
            const isPos = item.returnPct >= 0;
            return (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
                  isPos
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                }`}
              >
                <span className="text-gray-200 font-medium">{item.sector}</span>
                <span className="font-bold">
                  {isPos ? "+" : ""}
                  {item.returnPct.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Synthesis Agent Citation Integration - Monochrome */}
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
        <span className="text-[10px] font-mono text-white font-bold uppercase flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-white" /> SYNTHESIS AGENT PATTERN MATCH
        </span>
        <p className="text-gray-300 font-mono text-[11px]">
          &quot;{selectedEvent.synthesisCitation}&quot;
        </p>
      </div>
    </div>
  );
};
