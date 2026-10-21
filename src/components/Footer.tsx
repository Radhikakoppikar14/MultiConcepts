import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_INFO, SERVICES } from '../data/websiteData';
import { Reveal, StaggerGroup, StaggerItem } from './Animations';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenContactModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenContactModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Our Services' },
    { id: 'gallery', label: 'Portfolio Gallery' },
    { id: 'ventures', label: 'Our Ventures (Hafele)' },
    { id: 'blogs', label: 'Industry Blogs' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle ambient light glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main container with generous right padding to avoid floating buttons collision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pr-16 sm:pr-20 lg:pr-28 relative z-10">
        {/* Top Architectural Header: Brand Bar + Quick Action with Reveal animation */}
        <Reveal y={15} duration={0.45}>
          <div className="pb-12 mb-12 border-b border-slate-800/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Dual Logos */}
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-xl shadow-md border border-white/20 shrink-0">
                  <img
                    src={COMPANY_INFO.logo}
                    alt="MultiConcepts Logo"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div className="bg-white p-2 rounded-xl shadow-md border border-white/20 shrink-0">
                  <img
                    src={COMPANY_INFO.badge}
                    alt="Paramount Enterprises Seal"
                    className="h-10 w-10 object-contain rounded-lg"
                  />
                </div>
              </div>

              <div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white block">
                  Multi<span className="text-blue-400">Concepts</span>
                </span>
                <span className="text-xs text-slate-400 font-medium block">
                  Construction par Excellence · Paramount Enterprises
                </span>
              </div>
            </div>

            {/* Quick CTA button */}
            <div className="flex items-center gap-3 shrink-0">
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenContactModal}
                className="btn-live-smooth btn-shimmer shine-hover inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all cursor-pointer border border-blue-400/30"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Get a Project Consultation</span>
              </motion.button>
            </div>
          </div>
        </Reveal>

        {/* 3 Spacious Columns (Practice Branding, Links, and Contact Info) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800/80">
          {/* Column 1: The Practice & Credentials (lg:col-span-4) with Reveal animation */}
          <Reveal y={15} delay={0.05} className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              The Firm & Legacy
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Your trusted partner for all construction needs, delivering landmark civil, residential,
              and commercial projects across Bangalore with unwavering adherence to Quality, Time, and Cost.
            </p>

            <StaggerGroup stagger={0.06} className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <StaggerItem className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Over 25 Years of Bangalore Engineering Legacy</span>
              </StaggerItem>
              <StaggerItem className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Paramount Enterprises Certified Quality Standards</span>
              </StaggerItem>
            </StaggerGroup>
          </Reveal>

          {/* Column 2: Navigation & Services Links (lg:col-span-4) with StaggerGroup animation */}
          <div className="lg:col-span-4 space-y-4">
            <Reveal y={10} delay={0.1}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Navigation & Capabilities
              </h4>
            </Reveal>

            <StaggerGroup stagger={0.05} delay={0.15} className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm text-slate-300">
              {navLinks.map((link) => (
                <StaggerItem key={link.id}>
                  <button
                    onClick={() => {
                      onSelectTab(link.id);
                      scrollToTop();
                    }}
                    className="hover:text-blue-400 transition-colors text-left truncate cursor-pointer hover:underline w-full"
                  >
                    {link.label}
                  </button>
                </StaggerItem>
              ))}
              <StaggerItem>
                <button
                  onClick={() => {
                    onSelectTab('services');
                    scrollToTop();
                  }}
                  className="hover:text-blue-400 transition-colors text-left truncate cursor-pointer hover:underline w-full"
                >
                  Civil Engineering
                </button>
              </StaggerItem>
              <StaggerItem>
                <button
                  onClick={() => {
                    onSelectTab('ventures');
                    scrollToTop();
                  }}
                  className="hover:text-red-400 transition-colors text-left truncate cursor-pointer hover:underline text-red-300 w-full"
                >
                  Hafele Hardware
                </button>
              </StaggerItem>
            </StaggerGroup>
          </div>

          {/* Column 3: Contact Details (lg:col-span-4) with StaggerGroup animation */}
          <div className="lg:col-span-4 space-y-4">
            <Reveal y={10} delay={0.15}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Office & Direct Contact
              </h4>
            </Reveal>

            <StaggerGroup stagger={0.07} delay={0.2} className="space-y-3.5 text-xs text-slate-300">
              {/* Office Location */}
              <StaggerItem className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">Studio Location</span>
                  <p className="text-slate-400 leading-relaxed text-[11px] sm:text-xs">
                    {COMPANY_INFO.address}
                  </p>
                  <a
                    href={COMPANY_INFO.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 mt-1 transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </StaggerItem>

              {/* Phone Enquiries */}
              <StaggerItem className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">Telephone Inquiries</span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] sm:text-xs text-slate-300">
                    {COMPANY_INFO.phones.map((phone, i) => (
                      <a
                        key={i}
                        href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                        className="hover:text-blue-300 transition-colors hover:underline"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              {/* Email Correspondence */}
              <StaggerItem className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">Email Correspondence</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-slate-300 hover:text-blue-300 transition-colors font-mono text-[11px] sm:text-xs hover:underline block truncate"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </StaggerItem>

              {/* Working Hours */}
              <StaggerItem className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">Working Hours</span>
                  <p className="text-slate-400 text-[11px] sm:text-xs">
                    {COMPANY_INFO.hours.weekdays} · Sat: 10am - 2pm
                  </p>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>

        {/* Footer Bottom Bar: Copyright & Attribution with Reveal */}
        <Reveal y={10} delay={0.25}>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {COMPANY_INFO.copyrightYear} MultiConcepts & Paramount Enterprises. All Rights Reserved.</p>

            <div className="flex items-center gap-6">
              <a
                href={COMPANY_INFO.developerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <span>{COMPANY_INFO.developerCredit}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
                aria-label="Scroll back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};