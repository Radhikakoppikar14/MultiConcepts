import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Home,
  Building2,
  Hammer,
  Ruler,
  ShieldCheck,
  Paintbrush,
  Key,
  HardHat,
  ClipboardList,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { GALLERY_PROJECTS } from '../data/websiteData';
import { Reveal, StaggerGroup, StaggerItem, EASE } from './Effects';

/* ------------------------------------------------------------------ */
/*  LiveMarquee: endless scrolling ribbon right under the hero         */
/* ------------------------------------------------------------------ */

const MARQUEE_ITEMS = [
  { icon: Home, label: 'Residential Construction' },
  { icon: Building2, label: 'Commercial Spaces' },
  { icon: Ruler, label: 'Architectural Design' },
  { icon: Hammer, label: 'Renovation & Remodeling' },
  { icon: Paintbrush, label: 'Interior Design' },
  { icon: ShieldCheck, label: 'Property Management' },
  { icon: HardHat, label: 'Since 1999 · Bangalore' },
];

export const LiveMarquee: React.FC = () => {
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative bg-slate-950 border-y border-white/10 overflow-hidden">
      <style>{`
        @keyframes mc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .mc-marquee-track { animation: mc-marquee 40s linear infinite; }
        .mc-marquee:hover .mc-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .mc-marquee-track { animation: none; } }
      `}</style>
      <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="mc-marquee py-3.5 sm:py-4">
        <div className="mc-marquee-track flex w-max items-center">
          {loop.map((item, i) => (
            <div key={i} className="flex items-center shrink-0">
              <div className="flex items-center gap-2.5 px-5 sm:px-8 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200 whitespace-nowrap">
                <item.icon className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{item.label}</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-amber-300/80 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  ProcessTimeline: "How we build" with a line that draws on scroll   */
/* ------------------------------------------------------------------ */

const STEPS = [
  { icon: ClipboardList, title: 'Consult & Plan', text: 'We listen, survey the site and agree scope, timeline and a transparent budget.' },
  { icon: Ruler, title: 'Design & Approve', text: 'Architects and interior designers turn your vision into approved drawings.' },
  { icon: HardHat, title: 'Build with Quality', text: 'Skilled crews, certified materials and weekly progress updates on site.' },
  { icon: Key, title: 'Handover on Time', text: 'Final quality checks and a smooth key handover, right on schedule.' },
];

export const ProcessTimeline: React.FC = () => {
  const reduce = useReducedMotion();
  const draw = (origin: string, axis: 'x' | 'y') => ({
    initial: reduce ? { opacity: 1 } : axis === 'x' ? { scaleX: 0 } : { scaleY: 0 },
    whileInView: axis === 'x' ? { scaleX: 1 } : { scaleY: 1 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 1.8, ease: EASE, delay: 0.2 },
    style: { transformOrigin: origin },
  });

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-20 border-b border-slate-200">
      <div className="absolute -top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-100/60 blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute -bottom-24 -right-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-sky-100/70 blur-3xl animate-float-slow pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>How We Build</span>
          </div>
          <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            From first idea to <span className="text-gradient-primary">final handover</span>
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 mt-3 leading-relaxed">
            A clear four-step journey so you always know what happens next.
          </p>
        </Reveal>

        <div className="relative">
          {/* Connecting line: vertical on phones, horizontal from md up */}
          <div className="md:hidden absolute left-7 top-7 bottom-7 w-0.5 -translate-x-1/2 bg-slate-200">
            <motion.div {...draw('top', 'y')} className="w-full h-full bg-gradient-to-b from-blue-600 to-sky-400" />
          </div>
          <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5 -translate-y-1/2 bg-slate-200">
            <motion.div {...draw('left', 'x')} className="w-full h-full bg-gradient-to-r from-blue-600 to-sky-400" />
          </div>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6" stagger={0.14}>
            {STEPS.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="group relative flex md:flex-col items-start md:items-center gap-4 md:gap-5 md:text-center">
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: -6 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 16 }}
                    className="relative shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 cursor-default"
                  >
                    <span className="absolute inset-0 rounded-2xl bg-blue-500/40 animate-ping opacity-30" style={{ animationDuration: '2.8s', animationDelay: `${i * 0.4}s` }} />
                    <step.icon className="relative w-6 h-6" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-blue-700 text-xs font-extrabold flex items-center justify-center border border-blue-200 shadow">
                      {i + 1}
                    </span>
                  </motion.div>
                  <div className="min-w-0 pt-1 md:pt-0 transition-transform duration-300 md:group-hover:-translate-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  ProjectsShowcase: dark bento grid of real project photos           */
/* ------------------------------------------------------------------ */

const BENTO_SPANS = [
  'col-span-2 row-span-2 md:col-span-2 md:row-span-2',
  'col-span-2 md:col-span-2',
  '',
  '',
  '',
  '',
];

export const ProjectsShowcase: React.FC<{ onExploreGallery: () => void }> = ({ onExploreGallery }) => {
  const projects = GALLERY_PROJECTS.slice(0, 6);
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-12 sm:py-20">
      <div className="aurora-blob absolute -top-24 left-1/4 w-72 h-72 sm:w-[28rem] sm:h-[28rem] rounded-full bg-blue-600/25 blur-3xl pointer-events-none" />
      <div className="aurora-blob absolute -bottom-24 right-1/4 w-72 h-72 sm:w-[28rem] sm:h-[28rem] rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" style={{ animationDelay: '-6s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[11px] sm:text-xs font-bold uppercase tracking-wider text-sky-300 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Landmark Work</span>
            </div>
            <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
              Built to be <span className="text-gradient-live">remembered</span>
            </h2>
            <p className="text-sm sm:text-lg text-slate-300 mt-3 max-w-xl leading-relaxed">
              A glimpse of homes and landmarks delivered across Bangalore with structural excellence.
            </p>
          </Reveal>
          <Reveal direction="left">
            <button
              onClick={onExploreGallery}
              className="btn-live-smooth btn-shimmer group w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-sky-100 text-sm font-semibold shadow-xl cursor-pointer"
            >
              <span>View Full Gallery</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[200px] gap-3 sm:gap-4">
          {projects.map((p, i) => {
            const big = i === 0;
            return (
              <Reveal
                key={p.id}
                direction="zoom"
                delay={i * 0.07}
                className={`${BENTO_SPANS[i] ?? ''} ${i >= 4 ? 'md:col-span-2' : ''}`}
              >
                <button
                  onClick={onExploreGallery}
                  aria-label={`Open gallery: ${p.title}`}
                  className="group relative block w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 text-left cursor-pointer"
                >
                  <img
                    src={p.imageSrc}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 transition-transform duration-500 group-hover:-translate-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-blue-600/90 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1.5">
                      {p.category}
                    </span>
                    <h3 className={`font-bold leading-snug text-white line-clamp-2 ${big ? 'text-sm sm:text-xl' : 'text-xs sm:text-sm'}`}>
                      {p.title}
                    </h3>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};