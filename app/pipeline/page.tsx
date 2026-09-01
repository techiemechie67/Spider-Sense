import { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { CinematicScroll } from "@/components/sections/CinematicScroll";
import { AgentArchitecture } from "@/components/sections/AgentArchitecture";
import { SpideyModes } from "@/components/sections/SpideyModes";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Autonomous Pipeline | SPIDER-SENSE (PS-01)",
  description:
    "Explore the 4-stage real-time multi-agent pipeline: Ingestion, Tri-Agent Desks, Consensus Synthesis, and Actionable Alpha Dossiers.",
};

export default function PipelinePage() {
  return (
    <main className="min-h-screen bg-transparent text-white pt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center">
        <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10">
          ARCHITECTURE // PIPELINE
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight mt-3">
          Multi-Agent Ingestion &amp; Consensus Pipeline
        </h1>
        <p className="text-sm text-gray-300 font-sans max-w-2xl mx-auto mt-2">
          From 50,000 live ticks per second to cited regulatory synthesis in under 60 seconds.
        </p>
      </div>

      <CinematicScroll />
      <AgentArchitecture />
      <SpideyModes />
      <Footer />
    </main>
  );
}
