import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { caseStudies } from '../../data/portfolio'
import { PremiumDraggable } from '../ui/PremiumDraggable'
import { TextAnimate } from '../ui/TextAnimate'

/* ── Case Studies Section ────────────────────────────────────────────────── */

export function CaseStudies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="case-studies" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <PremiumDraggable intensity="light">
           <div className="flex items-center gap-3 mb-4">
             <div className="h-px w-8 bg-primary" />
             <span className="text-xs font-mono uppercase tracking-widest text-primary">
               <TextAnimate animation="blurInUp" by="word" duration={0.8} staggerDelay={0.06}>
                 Deep Dives
               </TextAnimate>
             </span>
           </div>
           <h2
             className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.2]"
             style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.02em" }}
           >
             <TextAnimate animation="blurInUp" by="word" duration={1.2} staggerDelay={0.08}>
               Case studies in
             </TextAnimate>
             {' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b83fb] via-[#60a5fa] to-[#a8caff]">
               <TextAnimate animation="blurInUp" by="word" duration={1.2} delay={0.1} staggerDelay={0.08}>
                 architecture
               </TextAnimate>
             </span>
           </h2>
          </PremiumDraggable>
        </motion.div>

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
            >
               <PremiumDraggable className="glass-panel rounded-xl p-6 border border-border/60 transition-colors duration-300 hover:border-primary/30 group">
                 <span className="text-xs font-mono text-primary uppercase tracking-wider">
                   <TextAnimate animation="blurInUp" by="word" duration={0.6} staggerDelay={0.05}>
                     {study.client}
                   </TextAnimate>
                 </span>
                 <h3 className="text-lg font-semibold text-foreground mt-2">
                   <TextAnimate animation="blurInUp" by="word" duration={0.8} staggerDelay={0.06}>
                     {study.title}
                   </TextAnimate>
                 </h3>
                 <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                   <TextAnimate animation="blurInUp" by="word" duration={1} delay={0.1} staggerDelay={0.04}>
                     {study.description}
                   </TextAnimate>
                 </p>

                 {/* Metrics */}
                 <div className="flex gap-4 mt-4">
                   {study.metrics.map((metric) => (
                     <div key={metric.label}>
                       <span className="text-xl font-bold text-foreground">
                         <TextAnimate animation="blurInUp" by="word" duration={0.6} staggerDelay={0.05}>
                           {metric.value}
                         </TextAnimate>
                       </span>
                       <p className="text-xs text-muted-foreground">
                         <TextAnimate animation="blurInUp" by="word" duration={0.6} delay={0.05} staggerDelay={0.04}>
                           {metric.label}
                         </TextAnimate>
                       </p>
                     </div>
                   ))}
                 </div>

                {/* Stack chips */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-secondary rounded px-2 py-0.5 text-xs text-muted-foreground font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </PremiumDraggable>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
