import React from 'react';
import { ExternalLink, Check, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { VENTURE_HAFELE } from '../data/websiteData';
import { Reveal, SplitText, EASE } from './Effects';
import { Flash } from './FX';

interface VenturesSectionProps {
  onOpenContact: () => void;
}

/* Soft shapes that drift slowly behind the page */
const FloatingShapes: React.FC = () => {
  const shapes = [
    { left: '4%', top: '30%', size: 14, round: true, dur: 9, delay: 0, color: 'bg-blue-300/40' },
    { left: '94%', top: '38%', size: 18, round: false, dur: 11, delay: 1, color: 'bg-red-300/30' },
    { left: '8%', top: '75%', size: 10, round: false, dur: 8, delay: 2, color: 'bg-indigo-300/40' },
    { left: '90%', top: '80%', size: 16, round: true, dur: 12, delay: 0.5, color: 'bg-sky-300/40' },
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

export const VenturesSection: React.FC<VenturesSectionProps> = ({
  onOpenContact,
}) => {
  return (
    <div className="bg-white min-h-screen pt-6 sm:pt-8 lg:pt-10 pb-16 lg:pb-24 relative overflow-hidden">
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <FloatingShapes />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Venture Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-5 sm:p-12 text-white relative overflow-hidden mb-16 shadow-2xl border border-slate-800"
        >
          <div className="absolute top-0 right-10 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />
          <div className="aurora-blob absolute -top-20 left-1/3 w-72 h-72 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-3 max-w-2xl">
              {/* Badge: drops in, sparkle spins, light sweeps across */}
              <motion.div
                initial={{ opacity: 0, y: -24, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.2 }}
                className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-xs font-bold uppercase tracking-widest text-red-300 overflow-hidden"
              >
                <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-slide-in-out" />
                <Flash><Sparkles className="relative w-3.5 h-3.5 animate-spin-slow" /></Flash>
                <span className="relative">Strategic Venture & Architectural Partner</span>
              </motion.div>

              <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                <SplitText text={VENTURE_HAFELE.partnerName} delay={0.3} />
              </h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
                style={{ transformOrigin: 'left' }}
                className="relative h-1 w-24 rounded-full bg-gradient-to-r from-red-500 via-blue-500 to-sky-400 overflow-hidden"
              >
                <span className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent animate-slide-in-out" />
              </motion.div>

              <Reveal direction="blur" delay={0.5}>
                <p className="text-xl text-slate-300 font-medium">
                  {VENTURE_HAFELE.tagline}
                </p>
              </Reveal>
            </div>

            {/* Partner logo: floats gently with a glowing halo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.5 }}
              className="relative shrink-0"
            >
              <span className="absolute -inset-3 rounded-3xl bg-blue-500/30 blur-xl animate-pulse-glow pointer-events-none" />
              <motion.div
                whileHover={{ scale: 1.08, rotate: 2 }}
                className="fx-glow-border animate-float-gentle relative bg-white p-5 rounded-2xl shadow-xl flex items-center justify-center border border-white/20"
              >
                <img
                  src={VENTURE_HAFELE.logo}
                  alt="Hafele Logo"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* About Hafele Narrative */}
        <Reveal direction="blur" className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span>Global Architectural Innovation</span>
            </motion.div>
            <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              <SplitText text={VENTURE_HAFELE.aboutTitle} />
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {VENTURE_HAFELE.aboutParagraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: EASE }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </Reveal>

        {/* Product World Section */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-2 overflow-hidden"
            >
              <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12 animate-slide-in-out" />
              <span className="relative">Integrated Architectural Solutions</span>
            </motion.div>
            <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              <SplitText text={VENTURE_HAFELE.productWorldTitle} />
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
              style={{ transformOrigin: 'center' }}
              className="relative mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-red-500 via-blue-600 to-sky-400 overflow-hidden"
            >
              <span className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent animate-slide-in-out" />
            </motion.div>
            <Reveal direction="blur" delay={0.3}>
              <p className="text-base text-slate-600 mt-3 font-normal">
                {VENTURE_HAFELE.productWorldLead}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {VENTURE_HAFELE.sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -70 : 70, rotateY: idx % 2 === 0 ? -18 : 18, transformPerspective: 1000 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: EASE }}
                whileHover={{ y: -10, transition: { duration: 0.25 } }}
                className="group bg-slate-50/80 hover:bg-white rounded-3xl border border-slate-200 hover:border-blue-300 p-5 sm:p-10 flex flex-col justify-between shadow-xs hover:shadow-[0_20px_45px_-12px_rgba(30,58,138,0.14)] transition-all duration-350 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Light sweep that glides across the card on hover */}
                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-blue-100/60 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[420%] transition-all duration-1000 ease-out" />

                <div className="relative">
                  {/* Icon floats, with a rotating dashed ring and a ping */}
                  <div
                    className="relative w-14 h-14 mb-6 animate-float-gentle"
                    style={{ animationDelay: `${idx * 0.6}s` }}
                  >
                    <span className="absolute -inset-2 rounded-[1.3rem] border-2 border-dashed border-blue-300/60 animate-spin-slow" />
                    <span
                      className="absolute inset-0 rounded-2xl bg-blue-500/30 animate-ping"
                      style={{ animationDuration: '3.2s', animationDelay: `${idx * 0.5}s` }}
                    />
                    <div className="relative w-14 h-14 rounded-2xl bg-blue-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 flex items-center justify-center transition-all duration-300 shadow-xs group-hover:rotate-6 icon-pop">
                      <Shield className="w-7 h-7 text-blue-700 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-4 tracking-tight">
                    {section.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                    {section.description}
                  </p>

                  <div className="pt-4 border-t border-slate-200/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                      Key Highlights:
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      {section.points.map((pt, pIdx) => (
                        <motion.li
                          key={pIdx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-20px' }}
                          transition={{ duration: 0.45, delay: 0.25 + pIdx * 0.1, ease: EASE }}
                          className="flex items-start gap-2.5 hover:translate-x-1 transition-transform"
                        >
                          <Flash><Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /></Flash>
                          <span>{pt}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="relative mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Engineered in Germany · Delivered by MultiConcepts
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Bar */}
        <Reveal direction="flash" className="bg-slate-100 rounded-3xl p-5 sm:p-10 border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Incorporate Hafele Solutions in Your Next Build
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Consult with our architectural specialists for hardware specifications and seamless integration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:shrink-0 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenContact}
              className="btn-live-smooth btn-shimmer shine-hover group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 rounded-2xl shadow-lg shadow-blue-700/25 hover:shadow-2xl hover:shadow-blue-600/35 transition-all cursor-pointer"
            >
              <span>Consult Our Team</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href={VENTURE_HAFELE.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-live-smooth inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-300 rounded-2xl shadow-sm hover:shadow-lg transition-all"
            >
              <span>Visit Official Hafele Website</span>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </motion.a>
          </div>
        </Reveal>
      </div>
    </div>
  );
};