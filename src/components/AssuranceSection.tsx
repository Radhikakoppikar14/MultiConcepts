import React from 'react';
import { ShieldCheck, ArrowRight, Phone, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ASSURANCE, COMPANY_INFO } from '../data/websiteData';
import { SlideIn, TypeText, WaveText, Flash, PopIn } from './FX';

interface AssuranceSectionProps {
  onOpenContact: () => void;
}

export const AssuranceSection: React.FC<AssuranceSectionProps> = ({
  onOpenContact,
}) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Decorative ambient elements without dots/grids */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-center">
          {/* Left Column: Immediate visibility with no scroll lag */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/50 text-xs font-bold uppercase tracking-wider text-blue-300 shadow-xl shadow-blue-950/40">
              <Flash><ShieldCheck className="w-4 h-4 text-blue-400" /></Flash>
              <span>Paramount Guarantee</span>
            </div>

            <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              Your Vision, Our <WaveText text="Priority" className="text-sky-300 text-live-glow" amplitude={7} />
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {ASSURANCE.paragraphs.map((p, idx) => (
                <SlideIn key={idx} from={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 0.1}>
                  <TypeText as="p" speed={12} text={p} className="block" />
                </SlideIn>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenContact}
                className="btn-live-smooth btn-shimmer shine-hover group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-2xl shadow-xl shadow-blue-600/35 hover:shadow-2xl hover:shadow-blue-600/50 transition-all cursor-pointer border border-blue-400/30"
              >
                <span>Experience the Paramount Promise</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href={`tel:${COMPANY_INFO.phones[0].replace(/[^0-9+]/g, '')}`}
                className="btn-live-smooth inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 text-sm font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 hover:border-white/40 transition-all cursor-pointer backdrop-blur-md shadow-lg"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Directly</span>
              </motion.a>
            </div>
          </div>

          {/* Right Column: Seal of Trust Box - Rendered immediately with zero delay, no scroll lag */}
          <div className="lg:col-span-5 flex justify-center mt-4 lg:mt-0">
            <div className="animate-float-gentle relative p-5 sm:p-9 rounded-3xl bg-white/10 hover:bg-white/[0.14] backdrop-blur-xl border border-white/20 hover:border-blue-400/50 text-center max-w-sm w-full shadow-2xl transition-all duration-300 group">
              {/* Glowing halo behind the seal */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-44 h-44 bg-blue-500/30 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-400/40 transition-colors" />

              <div className="fx-glow-border fx-breathe relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-5 rounded-full overflow-hidden border-4 border-blue-400/70 shadow-2xl bg-white p-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img
                  src={COMPANY_INFO.badge}
                  alt="Paramount Enterprises Seal of Trust"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-xl font-bold text-white tracking-tight">Paramount Enterprises</div>
              <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider mt-1">
                Division of MultiConcepts
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 space-y-2 text-xs text-slate-300 text-left">
                {[
                  'Licensed Civil & Architectural Practice',
                  'ISO Quality Standard Material Compliance',
                  'Over 250+ Successful Structural Deliveries',
                ].map((label, i) => (
                  <PopIn key={label} delay={0.15 * i}>
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:translate-x-1 transition-all">
                      <Flash><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /></Flash>
                      <span>{label}</span>
                    </div>
                  </PopIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};