import Link from 'next/link';
import { Eye, Play } from 'lucide-react';

export function InterviewPreview() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-[#09090B]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Prepare for the questions that actually matter.
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Real iOS engineering interview questions, curated for every level.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Faint background glow in the card */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-rose-900/10 blur-[60px] rounded-full pointer-events-none" />

          {/* Card Header Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6 relative">
            <span className="px-2.5 py-1 rounded-md bg-rose-950/40 text-rose-300 text-xs font-medium border border-rose-900/30">
              Memory Management
            </span>
            <span className="px-2.5 py-1 rounded-md bg-rose-950/40 text-rose-300 text-xs font-medium border border-rose-900/30">
              Senior
            </span>
            <span className="text-neutral-500 text-xs font-medium ml-auto">
              ~5 min
            </span>
          </div>

          {/* Question */}
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-4 relative">
            What is the difference between <code className="text-rose-300 bg-neutral-950 px-1.5 py-0.5 rounded text-lg font-mono">weak</code> and <code className="text-rose-300 bg-neutral-950 px-1.5 py-0.5 rounded text-lg font-mono">unowned</code> in Swift?
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8 relative">
            {['ARC', 'weak', 'unowned', 'retain-cycles'].map((tag) => (
              <span key={tag} className="text-xs text-neutral-500 bg-neutral-950/50 border border-neutral-800/80 px-2 py-1 rounded-md">
                #{tag}
              </span>
            ))}
          </div>

          {/* Answer Container (Hidden State) */}
          <div className="border border-dashed border-neutral-700/80 rounded-xl p-8 flex flex-col items-center justify-center bg-neutral-950/30 text-center mb-8 relative">
            <p className="text-neutral-400 text-sm mb-4">
              Think before revealing the answer.
            </p>
            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-900 text-white text-sm font-medium rounded-lg transition-colors border border-neutral-700">
              <Eye className="w-4 h-4" />
              <span>View Answer</span>
            </button>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 relative">
            <Link href="/interview" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-medium rounded-lg transition-colors text-sm">
                <Play className="w-4 h-4 fill-current" />
                <span>Practice Question</span>
              </button>
            </Link>
            <Link href="/questions" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-900 text-white font-medium rounded-lg transition-colors border border-neutral-700 text-sm">
                Browse all questions
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
