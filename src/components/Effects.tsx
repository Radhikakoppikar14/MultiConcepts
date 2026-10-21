import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/websiteData';

/* ------------------------------------------------------------------ */
/*  Helpers & Hooks                                                    */
/* ------------------------------------------------------------------ */

export const EASE = [0.16, 1, 0.3, 1] as const;

export const useIsFinePointer = () => {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setFine(mq.matches);
    const onChange = () => setFine(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return fine;
};

/* ------------------------------------------------------------------ */
/*  Scroll progress bar (top of the page)                              */
/* ------------------------------------------------------------------ */

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[70] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.7)] pointer-events-none"
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Cursor glow + trailing ring (desktop mouse only)                   */
/* ------------------------------------------------------------------ */

export const CursorGlow: React.FC = () => {
  const fine = useIsFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.2 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.2 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!fine || reduce) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest('a, button, [role="button"], input, textarea, .cursor-pointer'));
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [fine, reduce, x, y]);

  if (!fine || reduce) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="fixed top-0 left-0 z-[5] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,rgba(59,130,246,0)_65%)] mix-blend-multiply"
      />
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry }}
        animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.9 : 0.45 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 z-[80] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-blue-500/70"
      />
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Intro splash loader (first visit only)                             */
/* ------------------------------------------------------------------ */

export const PageLoader: React.FC = () => {
  const [show, setShow] = useState(() => {
    try {
      return sessionStorage.getItem('mc-intro-seen') !== '1';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem('mc-intro-seen', '1');
    } catch {}
    const t = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse-glow" />

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative bg-white rounded-2xl p-4 shadow-2xl shadow-blue-900/40"
          >
            <img src={COMPANY_INFO.logo} alt="MultiConcepts" className="h-16 w-auto object-contain" />
            <span className="absolute inset-0 rounded-2xl ring-2 ring-blue-400/60 animate-ping" style={{ animationDuration: '1.8s' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-6 text-white text-2xl font-bold tracking-tight"
          >
            Multi<span className="text-blue-400">Concepts</span>
          </motion.div>

          <div className="mt-5 w-48 h-[3px] rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="h-full w-full bg-gradient-to-r from-blue-500 to-sky-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ------------------------------------------------------------------ */
/*  Back to top floating button                                        */
/* ------------------------------------------------------------------ */

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 w-11 h-11 rounded-full bg-slate-900/90 hover:bg-blue-600 text-white backdrop-blur-md flex items-center justify-center shadow-xl shadow-slate-900/30 border border-white/10 transition-colors cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ------------------------------------------------------------------ */
/*  SmartImage (Blur-up / Skeleton shimmer placeholder + Path fallback)*/
/* ------------------------------------------------------------------ */

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: string;
  wrapperClassName?: string;
  priority?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src = '',
  alt = '',
  aspectRatio,
  className = '',
  wrapperClassName = '',
  priority = false,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
    setFallbackAttempted(false);
  }, [src]);

  const handleError = useCallback(() => {
    if (fallbackAttempted) return;
    setFallbackAttempted(true);
    // If /assets/ failed, try /assests/ and vice versa
    if (currentSrc.includes('/assets/')) {
      setCurrentSrc(currentSrc.replace('/assets/', '/assests/'));
    } else if (currentSrc.includes('/assests/')) {
      setCurrentSrc(currentSrc.replace('/assests/', '/assets/'));
    }
  }, [currentSrc, fallbackAttempted]);

  return (
    <div
      style={aspectRatio ? { aspectRatio } : undefined}
      className={`relative overflow-hidden bg-slate-100 ${wrapperClassName}`}
    >
      {/* Skeleton Shimmer Placeholder while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-500 ${
          loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-102 blur-sm'
        } ${className}`}
        {...rest}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Reveal: View-triggered animation with multiple directions          */
/* ------------------------------------------------------------------ */

type Direction = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur';

interface RevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance = 28,
  y,
  className = '',
  once = true,
}) => {
  const reduce = useReducedMotion();
  const travelDistance = y !== undefined ? y : distance;

  const getInitial = () => {
    if (reduce) return { opacity: 0 };
    switch (direction) {
      case 'up':
        return { opacity: 0, y: travelDistance, filter: 'blur(4px)' };
      case 'down':
        return { opacity: 0, y: -travelDistance, filter: 'blur(4px)' };
      case 'left':
        return { opacity: 0, x: travelDistance, filter: 'blur(4px)' };
      case 'right':
        return { opacity: 0, x: -travelDistance, filter: 'blur(4px)' };
      case 'zoom':
        return { opacity: 0, scale: 0.94, filter: 'blur(4px)' };
      case 'blur':
        return { opacity: 0, filter: 'blur(8px)' };
    }
  };

  const getAnimate = () => {
    if (reduce) return { opacity: 1 };
    return { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' };
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, margin: '-40px' }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  StaggerGroup & StaggerItem                                         */
/* ------------------------------------------------------------------ */

export const StaggerGroup: React.FC<{
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}> = ({ children, stagger = 0.08, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  y?: number;
}> = ({ children, className = '', y = 18 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y, filter: 'blur(4px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.5, ease: EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  TiltCard (3D perspective mouse tilt + cursor spotlight)            */
/* ------------------------------------------------------------------ */

export const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}> = ({ children, className = '', maxTilt = 8 }) => {
  const fine = useIsFinePointer();
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 280,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 280,
    damping: 24,
  });

  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !fine || reduce) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    setSpotlightPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setHovered(false);
  };

  if (!fine || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: 1000 }} className="relative">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative ${className}`}
      >
        {children}
        {/* Cursor spotlight */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-inherit transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle 240px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(59,130,246,0.14), transparent 80%)`,
          }}
        />
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Magnetic CTA Button Wrapper                                        */
/* ------------------------------------------------------------------ */

export const Magnetic: React.FC<{
  children: React.ReactNode;
  strength?: number;
  className?: string;
}> = ({ children, strength = 0.25, className = '' }) => {
  const fine = useIsFinePointer();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 240, damping: 20 });
  const sy = useSpring(y, { stiffness: 240, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !fine || reduce) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!fine || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Parallax background wrapper                                        */
/* ------------------------------------------------------------------ */

export const Parallax: React.FC<{
  children: React.ReactNode;
  offset?: number;
  className?: string;
}> = ({ children, offset = 40, className = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  SplitText: Word-by-word reveal for headlines                       */
/* ------------------------------------------------------------------ */

export const SplitText: React.FC<{
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}> = ({ text, className = '', wordClassName = '', delay = 0 }) => {
  const words = text.split(' ');
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] align-top">
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.05,
              ease: EASE,
            }}
            className={`inline-block ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  CountUp: In-view animated numeric stat counter                     */
/* ------------------------------------------------------------------ */

export const CountUp: React.FC<{
  target: number;
  suffix?: string;
  duration?: number;
}> = ({ target, suffix = '', duration = 1200 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const frameRate = 1000 / 60;
    const totalFrames = Math.max(Math.round(duration / frameRate), 1);
    const increment = target / totalFrames;
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      start += increment;
      if (currentFrame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums font-mono font-extrabold">
      {count}
      {suffix && <span className="text-blue-400 font-bold ml-0.5">{suffix}</span>}
    </span>
  );
};
