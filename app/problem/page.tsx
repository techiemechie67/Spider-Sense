import { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { ProblemStatement } from "@/components/sections/ProblemStatement";
import { SimulatorCTA } from "@/components/sections/SimulatorCTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Problem Statement PS-01 | SPIDER-SENSE",
  description:
    "Understanding the infrastructure asymmetry in Indian retail markets: Why 89% of retail traders lose money and how Spider-Sense solves it.",
};

export default function ProblemPage() {
  return (
    <main className="min-h-screen bg-transparent text-white pt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center">
        <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10">
          PROBLEM STATEMENT // PS-01
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight mt-3">
          The Information &amp; Reasoning Asymmetry
        </h1>
        <p className="text-sm text-gray-300 font-sans max-w-2xl mx-auto mt-2">
          Why 89% of retail traders suffer capital drawdown and how autonomous reasoning levels the playing field.
        </p>
      </div>

      <ProblemStatement />
      <SimulatorCTA />
      <Footer />
    </main>
  );
}
