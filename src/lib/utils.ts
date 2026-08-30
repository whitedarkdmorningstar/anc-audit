import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getId() {
  return crypto.randomUUID()
}

// Normalize "weeks+days" into numeric value
export function weeksToNumber(s: string): number {
  const [weeks, days] = s.split("+").map(Number)
  return weeks + (days || 0) / 7
}
