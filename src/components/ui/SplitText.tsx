import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
}

export function SplitText({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
}: SplitTextProps) {
  const words = children.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 70,
        damping: 18,
        mass: 0.8,
        duration,
      },
    },
  }

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} variants={wordVariants} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
