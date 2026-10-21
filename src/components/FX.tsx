import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  TextRotator: words slide / fade in and out in a loop               */
/* ------------------------------------------------------------------ */
export const TextRotator: React.FC<{
  words: string[];
  interval?: number;
  className?: string;
}> = ({ words, interval = 2400, className = '' }) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span className="relative inline-flex overflow-hidden align-bottom h-[1.2em] min-w-[6ch]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ y: '100%', opacity: 0, rotateX: -60 }}
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}
          exit={{ y: '-100%', opacity: 0, rotateX: 60 }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`inline-block whitespace-nowrap ${className}`}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  Typewriter: types, pauses, deletes, repeats                        */
/* ------------------------------------------------------------------ */
export const Typewriter: React.FC<{ phrases: string[]; className?: string }> = ({
  phrases,
  className = '',
}) => {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = phrases[idx];
    let delay = del ? 35 : 70;
    if (!del && text === full) delay = 1500;
    if (del && text === '') delay = 300;
    const t = setTimeout(() => {
      if (!del && text === full) setDel(true);
      else if (del && text === '') {
        setDel(false);
        setIdx((p) => (p + 1) % phrases.length);
      } else {
        setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, del, idx, phrases]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle fx-caret" />
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  FlipCard: 3D flip on hover / tap, front + back faces               */
/* ------------------------------------------------------------------ */
export const FlipCard: React.FC<{
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}> = ({ front, back, className = '' }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`fx-flip-scene ${className}`}
      onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="fx-flip-inner"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="fx-flip-face">{front}</div>
        <div className="fx-flip-face fx-flip-back">{back}</div>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Carousel: auto-sliding cards with arrows + dots                    */
/* ------------------------------------------------------------------ */
export function Carousel<T>({
  items,
  render,
  interval = 4500,
  desktopCols = 3,
  dark = false,
}: {
  items: T[];
  render: (item: T, i: number) => React.ReactNode;
  interval?: number;
  desktopCols?: 1 | 2 | 3;
  dark?: boolean;
}) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState<number>(desktopCols);
  const gridCols = { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' }[desktopCols];
  const btnCls = dark
    ? 'bg-white/10 hover:bg-blue-600 border border-white/20'
    : 'bg-slate-900 hover:bg-blue-600';
  const dotOff = dark ? 'bg-white/30 hover:bg-white/50' : 'bg-slate-300 hover:bg-slate-400';

  useEffect(() => {
    const calc = () => setPerView(window.innerWidth >= 768 ? desktopCols : 1);
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const pages = Math.max(1, Math.ceil(items.length / perView));
  const safePage = Math.min(page, pages - 1);

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setPage((p) => (p + d + pages) % pages);
    },
    [pages]
  );

  useEffect(() => {
    if (paused || pages < 2) return;
    const t = setInterval(() => go(1), interval);
    return () => clearInterval(t);
  }, [paused, pages, go, interval]);

  const visible = items.slice(safePage * perView, safePage * perView + perView);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={safePage}
            custom={dir}
            initial={{ opacity: 0, x: dir * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -80 }}
            transition={{ duration: 0.45, ease: EASE }}
            className={`grid grid-cols-1 ${gridCols} gap-6 sm:gap-8`}
          >
            {visible.map((it, i) => (
              <div key={i} className="h-full">{render(it, i)}</div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className={`w-10 h-10 rounded-full ${btnCls} text-white flex items-center justify-center transition-colors cursor-pointer`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  setDir(i > safePage ? 1 : -1);
                  setPage(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === safePage ? 'w-8 bg-blue-500' : `w-2 ${dotOff}`
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className={`w-10 h-10 rounded-full ${btnCls} text-white flex items-center justify-center transition-colors cursor-pointer`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Flash: element blinks in and out softly                            */
/* ------------------------------------------------------------------ */
export const Flash: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.span
    animate={{ opacity: [1, 0.25, 1, 1] }}
    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.35, 0.6, 1] }}
    className={`inline-flex ${className}`}
  >
    {children}
  </motion.span>
);

/* ------------------------------------------------------------------ */
/*  SlideIn: text/blocks slide in from the side when scrolled to       */
/* ------------------------------------------------------------------ */
export const SlideIn: React.FC<{
  children: React.ReactNode;
  from?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
}> = ({ children, from = 'left', delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '-60px' }); // re-triggers: moves in AND out
  const off = {
    left: { x: -70, y: 0 },
    right: { x: 70, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  }[from];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...off }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...off }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  TypeText: now shows the full text instantly with a quick fade-in   */
/*  (typing animation removed so nobody waits for the text)            */
/* ------------------------------------------------------------------ */
export const TypeText: React.FC<{
  text: string;
  speed?: number; // kept for compatibility, no longer used
  className?: string;
  as?: 'span' | 'p';
}> = ({ text, className = '', as = 'span' }) => {
  const Tag = (as === 'p' ? motion.p : motion.span) as any;
  return (
    <Tag
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`block ${className}`}
    >
      {text}
    </Tag>
  );
};

/* ------------------------------------------------------------------ */
/*  Popup: animated modal (scale + fade) used for click-to-open cards  */
/* ------------------------------------------------------------------ */
export const Popup: React.FC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ open, onClose, children }) => {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.7, rotateX: -25, opacity: 0, y: 40 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            style={{ transformPerspective: 1000 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-9 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-600 flex items-center justify-center transition-colors cursor-pointer text-lg leading-none"
            >
              ×
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ------------------------------------------------------------------ */
/*  WaveText: letters bounce in a looping wave (words never split)     */
/* ------------------------------------------------------------------ */
export const WaveText: React.FC<{
  text: string;
  className?: string;
  amplitude?: number;
}> = ({ text, className = '', amplitude = 6 }) => {
  let k = 0;
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, wi, arr) => (
        <React.Fragment key={wi}>
          <span className="inline-block whitespace-nowrap" aria-hidden>
            {word.split('').map((ch) => {
              const i = k++;
              return (
                <motion.span
                  key={i}
                  animate={{ y: [0, -amplitude, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
          {wi < arr.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  PopIn: springy pop-up entrance that replays every time it's seen   */
/* ------------------------------------------------------------------ */
export const PopIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6, y: 50, rotate: -4 }}
    whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
    viewport={{ margin: '-60px' }}
    transition={{ type: 'spring', stiffness: 220, damping: 15, delay }}
    className={className}
  >
    {children}
  </motion.div>
);