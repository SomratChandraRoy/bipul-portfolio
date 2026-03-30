import { HTMLMotionProps, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

interface PremiumDraggableProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  intensity?: 'light' | 'normal' | 'heavy'
}

const config = {
  light:  { elastic: 0.25, stiffness: 500, damping: 30, scaleUp: 1.02, rotate: 1.5, shadow: '0 8px 30px rgba(75,131,251,0.15)' },
  normal: { elastic: 0.35, stiffness: 380, damping: 22, scaleUp: 1.04, rotate: 3,   shadow: '0 12px 40px rgba(75,131,251,0.2)' },
  heavy:  { elastic: 0.5,  stiffness: 250, damping: 18, scaleUp: 1.06, rotate: 5,   shadow: '0 20px 60px rgba(75,131,251,0.25)' },
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
  const cfg = config[intensity]

  // Raw drag position values for tilt calculation
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)

  // Smooth spring-driven tilt derived from drag offset
  const smoothX = useSpring(dragX, { stiffness: 300, damping: 30 })
  const smoothY = useSpring(dragY, { stiffness: 300, damping: 30 })
  const rotateY = useTransform(smoothX, [-200, 200], [-cfg.rotate, cfg.rotate])
  const rotateX = useTransform(smoothY, [-200, 200], [cfg.rotate, -cfg.rotate])

  return (
    <motion.div
      {...rest}
      ref={ref}
      drag
      dragSnapToOrigin
      dragElastic={cfg.elastic}
      dragMomentum={false}
      onDragStart={(e, info) => {
        setIsDragging(true)
        onDragStart?.(e, info)
      }}
      onDragEnd={(e, info) => {
        setIsDragging(false)
        dragX.set(0)
        dragY.set(0)
        onDragEnd?.(e, info)
      }}
      onDrag={(e, info) => {
        dragX.set(info.offset.x)
        dragY.set(info.offset.y)
        onDrag?.(e, info)
      }}
      style={{
        ...style,
        rotateX,
        rotateY,
        touchAction: 'none',
        perspective: 800,
      }}
      whileHover={{ 
        cursor: 'grab', 
        ...(typeof whileHover === 'object' ? whileHover : {}) 
      }}
      animate={{
        scale: isDragging ? cfg.scaleUp : 1,
        boxShadow: isDragging ? cfg.shadow : '0 0px 0px rgba(0,0,0,0)',
        filter: isDragging ? 'brightness(1.08)' : 'brightness(1)',
        ...(typeof animate === 'object' ? animate : {})
      }}
      transition={{
        type: 'spring',
        stiffness: cfg.stiffness,
        damping: cfg.damping,
        mass: 0.8,
        ...(typeof transition === 'object' ? transition : {})
      }}
      className={cn(
        'relative inline-block w-full will-change-transform',
        isDragging && 'z-50 cursor-grabbing',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
