/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LiveMarquee, ProcessTimeline, ProjectsShowcase } from './components/HomeLive';
import { ServicesSection } from './components/ServicesSection';
import { PromiseSection } from './components/PromiseSection';
import { AssuranceSection } from './components/AssuranceSection';
import { GallerySection } from './components/GallerySection';
import { AboutView } from './components/AboutView';
import { VenturesSection } from './components/VenturesSection';
import { BlogsSection } from './components/BlogsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from './data/websiteData';
import { SectionReveal, ScrollProgress, PageLoader, BackToTop } from './components/Effects';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [modalSubject, setModalSubject] = useState<string>('');

  // .php style URLs (e.g. /about.php) - served by the vercel.json rewrites
  const TAB_TO_PATH: Record<string, string> = {
    home: '/index.php',
    about: '/about.php',
    services: '/services.php',
    gallery: '/gallery.php',
    ventures: '/ventures.php',
    blogs: '/blogs.php',
  };
  const pathToTab = (path: string) =>
    Object.entries(TAB_TO_PATH).find(([, p]) => p === path)?.[0] ?? 'home';

  // Sync the tab with the URL on load, back/forward buttons
  useEffect(() => {
    setCurrentTab(pathToTab(window.location.pathname));
    const handlePopState = () => setCurrentTab(pathToTab(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    window.history.pushState({}, '', TAB_TO_PATH[tab] ?? '/index.php');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceInquiry = (serviceTitle: string) => {
    setModalSubject(`Inquiry for ${serviceTitle}`);
    setIsContactModalOpen(true);
  };

  const handleOpenContactModal = (subject = '') => {
    setModalSubject(subject);
    setIsContactModalOpen(true);
  };

  const pageTransition = {
    initial: { opacity: 0, y: 28, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -14, transition: { duration: 0.15 } },
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      {/* New: intro splash, scroll progress bar, cursor glow, back-to-top */}
      <PageLoader />
      <ScrollProgress />
      <BackToTop />

      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenContactModal={() => handleOpenContactModal('General Consultation')}
      />

      {/* Main View Switching with Clean Transitions */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {/* HOME PAGE: Clean, authentic flow with no gallery duplication, no dot grids, and no unnecessary extras */}
          {currentTab === 'home' && (
            <motion.div key="home" {...pageTransition}>
              <HeroSection
                onExploreGallery={() => handleSelectTab('gallery')}
                onOpenContact={() => {
                  const el = document.getElementById('contact-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    handleOpenContactModal();
                  }
                }}
                onSelectTab={handleSelectTab}
              />

              {/* Live scrolling services ribbon */}
              <LiveMarquee />

              {/* Core Services: carousel, 3 cards at a time sliding to the next 3 */}
            <SectionReveal>
              <ServicesSection layout="carousel" onSelectServiceForInquiry={handleServiceInquiry} />
            </SectionReveal>

              {/* Our Promise: Quality, Time, Cost */}
              <SectionReveal>
                <PromiseSection />
              </SectionReveal>

              {/* Dark bento showcase of real projects */}
              <SectionReveal>
                <ProjectsShowcase onExploreGallery={() => handleSelectTab('gallery')} />
              </SectionReveal>

              {/* How we build: animated process timeline */}
              <SectionReveal>
                <ProcessTimeline />
              </SectionReveal>

              {/* Our Assurance: Your Vision, Our Priority */}
              <SectionReveal>
                <AssuranceSection onOpenContact={() => handleOpenContactModal('Paramount Assurance Inquiry')} />
              </SectionReveal>

              {/* Client Testimonials */}
              <SectionReveal>
                <TestimonialsSection />
              </SectionReveal>

              {/* Contact & Inquiry Section */}
              <SectionReveal>
                <ContactSection initialSubject="New Construction Project Consultation" />
              </SectionReveal>
            </motion.div>
          )}

          {/* ABOUT PAGE */}
          {currentTab === 'about' && (
            <motion.div key="about" {...pageTransition}>
              <AboutView
                onOpenContact={() => handleOpenContactModal('About MultiConcepts Inquiry')}
                onExploreGallery={() => handleSelectTab('gallery')}
              />
            </motion.div>
          )}

          {/* SERVICES PAGE */}
          {currentTab === 'services' && (
            <motion.div key="services" {...pageTransition}>
              <ServicesSection onSelectServiceForInquiry={handleServiceInquiry} />
              <SectionReveal>
                <PromiseSection />
              </SectionReveal>
              <SectionReveal>
                <ContactSection initialSubject="Services Consultation Request" />
              </SectionReveal>
            </motion.div>
          )}

          {/* PROJECT GALLERY PAGE */}
          {currentTab === 'gallery' && (
            <motion.div key="gallery" {...pageTransition}>
              <GallerySection />
              <SectionReveal>
                <ContactSection initialSubject="Inquiry regarding Portfolio Projects" />
              </SectionReveal>
            </motion.div>
          )}

          {/* OUR VENTURES (HAFELE) PAGE */}
          {currentTab === 'ventures' && (
            <motion.div key="ventures" {...pageTransition}>
              <VenturesSection onOpenContact={() => handleOpenContactModal('Hafele Architectural Solutions Inquiry')} />
            </motion.div>
          )}

          {/* BLOGS PAGE */}
          {currentTab === 'blogs' && (
            <motion.div key="blogs" {...pageTransition}>
              <BlogsSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Buttons with breathing pulse rings */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-3">
        <motion.div className="relative group">
          <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
          <motion.a
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href={`https://wa.me/919886032343?text=${encodeURIComponent('Hello MultiConcepts, I would like to inquire about construction and architectural services.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-900/30 transition-colors cursor-pointer"
            aria-label="WhatsApp Us"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.a>
        </motion.div>

        <motion.div className="relative group">
          <span className="absolute inset-0 rounded-full bg-blue-500 opacity-40 animate-ping pointer-events-none" style={{ animationDuration: '3.5s' }} />
          <motion.a
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href={`tel:${COMPANY_INFO.phones[0].replace(/[^0-9+]/g, '')}`}
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-700 hover:bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-900/30 transition-colors cursor-pointer"
            aria-label="Call Us"
            title="Direct Call"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.a>
        </motion.div>
      </div>

      {/* Global Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        prefilledSubject={modalSubject}
      />

      {/* Site Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenContactModal={() => handleOpenContactModal('General Inquiry via Footer')}
      />
    </div>
  );
}