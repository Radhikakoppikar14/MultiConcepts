import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS } from '../data/websiteData';
import { EASE } from './Effects';

export const BlogsSection: React.FC = () => {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedPostId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-6 sm:pt-8 lg:pt-10 pb-16 lg:pb-24 relative overflow-hidden">
      {/* Soft warm light */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Single clean Blog Header with Live Beacon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Industry Insights & Engineering</span>
          </div>
          <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            From the <span className="text-gradient-primary">Blog</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Insights, trends, and articles on modern design, structural engineering, and construction excellence.
          </p>
        </motion.div>

        {/* Blog Posts Grid with smooth image zoom & accordion animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {BLOG_POSTS.map((post, index) => {
            const isExpanded = expandedPostId === post.id;
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 44, rotateX: -16, scale: 0.94, transformPerspective: 1000 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: EASE }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400 overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-blue-900/15 transition-all duration-350 flex flex-col group relative"
              >
                {/* Image: 100% Bright, Crisp and Fully Visible with Live Sheen & Smooth Zoom */}
                <div className="img-live-card aspect-[16/10] overflow-hidden bg-slate-100 relative border-b border-slate-100">
                  <img
                    src={post.imageSrc}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-blue-700 border border-blue-100 shadow-md z-10">
                    {post.category}
                  </div>
                </div>

                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {post.date}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-3 leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4">
                      {post.summary}
                    </p>

                    {/* Inline smooth accordion content without popups */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 border-t border-slate-100 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed overflow-hidden"
                        >
                          {post.content.map((para, pIdx) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Clean interactive button with live hover transition */}
                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <motion.button
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleExpand(post.id)}
                      className="btn-live-smooth w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/90 rounded-xl transition-all cursor-pointer shadow-xs border border-blue-200/50"
                    >
                      <span>{isExpanded ? 'Collapse Article' : 'Read Full Article'}</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
};