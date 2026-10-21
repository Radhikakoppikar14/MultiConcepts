import React from 'react';
import { CheckCircle2, ArrowRight, Calendar, Users, Award, Sparkles, ChevronRight, MapPin, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { ABOUT_DETAILS, COMPANY_INFO, GALLERY_PROJECTS } from '../data/websiteData';

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

  return (
    <div className="bg-white min-h-screen">
      {/* About Hero Banner: Clear, Bright Architectural Panorama with Live Continuous Motion */}
      <div className="relative bg-slate-950 pt-8 sm:pt-10 lg:pt-12 pb-14 sm:pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src={COMPANY_INFO.aboutHeroBg}
            alt="About MultiConcepts Construction"
            animate={{
              scale: [1.03, 1.10, 1.05, 1.03],
              x: [0, -14, 10, 0],
              y: [0, -8, -3, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full object-cover object-center will-change-transform brightness-[0.98] contrast-[1.04]"
          />
          {/* Live sweeping light sheen */}
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
          <div className="absolute inset-0 bg-slate-950/50 backdrop-brightness-[0.88] z-[2]" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/60 to-transparent pointer-events-none z-[3]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none z-[3]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/90 border border-blue-500/40 text-xs font-bold uppercase tracking-widest text-blue-300 mb-4 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Legacy & Foundations · Since 1999</span>
          </div>

          <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
            About <span className="text-gradient-live">MultiConcepts</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm">
            Parent company of Paramount Enterprises, shaping architectural dreams into physical reality for over 25 years.
          </p>
        </div>
      </div>

      {/* Main Intro Lead */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-lg sm:text-xl font-normal text-slate-700 leading-relaxed">
            {COMPANY_INFO.fullAboutIntro}
          </p>
        </div>
      </section>

      {/* Two Column Layout: Journey & Expertise with attractive hover lifts */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-8 lg:gap-12 items-start">
          <motion.div
            whileHover={{ y: -8 }}
            className="group bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400 p-5 sm:p-10 shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(30,58,138,0.12)] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white border border-blue-100 flex items-center justify-center mb-6 transition-all duration-300 shadow-xs group-hover:rotate-6">
              <Calendar className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-900 mb-4 tracking-tight transition-colors">
              {ABOUT_DETAILS.journeyTitle}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {ABOUT_DETAILS.journeyText}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="group bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400 p-5 sm:p-10 shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(30,58,138,0.12)] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-indigo-600 text-indigo-700 group-hover:text-white border border-blue-100 flex items-center justify-center mb-6 transition-all duration-300 shadow-xs group-hover:rotate-6">
              <Award className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-900 mb-4 tracking-tight transition-colors">
              {ABOUT_DETAILS.expertiseTitle}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {ABOUT_DETAILS.expertiseText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visual Architectural Showcase: Real Projects Fully Visible */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -8, scale: 1.015 }}
                onClick={onExploreGallery}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-400 transition-all duration-300 cursor-pointer flex flex-col"
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
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 sm:py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {ABOUT_DETAILS.philosophyItems.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white flex items-center justify-center font-bold text-lg mb-5 transition-colors shadow-2xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client-Centric Approach Bar with Lively CTA Buttons */}
      <section className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
          {ABOUT_DETAILS.clientCentricTitle}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
          {ABOUT_DETAILS.clientCentricText}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenContact}
            className="btn-live-smooth btn-shimmer shine-hover group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 rounded-2xl shadow-xl shadow-blue-700/25 hover:shadow-2xl hover:shadow-blue-600/35 transition-all cursor-pointer border border-blue-500/30"
          >
            <span>Discuss Your Vision</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onExploreGallery}
            className="btn-live-smooth group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all cursor-pointer border border-slate-300 shadow-md hover:shadow-lg"
          >
            <span>View Our Past Projects</span>
            <ChevronRight className="w-4 h-4 text-slate-500 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>
      </section>

      {/* History Timeline of Excellence */}
      <section className="py-12 sm:py-20 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_DETAILS.timeline.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="group bg-slate-800/80 hover:bg-slate-800 rounded-3xl border border-slate-700 hover:border-blue-400 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden"
              >
                <div>
                  <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300 font-mono tracking-tight tabular-nums mb-3 group-hover:scale-105 transition-transform origin-left">
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};