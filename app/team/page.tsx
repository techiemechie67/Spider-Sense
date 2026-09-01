import { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { AboutUs } from "@/components/sections/AboutUs";
import { SimulatorCTA } from "@/components/sections/SimulatorCTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Team TechieMechie | SPIDER-SENSE (PS-01)",
  description:
    "Meet Team TechieMechie: Sandru, Shailjah, Kushaanth, Pramukh, and Visagan — Mechanical & CS Engineering freshers from VIT Chennai.",
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-transparent text-white pt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center">
        <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10">
          CREW // TECHIEMECHIE
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight mt-3">
          Meet Team TechieMechie
        </h1>
        <p className="text-sm text-gray-300 font-sans max-w-2xl mx-auto mt-2">
          Mechanical &amp; CS Engineering freshers from VIT Chennai building HackVerse Sprint 1 submission for PS-01.
        </p>
      </div>

      <AboutUs />
      <SimulatorCTA />
      <Footer />
    </main>
  );
}
