import React from "react";

interface SpiderSlingLogoProps {
  className?: string;
  size?: number;
}

export const SpiderSlingLogo: React.FC<SpiderSlingLogoProps> = ({
  className = "w-7 h-7",
  size = 28,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="20" stroke="#00f0ff" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="24" cy="24" r="12" stroke="#ff003c" strokeOpacity="0.4" strokeWidth="1.2" />
      
      {/* Web Strands */}
      <line x1="24" y1="4" x2="24" y2="44" stroke="#00f0ff" strokeOpacity="0.35" strokeWidth="1" />
      <line x1="4" y1="24" x2="44" y2="24" stroke="#00f0ff" strokeOpacity="0.35" strokeWidth="1" />
      <line x1="10" y1="10" x2="38" y2="38" stroke="#ff003c" strokeOpacity="0.3" strokeWidth="1" />
      <line x1="38" y1="10" x2="10" y2="38" stroke="#ff003c" strokeOpacity="0.3" strokeWidth="1" />

      {/* Sling Arc & Tension Anchor */}
      <path d="M 8,14 Q 24,26 40,14" stroke="#00f0ff" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 24,25 L 24,38" stroke="#ff003c" strokeWidth="2.2" strokeLinecap="round" />
      
      {/* Nodes */}
      <circle cx="24" cy="24" r="3" fill="#ff003c" stroke="#ffffff" strokeWidth="1" />
      <circle cx="40" cy="14" r="2" fill="#00f0ff" />
      <circle cx="8" cy="14" r="2" fill="#00f0ff" />
      <circle cx="24" cy="38" r="2" fill="#ff003c" />
    </svg>
  );
};
