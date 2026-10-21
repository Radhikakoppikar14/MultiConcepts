import React from 'react';
import { ArrowRight, MapPin, Sparkles, ChevronRight, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { GALLERY_PROJECTS } from '../data/websiteData';

interface FeaturedProjectsSectionProps {
  onExploreGallery: () => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  onExploreGallery,
}) => {
  // Select 3 top distinct landmark projects to showcase on Home page
  const homeProjects = [
    GALLERY_PROJECTS[0], // Contemporary Multi-Storey Residence
    GALLERY_PROJECTS[1], // Paramount Apartments
    GALLERY_PROJECTS[5], // Kerala-Style Heritage Villa Estate
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Real Executed Landmarks</span>
            </div>
            <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Featured <span className="text-gradient-primary">Projects</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 max-w-2xl font-normal leading-relaxed">
              Explore our landmark residential complexes and custom villas delivered with structural excellence across Bangalore.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04, x: 2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onExploreGallery}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all cursor-pointer self-start md:self-auto shrink-0"
          >
            <span>View All Works in Gallery</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* 3 Featured Project Cards: 100% Bright, Crisp and Fully Visible Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {homeProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -8 }}
              onClick={onExploreGallery}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:border-blue-500/60 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Container: 100% Bright, Crisp and Clear */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />

                {/* Top-Left Tag */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-blue-700 border border-blue-100 shadow-md">
                    {project.category}
                  </span>
                </div>

                {/* Hover Soft Highlight */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 pointer-events-none" />
              </div>

              {/* Card Body */}
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

                {/* Bottom link */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    <span>View in Gallery</span>
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};