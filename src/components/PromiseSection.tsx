import React, { useEffect, useState } from 'react';
import { Award, Clock, DollarSign, CheckCircle2, Sparkles, RotateCw } from 'lucide-react';
import { motion } from 'motion/react';
import { PROMISES } from '../data/websiteData';
import { StaggerGroup, StaggerItem, Reveal, SplitText, EASE, FlipCard } from './Effects';

/* Soft shapes that drift slowly behind the section */
const FloatingShapes: React.FC = () => {
  const shapes = [
    { left: '6%', top: '18%', size: 14, round: true, dur: 9, delay: 0, color: 'bg-blue-300/50' },
    { left: '90%', top: '14%', size: 18, round: false, dur: 11, delay: 1, color: 'bg-indigo-300/40' },
    { left: '14%', top: '72%', size: 10, round: false, dur: 8, delay: 2, color: 'bg-emerald-300/50' },
    { left: '84%', top: '66%', size: 16, round: true, dur: 12, delay: 0.5, color: 'bg-sky-300/50' },
    { left: '48%', top: '8%', size: 8, round: true, dur: 10, delay: 1.5, color: 'bg-blue-400/40' },
    { left: '60%', top: '90%', size: 12, round: false, dur: 9.5, delay: 2.5, color: 'bg-indigo-300/40' },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {shapes.map((s, i) => (
        <motion.span
          key={i}
          className={`absolute ${s.color} ${s.round ? 'rounded-full' : 'rounded-md'}`}
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={{ y: [0, -26, 0, 20, 0], x: [0, 14, -10, 8, 0], rotate: s.round ? 0 : [0, 90, 180, 270, 360] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

const BACK_POINTS: Record<string, string[]> = {
  quality: ['Uncompromised quality', 'Certified, ISO-standard materials', 'Skilled crews on site'],
  time: ['On-time milestone handover', 'Weekly progress updates', 'Smooth key handover'],
  cost: ['100% transparent costing', 'Agreed scope, timeline & budget', 'Value without compromise'],
};

/* Back face of the flip card */
const PromiseBack: React.FC<{ pillar: string; gradient: string; icon: React.ReactNode }> = ({ pillar, gradient, icon }) => {
  const points = BACK_POINTS[pillar.toLowerCase()] ?? BACK_POINTS.cost;
  return (
    <div className={`h-full rounded-3xl p-6 sm:p-9 bg-gradient-to-br ${gradient} text-white flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl`}>
      <span className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/15 blur-2xl animate-pulse-glow" />
      <span className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-white/10 blur-2xl animate-float-slow" />
      <div className="relative w-16 h-16 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center mb-4 animate-float-gentle">
        {icon}
      </div>
      <div className="relative text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1">Our Pillar</div>
      <h3 className="relative text-3xl sm:text-4xl font-extrabold tracking-tight mb-5">{pillar}</h3>
      <ul className="relative space-y-2.5 text-sm text-left">
        {points.map((pt, i) => (
          <li key={pt} className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0 animate-flash" style={{ animationDelay: `${i * 0.4}s` }} />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ---- Live header helpers ---- */

/* Three pills that light up one after another */
const PillarChips: React.FC = () => {
  const items = ['Quality', 'Time', 'Cost'];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="mt-6 flex items-center justify-center gap-2 sm:gap-3">
      {items.map((label, i) => {
        const on = i === active;
        return (
          <motion.span
            key={label}
            animate={{ scale: on ? 1.12 : 1, y: on ? -3 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className={`relative px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors duration-500 ${
              on
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-600/30'
                : 'bg-white text-slate-500 border-slate-200'
            }`}
          >
            {on && <span className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping" style={{ animationDuration: '1.5s' }} />}
            <span className="relative">{label}</span>
          </motion.span>
        );
      })}
    </div>
  );
};

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
          ring: 'border-blue-400/60',
          bar: 'from-blue-600 to-indigo-500',
          dot: 'bg-blue-500',
        };
      case 'time':
        return {
          icon: <Clock className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-115" />,
          gradient: 'from-indigo-600 via-sky-600 to-indigo-700',
          badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
          hoverBorder: 'hover:border-indigo-400',
          hoverShadow: 'hover:shadow-indigo-600/15',
          ring: 'border-indigo-400/60',
          bar: 'from-indigo-600 to-sky-500',
          dot: 'bg-indigo-500',
        };
      case 'cost':
      default:
        return {
          icon: <DollarSign className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-115" />,
          gradient: 'from-teal-600 via-emerald-600 to-teal-700',
          badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          hoverBorder: 'hover:border-emerald-400',
          hoverShadow: 'hover:shadow-emerald-600/15',
          ring: 'border-emerald-400/60',
          bar: 'from-teal-600 to-emerald-500',
          dot: 'bg-emerald-500',
        };
    }
  };

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      {/* Ambient glows: pulsing + drifting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-20 -left-10 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <FloatingShapes />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          {/* Badge: drops in, sparkle spins + flashes, light sweeps across, ring pulses */}
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-4 shadow-2xs overflow-hidden"
          >
            <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12 animate-slide-in-out" />
            <Sparkles className="relative w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
            <span className="relative animate-flash-burst">Core Principles & Standards</span>
          </motion.div>

          {/* Heading: words slide up one by one */}
          <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            <SplitText text="Our Promise:" />{' '}
            <SplitText text="Quality, Time, and Cost" delay={0.25} wordClassName="text-gradient-primary" />
          </h2>

          {/* Underline draws itself, then a bright light keeps travelling along it */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            style={{ transformOrigin: 'center' }}
            className="relative mx-auto mt-4 h-1 w-28 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400 overflow-hidden"
          >
            <span className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent animate-slide-in-out" />
          </motion.div>

          <Reveal direction="blur" delay={0.4} className="mt-6 w-full">
          <div className="w-full rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-lg shadow-blue-900/5 px-5 py-5 sm:px-9 sm:py-7">
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal text-center">
            At Paramount Enterprises, our commitment goes beyond construction; it’s a promise etched in
            every project we undertake. We understand that your vision deserves nothing less than the best.
            Our unwavering focus on three core pillars—<span className="font-semibold text-blue-700 bg-blue-100 rounded px-1">Quality</span>,{' '}
            <span className="font-semibold text-blue-700 bg-blue-100 rounded px-1">Time</span>, and <span className="font-semibold text-blue-700 bg-blue-100 rounded px-1">Cost</span>—sets us apart and
            ensures your satisfaction every step of the way.
          </p>
          </div>
          </Reveal>

          <PillarChips />
        </div>

        <StaggerGroup stagger={0.18} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROMISES.map((item, index) => {
            const config = getPillarConfig(item.pillar);
            return (
              <StaggerItem key={item.id} className="h-full" y={44} variant={(['fromLeft', 'flip', 'fromRight'] as const)[index % 3]}>
                <FlipCard
                  className="h-full"
                  back={<PromiseBack pillar={item.pillar} gradient={config.gradient} icon={config.icon} />}
                  front={
                <div
                  className={`group h-full bg-white rounded-3xl border border-slate-200 ${config.hoverBorder} p-5 sm:p-9 shadow-xs hover:shadow-2xl ${config.hoverShadow} transition-all duration-350 flex flex-col justify-between relative overflow-hidden`}
                >
                  <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors">
                    <RotateCw className="w-3 h-3 animate-spin-slow" />
                    <span>Flip</span>
                  </span>

                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Light sweep that glides across the card on hover */}
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-blue-100/60 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[420%] transition-all duration-1000 ease-out" />

                  <div>
                    {/* Icon floats continuously, with a slowly rotating dashed ring */}
                    <div
                      className="relative w-16 h-16 mb-6 animate-float-gentle"
                      style={{ animationDelay: `${index * 0.6}s` }}
                    >
                      <span className={`absolute -inset-2 rounded-[1.4rem] border-2 border-dashed ${config.ring} animate-spin-slow`} />
                      <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${config.gradient} opacity-40 animate-ping`} style={{ animationDuration: '3.2s', animationDelay: `${index * 0.5}s` }} />
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-md shadow-blue-900/15 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 icon-pop`}>
                        {config.icon}
                      </div>
                    </div>

                    <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${config.badgeColor} mb-3`}>
                      <span className="relative flex h-1.5 w-1.5">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dot} opacity-75`} />
                        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${config.dot}`} />
                      </span>
                      Pillar: {item.pillar}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-3 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8">
                    {/* Progress bar that fills to 100% when the card scrolls into view */}
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 1.4, delay: 0.5 + index * 0.2, ease: EASE }}
                        style={{ transformOrigin: 'left' }}
                        className={`h-full w-full rounded-full bg-gradient-to-r ${config.bar}`}
                      />
                    </div>

                  </div>
                </div>
                  }
                />
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
};