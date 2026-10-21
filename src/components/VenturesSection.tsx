import React from 'react';
import { ExternalLink, Check, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { VENTURE_HAFELE } from '../data/websiteData';
import { Reveal, EASE } from './Effects';

interface VenturesSectionProps {
  onOpenContact: () => void;
}

export const VenturesSection: React.FC<VenturesSectionProps> = ({
  onOpenContact,
}) => {
  return (
    <div className="bg-white min-h-screen pt-6 sm:pt-8 lg:pt-10 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Venture Header Card with rich dark luxury styling & live aura */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-5 sm:p-12 text-white relative overflow-hidden mb-16 shadow-2xl border border-slate-800">
          {/* Subtle ambient light */}
          <div className="absolute top-0 right-10 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-xs font-bold uppercase tracking-widest text-red-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Strategic Venture & Architectural Partner</span>
              </div>
              <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {VENTURE_HAFELE.partnerName}
              </h1>
              <p className="text-xl text-slate-300 font-medium">
                {VENTURE_HAFELE.tagline}
              </p>
            </div>

            {/* Official Partner Logo with subtle hover lift */}
            <motion.div
              whileHover={{ scale: 1.06, rotate: 1 }}
              className="bg-white p-5 rounded-2xl shadow-xl shrink-0 flex items-center justify-center border border-white/20"
            >
              <img
                src={VENTURE_HAFELE.logo}
                alt="Hafele Logo"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* About Hafele Narrative */}
        <Reveal direction="blur" className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
              <span>Global Architectural Innovation</span>
            </div>
            <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {VENTURE_HAFELE.aboutTitle}
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {VENTURE_HAFELE.aboutParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </Reveal>

        {/* Product World Section */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
              <span>Integrated Architectural Solutions</span>
            </div>
            <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {VENTURE_HAFELE.productWorldTitle}
            </h2>
            <p className="text-base text-slate-600 mt-3 font-normal">
              {VENTURE_HAFELE.productWorldLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {VENTURE_HAFELE.sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -70 : 70, rotateY: idx % 2 === 0 ? -18 : 18, transformPerspective: 1000 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: EASE }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group bg-slate-50/80 hover:bg-white rounded-3xl border border-slate-200 hover:border-blue-300 p-5 sm:p-10 flex flex-col justify-between shadow-xs hover:shadow-[0_20px_45px_-12px_rgba(30,58,138,0.14)] transition-all duration-350 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300 shadow-xs group-hover:rotate-6">
                    <Shield className="w-7 h-7 text-blue-700 group-hover:text-white transition-colors" />
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
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Engineered in Germany · Delivered by MultiConcepts
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Bar with Dynamic Live Buttons */}
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