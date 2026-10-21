import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/websiteData';
import { Reveal, SplitText, EASE } from './Effects';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialSubject = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 600);
  };

  return (
    <section id="contact-section" className="py-14 sm:py-16 lg:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Ambient background glow orbs without grids/dots */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading with Live Beacon */}
        <div className="relative max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          {/* Pulsing glow behind the heading */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-40 sm:w-[28rem] sm:h-56 rounded-full bg-sky-500/20 blur-3xl animate-pulse-glow pointer-events-none" />

          {/* Badge: springs in, sparkle spins, text flashes, light sweeps across */}
          <motion.div
            initial={{ opacity: 0, y: -26, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950 border border-blue-500/40 text-xs font-bold uppercase tracking-wider text-blue-300 mb-4 shadow-md overflow-hidden"
          >
            <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-slide-in-out" />
            <Sparkles className="relative w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
            <span className="relative animate-flash-burst">Initiate Your Blueprint</span>
          </motion.div>

          {/* Heading: words slide up, "Project?" pops in then keeps bobbing */}
          <h2 className="relative text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance">
            <SplitText text="Ready to Start Your" delay={0.15} />{' '}
            <motion.span
              initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 0.75 }}
              className="inline-block"
            >
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
                className="inline-block text-gradient-live"
              >
                Project?
              </motion.span>
            </motion.span>
          </h2>

          {/* Underline draws itself, light keeps travelling along it */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
            style={{ transformOrigin: 'center' }}
            className="relative mx-auto mt-4 h-1 w-28 rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-400 overflow-hidden"
          >
            <span className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent animate-slide-in-out" />
          </motion.div>

          <Reveal direction="blur" delay={0.6}>
            <p className="relative text-base sm:text-lg text-slate-300 mt-5 leading-relaxed font-normal">
              Let's discuss how we can bring your construction vision to life with our expertise and dedication.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info Details */}
          <Reveal direction="right" className="lg:col-span-5 space-y-8">
            <div className="bg-slate-800/80 rounded-3xl border border-slate-700/80 p-5 sm:p-10 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Contact Info</h3>
                <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Direct Response</span>
                </span>
              </div>

              <ul className="space-y-6 text-sm text-slate-300">
                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 shadow-xs group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Office Location</div>
                    <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                      {COMPANY_INFO.address}
                    </p>
                    <a
                      href={COMPANY_INFO.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/map inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold mt-2.5 transition-colors"
                    >
                      <span>Open in Google Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/map:translate-x-1 group-hover/map:-translate-y-1" />
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-xs group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Phone Enquiries</div>
                    <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
                      {COMPANY_INFO.phones.map((p, i) => (
                        <a
                          key={i}
                          href={`tel:${p.replace(/[^0-9+]/g, '')}`}
                          className="hover:text-blue-300 transition-colors font-mono font-medium hover:translate-x-1 inline-block"
                        >
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 shadow-xs group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Email Correspondence</div>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="hover:text-blue-300 transition-colors font-mono text-xs sm:text-sm font-medium hover:underline break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 shadow-xs group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Working Hours</div>
                    <p className="text-xs sm:text-sm text-slate-200">{COMPANY_INFO.hours.weekdays}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{COMPANY_INFO.hours.saturday}</p>
                    <p className="text-slate-500 text-xs">{COMPANY_INFO.hours.sunday}</p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Right Column: Contact Inquiry Form */}
          <Reveal direction="left" delay={0.15} className="lg:col-span-7 bg-white text-slate-800 rounded-3xl border border-slate-200 p-5 sm:p-10 shadow-2xl">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Send Us a Direct Message</h3>
              <p className="text-sm text-slate-600 mt-1">
                Fill in the details below and our lead engineer will respond within 24 business hours.
              </p>
            </div>

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to MultiConcepts & Paramount Enterprises. We have registered your inquiry and will contact you promptly.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-semibold text-xs hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Hegde"
                      className="input-live w-full px-4 py-3 text-sm border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ramesh@example.com"
                      className="input-live w-full px-4 py-3 text-sm border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98450 00000"
                      className="input-live w-full px-4 py-3 text-sm border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Villa Construction / Architectural Design"
                      className="input-live w-full px-4 py-3 text-sm border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Project Requirements / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your plot size, location, estimated timeline, or architectural requirements..."
                    className="input-live w-full px-4 py-3 text-sm border border-slate-300 rounded-xl"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.025, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-live-smooth btn-shimmer shine-hover group w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 rounded-xl shadow-xl shadow-blue-700/25 hover:shadow-2xl hover:shadow-blue-600/35 transition-all duration-300 disabled:opacity-70 cursor-pointer"
                >
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Submit Inquiry'}</span>
                </motion.button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};