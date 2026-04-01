import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Layers, Zap, LayoutDashboard, Shield, Container } from 'lucide-react'
import { services } from '../../data/portfolio'
import { PremiumDraggable } from '../ui/PremiumDraggable'
import { TextAnimate } from '../ui/TextAnimate'

const iconMap: Record<string, React.ElementType> = {
  Globe, Layers, Zap, LayoutDashboard, Shield, Container,
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 18 } },
}

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
           {/* Header */}
           <motion.div variants={fadeUp} className="mb-16">
             <PremiumDraggable intensity="light">
             <div className="flex items-center gap-3 mb-4">
               <div className="h-px w-8 bg-primary" />
               <span className="text-xs font-semibold uppercase tracking-widest text-primary font-mono">
                 <TextAnimate animation="blurInUp" by="word" duration={0.8} staggerDelay={0.06}>
                   Services
                 </TextAnimate>
               </span>
             </div>
             <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.2]" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.02em" }}>
               <TextAnimate animation="blurInUp" by="word" duration={1} staggerDelay={0.08}>
                 What I build
               </TextAnimate>
             </h2>
             <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
               <TextAnimate animation="blurInUp" by="word" duration={1.2} delay={0.2} staggerDelay={0.04}>
                 From MVPs to enterprise platforms, I design and build software that delivers real business value.
               </TextAnimate>
             </p>
             </PremiumDraggable>
           </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Globe
              return (
                <motion.div key={service.title} variants={fadeUp} className="h-full">
                <PremiumDraggable
                  className="service-card-glow group relative overflow-hidden glass-panel rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 h-full"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                   <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                     <TextAnimate animation="blurInUp" by="word" duration={0.8} staggerDelay={0.06}>
                       {service.title}
                     </TextAnimate>
                   </h3>
                   <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                     <TextAnimate animation="blurInUp" by="word" duration={1} delay={0.1} staggerDelay={0.04}>
                       {service.description}
                     </TextAnimate>
                   </p>
                </PremiumDraggable>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
