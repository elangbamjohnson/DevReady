import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes with conflict resolution */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a percentage for display */
export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

/** Capitalise the first letter */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Human-readable category label */
export function categoryLabel(category: string): string {
  const labels: Record<string, string> = {
    swift: 'Swift',
    swiftui: 'SwiftUI',
    uikit: 'UIKit',
    concurrency: 'Concurrency',
    architecture: 'Architecture',
    networking: 'Networking',
    memory: 'Memory Management',
    objc: 'Objective-C',
    'system-design': 'System Design',
    debugging: 'Debugging',
  };
  return labels[category] ?? capitalize(category);
}

/** Human-readable difficulty label */
export function difficultyLabel(level: string): string {
  const labels: Record<string, string> = {
    junior: 'Junior',
    mid: 'Mid-Level',
    senior: 'Senior',
    staff: 'Staff',
  };
  return labels[level] ?? capitalize(level);
}

/** Difficulty colour mapping (Tailwind class fragments) */
export function difficultyColor(level: string): string {
  const colors: Record<string, string> = {
    junior: 'text-emerald-400',
    mid: 'text-blue-400',
    senior: 'text-violet-400',
    staff: 'text-amber-400',
  };
  return colors[level] ?? 'text-zinc-400';
}

/** Difficulty background mapping */
export function difficultyBg(level: string): string {
  const colors: Record<string, string> = {
    junior: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    mid: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    senior: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    staff: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };
  return colors[level] ?? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
}
