import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Globe, Layers, Zap, LayoutDashboard, Shield, Container } from 'lucide-react'
import { services } from '../../data/portfolio'
import { PremiumDraggable } from '../ui/PremiumDraggable'
import { scrollAnimations } from '../../hooks/useScrollAnimations'

const iconMap: Record<string, React.ElementType> = {
  Globe, Layers, Zap, LayoutDashboard, Shield, Container,
}

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollY } = useScroll()

  // Parallax effect for services grid
  const servicesY = useTransform(scrollY, [1400, 1900], [80, -40])

  return (
    <section id="services" className="relative py-24 md:py-32" ref={ref}>
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
              <span className="text-xs font-semibold uppercase tracking-widest text-primary font-mono">Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              What I build
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              From MVPs to enterprise platforms, I design and build software that delivers real business value.
            </p>
            </PremiumDraggable>
          </motion.div>

          {/* Grid */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ y: servicesY }}>
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Globe
              return (
                <motion.div key={service.title} variants={scrollAnimations.scaleInUp} className="h-full">
                <PremiumDraggable
                  className="service-card-glow group relative overflow-hidden glass-panel rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 h-full"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </PremiumDraggable>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
