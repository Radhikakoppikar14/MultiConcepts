import React from 'react';
import {
  Home,
  Building2,
  Compass,
  Hammer,
  ShieldCheck,
  Palette,
  ArrowRight,
  Check,
  Sparkles,
  Layers,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/websiteData';
import { StaggerGroup, StaggerItem } from './Effects';
import { Carousel } from './FX';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
  /** 'carousel' shows 3 cards at a time and slides to the next 3 (used on the Home page) */
  layout?: 'grid' | 'carousel';
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForInquiry,
  layout = 'grid',
}) => {
  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Home':
        return <Home className="w-6 h-6 transition-transform duration-300 group-hover:scale-115" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 transition-transform duration-300 group-hover:scale-115" />;
      case 'Compass':
        return <Compass className="w-6 h-6 transition-transform duration-300 group-hover:scale-115" />;
      case 'Hammer':
        return <Hammer className="w-6 h-6 transition-transform duration-300 group-hover:scale-115" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 transition-transform duration-300 group-hover:scale-115" />;
      case 'Palette':
        return <Palette className="w-6 h-6 transition-transform duration-300 group-hover:scale-115" />;
      default:
        return <Sparkles className="w-6 h-6 transition-transform duration-300 group-hover:scale-115" />;
    }
  };

  const renderCard = (service: (typeof SERVICES)[number], index: number) => (
            <motion.div
              initial={{ opacity: 0, rotateY: index % 2 === 0 ? -70 : 70, scale: 0.9 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
              viewport={{ margin: '-60px' }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1200 }}
              whileHover={{ y: -8 }}
              className="card-interactive group flex h-full flex-col justify-between glass hover:bg-white/10 rounded-3xl hover:border-sky-400/50 p-5 sm:p-9 relative overflow-hidden"
            >
              {/* Dynamic top gradient bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <div className="flex items-center justify-between mb-7">
                  {/* Dynamic icon box with hover rotation and gradient */}
                  <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 text-sky-300 group-hover:text-white border border-white/15 group-hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-blue-600/30 group-hover:rotate-6 icon-pop">
                    {getServiceIcon(service.iconName)}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-200 transition-colors mb-2 tracking-tight">
                  {service.title}
                </h3>

                <p className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-4">
                  {service.tagline}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-5">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Key Specifications
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-200">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 group/item">
                        <div className="w-4 h-4 rounded-full bg-sky-400/20 text-sky-300 group-hover/item:bg-blue-600 group-hover/item:text-white flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-tight group-hover/item:text-white transition-colors">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Action Button with Live Shimmer and Hover Bounce */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSelectServiceForInquiry(service.title)}
                  className="btn-live-smooth btn-shimmer shine-hover w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 rounded-xl transition-all duration-300 shadow-md shadow-blue-700/20 hover:shadow-xl hover:shadow-blue-600/30 cursor-pointer group/btn"
                >
                  <span>Inquire About {service.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </motion.button>
              </div>
            </motion.div>
  );

  return (
    <section id="services-section" className="pt-6 sm:pt-8 lg:pt-10 pb-16 lg:pb-20 bg-slate-950 text-white border-b border-white/10 relative overflow-hidden">
      {/* Subtle ambient light gradient without grids/dots */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[700px] sm:h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none aurora-blob" />
      <div className="absolute bottom-10 left-0 sm:left-10 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none aurora-blob" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Live Beacon Badge */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-bold uppercase tracking-wider text-sky-300 mb-4">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>MultiConcepts Engineering Capabilities</span>
          </div>
          <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Our <span className="text-gradient-live">Services</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-normal">
            Comprehensive civil construction, turnkey interiors, and architecture tailored to your vision.
          </p>
        </div>

        {/* 6 Services Grid (No images as requested) - Pure modern cards with live hover transitions */}
        {layout === 'carousel' ? (
          <Carousel
            dark
            desktopCols={3}
            interval={5000}
            items={SERVICES.map((service, index) => ({ service, index }))}
            render={({ service, index }) => renderCard(service, index)}
          />
        ) : (
          <StaggerGroup stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES.map((service, index) => (
              <StaggerItem key={service.id} className="h-full" y={36}>
                {renderCard(service, index)}
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </section>
  );
};