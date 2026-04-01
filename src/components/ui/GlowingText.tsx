import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowingTextProps {
  children: ReactNode
  className?: string
  color?: 'blue' | 'purple' | 'cyan'
  intensity?: 'light' | 'medium' | 'heavy'
  animateGlow?: boolean
}

const colorMap = {
  blue: {
    light: 'text-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.3)]',
    medium: 'text-blue-400 shadow-[0_0_40px_rgba(75,131,251,0.5)]',
    heavy: 'text-blue-400 shadow-[0_0_60px_rgba(75,131,251,0.8)]',
  },
  purple: {
    light: 'text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    medium: 'text-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.5)]',
    heavy: 'text-purple-400 shadow-[0_0_60px_rgba(168,85,247,0.8)]',
  },
  cyan: {
    light: 'text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]',
    medium: 'text-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.5)]',
    heavy: 'text-cyan-400 shadow-[0_0_60px_rgba(34,211,238,0.8)]',
  },
}

export function GlowingText({
  children,
  className = '',
  color = 'blue',
  intensity = 'medium',
  animateGlow = true,
}: GlowingTextProps) {
  const glowClass = colorMap[color][intensity]

  return (
    <motion.span
      className={`inline-block relative ${glowClass} ${className}`}
      animate={
        animateGlow
          ? {
              opacity: [0.8, 1, 0.8],
              textShadow: [
                `0 0 20px ${color === 'blue' ? 'rgba(96,165,250,0.3)' : color === 'purple' ? 'rgba(168,85,247,0.3)' : 'rgba(34,211,238,0.3)'}`,
                `0 0 40px ${color === 'blue' ? 'rgba(75,131,251,0.6)' : color === 'purple' ? 'rgba(168,85,247,0.6)' : 'rgba(34,211,238,0.6)'}`,
                `0 0 20px ${color === 'blue' ? 'rgba(96,165,250,0.3)' : color === 'purple' ? 'rgba(168,85,247,0.3)' : 'rgba(34,211,238,0.3)'}`,
              ],
            }
          : {}
      }
      transition={
        animateGlow
          ? {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : {}
      }
    >
      {children}
    </motion.span>
  )
}
