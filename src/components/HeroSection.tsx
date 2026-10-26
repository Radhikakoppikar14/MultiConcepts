import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STATS } from '../data/websiteData';
import { CountUp } from './Effects';

interface HeroSectionProps {
  onExploreGallery: () => void;
  onOpenContact: () => void;
  onSelectTab: (tab: string) => void;
}

// One video + one caption (title, tagline, description) per slide.
// The clips are split-screen (left | right). On phones only the RIGHT half is shown
// (see the max-sm: classes on the <video>). To show the left half instead, swap
// max-sm:right-0 for max-sm:left-0 and drop max-sm:left-auto.
const HIGHLIGHTS = ['Uncompromised Quality', 'On-Time Milestone Handover', '100% Transparent Costing'];
const SLIDE_DURATION = 10000; // ms, matches the 10s clips
// TODO: final videos are not ready yet, so the two existing clips are reused (hero-1 / hero-2).
// When the new videos arrive, just change the `src` / `poster` of each slide below.
const SLIDES = [
  {
    // 1. Construction: active residential and commercial building progress
    src: '/assests/videos/hero-1.mp4',
    poster: '/assests/videos/hero-1.jpg',
    title: 'Construction — Residential / Commercial Complexes',
    lead: 'Building Quality,',
    accent: 'Shaping Futures',
    description:
      'Delivering expert construction execution for both residential villas and commercial complexes to bring blueprints to life.',
  },
  {
    // 2. Real estate consultancy: property scouting, land investment, location planning
    src: '/assests/videos/hero-2.mp4',
    poster: '/assests/videos/hero-2.jpg',
    title: 'Real Estate Consultancy',
    lead: 'Your Trusted Guide in',
    accent: 'Property Investment',
    description:
      'Providing professional guidance, market insights, and strategic assistance to clients for purchasing land, plots, and properties.',
  },
  {
    // 3. Property management: well-maintained interiors / professional property care
    src: '/assests/videos/hero-1.mp4',
    poster: '/assests/videos/hero-1.jpg',
    title: 'Property Management Services',
    lead: 'Total Care for',
    accent: 'Your Valued Assets',
    description:
      'Managing properties completely on behalf of owners and NRIs, taking care of tenant placement, maintenance, and administrative details.',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreGallery, onOpenContact }) => {
  const [slide, setSlide] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const next = useCallback(() => setSlide((s) => (s + 1) % SLIDES.length), []);
  const prev = useCallback(() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length), []);

  // Play the active video from the start, pause the others, auto-advance
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === slide) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
    const t = setTimeout(next, SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [slide, next]);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[60svh] lg:min-h-[65svh] flex flex-col justify-end">
      {/* Background videos + a single dark overlay */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((sl, i) => (
          <video
            key={sl.src + i}
            ref={(el) => { videoRefs.current[i] = el; }}
            src={sl.src}
            poster={sl.poster}
            autoPlay={i === 0}
            muted
            loop
            playsInline
            preload={i === 0 ? 'auto' : 'metadata'}
            aria-label={sl.title}
            aria-hidden={i !== slide}
            className={`absolute inset-0 w-full h-full object-cover max-sm:left-auto max-sm:right-0 max-sm:w-auto max-sm:min-w-[200%] max-sm:max-w-none transition-opacity duration-1000 ease-in-out ${
              i === slide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-slate-950/45 sm:bg-gradient-to-r sm:from-slate-950/70 sm:via-slate-950/35 sm:to-slate-950/15" />
      </div>

      {/* Slide controls */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex items-center gap-2">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-8 h-8 rounded-full bg-black/40 hover:bg-blue-600 border border-white/25 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-1.5 w-6 sm:w-10 rounded-full bg-white/25 overflow-hidden cursor-pointer"
            >
              {i === slide && (
                <motion.span
                  key={slide}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                  className="absolute inset-y-0 left-0 bg-sky-300 rounded-full"
                />
              )}
            </button>
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next slide"
          className="w-8 h-8 rounded-full bg-black/40 hover:bg-blue-600 border border-white/25 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-end">
        <div className="w-full max-w-xl lg:max-w-2xl flex flex-col items-start">
        {/* Slide caption: title, tagline, description */}
        <div className="min-h-[12rem] sm:min-h-[13.5rem] lg:min-h-[14.5rem] flex items-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-sky-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] mb-3">
                {SLIDES[slide].title}
              </p>
              <h1 className="text-[1.625rem] min-[400px]:text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                <span className="block">{SLIDES[slide].lead}</span>
                <span className="block mt-1 font-bold">
                  <span className="text-gradient-live [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                    {SLIDES[slide].accent}
                  </span>
                </span>
              </h1>
              <p className="mt-3 text-sm sm:text-base font-medium text-slate-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] leading-relaxed max-w-lg text-justify [text-align-last:left] hyphens-auto">
                {SLIDES[slide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats: number + label only */}
        <div className="mt-5 sm:mt-6 w-full pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
          {STATS.map((stat, i) => (
            <div key={i} className="text-left">
              <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-baseline justify-start">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-[11px] sm:text-sm font-semibold uppercase tracking-wide text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        </div>

        {/* Supporting copy and highlights sit at the lower-right, just above the services scroller. */}
        <div className="relative translate-y-2 sm:translate-y-3 w-full max-w-xl lg:max-w-2xl lg:justify-self-end flex flex-col items-end text-right">
          <p className="text-xs sm:text-sm lg:text-base font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] leading-relaxed w-full max-w-xl text-justify [text-align-last:left] hyphens-auto">
            Welcome to Multiconcepts, your trusted partner for construction, real estate consultancy
            and property management. With years of experience in the industry, we are dedicated
            to delivering outstanding projects that exceed expectations.
          </p>

          {/* Highlight pills: pop in one by one, check icons pulse in turn */}
          <div className="mt-4 sm:mt-5 flex flex-wrap justify-between items-center gap-1.5 sm:gap-2 w-full max-w-xl pb-1">
            {HIGHLIGHTS.map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.4 + i * 0.15 }}
                whileHover={{ y: -2, scale: 1.04 }}
                className="inline-flex shrink-0 items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-950/60 hover:bg-slate-900/80 backdrop-blur-md border border-white/10 hover:border-emerald-400/40 text-[10px] sm:text-[11px] font-medium text-slate-100 whitespace-nowrap shadow-md shadow-black/20 transition-colors cursor-default"
              >
                <CheckCircle2
                  className="w-3 h-3 text-emerald-400 shrink-0 animate-flash"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};