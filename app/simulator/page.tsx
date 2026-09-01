import { Metadata } from "next";
import { SimulatorEngine } from "@/components/simulator/SimulatorEngine";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Spider-Sense Simulator | Multi-Agent Financial Intelligence (PS-01)",
  description:
    "Interactive tri-agent autonomous financial intelligence simulator for retail investors. Quantitative Greeks, SEBI RAG, and sentiment telemetry in under 60 seconds.",
};

export default function SimulatorPage() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <Navbar />
      <SimulatorEngine />
      <Footer />
    </main>
  );
}
