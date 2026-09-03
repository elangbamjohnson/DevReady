'use client';

import Link from 'next/link';
import { Sprout, Layers, Cpu, Network } from 'lucide-react';

const paths = [
  {
    id: 'junior',
    title: 'Junior iOS Developer',
    description: 'Build strong language and framework fundamentals.',
    meta: '12 topics • 80 questions • ~20h',
    Icon: Sprout,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-950/30',
  },
  {
    id: 'mid',
    title: 'Mid-Level iOS Developer',
    description: 'Strengthen your engineering skills and patterns.',
    meta: '20 topics • 150 questions • ~35h',
    Icon: Layers,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-950/30',
  },
  {
    id: 'senior',
    title: 'Senior iOS Developer',
    description: 'Architecture, systems thinking, and performance.',
    meta: '30 topics • 250 questions • ~55h',
    Icon: Cpu,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-950/30',
  },
  {
    id: 'staff',
    title: 'Staff / Lead Engineer',
    description: 'Scaling, architecture, and technical leadership.',
    meta: '40 topics • 350 questions • ~80h',
    Icon: Network,
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-950/30',
  },
];

export function LearningPaths() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
            What are you preparing for?
          </h2>
          <p className="text-neutral-400 text-base max-w-2xl mx-auto">
            Select your target level to get a focused learning path and curated interview questions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paths.map((path) => {
            const { Icon } = path;
            return (
              <Link key={path.id} href={`/learn?level=${path.id}`} className="group block h-full">
                <div className="h-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-800/80 flex flex-col">
                  <div className={`w-10 h-10 rounded-lg ${path.iconBg} border border-neutral-800/60 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-5 h-5 ${path.iconColor}`} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {path.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow">
                    {path.description}
                  </p>
                  <div className="text-xs font-medium text-neutral-500 pt-4 border-t border-neutral-800/60">
                    {path.meta}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
