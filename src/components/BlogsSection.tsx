import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS } from '../data/websiteData';
import { EASE, Reveal, SplitText } from './Effects';
import { Flash } from './FX';

/* Soft shapes that drift slowly behind the page */
const FloatingShapes: React.FC = () => {
  const shapes = [
    { left: '5%', top: '14%', size: 14, round: true, dur: 9, delay: 0, color: 'bg-blue-300/50' },
    { left: '92%', top: '12%', size: 18, round: false, dur: 11, delay: 1, color: 'bg-indigo-300/40' },
    { left: '9%', top: '62%', size: 10, round: false, dur: 8, delay: 2, color: 'bg-sky-300/50' },
    { left: '88%', top: '58%', size: 16, round: true, dur: 12, delay: 0.5, color: 'bg-blue-300/40' },
    { left: '50%', top: '6%', size: 8, round: true, dur: 10, delay: 1.5, color: 'bg-indigo-300/40' },
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

export const BlogsSection: React.FC = () => {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedPostId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-6 sm:pt-8 lg:pt-10 pb-16 lg:pb-24 relative overflow-hidden">
      {/* Ambient glows: pulsing + drifting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-20 -left-10 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <FloatingShapes />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Blog Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 shadow-2xs overflow-hidden"
          >
            <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12 animate-slide-in-out" />
            <Flash><BookOpen className="relative w-3.5 h-3.5 text-blue-600" /></Flash>
            <span className="relative">Industry Insights & Engineering</span>
          </motion.div>

          <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            <SplitText text="From the" />{' '}
            <SplitText text="Blog" delay={0.25} wordClassName="text-gradient-primary" />
          </h1>

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
              Insights, trends, and articles on modern design, structural engineering, and construction excellence.
            </p>
          </Reveal>
        </div>

        {/* Blog Posts Grid */}
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
                whileHover={{ y: -10, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400 overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-blue-900/15 transition-all duration-350 flex flex-col group relative"
              >
                {/* Top accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 z-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="img-live-card aspect-[16/10] overflow-hidden bg-slate-100 relative border-b border-slate-100">
                  <img
                    src={post.imageSrc}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Light sweep across the photo on hover */}
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[420%] transition-all duration-1000 ease-out z-10" />

                  {/* Category pill gently bobs */}
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                    className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-blue-700 border border-blue-100 shadow-md z-10"
                  >
                    {post.category}
                  </motion.div>
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
                        <Clock className="w-3.5 h-3.5 text-slate-400 group-hover:animate-spin-slow" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-3 leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4">
                      {post.summary}
                    </p>

                    {/* Accordion: paragraphs fade in one after another */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="pt-4 border-t border-slate-100 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed overflow-hidden"
                        >
                          {post.content.map((para, pIdx) => (
                            <motion.p
                              key={pIdx}
                              initial={{ opacity: 0, x: pIdx % 2 === 0 ? -24 : 24 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.45, delay: 0.1 + pIdx * 0.12, ease: EASE }}
                            >
                              {para}
                            </motion.p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <motion.button
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleExpand(post.id)}
                      className="btn-live-smooth btn-shimmer shine-hover w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/90 rounded-xl transition-all cursor-pointer shadow-xs border border-blue-200/50"
                    >
                      <span>{isExpanded ? 'Collapse Article' : 'Read Full Article'}</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
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