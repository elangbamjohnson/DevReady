import Link from 'next/link';
import { ArrowRight, Diamond, Hexagon, Square, Circle, RefreshCw, Box, Network, Shield, Bug } from 'lucide-react';

const coreTopics = [
  {
    title: 'Swift',
    questions: 95,
    levels: 'All levels',
    Icon: Diamond,
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-950/40',
  },
  {
    title: 'SwiftUI',
    questions: 72,
    levels: 'Junior–Senior',
    Icon: Hexagon,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-950/40',
  },
  {
    title: 'UIKit',
    questions: 68,
    levels: 'Junior–Senior',
    Icon: Square,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-950/40',
  },
  {
    title: 'Objective-C',
    questions: 40,
    levels: 'Mid–Senior',
    Icon: Circle,
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-950/40',
  },
  {
    title: 'Concurrency',
    questions: 58,
    levels: 'Senior',
    Icon: RefreshCw,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-950/40',
  },
  {
    title: 'Architecture',
    questions: 50,
    levels: 'Senior–Staff',
    Icon: Box,
    iconColor: 'text-neutral-400',
    iconBg: 'bg-neutral-800/60',
  },
  {
    title: 'Networking',
    questions: 35,
    levels: 'Mid',
    Icon: Network,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-950/40',
  },
  {
    title: 'Memory Management',
    questions: 45,
    levels: 'Mid–Senior',
    Icon: Diamond,
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-950/40',
  },
  {
    title: 'System Design',
    questions: 28,
    levels: 'Staff',
    Icon: Shield,
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-950/40',
  },
  {
    title: 'Debugging',
    questions: 22,
    levels: 'All levels',
    Icon: Bug,
    iconColor: 'text-white',
    iconBg: 'bg-neutral-700/40',
  },
];

export function CoreTopicsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#09090B]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              Explore topics
            </h2>
            <p className="text-neutral-400 text-base max-w-xl">
              Structured coverage across every iOS engineering discipline.
            </p>
          </div>
          <Link 
            href="/topics" 
            className="text-violet-400 hover:text-violet-300 font-medium text-sm flex items-center gap-1.5 transition-colors"
          >
            View all topics <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {coreTopics.map((topic) => {
            const { Icon } = topic;
            return (
              <Link key={topic.title} href="/learn" className="block group h-full">
                <div className="h-full bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 hover:bg-neutral-800/60 transition-colors flex flex-col justify-between">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-10 h-10 rounded-lg ${topic.iconBg} border border-neutral-800 flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${topic.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-neutral-400">
                        {topic.questions} questions
                      </p>
                    </div>
                  </div>
                  <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                    {topic.levels}
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
