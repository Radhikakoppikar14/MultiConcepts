import React from 'react';
import { Award, Clock, DollarSign, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { PROMISES } from '../data/websiteData';

export const PromiseSection: React.FC = () => {
  const getPillarConfig = (pillar: string) => {
    switch (pillar.toLowerCase()) {
      case 'quality':
        return {
          icon: <Award className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-115" />,
          gradient: 'from-blue-600 via-indigo-600 to-blue-700',
          badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
          hoverBorder: 'hover:border-blue-400',
          hoverShadow: 'hover:shadow-blue-600/15',
        };
      case 'time':
        return {
          icon: <Clock className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-115" />,
          gradient: 'from-indigo-600 via-sky-600 to-indigo-700',
          badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
          hoverBorder: 'hover:border-indigo-400',
          hoverShadow: 'hover:shadow-indigo-600/15',
        };
      case 'cost':
      default:
        return {
          icon: <DollarSign className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-115" />,
          gradient: 'from-teal-600 via-emerald-600 to-teal-700',
          badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          hoverBorder: 'hover:border-emerald-400',
          hoverShadow: 'hover:shadow-emerald-600/15',
        };
    }
  };

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      {/* Subtle warm ambient glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Core Principles & Standards</span>
          </div>
          <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            Our Promise: <span className="text-gradient-primary">Quality, Time, and Cost</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            At Paramount Enterprises, our commitment goes beyond construction; it’s a promise
            etched in every project we undertake. We understand that your vision deserves nothing
            less than the best. Our unwavering focus on three core pillars—Quality, Time, and
            Cost—sets us apart and ensures your satisfaction every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROMISES.map((item) => {
            const config = getPillarConfig(item.pillar);
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                className={`card-interactive group bg-white rounded-3xl border border-slate-200 ${config.hoverBorder} p-5 sm:p-9 shadow-xs hover:shadow-2xl ${config.hoverShadow} transition-all duration-350 flex flex-col justify-between relative overflow-hidden`}
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div>
                  {/* Distinct glowing icon container */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-6 shadow-md shadow-blue-900/15 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {config.icon}
                  </div>

                  <div className={`inline-block text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${config.badgeColor} mb-3`}>
                    Pillar: {item.pillar}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-3 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Strict adherence guaranteed</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};