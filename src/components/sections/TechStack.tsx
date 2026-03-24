import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { techStack } from '../../data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 18 } },
}

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

  return (
    <section id="tech-stack" className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-16">
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
          </motion.div>

          {/* Category grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <motion.div key={cat.label} variants={fadeUp}>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <span
                      key={tech}
                      className="bg-secondary rounded-full px-4 py-2 text-sm font-mono text-muted-foreground border border-transparent transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/30 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
