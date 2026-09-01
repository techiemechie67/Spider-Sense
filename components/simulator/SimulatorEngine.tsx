"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SpiderThreatRadar, getSpideyMode } from "@/components/ui/SpiderThreatRadar";
import { ALL_150_STOCKS, StockItem } from "@/lib/stockData";
import { LivePriceChart } from "@/components/simulator/LivePriceChart";
import { CallPutOptionsCharts } from "@/components/simulator/CallPutOptionsCharts";
import { HistoricalBacktestingPanel } from "@/components/simulator/HistoricalBacktestingPanel";
import { MacroSentimentStrip } from "@/components/simulator/MacroSentimentStrip";
import {
  RotateCcw,
  LineChart,
  FileCheck2,
  MessageSquareShare,
  Download,
  ArrowLeft,
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type CategoryFilter = "ALL" | "NIFTY 50" | "SENSEX 30" | "NIFTY NEXT 50" | "HIGH BETA & F&O" | "MIDCAP ALPHA";

export const SimulatorEngine: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<StockItem>(ALL_150_STOCKS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("ALL");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [reportExported, setReportExported] = useState(false);

  const modeInfo = getSpideyMode(selectedStock.data);

  // Determine if stock is recommended or an avoid/sell
  const isAvoidStock =
    selectedStock.targetPrice.includes("NOT RECOMMENDED") ||
    selectedStock.targetPrice.includes("AVOID") ||
    modeInfo.verdict.toLowerCase().includes("avoid") ||
    modeInfo.verdict.toLowerCase().includes("toxic") ||
    (selectedStock.data.volatility > 70 && selectedStock.data.fiiFlow < 0);

  // Parse numeric price for live chart
  const numericPrice = useMemo(() => {
    const clean = selectedStock.price.replace(/[^0-9.]/g, "");
    return parseFloat(clean) || 1000;
  }, [selectedStock.price]);

  // Filtered stocks
  const filteredStocks = useMemo(() => {
    return ALL_150_STOCKS.filter((stock) => {
      const matchesCategory =
        selectedCategory === "ALL" || stock.category === selectedCategory;
      const matchesSearch =
        stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.sector.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(1);
    setLogs([]);
    setReportExported(false);

    const steps = [
      {
        step: 1,
        log: `[DATA_FEED]: Ingesting live tick stream & SEBI vector indices for ${selectedStock.ticker}...`,
        delay: 250,
      },
      {
        step: 2,
        log: `[QUANT_DESK]: Options Call vs Put Greeks. Delta ${selectedStock.quantAnalysis.greeks}. PCR: ${selectedStock.quantAnalysis.pcr}.`,
        delay: 650,
      },
      {
        step: 3,
        log: `[REGULATORY_RAG]: Vector search: "${selectedStock.regulatoryAnalysis.sebiFilings}" (Gov Score: ${selectedStock.regulatoryAnalysis.governanceScore}/100).`,
        delay: 1050,
      },
      {
        step: 4,
        log: `[SENTIMENT_TELEMETRY]: ${selectedStock.sentimentAnalysis.fiiFlowText} Macro context: India VIX calm, Global markets stable.`,
        delay: 1450,
      },
      {
        step: 5,
        log: `[CONSENSUS_CORE]: Mode tagged: ${modeInfo.title}. Verdict: ${modeInfo.verdict}.`,
        delay: 1850,
      },
      {
        step: 6,
        log: `[DOSSIER_COMPLETE]: Synthesis locked. Target: ${selectedStock.targetPrice} | Stop Loss: ${selectedStock.stopLoss}.`,
        delay: 2250,
      },
    ];

    steps.forEach(({ step, log, delay }) => {
      setTimeout(() => {
        setSimulationStep(step);
        setLogs((prev) => [...prev, log]);

        if (step === 6) {
          setIsSimulating(false);
        }
      }, delay);
    });
  };

  useEffect(() => {
    runSimulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStock]);

  const handleExport = () => {
    setReportExported(true);
    const content = `
================================================================================
SPIDER-SENSE FINANCIAL INTELLIGENCE DOSSIER // HACKVERSE PS-01
================================================================================
TICKER: ${selectedStock.ticker} (${selectedStock.name})
CURRENT PRICE: ${selectedStock.price} (${selectedStock.change})
SECTOR: ${selectedStock.sector} | INDEX: ${selectedStock.category}
TIMESTAMP: ${new Date().toISOString()}

SPIDER-SENSE MODE: ${modeInfo.title}
VERDICT: ${modeInfo.verdict}
RECOMMENDATION: ${modeInfo.recommendation}

EXECUTION PLAN:
- Target Price: ${selectedStock.targetPrice}
- Stop Loss: ${selectedStock.stopLoss}
- Time Horizon: ${selectedStock.timeHorizon}

F&O DERIVATIVE READINGS:
- Put-Call Ratio (PCR): ${selectedStock.quantAnalysis.pcr}
- Support: ${selectedStock.quantAnalysis.support}
- Resistance: ${selectedStock.quantAnalysis.resistance}
- Quantitative Summary: ${selectedStock.quantAnalysis.summary}

REGULATORY COMPLIANCE VERIFICATION:
- SEBI Filings: ${selectedStock.regulatoryAnalysis.sebiFilings}
- Governance Rating: ${selectedStock.regulatoryAnalysis.governanceScore}/100
- Auditor Notes: ${selectedStock.regulatoryAnalysis.auditorNotes}
================================================================================
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SPIDER_SENSE_${selectedStock.ticker}_DOSSIER.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-gray-100">
      <div className="relative z-10 max-w-7xl mx-auto space-y-5">
        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between gap-3 pb-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all font-mono text-xs cursor-target"
            data-cursor-label="NAV // HOME"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-target flex items-center gap-1.5 ${
                isSimulating
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-200 text-black shadow-sm"
              }`}
              data-cursor-label="RESCAN // TICKER"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
              <span>{isSimulating ? "Scanning..." : "Re-Scan"}</span>
            </button>

            <button
              onClick={handleExport}
              className="px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase bg-white/5 border border-white/10 text-gray-200 hover:text-white hover:border-white/30 transition-all cursor-target flex items-center gap-1.5"
              data-cursor-label="EXPORT // DOSSIER"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{reportExported ? "Exported!" : "Export Dossier"}</span>
            </button>
          </div>
        </div>

        {/* Cross-Market Macro Sentiment Overlay Strip */}
        <MacroSentimentStrip />

        {/* Ticker Search & Category Filter Section */}
        <div className="glass-panel rounded-2xl p-3.5 border border-white/10 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 150+ Stocks (e.g. Reliance, Zomato, HAL, TCS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* Category Filter Chips - Monochrome */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-xs font-mono">
              {(
                [
                  "ALL",
                  "NIFTY 50",
                  "SENSEX 30",
                  "NIFTY NEXT 50",
                  "HIGH BETA & F&O",
                  "MIDCAP ALPHA",
                ] as CategoryFilter[]
              ).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all shrink-0 cursor-target ${
                    selectedCategory === cat
                      ? "bg-white text-black shadow-sm"
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/5"
                  }`}
                  data-cursor-label={`FILTER // ${cat}`}
                >
                  {cat === "ALL" ? "All (150+)" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Ticker Horizontal Scrollbar - Profit in Green, Loss in Red */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
            {filteredStocks.map((stock) => {
              const isSelected = selectedStock.ticker === stock.ticker;
              return (
                <button
                  key={stock.ticker}
                  onClick={() => setSelectedStock(stock)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all shrink-0 cursor-target flex items-center gap-2 ${
                    isSelected
                      ? "glass-panel border-white/40 text-white shadow-sm"
                      : "bg-black/40 border border-white/5 text-gray-400 hover:text-white hover:border-white/20"
                  }`}
                  data-cursor-label={`TICKER // ${stock.ticker}`}
                >
                  <span>{stock.ticker}</span>
                  <span className="text-[10px] text-gray-400 font-sans">{stock.price}</span>
                  <span
                    className={`text-[9px] ${
                      stock.isPositive ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {stock.change}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= VERDICT & ADVISORY SUMMARY ================= */}
        <div className={`rounded-2xl p-4 sm:p-5 border space-y-3 ${
          isAvoidStock
            ? "bg-rose-950/20 border-rose-500/40"
            : "glass-panel border-white/20"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              {isAvoidStock ? (
                <div className="flex items-center gap-1.5 text-rose-400">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                    ADVISORY VERDICT: DO NOT BUY / AVOID ENTRY
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    ADVISORY VERDICT: {modeInfo.verdict.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <span className="text-xs font-mono text-gray-300 font-bold">
              {selectedStock.name} ({selectedStock.ticker}) • {selectedStock.price} (
              <span className={selectedStock.isPositive ? "text-emerald-400" : "text-rose-400"}>
                {selectedStock.change}
              </span>
              )
            </span>
          </div>

          {/* 3 Simple Action Steps - Profit in Green, Loss in Red, rest monochrome */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-0.5">
              <span className="text-[10px] text-gray-400 uppercase">
                {isAvoidStock ? "RISK LEVEL" : "SUPPORT ACCUMULATION"}
              </span>
              <p className={`text-sm font-bold mt-0.5 ${isAvoidStock ? "text-rose-400" : "text-white"}`}>
                {isAvoidStock ? "HIGH RISK / SEVERE DOWNSIDE" : selectedStock.quantAnalysis.support}
              </p>
              <p className="text-[10px] text-gray-400 font-sans">
                {isAvoidStock ? "Do not accumulate into falling knives" : "Key floor support level"}
              </p>
            </div>

            <div className={`p-3 rounded-xl bg-black/50 border space-y-0.5 ${
              isAvoidStock ? "border-rose-500/30" : "border-emerald-500/30"
            }`}>
              <span className={`text-[10px] uppercase ${isAvoidStock ? "text-rose-400" : "text-emerald-400"}`}>
                {isAvoidStock ? "PRICE TRAJECTORY" : "PROFIT TARGET"}
              </span>
              <p className={`text-sm font-bold mt-0.5 ${isAvoidStock ? "text-rose-400" : "text-emerald-400"}`}>
                {selectedStock.targetPrice}
              </p>
              <p className="text-[10px] text-gray-400 font-sans">
                {isAvoidStock ? "Severe downward drift expected" : "Target resistance band"}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-black/50 border border-rose-500/30 space-y-0.5">
              <span className="text-[10px] text-rose-400 uppercase">STOP LOSS / EXIT</span>
              <p className="text-sm font-bold text-rose-400 mt-0.5">{selectedStock.stopLoss}</p>
              <p className="text-[10px] text-gray-400 font-sans">Strict capital preservation trigger</p>
            </div>
          </div>
        </div>

        {/* ================= 2 GRAPHS PER STOCK (CALL CE & PUT PE) ================= */}
        <CallPutOptionsCharts
          ticker={selectedStock.ticker}
          basePrice={numericPrice}
          isPositive={selectedStock.isPositive}
        />

        {/* ================= 2-COLUMN CLUSTER: CHARTS & EVIDENCE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left: Intraday Live Price Chart & Threat Radar */}
          <div className="lg:col-span-6 space-y-5">
            <LivePriceChart
              ticker={selectedStock.ticker}
              basePrice={numericPrice}
              isPositive={selectedStock.isPositive}
            />

            <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-xs font-mono">
                <span className="text-gray-300 font-bold uppercase">THREAT RADAR TELEMETRY</span>
                <span className="text-gray-300 font-bold">{selectedStock.category}</span>
              </div>
              <SpiderThreatRadar data={selectedStock.data} size={280} />
            </div>
          </div>

          {/* Right: Reasoning Stream & Verified Citations - Monochrome */}
          <div className="lg:col-span-6 space-y-5">
            {/* Live Streaming Console */}
            <div className="rounded-2xl bg-[#07080c] border border-white/10 p-4 sm:p-5 shadow-lg space-y-3 font-mono text-xs text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-bold tracking-wider">
                    PARALLEL AGENT REASONING STREAM
                  </span>
                </div>
                <span className="text-[10px] text-gray-300 px-2 py-0.5 rounded bg-white/10 border border-white/20">
                  {simulationStep === 6 ? "SYNTHESIS LOCKED" : `STEP ${simulationStep}/6`}
                </span>
              </div>

              {/* Console Logs Box */}
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 min-h-[140px] text-xs space-y-1.5 max-h-[160px] overflow-y-auto">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2 text-gray-300 leading-relaxed"
                  >
                    <span className="text-gray-400 font-bold shrink-0">&gt;</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cited Proof Cards - Monochrome */}
            <div className="space-y-2.5">
              {/* Desk 1: Quant */}
              <div className="glass-panel rounded-xl p-3.5 border border-white/15 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-white font-bold">
                  <span className="flex items-center gap-1.5">
                    <LineChart className="w-3.5 h-3.5" /> 01. QUANTITATIVE OPTIONS GREEKS
                  </span>
                  <span className="text-gray-400">PCR: {selectedStock.quantAnalysis.pcr}</span>
                </div>
                <p className="text-xs text-gray-400 font-sans">
                  {selectedStock.quantAnalysis.summary}
                </p>
              </div>

              {/* Desk 2: Regulatory RAG */}
              <div className="glass-panel rounded-xl p-3.5 border border-white/15 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-white font-bold">
                  <span className="flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5" /> 02. SEBI REGULATORY RAG FILINGS
                  </span>
                  <span className="text-gray-400">Gov Score: {selectedStock.regulatoryAnalysis.governanceScore}/100</span>
                </div>
                <p className="text-xs text-gray-400 font-sans">
                  Verified Citation: <strong className="text-white">{selectedStock.regulatoryAnalysis.sebiFilings}</strong>
                </p>
              </div>

              {/* Desk 3: Sentiment & Alt Data */}
              <div className="glass-panel rounded-xl p-3.5 border border-white/15 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-white font-bold">
                  <span className="flex items-center gap-1.5">
                    <MessageSquareShare className="w-3.5 h-3.5" /> 03. SENTIMENT &amp; INSTITUTIONAL FII FLOW
                  </span>
                  <span className="text-gray-400">Score: {selectedStock.sentimentAnalysis.socialScore}/100</span>
                </div>
                <p className="text-xs text-gray-400 font-sans">
                  {selectedStock.sentimentAnalysis.fiiFlowText} ({selectedStock.sentimentAnalysis.newsPolarity})
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Macro Historical Backtesting */}
        <HistoricalBacktestingPanel />
      </div>
    </div>
  );
};
