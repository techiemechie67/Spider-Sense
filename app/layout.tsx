import type { Metadata } from "next";
import { Ubuntu, Saira_Condensed } from "next/font/google";
import "./globals.css";
import CursorGrid from "@/components/ui/CursorGrid";
import { TargetCursor } from "@/components/ui/TargetCursor";
import { ScrollHangingSpider } from "@/components/ui/ScrollHangingSpider";

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
  display: "swap",
});

const sairaCondensed = Saira_Condensed({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-saira",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPIDER-SENSE | Multi-Agent Autonomous Financial Intelligence (PS-01)",
  description:
    "HackVerse Sprint 1 submission for PS-01 by Team TechieMechie. Multi-Agent Autonomous Financial Intelligence System for Retail Investors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${ubuntu.variable} ${sairaCondensed.variable}`}>
      <body className="bg-[#090a0f] text-gray-100 antialiased overflow-x-hidden min-h-screen relative font-sans">
        {/* Full-Screen React Bits CursorGrid Canvas Background Across All Pages */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none w-screen h-screen">
          <CursorGrid
            cellSize={70}
            color="#ff003c"
            radius={140}
            falloff="smooth"
            holdTime={200}
            fadeDuration={200}
            lineWidth={1.2}
            maxOpacity={1}
            fillOpacity={0.03}
            gridOpacity={0.035}
            cellRadius={0}
            clickPulse={true}
            pulseSpeed={600}
            className="w-full h-full"
          />
        </div>

        {/* Dynamic Scroll-Hanging Spider: Extends silk web downwards as you scroll */}
        <ScrollHangingSpider />

        {/* Global TargetCursor */}
        <TargetCursor
          hideDefaultCursor={true}
          parallaxOn={true}
          cursorColorOnTarget="#00f0ff"
          defaultColor="#ff003c"
        />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
