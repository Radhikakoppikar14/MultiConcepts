import React, { useState, useRef } from 'react';
import { CheckCircle2, ArrowRight, Calendar, Award, Sparkles, ChevronRight, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ABOUT_DETAILS, COMPANY_INFO, GALLERY_PROJECTS } from '../data/websiteData';
import { Reveal, StaggerGroup, StaggerItem, Magnetic, SplitText } from './Effects';
import { Typewriter, TypeText, Carousel, Popup } from './FX';

interface AboutViewProps {
  onOpenContact: () => void;
  onExploreGallery: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenContact,
  onExploreGallery,
}) => {
  // Highlight top 3 milestone projects for visual proof
  const featuredProjects = GALLERY_PROJECTS.slice(0, 3);

  // Motion: hero parallax + reduced-motion safety
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Pop-up state for philosophy + timeline cards
  const [philosophyOpen, setPhilosophyOpen] = useState<number | null>(null);
  const [timelineOpen, setTimelineOpen] = useState<number | null>(null);
  const philosophy = philosophyOpen !== null ? ABOUT_DETAILS.philosophyItems[philosophyOpen] : null;
  const timeline = timelineOpen !== null ? ABOUT_DETAILS.timeline[timelineOpen] : null;

  return (
    <div className="bg-white min-h-screen">
      {/* About Hero Banner: parallax photo, floating shapes, rising particles, live stats */}
      <div ref={heroRef} className="relative bg-slate-950 pt-8 sm:pt-10 lg:pt-12 pb-14 sm:pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div style={reduce ? undefined : { y: bgY }} className="absolute inset-x-0 -top-[10%] h-[125%]">
            <motion.img
              src={COMPANY_INFO.aboutHeroBg}
              alt="About MultiConcepts Construction"
              animate={reduce ? undefined : {
                scale: [1.03, 1.10, 1.05, 1.03],
                x: [0, -14, 10, 0],
                y: [0, -8, -3, 0],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full object-cover object-center will-change-transform brightness-[0.98] contrast-[1.04]"
            />
          </motion.div>
          {/* Live sweeping light sheen */}
          {!reduce && (
            <motion.div
              animate={{ x: ['-120%', '220%'] }}
              transition={{ duration: 8, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-sky-300/12 to-transparent -skew-x-12 pointer-events-none z-[1]"
            />
          )}
          <div className="absolute inset-0 bg-slate-950/50 backdrop-brightness-[0.88] z-[2]" />
          {/* Drifting blueprint grid */}
          <motion.div
            aria-hidden
            animate={reduce ? undefined : { backgroundPosition: ['0px 0px', '56px 56px'] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 z-[2] opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(125,211,252,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.7) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/60 to-transparent pointer-events-none z-[3]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none z-[3]" />

          {/* Glow orbs */}
          <div className="aurora-blob absolute -top-20 -left-16 w-72 h-72 rounded-full bg-blue-600/30 blur-3xl z-[3] pointer-events-none" />
          <div className="aurora-blob absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-sky-400/20 blur-3xl z-[3] pointer-events-none" style={{ animationDelay: '-7s' }} />

        </div>

        <motion.div
          style={reduce ? undefined : { y: textY, opacity: textFade }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/90 border border-blue-500/40 text-xs font-bold uppercase tracking-widest text-blue-300 mb-4 shadow-xl"
          >
            <motion.span
              animate={reduce ? undefined : { rotate: 360, scale: [1, 1.25, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="inline-flex"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </motion.span>
            <span>Legacy & Foundations · Since 1999</span>
            <span className="absolute inset-0 rounded-full ring-1 ring-blue-400/50 animate-ping opacity-30" style={{ animationDuration: '3s' }} />
          </motion.div>

          <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
            <SplitText text="About" delay={0.1} />{' '}
            <SplitText text="MultiConcepts" wordClassName="text-gradient-live" delay={0.3} />
          </h1>

          <Reveal direction="blur" delay={0.55}>
            <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm">
              Parent company of Paramount Enterprises, shaping architectural dreams into physical reality for over 25 years.
            </p>
          </Reveal>
          <div className="mt-4 text-lg sm:text-2xl font-bold text-sky-300 min-h-[1.6em]">
            <Typewriter
              phrases={[
                'Building trust since 1999.',
                'Quality. Time. Cost.',
                'Landmarks across Bangalore.',
                'Your dreams made a reality.',
              ]}
            />
          </div>

        </motion.div>
      </div>

      {/* Main Intro Lead */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-blue-200/40 blur-3xl animate-pulse-glow pointer-events-none" />
        <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-sky-200/50 blur-3xl animate-float-slow pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={reduce ? { opacity: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-1 w-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500"
          />
          <TypeText
            as="p"
            speed={14}
            text={COMPANY_INFO.fullAboutIntro}
            className="text-lg sm:text-xl font-normal text-slate-700 leading-relaxed"
          />
        </div>
      </section>

      {/* Two Column Layout: Journey & Expertise with attractive hover lifts */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-8 lg:gap-12 items-start">
          <Reveal direction="flipY" className="h-full">
          <motion.div
            whileHover={{ y: -8 }}
            className="group h-full bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400 p-5 sm:p-10 shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(30,58,138,0.12)] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ rotate: 8, scale: 1.1 }}
              className="relative w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white border border-blue-100 flex items-center justify-center mb-6 transition-colors duration-300 shadow-xs"
            >
              <span className="absolute inset-0 rounded-2xl bg-blue-400/30 animate-ping opacity-30" style={{ animationDuration: '3s' }} />
              <Calendar className="relative w-7 h-7" />
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-900 mb-4 tracking-tight transition-colors">
              {ABOUT_DETAILS.journeyTitle}
            </h2>
            <TypeText
              as="p"
              speed={12}
              text={ABOUT_DETAILS.journeyText}
              className="text-base text-slate-600 leading-relaxed font-normal"
            />
          </motion.div>
          </Reveal>

          <Reveal direction="flipY" delay={0.15} className="h-full">
          <motion.div
            whileHover={{ y: -8 }}
            className="group h-full bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400 p-5 sm:p-10 shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(30,58,138,0.12)] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              whileHover={{ rotate: -8, scale: 1.1 }}
              className="relative w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-indigo-600 text-indigo-700 group-hover:text-white border border-blue-100 flex items-center justify-center mb-6 transition-colors duration-300 shadow-xs"
            >
              <span className="absolute inset-0 rounded-2xl bg-indigo-400/30 animate-ping opacity-30" style={{ animationDuration: '3s', animationDelay: '0.6s' }} />
              <Award className="relative w-7 h-7" />
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-900 mb-4 tracking-tight transition-colors">
              {ABOUT_DETAILS.expertiseTitle}
            </h2>
            <TypeText
              as="p"
              speed={12}
              text={ABOUT_DETAILS.expertiseText}
              className="text-base text-slate-600 leading-relaxed font-normal"
            />
          </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Visual Architectural Showcase: Real Projects Fully Visible */}
      <section className="relative overflow-hidden py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-blue-200/40 blur-3xl animate-float-slow pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
                <span>Bangalore Portfolio</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Crafted in Stone, Steel & Precision
              </h2>
            </div>
            <button
              onClick={onExploreGallery}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group cursor-pointer"
            >
              <span>Explore all completed landmarks</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>

          <StaggerGroup stagger={0.16} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((p, i) => (
              <StaggerItem key={p.id} className="h-full" y={36} variant={(['flip', 'zoom', 'rotate'] as const)[i % 3]}>
              <motion.div
                whileHover={{ y: -8, scale: 1.015 }}
                onClick={onExploreGallery}
                className="group h-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-400 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="img-live-card relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={p.imageSrc}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/95 text-xs font-bold text-blue-700 shadow-sm z-10">
                    {p.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {p.location && (
                      <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mb-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{p.location}</span>
                      </div>
                    )}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                    <span>View project in gallery</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                  </div>
                </div>
              </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 sm:py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-80 h-80 rounded-full bg-blue-200/40 blur-3xl animate-pulse-glow pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-indigo-200/40 blur-3xl animate-float-slow pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Guiding Ethos</span>
            </div>
            <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {ABOUT_DETAILS.philosophyTitle}
            </h2>
            <p className="text-base text-slate-600 mt-3 font-normal">
              The foundational cornerstones that govern every blueprint and construction site.
            </p>
          </Reveal>

          <StaggerGroup stagger={0.18} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {ABOUT_DETAILS.philosophyItems.map((item, idx) => (
              <StaggerItem key={idx} className="h-full" y={36} variant={idx % 2 === 0 ? 'flipY' : 'zoom'}>
              <motion.div
                whileHover={{ y: -6 }}
                onClick={() => setPhilosophyOpen(idx)}
                className="h-full cursor-pointer bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.12 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 16 }}
                    className="relative w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white flex items-center justify-center font-bold text-lg mb-5 transition-colors shadow-2xs"
                  >
                    <span className="absolute inset-0 rounded-xl bg-blue-400/40 animate-ping opacity-30" style={{ animationDuration: '2.8s', animationDelay: `${idx * 0.5}s` }} />
                    <span className="relative">0{idx + 1}</span>
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal line-clamp-3">
                    {item.description}
                  </p>
                </div>
                <div className="mt-5 text-xs font-semibold text-blue-600 flex items-center gap-1.5">
                  <span>Tap to read more</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                </div>
              </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Client-Centric Approach Bar with Lively CTA Buttons */}
      <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/60 to-white pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-sky-200/40 blur-3xl animate-pulse-glow pointer-events-none" />
      <Reveal direction="zoom">
      <div className="relative py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
          <SplitText text={ABOUT_DETAILS.clientCentricTitle} />
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
          {ABOUT_DETAILS.clientCentricText}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Magnetic className="w-full sm:w-auto">
          <motion.button
            animate={reduce ? undefined : {
              boxShadow: [
                '0 10px 25px -8px rgba(29,78,216,0.35)',
                '0 16px 40px -6px rgba(56,189,248,0.55)',
                '0 10px 25px -8px rgba(29,78,216,0.35)',
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenContact}
            className="btn-live-smooth btn-shimmer shine-hover group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 rounded-2xl shadow-xl shadow-blue-700/25 hover:shadow-2xl hover:shadow-blue-600/35 transition-all cursor-pointer border border-blue-500/30"
          >
            <span>Discuss Your Vision</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </motion.button>
          </Magnetic>

          <Magnetic className="w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onExploreGallery}
            className="btn-live-smooth group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all cursor-pointer border border-slate-300 shadow-md hover:shadow-lg"
          >
            <span>View Our Past Projects</span>
            <ChevronRight className="w-4 h-4 text-slate-500 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
          </Magnetic>
        </div>
      </div>
      </Reveal>
      </section>

      {/* History Timeline of Excellence */}
      <section className="py-12 sm:py-20 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden">
        <div className="aurora-blob absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="aurora-blob absolute -bottom-20 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" style={{ animationDelay: '-6s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="flip" className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950 border border-blue-500/40 text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Milestone Legacy</span>
            </div>
            <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {ABOUT_DETAILS.timelineTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 font-normal">
              A quarter century of transforming ideas into celebrated architectural landmarks.
            </p>
            <motion.div
              initial={reduce ? { opacity: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-0.5 w-40 mx-auto mt-5 rounded-full bg-gradient-to-r from-transparent via-sky-400 to-transparent"
            />
          </Reveal>

          <Carousel
            dark
            desktopCols={2}
            interval={5000}
            items={ABOUT_DETAILS.timeline.map((item, idx) => ({ item, idx }))}
            render={({ item, idx }) => (
              <motion.div
                whileHover={{ y: -8 }}
                onClick={() => setTimelineOpen(idx)}
                className="cursor-pointer group h-full bg-slate-800/80 hover:bg-slate-800 rounded-3xl border border-slate-700 hover:border-blue-400 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden"
              >
                <div>
                  <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300 font-mono tracking-tight tabular-nums mb-3 group-hover:scale-110 transition-transform origin-left">
                    {item.year}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center gap-2 text-xs font-medium text-slate-400 group-hover:text-blue-300 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{item.milestone}</span>
                </div>
              </motion.div>
            )}
          />
        </div>
      </section>

      {/* Pop-up: philosophy card */}
      <Popup open={philosophyOpen !== null} onClose={() => setPhilosophyOpen(null)}>
        {philosophy && (
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xl mb-5 shadow-lg shadow-blue-600/30">
              0{(philosophyOpen ?? 0) + 1}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 pr-8">{philosophy.title}</h3>
            <TypeText
              as="p"
              speed={14}
              text={philosophy.description}
              className="text-base text-slate-600 leading-relaxed"
            />
          </div>
        )}
      </Popup>

      {/* Pop-up: timeline milestone */}
      <Popup open={timelineOpen !== null} onClose={() => setTimelineOpen(null)}>
        {timeline && (
          <div>
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 font-mono mb-3">
              {timeline.year}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 pr-8">{timeline.title}</h3>
            <TypeText
              as="p"
              speed={14}
              text={timeline.description}
              className="text-base text-slate-600 leading-relaxed"
            />
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-sm font-semibold text-blue-700">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{timeline.milestone}</span>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};