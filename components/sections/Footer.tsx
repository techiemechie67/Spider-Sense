"use client";

import React from "react";
import Link from "next/link";
import { Shield, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-transparent py-12 px-4 sm:px-6 lg:px-8 text-gray-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Attribution */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Shield className="w-4 h-4 text-white" />
            <span className="font-display font-bold text-base text-white tracking-wider">
              SPIDER-SENSE
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-gray-300 border border-white/20">
              PS-01
            </span>
          </div>
          <p className="text-gray-400 font-sans text-xs">
            HackVerse: Into the Web • Sprint 1 • IEEE RAS VIT Chennai Student Chapter • 2026
          </p>
          <p className="text-[11px] text-gray-500 font-sans">
            Built by <strong className="text-gray-300">Team TechieMechie</strong> (Mechanical &amp; CS Freshers, VIT Chennai).
          </p>
        </div>

        {/* Links to Separate Pages */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
          <a
            href="https://www.linkedin.com/company/143088470"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1 cursor-target"
            data-cursor-label="LINK // LINKEDIN"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <Link
            href="/pipeline"
            className="hover:text-white transition-colors cursor-target"
            data-cursor-label="NAV // PIPELINE"
          >
            Pipeline
          </Link>
          <Link
            href="/problem"
            className="hover:text-white transition-colors cursor-target"
            data-cursor-label="NAV // PROBLEM"
          >
            Problem PS-01
          </Link>
          <Link
            href="/team"
            className="hover:text-white transition-colors cursor-target"
            data-cursor-label="NAV // TEAM"
          >
            Team TechieMechie
          </Link>
          <Link
            href="/simulator"
            className="text-white hover:text-gray-300 font-bold transition-colors cursor-target"
            data-cursor-label="LAUNCH // SIMULATOR"
          >
            Launch Simulator &rarr;
          </Link>
        </div>
      </div>
    </footer>
  );
};
