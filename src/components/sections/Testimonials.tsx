import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '../../data/portfolio'
import { PremiumDraggable } from '../ui/PremiumDraggable'
import { scrollAnimations } from '../../hooks/useScrollAnimations'

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollY } = useScroll()

  // Parallax effect for testimonials
  const testimonialsY = useTransform(scrollY, [3600, 4200], [80, -40])

  return (
    <section id="testimonials" className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
        >
          {/* Header */}
          <motion.div variants={scrollAnimations.fadeInUp} className="mb-16">
            <PremiumDraggable intensity="light">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary font-mono">Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              What people say
            </h2>
            </PremiumDraggable>
          </motion.div>

          {/* Cards */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ y: testimonialsY }}>
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={scrollAnimations.scaleInUp}
              >
              <PremiumDraggable className="glass-panel rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="block text-5xl text-primary/15 leading-none select-none" style={{ fontFamily: 'Georgia, serif' }}>
                    &ldquo;
                  </span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} fill="currentColor" className="w-3.5 h-3.5 text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  {t.text}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                  </div>
                </div>
              </PremiumDraggable>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
