import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { experiences } from '../../data/portfolio'
import { PremiumDraggable } from '../ui/PremiumDraggable'
import { scrollAnimations } from '../../hooks/useScrollAnimations'

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollY } = useScroll()

  // Parallax effect for timeline
  const timelineX = useTransform(scrollY, [2000, 2600], [-40, 20])

  return (
    <section id="experience" className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
        >
          {/* Header */}
          <motion.div variants={scrollAnimations.slideInLeft} className="mb-16">
            <PremiumDraggable intensity="light">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary font-mono">Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Experience & growth
            </h2>
            </PremiumDraggable>
          </motion.div>

          {/* Timeline */}
          <motion.div className="relative" style={{ x: timelineX }}>
            {/* Vertical line */}
            <motion.div
              className="absolute left-[7px] top-0 bottom-0 w-px bg-border"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ originY: 0 }}
            />

            <div className="space-y-10">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.year}
                  variants={scrollAnimations.slideInLeft}
                  className="relative pl-10"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-primary bg-background z-10" />
                  <div className="absolute left-[3px] top-[7px] w-[9px] h-[9px] rounded-full bg-primary" />

                  {/* Content card */}
                  <PremiumDraggable className="w-full"><div className="glass-panel rounded-xl p-6">
                    <span className="inline-block text-xs font-mono text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
                      {exp.year}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {exp.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{exp.description}</p>

                    {/* Highlights */}
                    <div className="mt-4 space-y-2">
                      {exp.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div></PremiumDraggable>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
