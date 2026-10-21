import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, ChevronUp, Quote } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { INITIAL_TESTIMONIALS, Testimonial } from '../data/websiteData';
import { Carousel } from './FX';
import { Reveal, SplitText, Magnetic } from './Effects';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [showForm, setShowForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const reduce = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newMessage) return;

    const newEntry: Testimonial = {
      id: `test-${Date.now()}`,
      name: newAuthor,
      company: newCompany || 'Valued Client',
      location: 'Bangalore',
      rating: newRating,
      message: newMessage,
      date: 'Just now',
    };

    setTestimonials([newEntry, ...testimonials]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowForm(false);
      setNewAuthor('');
      setNewCompany('');
      setNewMessage('');
      setNewRating(5);
    }, 2000);
  };

  return (
    <section id="testimonials-section" className="py-14 sm:py-16 lg:py-20 bg-white border-b border-slate-200 relative overflow-hidden">
      {/* Soft warm light */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute -top-16 right-0 w-80 h-80 bg-sky-100/70 rounded-full blur-3xl animate-float-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 220, damping: 16 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span>Verified Client Feedback</span>
            </motion.div>
            <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
              <SplitText text="Client" />{' '}
              <SplitText text="Testimonials" wordClassName="text-gradient-primary" delay={0.2} />
            </h2>
            <motion.div
              initial={reduce ? { opacity: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
              className="h-1 w-24 mt-3 rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500"
            />
            <Reveal direction="blur" delay={0.35}>
              <p className="text-base sm:text-lg text-slate-600 mt-3 font-normal">
                Hear from our satisfied clients across residential estates, commercial facilities, and interior landmarks.
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.3} className="w-full sm:w-auto">
          <Magnetic className="w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/90 rounded-2xl border border-blue-200 transition-all shrink-0 cursor-pointer shadow-sm hover:shadow-md"
          >
            {showForm ? <ChevronUp className="w-4 h-4" /> : <MessageSquarePlus className="w-4 h-4" />}
            <span>{showForm ? 'Hide Form' : 'Write a Review'}</span>
          </motion.button>
          </Magnetic>
          </Reveal>
        </div>

        {/* Inline Testimonial Form (No pop-up modal) */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-8 max-w-2xl mx-auto shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Leave Client Feedback</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Your review will appear immediately in the testimonial showcase below.
                </p>

                {submittedSuccess ? (
                  <div className="py-6 text-center text-emerald-600 flex flex-col items-center">
                    <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-500 animate-bounce" />
                    <p className="font-semibold text-base">Thank you for your testimonial!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          placeholder="e.g. Ramesh Sharma"
                          className="input-live w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Role or Area
                        </label>
                        <input
                          type="text"
                          value={newCompany}
                          onChange={(e) => setNewCompany(e.target.value)}
                          placeholder="e.g. Homeowner, Bangalore South"
                          className="input-live w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Rating
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRating(star)}
                            className="p-1 focus:outline-none cursor-pointer hover:scale-125 transition-transform"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= newRating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Review / Message *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Describe your experience with MultiConcepts / Paramount..."
                        className="input-live w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl transition-all"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="btn-live-smooth btn-shimmer shine-hover px-6 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        Post Testimonial
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Cards Grid with quote glyph & hover lift */}
        <Carousel
          items={testimonials}
          render={(t, i) => (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 36, rotateX: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              style={{ transformPerspective: 900 }}
              className="card-interactive group h-full bg-slate-50/80 hover:bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400 p-5 sm:p-9 flex flex-col justify-between shadow-xs hover:shadow-[0_20px_45px_-12px_rgba(30,58,138,0.14)] transition-all duration-350 relative overflow-hidden"
            >
              {/* Background quote decoration */}
              <motion.div
                animate={reduce ? undefined : { y: [0, -6, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                className="absolute top-4 right-4 text-slate-200/60 group-hover:text-blue-100 transition-colors pointer-events-none"
              >
                <Quote className="w-12 h-12 rotate-180" />
              </motion.div>

              <div className="relative z-10">
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <motion.span
                      key={si}
                      initial={reduce ? false : { opacity: 0, scale: 0, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 14, delay: i * 0.12 + 0.3 + si * 0.09 }}
                      whileHover={{ scale: 1.3, rotate: 12 }}
                      className="inline-flex"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          si < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </motion.span>
                  ))}
                </div>

                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.12 + 0.35 }}
                  className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6"
                >
                  "{t.message}"
                </motion.p>
              </div>

              <motion.div
                initial={reduce ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 + 0.5 }}
                className="relative z-10 pt-4 border-t border-slate-200"
              >
                <div className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">{t.name}</div>
                {t.company && (
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{t.company}</div>
                )}
                <div className="text-[11px] text-slate-400 mt-1">{t.date}</div>
              </motion.div>
            </motion.div>
          )}
        />
      </div>
    </section>
  );
};