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

  // Custom circle cursor + glow removed on request
  return null;

  // eslint-disable-next-line no-unreachable
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

type Direction = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur' | 'flip' | 'flipY' | 'rotate' | 'flash';

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

const PERSPECTIVE = 1000;
const FLASH_KEYS = [0, 0.2, 0.4, 0.6, 0.8, 1];

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

  const getInitial = (): any => {
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
      case 'flip':
        return { opacity: 0, rotateX: -75, y: travelDistance, filter: 'blur(4px)', transformPerspective: PERSPECTIVE };
      case 'flipY':
        return { opacity: 0, rotateY: -80, filter: 'blur(4px)', transformPerspective: PERSPECTIVE };
      case 'rotate':
        return { opacity: 0, rotate: -8, scale: 0.88, y: travelDistance, filter: 'blur(4px)' };
      case 'flash':
        return { opacity: 0, scale: 0.96 };
    }
  };

  const getAnimate = (): any => {
    if (reduce) return { opacity: 1 };
    if (direction === 'flash') return { opacity: [0, 1, 0.35, 1, 0.7, 1], scale: 1 };
    const base: any = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' };
    if (direction === 'flip') base.rotateX = 0;
    if (direction === 'flipY') base.rotateY = 0;
    if (direction === 'flip' || direction === 'flipY') base.transformPerspective = PERSPECTIVE;
    return base;
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, margin: '-40px' }}
      transition={
        direction === 'flash'
          ? { duration: 0.9, delay, times: FLASH_KEYS, ease: 'easeOut' }
          : { duration, delay, ease: EASE }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  StaggerGroup & StaggerItem (with flip / slide / flash variants)    */
/* ------------------------------------------------------------------ */

export const StaggerGroup: React.FC<{
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}> = ({ children, stagger = 0.08, delay = 0, className = '', once = true }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
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

export type StaggerVariant =
  | 'up'
  | 'flip'
  | 'flipY'
  | 'fromLeft'
  | 'fromRight'
  | 'zoom'
  | 'rotate'
  | 'flash';

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  y?: number;
  variant?: StaggerVariant;
}> = ({ children, className = '', y = 18, variant = 'up' }) => {
  const reduce = useReducedMotion();
  const is3D = variant === 'flip' || variant === 'flipY';
  const persp: any = is3D ? { transformPerspective: PERSPECTIVE } : {};

  let hidden: any;
  let visible: any = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    filter: 'blur(0px)',
    ...persp,
    transition: { duration: 0.65, ease: EASE },
  };

  if (reduce) {
    hidden = { opacity: 0 };
    visible = { opacity: 1, transition: { duration: 0.3 } };
  } else {
    switch (variant) {
      case 'flip':
        hidden = { opacity: 0, y, rotateX: -80, filter: 'blur(4px)', ...persp };
        break;
      case 'flipY':
        hidden = { opacity: 0, rotateY: -85, filter: 'blur(4px)', ...persp };
        break;
      case 'fromLeft':
        hidden = { opacity: 0, x: -80, filter: 'blur(4px)' };
        break;
      case 'fromRight':
        hidden = { opacity: 0, x: 80, filter: 'blur(4px)' };
        break;
      case 'zoom':
        hidden = { opacity: 0, scale: 0.8, filter: 'blur(4px)' };
        break;
      case 'rotate':
        hidden = { opacity: 0, rotate: -8, scale: 0.9, y, filter: 'blur(4px)' };
        break;
      case 'flash':
        hidden = { opacity: 0, scale: 0.95 };
        visible = {
          ...visible,
          opacity: [0, 1, 0.35, 1, 0.7, 1],
          transition: { duration: 0.9, times: FLASH_KEYS, ease: 'easeOut' },
        };
        break;
      default:
        hidden = { opacity: 0, y, filter: 'blur(4px)' };
    }
  }

  return (
    <motion.div variants={{ hidden, visible }} className={className}>
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  SectionReveal: whole section fades + rises in, then fades out      */
/*  softly as it scrolls away (scroll-linked, no blur = smooth)        */
/* ------------------------------------------------------------------ */

export const SectionReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.07, 0.92, 1], [0.2, 1, 1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 0.07], [48, 0]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  FlipCard: 3D flip. Hover on desktop, tap on touch screens          */
/* ------------------------------------------------------------------ */

export const FlipCard: React.FC<{
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}> = ({ front, back, className = '' }) => {
  const [flipped, setFlipped] = useState(false);
  const fine = useIsFinePointer();
  const reduce = useReducedMotion();

  const face: React.CSSProperties = {
    gridArea: '1 / 1',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: 1200 }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onMouseEnter={() => fine && setFlipped(true)}
      onMouseLeave={() => fine && setFlipped(false)}
      onClick={() => !fine && setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 130, damping: 17 }}
        style={{ transformStyle: 'preserve-3d', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)' }}
        className="h-full"
      >
        <div style={face} className="h-full w-full min-w-0">
          {front}
        </div>
        <div style={{ ...face, transform: 'rotateY(180deg)' }} className="h-full w-full min-w-0">
          {back}
        </div>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Typewriter: types text letter by letter when scrolled into view    */
/*  segments let parts of the text carry their own style (gradient...) */
/* ------------------------------------------------------------------ */

export const Typewriter: React.FC<{
  segments: { text: string; className?: string }[];
  speed?: number; // ms per character
  delay?: number; // seconds before typing starts
  cursor?: boolean;
  className?: string;
}> = ({ segments, speed = 40, delay = 0, cursor = true, className = '' }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const full = segments.map((s) => s.text).join('');
  const total = full.length;
  const [count, setCount] = useState(reduce ? total : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let i = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= total && timer) clearInterval(timer);
      }, speed);
    }, delay * 1000);
    return () => {
      clearTimeout(start);
      if (timer) clearInterval(timer);
    };
  }, [inView, reduce, total, speed, delay]);

  let remaining = count;
  const parts = segments.map((seg, k) => {
    const n = Math.max(0, Math.min(seg.text.length, remaining));
    remaining -= n;
    return (
      <span key={k} className={seg.className}>
        {seg.text.slice(0, n)}
      </span>
    );
  });

  const typing = inView && count < total;

  return (
    <span ref={ref} aria-label={full} className={`relative block w-full ${className}`}>
      {/* invisible full text reserves the final size so nothing jumps or shifts */}
      <span aria-hidden className="block invisible">
        {full}
      </span>
      <span aria-hidden className="block absolute inset-0">
        {parts}
        {cursor && (typing || (inView && count === 0)) && (
          <span className="inline-block w-[2px] h-[1em] ml-0.5 align-[-0.12em] bg-blue-600 animate-flash" />
        )}
      </span>
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  RotatingText: words roll in and out (fade + flip) on a loop        */
/* ------------------------------------------------------------------ */

export const RotatingText: React.FC<{
  words: string[];
  interval?: number;
  className?: string;
}> = ({ words, interval = 2400, className = '' }) => {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval, reduce]);

  return (
    <span className={`relative inline-flex overflow-hidden align-bottom ${className}`} style={{ perspective: 600 }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0, rotateX: -60 }}
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}
          exit={{ y: '-100%', opacity: 0, rotateX: 60 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="inline-block whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
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