import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, MapPin, Tag, Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_PROJECTS, GalleryProject } from '../data/websiteData';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<GalleryProject | null>(null);

  const categories = ['All', 'Residential', 'Commercial', 'Architecture', 'Interiors'];

  const filteredProjects =
    selectedCategory === 'All'
      ? GALLERY_PROJECTS
      : GALLERY_PROJECTS.filter((p) => p.category === selectedCategory);

  const currentIndex = activeProject
    ? filteredProjects.findIndex((p) => p.id === activeProject.id)
    : -1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setActiveProject(filteredProjects[currentIndex - 1]);
    } else {
      setActiveProject(filteredProjects[filteredProjects.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < filteredProjects.length - 1) {
      setActiveProject(filteredProjects[currentIndex + 1]);
    } else {
      setActiveProject(filteredProjects[0]);
    }
  };

  return (
    <section className="pt-6 sm:pt-8 lg:pt-10 pb-16 lg:pb-24 bg-slate-50 relative overflow-hidden">
      {/* Soft warm light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Live Beacon */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-2.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Completed Works & Landmark Elevators</span>
          </div>
          <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            Project <span className="text-gradient-primary">Gallery</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed font-normal">
            A crystal-clear visual portfolio of our executed residential villas, commercial complexes, and architectural achievements across Bangalore.
          </p>
        </div>

        {/* Filter Tabs with animated pills and hover physics */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-8 sm:mb-10">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white shadow-lg shadow-blue-700/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 bg-white border border-slate-200/80 shadow-2xs'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 rounded-xl -z-10 shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span>{category}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Projects Grid: Bright, Crystal-Clear Images with Full Visibility */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -8 }}
                onClick={() => setActiveProject(project)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md hover:shadow-2xl hover:border-blue-500/70 transition-all duration-300 flex flex-col"
              >
                {/* Image Container: 100% Bright, Crisp and Fully Visible */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100 border-b border-slate-100 img-live-card">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />

                  {/* Clean Top Category Pill */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-blue-700 border border-blue-100 shadow-md">
                      <Tag className="w-3 h-3 text-blue-600" />
                      {project.category}
                    </span>
                  </div>

                  {/* Top-Right Expand Action */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <div className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg group-hover:scale-110">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Gentle hover highlight */}
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Card Information: Clean, High Contrast and Highly Legible */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {project.location && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
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

                  {/* Card Bottom Link */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      <span>View Project Details</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal: Full Resolution, Crystal-Clear View with Snappy Live Entrance */}
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
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 8 }}
              transition={{ type: 'spring', damping: 26, stiffness: 420, mass: 0.6 }}
              className="relative max-w-5xl w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col lg:flex-row max-h-[92dvh] overflow-y-auto lg:overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-slate-900/90 text-white hover:bg-rose-600 flex items-center justify-center transition-colors border border-white/20 shadow-xl cursor-pointer"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Main Image Area: High Brightness & High Resolution */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[300px] lg:min-h-[520px] p-2">
                <img
                  src={activeProject.imageSrc}
                  alt={activeProject.title}
                  className="max-h-[45dvh] sm:max-h-[60dvh] lg:max-h-[75vh] w-auto max-w-full object-contain drop-shadow-2xl rounded-lg"
                />

                {/* Prev / Next Controls */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xl border border-white/20"
                  aria-label="Previous project photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xl border border-white/20"
                  aria-label="Next project photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Right Information Panel */}
              <div className="w-full lg:w-88 p-4 sm:p-8 bg-slate-900 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 shrink-0">
                <div>
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
                </div>

                <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">MultiConcepts Portfolio</span>
                  <span className="text-blue-400 font-medium">Bangalore Landmark</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};