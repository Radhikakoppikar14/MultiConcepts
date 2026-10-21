import React, { useState, useEffect, useCallback } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, MapPin, Tag, Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_PROJECTS, GalleryProject } from '../data/websiteData';
import { EASE, Reveal, SplitText } from './Effects';
import { Flash } from './FX';

/* Soft shapes that drift slowly behind the section */
const FloatingShapes: React.FC = () => {
  const shapes = [
    { left: '5%', top: '12%', size: 14, round: true, dur: 9, delay: 0, color: 'bg-blue-300/50' },
    { left: '92%', top: '10%', size: 18, round: false, dur: 11, delay: 1, color: 'bg-indigo-300/40' },
    { left: '10%', top: '60%', size: 10, round: false, dur: 8, delay: 2, color: 'bg-sky-300/50' },
    { left: '88%', top: '55%', size: 16, round: true, dur: 12, delay: 0.5, color: 'bg-blue-300/40' },
    { left: '50%', top: '5%', size: 8, round: true, dur: 10, delay: 1.5, color: 'bg-indigo-300/40' },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {shapes.map((s, i) => (
        <motion.span
          key={i}
          className={`absolute ${s.color} ${s.round ? 'rounded-full' : 'rounded-md'}`}
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={{ y: [0, -24, 0, 18, 0], x: [0, 12, -10, 8, 0], rotate: s.round ? 0 : [0, 90, 180, 270, 360] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<GalleryProject | null>(null);
  const [dir, setDir] = useState(1);

  const categories = ['All', 'Residential', 'Commercial', 'Architecture', 'Interiors'];

  const filteredProjects =
    selectedCategory === 'All'
      ? GALLERY_PROJECTS
      : GALLERY_PROJECTS.filter((p) => p.category === selectedCategory);

  const currentIndex = activeProject
    ? filteredProjects.findIndex((p) => p.id === activeProject.id)
    : -1;

  const goPrev = useCallback(() => {
    if (!filteredProjects.length) return;
    setDir(-1);
    setActiveProject(filteredProjects[currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1]);
  }, [filteredProjects, currentIndex]);

  const goNext = useCallback(() => {
    if (!filteredProjects.length) return;
    setDir(1);
    setActiveProject(filteredProjects[currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0]);
  }, [filteredProjects, currentIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    goPrev();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    goNext();
  };

  // Keyboard controls for the lightbox
  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeProject, goPrev, goNext]);

  return (
    <section className="pt-6 sm:pt-8 lg:pt-10 pb-16 lg:pb-24 bg-slate-50 relative overflow-hidden">
      {/* Ambient glows: pulsing + drifting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <FloatingShapes />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-2.5 shadow-xs overflow-hidden"
          >
            <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12 animate-slide-in-out" />
            <Flash><Sparkles className="relative w-3.5 h-3.5 text-blue-600 animate-spin-slow" /></Flash>
            <span className="relative">Completed Works & Landmark Elevators</span>
          </motion.div>

          <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            <SplitText text="Project" />{' '}
            <SplitText text="Gallery" delay={0.25} wordClassName="text-gradient-primary" />
          </h2>

          {/* Underline draws itself, then a light keeps travelling along it */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            style={{ transformOrigin: 'center' }}
            className="relative mx-auto mt-4 h-1 w-28 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400 overflow-hidden"
          >
            <span className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent animate-slide-in-out" />
          </motion.div>

          <Reveal direction="blur" delay={0.35}>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
              A crystal-clear visual portfolio of our executed residential villas, commercial complexes, and architectural achievements across Bangalore.
            </p>
          </Reveal>
        </div>

        {/* Filter Tabs: drop in one by one, active pill glides between them */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-8 sm:mb-10">
          {categories.map((category, ci) => {
            const isActive = selectedCategory === category;
            return (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: -16, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.5 + ci * 0.07 }}
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white shadow-lg shadow-blue-700/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 bg-white border border-slate-200/80 shadow-2xs'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 rounded-xl -z-10 shadow-md overflow-hidden"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  >
                    <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-slide-in-out" />
                  </motion.div>
                )}
                <span className="relative">{category}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 44, scale: 0.92, rotateX: -16, transformPerspective: 1000 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                exit={{ opacity: 0, scale: 0.9, rotateX: 12 }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: EASE }}
                whileHover={{ y: -10 }}
                onClick={() => setActiveProject(project)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md hover:shadow-2xl hover:shadow-blue-900/15 hover:border-blue-500/70 transition-all duration-300 flex flex-col"
              >
                {/* Top accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 z-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100 border-b border-slate-100 img-live-card">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Light sweep across the photo on hover */}
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[420%] transition-all duration-1000 ease-out z-10" />

                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-blue-700 border border-blue-100 shadow-md">
                      <Tag className="w-3 h-3 text-blue-600" />
                      {project.category}
                    </span>
                  </div>

                  {/* Expand icon with a soft pulsing ring */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <div className="relative">
                      <span className="absolute inset-0 rounded-full bg-blue-500/50 animate-ping opacity-40" style={{ animationDuration: '2.8s', animationDelay: `${(index % 4) * 0.5}s` }} />
                      <div className="relative w-9 h-9 rounded-full bg-slate-900/80 group-hover:bg-blue-600 text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg group-hover:scale-110 group-hover:rotate-90">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 pointer-events-none" />
                </div>

                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {project.location && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 group-hover:animate-bounce" />
                        <span>{project.location}</span>
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-normal line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      <span>View Project Details</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-xs"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 24, rotateX: -10, transformPerspective: 1200 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 8 }}
              transition={{ type: 'spring', damping: 24, stiffness: 340, mass: 0.7 }}
              className="relative max-w-5xl w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col lg:flex-row max-h-[92dvh] overflow-y-auto lg:overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-slate-900/90 text-white hover:bg-rose-600 flex items-center justify-center transition-colors border border-white/20 shadow-xl cursor-pointer"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Image area: photo slides in from the direction you navigate */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[300px] lg:min-h-[520px] p-2">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.img
                    key={activeProject.id}
                    src={activeProject.imageSrc}
                    alt={activeProject.title}
                    initial={{ opacity: 0, x: dir * 70, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: dir * -70, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="max-h-[45dvh] sm:max-h-[60dvh] lg:max-h-[75vh] w-auto max-w-full object-contain drop-shadow-2xl rounded-lg"
                  />
                </AnimatePresence>

                {/* Photo counter */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/15 text-[11px] font-semibold text-white backdrop-blur-md">
                  {currentIndex + 1} / {filteredProjects.length}
                </div>

                <motion.button
                  whileHover={{ scale: 1.12, x: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xl border border-white/20"
                  aria-label="Previous project photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.12, x: 2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xl border border-white/20"
                  aria-label="Next project photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Info panel: text re-animates for every project */}
              <div className="w-full lg:w-88 p-4 sm:p-8 bg-slate-900 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 shrink-0">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{activeProject.category} · {activeProject.tag}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                    {activeProject.title}
                  </h3>

                  {activeProject.location && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mb-4 bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700/60">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{activeProject.location}</span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {activeProject.description}
                  </p>
                </motion.div>

                <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">MultiConcepts Portfolio</span>
                  <Flash><span className="text-blue-400 font-medium">Bangalore Landmark</span></Flash>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};