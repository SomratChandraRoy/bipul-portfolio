import { motion, Transition } from 'framer-motion'
import { useMemo } from 'react'

interface TextAnimateProps {
  children: string
  animation?: 'blurInUp' | 'blurInDown' | 'blurInLeft' | 'blurInRight' | 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn'
  by?: 'character' | 'word' | 'line'
  duration?: number
  delay?: number
  staggerDelay?: number
  className?: string
}

const getAnimationVariants = (animation: string, duration: number, segments: string[], staggerDelay: number, delay: number) => {
  const baseConfigs: Record<string, any> = {
    blurInUp: { y: 20, filter: 'blur(10px)' },
    blurInDown: { y: -20, filter: 'blur(10px)' },
    blurInLeft: { x: -20, filter: 'blur(10px)' },
    blurInRight: { x: 20, filter: 'blur(10px)' },
    fadeIn: {},
    slideUp: { y: 20 },
    slideDown: { y: -20 },
    scaleIn: { scale: 0.8 },
  }

  const initial = baseConfigs[animation] || {}
  const itemTransition: Transition = {
    duration: duration / (segments.length || 1),
  } as Transition
  
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delay,
        },
      },
    },
    item: {
      hidden: { opacity: 0, ...initial },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: itemTransition,
      },
    },
  }
}

function splitText(text: string, by: string): string[] {
  if (by === 'character') return text.split('')
  if (by === 'word') return text.split(' ')
  if (by === 'line') return text.split('\n')
  return text.split('')
}

export function TextAnimate({
  children,
  animation = 'blurInUp',
  by = 'character',
  duration = 1,
  delay = 0,
  staggerDelay = 0.02,
  className = '',
}: TextAnimateProps) {
  const segments = useMemo(() => splitText(children, by), [children, by])
  const variants = getAnimationVariants(animation, duration, segments, staggerDelay, delay)

  return (
    <motion.span
      variants={variants.container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          variants={variants.item}
          className="inline-block"
          style={{
            display: by === 'line' ? 'block' : 'inline-block',
            whiteSpace: by === 'word' ? 'nowrap' : 'normal',
            marginRight: by === 'word' && index < segments.length - 1 ? '0.34em' : undefined,
          }}
        >
          {segment}
          {by === 'line' && index < segments.length - 1 && <br />}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default TextAnimate
