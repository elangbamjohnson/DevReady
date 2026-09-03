import { Check, RefreshCw } from 'lucide-react';

export function VersionAwareness() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-[#0A0A0A] border-t border-neutral-800/50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">
        
        {/* Left Side: Text and Badges */}
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
            Stay current with modern iOS development.
          </h2>
          <p className="text-neutral-400 text-base mb-8 leading-relaxed">
            Content is continuously reviewed against the latest Apple platform APIs and language changes.
          </p>

          <div className="flex flex-wrap gap-3">
            {/* Emerald Badge */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-950/30 border border-emerald-900/50 rounded-full px-3 py-1.5 text-emerald-400 text-xs font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>Swift 6.0</span>
            </div>
            {/* Emerald Badge */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-950/30 border border-emerald-900/50 rounded-full px-3 py-1.5 text-emerald-400 text-xs font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>iOS 18</span>
            </div>
            {/* Purple Badge */}
            <div className="inline-flex items-center gap-1.5 bg-purple-950/30 border border-purple-900/50 rounded-full px-3 py-1.5 text-purple-400 text-xs font-medium">
              <RefreshCw className="w-3 h-3" />
              <span>SwiftUI iOS 18</span>
            </div>
            {/* Emerald Badge */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-950/30 border border-emerald-900/50 rounded-full px-3 py-1.5 text-emerald-400 text-xs font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>Xcode 16</span>
            </div>
          </div>
        </div>

        {/* Right Side: Accent Note */}
        <div className="flex-1 border-l-[3px] border-violet-500 pl-6 md:pl-8 py-2">
          <p className="text-neutral-300 text-sm leading-relaxed mb-4">
            We focus heavily on modern paradigms. Our content includes strict concurrency checking in Swift 6, Observation in SwiftUI, and new iOS 18 architecture patterns.
          </p>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Legacy frameworks like Objective-C and UIKit are still covered extensively, as they remain critical for maintaining large codebases.
          </p>
        </div>

      </div>
    </section>
  );
}
