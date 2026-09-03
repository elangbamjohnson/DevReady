import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-16 sm:py-24 lg:py-32">
      {/* Faint center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-900/10 blur-[120px] -z-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy & CTA */}
          <div className="flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="bg-violet-900/30 text-violet-400 border border-violet-800/60 rounded-full px-3 py-1.5 text-xs flex items-center gap-2 w-fit mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
              <span>iOS Interview Preparation Platform</span>
            </div>

            {/* Massive Bold Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-bold tracking-tighter text-white leading-[1.05] mb-6">
              Learn. Build.<br />
              <span className="whitespace-nowrap">
                <span className="text-[#8B5CF6]">Interview.</span> Get Hired.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl text-left mt-6 mb-8">
              Master Swift, SwiftUI, UIKit, Objective-C and iOS architecture through practical explanations, production-quality code and interview-focused learning.
            </p>

            {/* Buttons Flex Row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/learn" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/interview" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-[#262626] active:bg-[#111111] text-white px-6 py-3 rounded-lg border border-neutral-800 flex items-center justify-center gap-2 transition-colors cursor-pointer">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Practice Interview</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Code Card */}
          <div className="w-full">
            <div className="max-w-[480px] mx-auto lg:ml-auto lg:mr-0 bg-[#212121] rounded-xl overflow-hidden flex flex-col shadow-2xl">
              {/* Card Header */}
              <div className="py-3 text-center">
                <span className="text-xs text-neutral-500 font-mono">actor.swift</span>
              </div>

              {/* Code Content */}
              <div className="px-6 pb-6 pt-2 font-mono text-[13px] sm:text-sm leading-relaxed overflow-x-auto">
                <pre>
                  <code>
                    <span className="text-[#C678DD]">actor</span>{' '}
                    <span className="text-[#61AFEF]">DataCache</span>{' '}
                    <span className="text-white">{'{'}</span>
                    {'\n'}
                    {'    '}
                    <span className="text-[#5C6370]">{'// isolated state'}</span>
                    {'\n'}
                    {'    '}
                    <span className="text-[#C678DD]">private var</span>{' '}
                    <span className="text-white">store:</span>{' '}
                    <span className="text-[#61AFEF]">[String: Data]</span>
                    <span className="text-white"> = [:]</span>
                    {'\n\n'}
                    {'    '}
                    <span className="text-[#C678DD]">func</span>{' '}
                    <span className="text-[#61AFEF]">fetch</span>
                    <span className="text-white">(key: </span>
                    <span className="text-[#61AFEF]">String</span>
                    <span className="text-white">) -&gt; </span>
                    <span className="text-[#61AFEF]">Data</span>
                    <span className="text-white">? {'{'}</span>
                    {'\n'}
                    {'        '}
                    <span className="text-[#C678DD]">return</span>{' '}
                    <span className="text-white">store[key]</span>
                    {'\n'}
                    {'    }'}
                    {'\n'}
                    <span className="text-white">{'}'}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
