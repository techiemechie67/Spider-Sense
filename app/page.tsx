import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SimulatorCTA } from "@/components/sections/SimulatorCTA";
import { Footer } from "@/components/sections/Footer";
import { Cpu, AlertTriangle, Users, Play, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SPIDER-SENSE | Multi-Agent Autonomous Financial Intelligence (PS-01)",
  description:
    "HackVerse Sprint 1 submission for PS-01 by Team TechieMechie. Institutional-grade autonomous financial intelligence for retail investors in under 60 seconds.",
};

export default function HomePage() {
  const portalCards = [
    {
      title: "Autonomous Pipeline",
      tag: "ARCHITECTURE",
      href: "/pipeline",
      icon: Cpu,
      description:
        "4-stage real-time ingestion bus, tri-agent parallel desks, and consensus mode arbitration.",
    },
    {
      title: "Problem Statement PS-01",
      tag: "PROBLEM ASYMMETRY",
      href: "/problem",
      icon: AlertTriangle,
      description:
        "Why 89% of retail traders lose capital and how autonomous reasoning levels the institutional playing field.",
    },
    {
      title: "Team TechieMechie",
      tag: "THE BUILDERS",
      href: "/team",
      icon: Users,
      description:
        "Meet the mechanical and CS engineering freshers from VIT Chennai behind Spider-Sense.",
    },
  ];

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-white/20 selection:text-white">
      <Navbar />
      <Hero />

      {/* Quick Navigation Portal Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10">
            EXPLORE SECTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase">
            Explore Spider-Sense
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-sans max-w-xl mx-auto">
            Access dedicated modules for architecture breakdown, problem deep-dive, and team credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portalCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all space-y-4 group cursor-target block"
                data-cursor-label={`OPEN // ${card.tag}`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:border-white/30 transition-colors">
                    <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-gray-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {card.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-gray-200 transition-colors flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                  </h3>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <SimulatorCTA />
      <Footer />
    </main>
  );
}
