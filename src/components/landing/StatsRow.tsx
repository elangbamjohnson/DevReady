// File: src/components/landing/StatsRow.tsx
// Method: StatsRow()

export default function StatsRow() {
  return (
    <section className="w-full bg-[#141414] border-t border-neutral-800/60 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24">
        
        {/* Block 1 */}
        <div className="flex items-baseline">
          <span className="text-lg font-bold text-white">500+</span>
          <span className="text-sm text-neutral-400 ml-2.5">
            Interview Questions
          </span>
        </div>

        {/* Block 2 */}
        <div className="flex items-baseline">
          <span className="text-lg font-bold text-white">30+</span>
          <span className="text-sm text-neutral-400 ml-2.5">
            Core Topics
          </span>
        </div>

        {/* Block 3 */}
        <div className="flex items-baseline">
          <span className="text-lg font-bold text-white">
            Swift • SwiftUI • UIKit • Objective-C
          </span>
          <span className="text-sm text-neutral-400 ml-2.5">
            Technologies Covered
          </span>
        </div>

      </div>
    </section>
  );
}
