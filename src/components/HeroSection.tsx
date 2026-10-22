import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';
import { COMPANY_INFO, STATS } from '../data/websiteData';
import { SplitText, Magnetic, CountUp, TiltCard, Reveal, RotatingText } from './Effects';

interface HeroSectionProps {
  onExploreGallery: () => void;
  onOpenContact: () => void;
  onSelectTab: (tab: string) => void;
}

// Atmospheric drifting particles to give a live outdoor ambient feeling
const LiveAtmosphereMotes: React.FC = () => {
  const motes = [
    { id: 1, left: '8%', bottom: '15%', size: 3, duration: 9, delay: 0 },
    { id: 2, left: '18%', bottom: '25%', size: 4, duration: 11, delay: 1.5 },
    { id: 3, left: '27%', bottom: '10%', size: 2, duration: 8, delay: 3 },
    { id: 4, left: '38%', bottom: '20%', size: 3.5, duration: 12, delay: 0.8 },
    { id: 5, left: '49%', bottom: '18%', size: 2.5, duration: 10, delay: 2 },
    { id: 6, left: '61%', bottom: '12%', size: 4, duration: 13, delay: 1.2 },
    { id: 7, left: '72%', bottom: '22%', size: 3, duration: 9.5, delay: 2.5 },
    { id: 8, left: '83%', bottom: '16%', size: 2.5, duration: 11.5, delay: 0.5 },
    { id: 9, left: '92%', bottom: '28%', size: 3.5, duration: 10.5, delay: 3.2 },
    { id: 10, left: '14%', bottom: '35%', size: 2, duration: 12, delay: 4 },
    { id: 11, left: '55%', bottom: '30%', size: 3, duration: 8.5, delay: 2.8 },
    { id: 12, left: '78%', bottom: '32%', size: 2.5, duration: 11, delay: 1.8 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {motes.map((m) => (
        <motion.span
          key={m.id}
          initial={{ opacity: 0, y: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 0.75, 0.9, 0],
            y: [-0, -140],
            x: [0, (m.id % 2 === 0 ? 15 : -15), (m.id % 2 === 0 ? -10 : 10)],
            scale: [0.6, 1.2, 0.8],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: m.left,
            bottom: m.bottom,
            width: `${m.size}px`,
            height: `${m.size}px`,
          }}
          className="absolute rounded-full bg-gradient-to-t from-sky-200 to-amber-200 shadow-[0_0_8px_rgba(186,230,253,0.8)]"
        />
      ))}
    </div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreGallery,
  onOpenContact,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  // Mouse Parallax for interactive live feel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  // Scroll Parallax on Hero background
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, 120]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xRel * 28);
    mouseY.set(yRel * 18);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-slate-950 text-white min-h-[85svh] lg:min-h-[90svh] flex flex-col justify-center"
    >
      {/* Background video container with parallax & effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute -inset-10 pointer-events-none"
        >
          <motion.div style={{ y: parallaxY }} className="w-full h-full">
            {/* Background video: 8s, muted, looping. Falls back to the old image as poster */}
            <video
              src="/assests/videos/hero.mp4"
              poster={COMPANY_INFO.heroBg}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="MultiConcepts Construction Engineering"
              className="w-full h-full object-cover object-center brightness-[0.98] contrast-[1.04]"
            />
          </motion.div>
        </motion.div>

        {/* Live Sweeping Sunlight Sheen across the Skyline */}
        <motion.div
          animate={{
            x: ['-120%', '220%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 3.5,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-sky-300/12 to-transparent -skew-x-12 pointer-events-none z-[1]"
        />

        {/* Dynamic Breathing Sunbeam & Radiant Sky Glow */}
        <motion.div
          animate={{
            opacity: [0.25, 0.5, 0.3, 0.55, 0.25],
            scale: [1, 1.15, 1.05, 1.2, 1],
            rotate: [0, 6, -4, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-24 sm:-top-32 right-0 sm:right-1/4 w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-amber-300/20 via-sky-400/25 to-transparent rounded-full blur-3xl pointer-events-none mix-blend-screen z-[1]"
        />

        {/* Secondary gentle sky flare on top left */}
        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.2, 0.35, 0.15],
            scale: [1, 1.1, 1.02, 1.12, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute -top-16 -left-16 sm:-top-24 sm:-left-20 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-blue-500/20 via-sky-400/15 to-transparent rounded-full blur-3xl pointer-events-none mix-blend-screen z-[1]"
        />

        {/* Live Construction Tower Crane Aviation Warning Beacons */}
        <div className="absolute top-[28%] left-[52%] pointer-events-none z-[2]">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-90"
              style={{ animationDuration: '1.4s' }}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,1)]" />
          </span>
        </div>
        <div className="absolute top-[35%] left-[78%] pointer-events-none z-[2]">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-90"
              style={{ animationDuration: '1.8s' }}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-400 shadow-[0_0_10px_rgba(248,113,113,1)]" />
          </span>
        </div>

        {/* Live Atmospheric Drifting Particles */}
        <LiveAtmosphereMotes />

        {/* Balanced Translucent Dark Overlay (change /50 to /30 lighter or /65 darker) */}
        <div className="absolute inset-0 bg-slate-950/50 backdrop-brightness-[0.88] z-[2]" />

        {/* Top & Bottom gradient edge blend */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/60 to-transparent pointer-events-none z-[3]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none z-[3]" />
      </div>

      {/* Giant outlined watermark (tablet and larger) */}
      <div
        aria-hidden
        className="hidden md:block absolute inset-x-0 bottom-[6%] text-center text-[15vw] font-black leading-none tracking-tighter select-none pointer-events-none z-[4]"
        style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
      >
        MULTICONCEPTS
      </div>

      {/* Hero Content Container: Centered Layout */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24 lg:py-28 text-center flex flex-col items-center justify-center">
        {/* Trust Tag with subtle shimmer */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center justify-center gap-2 max-w-full px-3 sm:px-4 py-1.5 rounded-2xl sm:rounded-full bg-slate-900/80 border border-white/20 backdrop-blur-md text-[10px] min-[400px]:text-[11px] sm:text-xs font-semibold uppercase tracking-wide sm:tracking-wider leading-snug text-center text-blue-200 mb-5 sm:mb-6 shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-flash" />
          <span className="min-w-0">Bangalore Legacy Since 1999 · Paramount Enterprises</span>
        </motion.div>

        {/* Main Headline with SplitText word-by-word reveal & animated gradient shimmer on line 2 */}
        <h1 className="text-[1.75rem] min-[400px]:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-4 sm:mb-6 drop-shadow-md text-balance">
          <SplitText text="Construction par Excellence" delay={0.05} />
          <span className="block mt-2 font-bold text-gradient-live">
            <SplitText text="Your dreams made a reality" delay={0.3} />
          </span>
        </h1>

        {/* Rotating words: roll in and out on a loop */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-4 sm:mb-5 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-base min-[400px]:text-lg sm:text-2xl font-semibold"
        >
          <span className="text-slate-300">We build</span>
          <span className="px-3 py-0.5 rounded-lg bg-white/10 border border-white/20 backdrop-blur-md text-sky-300 font-bold">
            <RotatingText
              words={['Dream Homes', 'Luxury Villas', 'Apartments', 'Commercial Spaces', 'Interiors', 'Landmarks']}
            />
          </span>
        </motion.div>

        {/* Subtitle: High contrast, clearly readable */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-sm min-[400px]:text-base sm:text-lg lg:text-xl text-slate-100/95 leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto font-normal drop-shadow-sm"
        >
          Welcome to Multiconcepts, your trusted partner for all your construction needs.
          With years of experience in this industry, dedicated to delivering outstanding
          construction projects that exceed all expectations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5 w-full max-w-sm sm:max-w-none sm:w-auto mb-10 sm:mb-14"
        >
          <Magnetic strength={0.18}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExploreGallery}
              className="btn-live-smooth w-full sm:w-auto sm:min-w-[180px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 text-base font-semibold text-white bg-black/25 hover:bg-white hover:text-slate-950 rounded-xl border-2 border-white backdrop-blur-xs transition-all duration-300 shadow-2xl cursor-pointer"
            >
              <span>View Gallery</span>
            </motion.button>
          </Magnetic>

          <Magnetic strength={0.18}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenContact}
              className="btn-live-smooth btn-shimmer shine-hover w-full sm:w-auto sm:min-w-[180px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all duration-300 shadow-xl shadow-blue-600/30 cursor-pointer border border-blue-400/30"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Magnetic>
        </motion.div>

        {/* Trust Badges Bar */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-slate-200 mb-8 w-full max-w-xs sm:max-w-4xl">
          {['Uncompromised Quality', 'On-Time Milestone Handover', '100% Transparent Costing'].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -48 : 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.85 + i * 0.15, ease: 'easeOut' }}
              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur-md border border-white/10"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-flash" style={{ animationDelay: `${i * 0.5}s` }} />
              <span>{label}</span>
            </motion.div>
          ))}
        </div>

        {/* Live Metrics Counters Row */}
        <div className="w-full pt-6 sm:pt-8 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {STATS.map((stat, index) => (
            <Reveal key={index} direction="flip" delay={0.9 + index * 0.12} className="h-full">
              <TiltCard maxTilt={6}>
              <div className="p-3 sm:p-5 rounded-2xl h-full bg-slate-900/60 hover:bg-slate-900/80 border border-white/15 hover:border-blue-400/50 backdrop-blur-md transition-all duration-300 text-center shadow-lg group cursor-default">
                <div className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-1 flex items-baseline justify-center text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-blue-200">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[11px] sm:text-sm font-bold uppercase tracking-wide sm:tracking-wider text-slate-200 break-words group-hover:text-blue-300 transition-colors">
                  {stat.label}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300/80 mt-1 font-normal line-clamp-2 sm:line-clamp-1">
                  {stat.description}
                </div>
              </div>
            </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};