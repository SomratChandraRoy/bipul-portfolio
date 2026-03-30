import {
  HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationControls,
} from 'framer-motion'
import { ReactNode, useRef, useState, useCallback } from 'react'
import { cn } from '../../lib/utils'

/* ─────────────────────────────────────────────────────────────
   PremiumDraggable — Ultra-premium drag-and-snap physics wrapper
   Features:
     • 3D parallax tilt that follows drag direction
     • Magnetic rubber-band elasticity
     • Blue-glow aura that intensifies during drag
     • Smooth scale-up + brightness lift while held
     • Luxurious overshoot spring on snap-back
     • Subtle rotation wobble on release
   ───────────────────────────────────────────────────────────── */

interface PremiumDraggableProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  intensity?: 'feather' | 'light' | 'normal' | 'heavy'
}

const presets = {
  feather: {
    elastic: 0.18,
    stiffness: 600,
    damping: 28,
    mass: 0.4,
    scaleUp: 1.015,
    tiltDeg: 1,
    glowIdle: '0 0 0 0 rgba(75,131,251,0)',
    glowDrag: '0 6px 24px -2px rgba(75,131,251,0.18), 0 0 8px rgba(75,131,251,0.10)',
    brighten: 1.04,
  },
  light: {
    elastic: 0.22,
    stiffness: 520,
    damping: 26,
    mass: 0.5,
    scaleUp: 1.025,
    tiltDeg: 2,
    glowIdle: '0 0 0 0 rgba(75,131,251,0)',
    glowDrag: '0 8px 32px -4px rgba(75,131,251,0.22), 0 0 12px rgba(75,131,251,0.12)',
    brighten: 1.06,
  },
  normal: {
    elastic: 0.32,
    stiffness: 400,
    damping: 22,
    mass: 0.7,
    scaleUp: 1.04,
    tiltDeg: 3.5,
    glowIdle: '0 0 0 0 rgba(75,131,251,0)',
    glowDrag: '0 14px 44px -6px rgba(75,131,251,0.28), 0 0 18px rgba(75,131,251,0.15)',
    brighten: 1.08,
  },
  heavy: {
    elastic: 0.45,
    stiffness: 280,
    damping: 18,
    mass: 1.0,
    scaleUp: 1.06,
    tiltDeg: 5,
    glowIdle: '0 0 0 0 rgba(75,131,251,0)',
    glowDrag: '0 20px 60px -8px rgba(75,131,251,0.32), 0 0 24px rgba(75,131,251,0.18)',
    brighten: 1.10,
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

  /* ── Drag offset motion values ── */
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)

  /* ── Spring-smoothed tilt (perspective rotation) ── */
  const smoothX = useSpring(dragX, { stiffness: 280, damping: 26, mass: 0.5 })
  const smoothY = useSpring(dragY, { stiffness: 280, damping: 26, mass: 0.5 })
  const rotateY = useTransform(smoothX, [-250, 250], [-cfg.tiltDeg, cfg.tiltDeg])
  const rotateX = useTransform(smoothY, [-250, 250], [cfg.tiltDeg, -cfg.tiltDeg])

  /* ── Aura glow opacity driven by drag distance ── */
  const dragDist = useTransform<number, number>(
    [smoothX, smoothY],
    ([x, y]: number[]) => Math.sqrt(x * x + y * y)
  )
  const glowOpacity = useTransform(dragDist, [0, 120], [0, 1])

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

      // Premium overshoot wobble on release
      controls.start({
        rotate: [0, -1.5, 1, -0.5, 0],
        scale: [cfg.scaleUp, 0.97, 1.01, 1],
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        },
      })

      onDragEnd?.(e, info)
    },
    [onDragEnd, controls, cfg.scaleUp, dragX, dragY]
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
        touchAction: 'none',
        perspective: 1000,
        transformStyle: 'preserve-3d' as const,
      }}
      whileHover={{
        cursor: 'grab',
        scale: 1.008,
        ...(typeof whileHover === 'object' ? whileHover : {}),
      }}
      whileDrag={{
        scale: cfg.scaleUp,
        cursor: 'grabbing',
        filter: `brightness(${cfg.brighten})`,
        boxShadow: cfg.glowDrag,
        transition: { type: 'spring', stiffness: 500, damping: 30 },
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
      {/* Inner glow aura layer — intensifies as drag distance increases */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-[-1]"
        style={{
          opacity: glowOpacity,
          boxShadow:
            '0 0 20px 4px rgba(75,131,251,0.12), inset 0 0 20px 2px rgba(75,131,251,0.06)',
        }}
      />
      {children}
    </motion.div>
  )
}
