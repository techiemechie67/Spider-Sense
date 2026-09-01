"use client";

import React from "react";
import { Linkedin, Sparkles, Code2, Wrench, Shield, Cpu, Activity } from "lucide-react";
import DecryptedText from "@/components/ui/DecryptedText";

export const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: "Sandru",
      role: "Lead Systems & Multi-Agent Architecture",
      branch: "Mechanical & Systems Engineering",
      icon: Cpu,
    },
    {
      name: "Shailjah",
      role: "Quantitative Finance & Options Greeks",
      branch: "Computer Science & Engineering",
      icon: Activity,
    },
    {
      name: "Kushaanth",
      role: "Regulatory RAG & Vector Filings",
      branch: "Mechanical & Robotics",
      icon: Wrench,
    },
    {
      name: "Pramukh",
      role: "Sentiment Telemetry & Alt-Data Engine",
      branch: "Computer Science & Data",
      icon: Code2,
    },
    {
      name: "Visagan",
      role: "Full-Stack Systems & Telemetry UI",
      branch: "Computer Science & Engineering",
      icon: Shield,
    },
  ];

  return (
    <section id="team" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent">
      {/* Subtle Ambient Vignette */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-white/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        {/* Section Header with DecryptedText Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-[10px] font-mono tracking-widest text-gray-300 uppercase font-bold">
              ABOUT THE BUILDERS
            </span>
          </div>

          <div className="flex justify-center">
            <DecryptedText
              text="TECHIEMECHIE"
              animateOn="view"
              sequential
              revealDirection="start"
              speed={30}
              className="text-white"
              encryptedClassName="text-white/40"
              parentClassName="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide font-display uppercase text-white"
            />
          </div>

          <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed max-w-3xl mx-auto">
            TechieMechie is a crew of mechanical &amp; CS engineering freshers from VIT Chennai — a multidisciplinary team that refuses to be boxed in by branch tags. We&apos;re diving headfirst into tech and hackathons, bringing a fresh, unfiltered perspective and proving you don&apos;t need a formal CS background to build, experiment, and ship.
          </p>

          {/* LinkedIn Button */}
          <div className="flex justify-center pt-2">
            <a
              href="https://www.linkedin.com/company/143088470"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 hover:text-white text-gray-300 transition-all font-mono text-xs font-semibold cursor-target"
              data-cursor-label="LINKEDIN // TECHIEMECHIE"
            >
              <Linkedin className="w-4 h-4 text-white" />
              <span>TechieMechie on LinkedIn</span>
            </a>
          </div>
        </div>

        {/* 5-Member Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {teamMembers.map((member, index) => {
            const Icon = member.icon;
            return (
              <div
                key={index}
                className="glass-panel rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all text-center space-y-2 group cursor-target"
                data-cursor-label={`TEAM // ${member.name.toUpperCase()}`}
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                  <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-white tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-[11px] font-mono text-gray-400 mt-0.5 leading-tight">
                    {member.role}
                  </p>
                  <p className="text-[10px] text-gray-500 font-sans mt-1">
                    {member.branch}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
