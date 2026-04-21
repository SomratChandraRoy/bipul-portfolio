import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { techStack } from '../../data/portfolio'
import { PremiumDraggable } from '../ui/PremiumDraggable'
import { scrollAnimations } from '../../hooks/useScrollAnimations'

const categories = [
  { label: 'Frontend', items: techStack.frontend },
  { label: 'Backend', items: techStack.backend },
  { label: 'Databases', items: techStack.databases },
  { label: 'DevOps', items: techStack.devops },
  { label: 'Tools & Services', items: techStack.tools },
]

export function TechStack() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollY } = useScroll()

  // Parallax effect for tech stack grid
  const gridY = useTransform(scrollY, [2800, 3300], [80, -40])

  return (
    <section id="tech-stack" className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
        >
          {/* Header */}
          <motion.div variants={scrollAnimations.fadeInUp} className="mb-16">
            <PremiumDraggable intensity="light">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary font-mono">Stack</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Technologies I work with
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              A carefully chosen set of modern tools and frameworks for building reliable, scalable software.
            </p>
            </PremiumDraggable>
          </motion.div>

          {/* Category grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ y: gridY }}>
            {categories.map((cat) => (
              <motion.div key={cat.label} variants={scrollAnimations.scaleInUp}>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <PremiumDraggable key={tech} className="w-auto">
                    <span
                      className="inline-block bg-secondary rounded-full px-4 py-2 text-sm font-mono text-muted-foreground border border-transparent transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/30 cursor-default"
                    >
                      {tech}
                    </span>
                    </PremiumDraggable>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
