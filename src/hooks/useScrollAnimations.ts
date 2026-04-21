export const scrollAnimations = {
  /* ── Fade Animations ────────────────────────────────────────────────── */
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },

  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 70, damping: 18, mass: 0.8 },
    },
  },

  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 70, damping: 18, mass: 0.8 },
    },
  },

  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 60, damping: 16, mass: 0.8 },
    },
  },

  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 60, damping: 16, mass: 0.8 },
    },
  },

  /* ── Scale Animations ───────────────────────────────────────────────── */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 60, damping: 16, mass: 1 },
    },
  },

  scaleInUp: {
    hidden: { opacity: 0, scale: 0.7, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 70, damping: 16 },
    },
  },

  /* ── Blur & Clarity Animations ──────────────────────────────────────── */
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(20px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  },

  /* ── Rotation Animations ────────────────────────────────────────────── */
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 70, damping: 15 },
    },
  },

  /* ── Stagger Container ──────────────────────────────────────────────── */
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  },

  staggerContainerSlow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.25,
      },
    },
  },

  staggerContainerFast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  },

  /* ── Text Animations ────────────────────────────────────────────────── */
  textReveal: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },

  wordReveal: {
    hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 80, damping: 12 },
    },
  },

  /* ── Card Animations ────────────────────────────────────────────────── */
  cardHover: {
    rest: {
      y: 0,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      y: -8,
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
      transition: { type: 'spring', stiffness: 300, damping: 10 },
    },
  },

  /* ── Line/Border Animations ────────────────────────────────────────── */
  lineExpand: {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },

  lineExpandVertical: {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },

  /* ── Badge/Pill Animations ──────────────────────────────────────────── */
  badgePulse: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 12 },
    },
  },

  /* ── Perspective Animations ────────────────────────────────────────── */
  perspectiveReveal: {
    hidden: { opacity: 0, rotateX: 15, y: 30 },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 60, damping: 15 },
    },
  },

  /* ── Slide Animations ───────────────────────────────────────────────── */
  slideInLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 70, damping: 18 },
    },
  },

  slideInRight: {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 70, damping: 18 },
    },
  },

  /* ── Expand Animations ──────────────────────────────────────────────── */
  expandHeight: {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { type: 'spring', stiffness: 80, damping: 20 },
    },
  },
};

/* ── Animation Composition Functions ────────────────────────────────── */

export const createStaggerVariants = (baseVariant: any, staggerDelay: number = 0.1) => ({
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  },
  item: baseVariant,
});

export const createParallaxVariant = (yRange: [number, number]) => ({
  hidden: { y: yRange[0] },
  visible: (scroll: number) => ({
    y: yRange[0] + (yRange[1] - yRange[0]) * Math.min(scroll, 1),
  }),
});
