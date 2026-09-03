// File: src/components/DashboardGreeting.tsx
// Method: export default function DashboardGreeting()

'use client';

export default function DashboardGreeting() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      {/* Left Side: Greeting & Streak */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Good morning Johnson</span>
          <span role="img" aria-label="Waving hand">👋</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-1 leading-relaxed">
          Ready for your next iOS interview? You&apos;re on a{' '}
          <span className="text-orange-400 font-medium">7-day streak.</span>
        </p>
      </div>

      {/* Right Side: Status Indicator */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium shrink-0 self-start sm:self-center">
        <span>Last active 1h ago</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      </div>
    </div>
  );
}

export { DashboardGreeting };
