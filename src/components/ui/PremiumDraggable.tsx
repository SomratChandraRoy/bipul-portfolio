import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface PremiumDraggableProps {
  children: ReactNode;
  className?: string;
}

export function PremiumDraggable({ children, className }: PremiumDraggableProps) {
  return (
    <motion.div
      drag
      dragSnapToOrigin={true}
      dragElastic={0.4}
      whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
      whileHover={{ cursor: 'grab' }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{ touchAction: 'none' }} // Prevents mobile scrolling when dragging
      className={cn('relative inline-block w-full', className)}
    >
      {children}
    </motion.div>
  )
}
