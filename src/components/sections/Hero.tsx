import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'

/* ── Animation Orchestration ─────────────────────────────────────────────── */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
}

const wordReveal = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 18, delay: 0.6 },
  },
}

const fadeUpDelay = (delay: number) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 18, delay },
  },
})

/* ── Headline Data ───────────────────────────────────────────────────────── */

interface HeadlineLine {
  text: string
  className?: string
}

const headlineLines: HeadlineLine[] = [
  { text: 'Building scalable' },
  { text: 'digital products', className: 'text-gradient-primary' },
  { text: 'with clean architecture' },
]

const techBadges = ['React', 'Django', 'TypeScript', 'AWS']

/* ── Floating Geometry Shapes ────────────────────────────────────────────── */

interface FloatingShape {
  type: 'square' | 'circle' | 'triangle'
  size: number
  x: string
  y: string
  rotate: number
  duration: number
}

const shapes: FloatingShape[] = [
  { type: 'square', size: 40, x: '12%', y: '20%', rotate: 360, duration: 18 },
  { type: 'circle', size: 32, x: '85%', y: '30%', rotate: -360, duration: 14 },
  { type: 'triangle', size: 36, x: '8%', y: '72%', rotate: 360, duration: 20 },
  { type: 'square', size: 24, x: '90%', y: '75%', rotate: -360, duration: 16 },
]

function ShapeRenderer({ shape }: { shape: FloatingShape }) {
  const baseClasses = 'border border-border/30'

  if (shape.type === 'circle') {
    return <div className={`${baseClasses} rounded-full`} style={{ width: shape.size, height: shape.size }} />
  }

  if (shape.type === 'triangle') {
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${shape.size / 2}px solid transparent`,
          borderRight: `${shape.size / 2}px solid transparent`,
          borderBottom: `${shape.size}px solid hsl(var(--border) / 0.3)`,
        }}
      />
    )
  }

  return <div className={baseClasses} style={{ width: shape.size, height: shape.size }} />
}

/* ── Hero Section ────────────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Radial fade to darken grid edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, hsl(var(--background)) 80%)',
        }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'hsl(var(--primary))', top: '10%', left: '20%' }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
        style={{ background: 'hsl(var(--accent))', bottom: '5%', right: '15%' }}
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating geometric shapes */}
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: shape.x, top: shape.y, opacity: 0.12 }}
          animate={{
            rotate: shape.rotate,
            y: [0, -20, 10, 0],
          }}
          transition={{
            rotate: { duration: shape.duration, repeat: Infinity, ease: 'linear' },
            y: { duration: shape.duration * 0.6, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <ShapeRenderer shape={shape} />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Eyebrow / availability badge */}
          <motion.div
            variants={wordReveal}
            className="badge-shimmer mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5"
          >
            <motion.span
              className="inline-block h-2 w-2 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-sm font-medium text-muted-foreground">
              Available for new projects
            </span>
          </motion.div>

          {/* Headline with staggered word reveal */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {headlineLines.map((line, lineIdx) => (
              <span key={lineIdx} className="block">
                {line.text.split(' ').map((word, wordIdx) => (
                  <motion.span
                    key={`${lineIdx}-${wordIdx}`}
                    variants={wordReveal}
                    className={`inline-block mr-[0.3em] ${line.className ?? 'text-foreground'}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            Senior full-stack developer specializing in React, Django, and cloud-native
            infrastructure. I transform complex challenges into elegant, high-performance
            solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpDelay(0.75)}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] glow-primary"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:scale-[1.03] active:scale-[0.97]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Tech badges */}
          <motion.div
            variants={fadeUpDelay(0.9)}
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            {techBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-mono text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-secondary/80"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground">
          Scroll to explore
        </span>
        <motion.div
          className="mt-2 flex flex-col items-center"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="h-6 w-px bg-gradient-to-b from-muted-foreground/60 to-transparent" />
          <ChevronDown className="h-4 w-4 text-muted-foreground mt-0.5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
