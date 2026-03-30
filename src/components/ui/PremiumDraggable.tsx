import {
  HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationControls,
  useVelocity,
} from 'framer-motion'
import { ReactNode, useRef, useState, useCallback } from 'react'
import { cn } from '../../lib/utils'

/* ─────────────────────────────────────────────────────────────
   PremiumDraggable V2 — Jelly physics drag-and-snap wrapper
   
   New in V2:
     • Jelly deformation: element stretches in drag direction
     • Velocity-based skew for organic rubber feel
     • Wobble oscillation on snap-back release
     • Softer, more luxurious spring physics
     • Distance-reactive glow aura
   ───────────────────────────────────────────────────────────── */

interface PremiumDraggableProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  intensity?: 'feather' | 'light' | 'normal' | 'heavy'
}

const presets = {
  feather: {
    elastic: 0.2,
    stiffness: 500,
    damping: 24,
    mass: 0.4,
    scaleUp: 1.02,
    tiltDeg: 1.5,
    jellyStretch: 0.015,
    jellySkew: 0.08,
    brighten: 1.04,
    glowDrag: '0 6px 24px -2px rgba(75,131,251,0.18), 0 0 8px rgba(75,131,251,0.10)',
  },
  light: {
    elastic: 0.25,
    stiffness: 420,
    damping: 22,
    mass: 0.5,
    scaleUp: 1.03,
    tiltDeg: 2.5,
    jellyStretch: 0.025,
    jellySkew: 0.12,
    brighten: 1.06,
    glowDrag: '0 10px 36px -4px rgba(75,131,251,0.22), 0 0 14px rgba(75,131,251,0.12)',
  },
  normal: {
    elastic: 0.35,
    stiffness: 320,
    damping: 18,
    mass: 0.7,
    scaleUp: 1.045,
    tiltDeg: 3.5,
    jellyStretch: 0.035,
    jellySkew: 0.18,
    brighten: 1.08,
    glowDrag: '0 16px 48px -6px rgba(75,131,251,0.28), 0 0 20px rgba(75,131,251,0.15)',
  },
  heavy: {
    elastic: 0.48,
    stiffness: 220,
    damping: 15,
    mass: 1.0,
    scaleUp: 1.06,
    tiltDeg: 5,
    jellyStretch: 0.045,
    jellySkew: 0.25,
    brighten: 1.10,
    glowDrag: '0 22px 64px -8px rgba(75,131,251,0.32), 0 0 28px rgba(75,131,251,0.18)',
  },
}

export function PremiumDraggable({
  children,
  className,
  intensity = 'normal',
  style,
  animate,
  whileHover,
  transition,
  onDragStart,
  onDragEnd,
  onDrag,
  ...rest
}: PremiumDraggableProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const controls = useAnimationControls()
  const cfg = presets[intensity]

  /* ── Drag offset tracking ── */
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)

  /* ── Velocity for jelly deformation ── */
  const velX = useVelocity(dragX)
  const velY = useVelocity(dragY)

  /* ── Jelly: velocity → skew (lagging squish) ── */
  const smoothVelX = useSpring(velX, { stiffness: 150, damping: 15, mass: 0.3 })
  const smoothVelY = useSpring(velY, { stiffness: 150, damping: 15, mass: 0.3 })
  const skewX = useTransform(smoothVelY, [-800, 800], [cfg.jellySkew * 12, -cfg.jellySkew * 12])
  const skewY = useTransform(smoothVelX, [-800, 800], [-cfg.jellySkew * 12, cfg.jellySkew * 12])

  /* ── Jelly: velocity → directional stretch ── */
  const speed = useTransform(
    [smoothVelX, smoothVelY],
    ([vx, vy]: number[]) => Math.sqrt(vx * vx + vy * vy)
  )
  const jellyScaleX = useTransform(
    [smoothVelX, speed],
    ([vx, spd]: number[]) => 1 + Math.abs(vx) / (spd || 1) * Math.min(spd, 600) * cfg.jellyStretch * 0.001
  )
  const jellyScaleY = useTransform(
    [smoothVelY, speed],
    ([vy, spd]: number[]) => 1 + Math.abs(vy) / (spd || 1) * Math.min(spd, 600) * cfg.jellyStretch * 0.001
  )

  /* ── 3D tilt follows drag direction ── */
  const smoothX = useSpring(dragX, { stiffness: 200, damping: 20, mass: 0.4 })
  const smoothY = useSpring(dragY, { stiffness: 200, damping: 20, mass: 0.4 })
  const rotateY = useTransform(smoothX, [-300, 300], [-cfg.tiltDeg, cfg.tiltDeg])
  const rotateX = useTransform(smoothY, [-300, 300], [cfg.tiltDeg, -cfg.tiltDeg])

  /* ── Glow aura reacts to drag distance ── */
  const dragDist = useTransform<number, number>(
    [smoothX, smoothY],
    ([x, y]: number[]) => Math.sqrt(x * x + y * y)
  )
  const glowOpacity = useTransform(dragDist, [0, 100], [0, 1])

  const handleDragStart = useCallback(
    (e: any, info: any) => {
      setIsDragging(true)
      onDragStart?.(e, info)
    },
    [onDragStart]
  )

  const handleDragEnd = useCallback(
    (e: any, info: any) => {
      setIsDragging(false)
      dragX.set(0)
      dragY.set(0)

      // Premium jelly wobble on release  
      controls.start({
        rotate: [0, -2, 1.5, -0.8, 0.3, 0],
        scaleX: [1.02, 0.97, 1.01, 0.99, 1],
        scaleY: [0.98, 1.03, 0.99, 1.01, 1],
        transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        },
      })

      onDragEnd?.(e, info)
    },
    [onDragEnd, controls, dragX, dragY]
  )

  const handleDrag = useCallback(
    (e: any, info: any) => {
      dragX.set(info.offset.x)
      dragY.set(info.offset.y)
      onDrag?.(e, info)
    },
    [onDrag, dragX, dragY]
  )

  return (
    <motion.div
      {...rest}
      ref={ref}
      drag
      dragSnapToOrigin
      dragElastic={cfg.elastic}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      animate={controls}
      style={{
        ...style,
        rotateX,
        rotateY,
        skewX,
        skewY,
        scaleX: isDragging ? jellyScaleX : undefined,
        scaleY: isDragging ? jellyScaleY : undefined,
        touchAction: 'none',
        perspective: 1000,
        transformStyle: 'preserve-3d' as const,
      }}
      whileHover={{
        cursor: 'grab',
        scale: 1.01,
        ...(typeof whileHover === 'object' ? whileHover : {}),
      }}
      whileDrag={{
        scale: cfg.scaleUp,
        cursor: 'grabbing',
        filter: `brightness(${cfg.brighten})`,
        boxShadow: cfg.glowDrag,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      transition={{
        type: 'spring',
        stiffness: cfg.stiffness,
        damping: cfg.damping,
        mass: cfg.mass,
        ...(typeof transition === 'object' ? transition : {}),
      }}
      className={cn(
        'relative inline-block w-full will-change-transform',
        isDragging && 'z-50',
        className
      )}
    >
      {/* Glow aura — intensifies with drag distance */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-[-1]"
        style={{
          opacity: glowOpacity,
          boxShadow:
            '0 0 24px 6px rgba(75,131,251,0.12), inset 0 0 16px 2px rgba(75,131,251,0.06)',
        }}
      />
      {children}
    </motion.div>
  )
}
