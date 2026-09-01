"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: "view" | "hover";
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 35,
  maxIterations = 12,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = DEFAULT_CHARS,
  className = "text-white",
  encryptedClassName = "text-[#ff003c]/60",
  parentClassName = "",
  animateOn = "view",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
      : characters.split("");

    const startDecrypting = () => {
      iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        setDisplayText((prev) => {
          return text
            .split("")
            .map((char, index) => {
              if (char === " " || char === "\n") return char;

              let shouldReveal = false;
              if (sequential) {
                if (revealDirection === "center") {
                  const mid = text.length / 2;
                  const dist = Math.abs(index - mid);
                  shouldReveal = iteration >= (mid - dist) * 1.5;
                } else if (revealDirection === "end") {
                  shouldReveal = iteration >= (text.length - index) * 1.5;
                } else {
                  // start
                  shouldReveal = iteration >= index * 1.2;
                }
              } else {
                shouldReveal = iteration >= maxIterations;
              }

              if (shouldReveal) {
                return char;
              }

              const randomChar = availableChars[Math.floor(Math.random() * availableChars.length)];
              return randomChar || char;
            })
            .join("");
        });

        iteration += 1;

        if (iteration > text.length * 2 + maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, speed);
    };

    if (animateOn === "view" && isInView && !hasAnimated) {
      setHasAnimated(true);
      startDecrypting();
    } else if (animateOn === "hover" && isHovered) {
      startDecrypting();
    }

    return () => clearInterval(interval);
  }, [isInView, isHovered, text, speed, maxIterations, sequential, revealDirection, useOriginalCharsOnly, characters, animateOn, hasAnimated]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => animateOn === "hover" && setIsHovered(true)}
      onMouseLeave={() => animateOn === "hover" && setIsHovered(false)}
    >
      {displayText.split("").map((char, index) => {
        const isOriginal = char === text[index];
        return (
          <span
            key={index}
            className={isOriginal ? className : encryptedClassName}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

export default DecryptedText;
