import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyINR(amount: number): string {
  if (Math.abs(amount) >= 1000) {
    return `${amount >= 0 ? "+" : "-"}₹${(Math.abs(amount)).toLocaleString("en-IN")} Cr`;
  }
  return `${amount >= 0 ? "+" : "-"}₹${(Math.abs(amount)).toLocaleString("en-IN")}`;
}
