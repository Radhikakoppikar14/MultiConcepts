import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '../data/websiteData';
import { SmartImage } from './Effects';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenContactModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenContactModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      // Hide when scrolling down, show when scrolling up
      if (currentY > 160 && currentY > lastScrollY.current && !mobileMenuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'ventures', label: 'Our Ventures' },
    { id: 'blogs', label: 'Blogs' },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-300 ${
        scrolled ? 'shadow-md py-0' : 'shadow-2xs'
      }`}
    >
      {/* Top utility bar: Streamlined - Name, Phone number, and Email only */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center sm:justify-between gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-white font-semibold tracking-wide text-xs sm:text-sm">MultiConcepts</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 sm:gap-6 text-[11px] sm:text-xs min-w-0">
            <a
              href={`tel:${COMPANY_INFO.phones[0].replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-blue-300 transition-colors group"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400 transition-transform duration-300 group-hover:scale-125 shrink-0" />
              <span className="group-hover:underline font-mono">{COMPANY_INFO.phones[0]}</span>
            </a>
            <span className="text-slate-700">·</span>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-blue-300 transition-colors group"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400 transition-transform duration-300 group-hover:scale-125 shrink-0" />
              <span className="group-hover:underline truncate max-w-[150px] min-[400px]:max-w-[190px] sm:max-w-none">{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-300 ${
            scrolled ? 'h-16 sm:h-18' : 'h-18 sm:h-20'
          }`}
        >
          {/* Brand Wordmark & Logo with smooth hover physics */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3.5 text-left group focus-visible:outline-2 focus-visible:outline-blue-600 rounded-lg py-1 pr-1 transition-all min-w-0 shrink cursor-pointer"
          >
            <div className="relative shrink-0">
              <SmartImage
                src={COMPANY_INFO.logo}
                alt="MultiConcepts Logo"
                priority
                className="h-full! w-auto! max-w-none object-contain! transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                wrapperClassName="h-11 sm:h-14 w-auto! min-w-11 shrink-0 bg-transparent! overflow-visible!"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-lg xl:text-xl font-bold tracking-tight text-slate-900 leading-tight group-hover:text-blue-700 transition-colors truncate sm:overflow-visible sm:whitespace-nowrap">
                Multi<span className="text-blue-700">Concepts</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-slate-500 mt-0.5 truncate sm:overflow-visible sm:whitespace-nowrap flex items-center gap-1">
                <span>Service Redefined</span>
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation Links with Animated Layout Slider */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 + navItems.indexOf(item) * 0.07, ease: 'easeOut' }}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-2.5 xl:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl whitespace-nowrap cursor-pointer group ${
                    isActive
                      ? 'text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:scale-105 active:scale-95'
                  }`}
                >
                  <span className="relative z-10 transition-transform duration-200 inline-block group-hover:translate-y-[-1px]">
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 rounded-full shadow-xs"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </motion.button>
              );
            })}
            <motion.button
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + navItems.length * 0.07, ease: 'easeOut' }}
              onClick={onOpenContactModal}
              className="relative px-2.5 xl:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl whitespace-nowrap cursor-pointer group text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 transition-transform duration-200 inline-block group-hover:translate-y-[-1px]">
                Contact Us
              </span>
            </motion.button>
          </nav>

          {/* Paramount Enterprises logo + name (same style as the MultiConcepts lockup) */}
          <div className="hidden lg:flex items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick('about')}
              className="flex items-center gap-3.5 text-left group focus-visible:outline-2 focus-visible:outline-blue-600 rounded-lg py-1 pr-1 transition-all min-w-0 shrink cursor-pointer"
            >
              <div className="relative shrink-0">
                <SmartImage
                  src={COMPANY_INFO.badge}
                  alt="Paramount Enterprises Logo"
                  className="h-full! w-auto! max-w-none object-contain! transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                  wrapperClassName="h-11 sm:h-12 w-auto! min-w-11 shrink-0 bg-transparent! overflow-visible!"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg xl:text-xl font-bold tracking-tight text-slate-900 leading-tight group-hover:text-blue-700 transition-colors whitespace-nowrap">
                  Paramount <span className="text-blue-700">Enterprises</span>
                </span>
                <span className="text-[9px] xl:text-[10px] uppercase tracking-wider font-semibold text-slate-500 mt-0.5 whitespace-nowrap">
                  Construction Par Excellence
                </span>
              </div>
            </motion.button>
          </div>

          {/* Mobile Right Hamburger with smooth tap animation */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-blue-700" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Staggered Entrance Animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-200 shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5">
              {navItems.map((item, idx) => {
                const isActive = currentTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer active:scale-98 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-blue-700 animate-pulse" />
                    ) : null}
                  </motion.button>
                );
              })}
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenContactModal(); }}
                className="w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Contact Us
              </button>

              <div className="pt-4 mt-2 border-t border-slate-100 space-y-3">
                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full flex items-center gap-3 px-2 py-1 text-left cursor-pointer"
                >
                  <img src={COMPANY_INFO.badge} alt="Paramount Enterprises Logo" className="h-11 w-auto object-contain shrink-0" />
                  <span className="flex flex-col min-w-0">
                    <span className="text-lg font-bold tracking-tight text-slate-900 leading-tight truncate">
                      Paramount <span className="text-blue-700">Enterprises</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mt-0.5 truncate">
                      Construction Par Excellence
                    </span>
                  </span>
                </button>
                <div className="px-2 pt-2 text-xs text-slate-500 space-y-1.5 border-t border-slate-100">
                  <p className="flex items-start gap-1.5">
                    <span>📍</span>
                    <span>{COMPANY_INFO.address}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span>📞</span>
                    <a href={`tel:${COMPANY_INFO.phones[0].replace(/[^0-9+]/g, '')}`} className="font-mono text-blue-600 font-semibold">
                      {COMPANY_INFO.phones[0]}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};