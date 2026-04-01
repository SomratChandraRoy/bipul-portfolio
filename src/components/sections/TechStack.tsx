import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { techStack } from '../../data/portfolio'
import { PremiumDraggable } from '../ui/PremiumDraggable'
import { TextAnimate } from '../ui/TextAnimate'

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
             <PremiumDraggable intensity="light">
             <div className="flex items-center gap-3 mb-4">
               <div className="h-px w-8 bg-primary" />
               <span className="text-xs font-semibold uppercase tracking-widest text-primary font-mono">
                 <TextAnimate animation="blurInUp" by="word" duration={0.8} staggerDelay={0.06}>
                   Stack
                 </TextAnimate>
               </span>
             </div>
             <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.2]" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.02em" }}>
               <TextAnimate animation="blurInUp" by="word" duration={1.2} staggerDelay={0.08}>
                 Technologies I work with
               </TextAnimate>
             </h2>
             <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
               <TextAnimate animation="blurInUp" by="word" duration={1.2} delay={0.2} staggerDelay={0.04}>
                 A carefully chosen set of modern tools and frameworks for building reliable, scalable software.
               </TextAnimate>
             </p>
             </PremiumDraggable>
           </motion.div>

          {/* Category grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
             <motion.div key={cat.label} variants={fadeUp}>
                 <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                   <TextAnimate animation="blurInUp" by="word" duration={0.6} staggerDelay={0.05}>
                     {cat.label}
                   </TextAnimate>
                 </h3>
                 <div className="flex flex-wrap gap-2">
                   {cat.items.map((tech) => (
                     <PremiumDraggable key={tech} className="w-auto">
                     <span
                       className="inline-block bg-secondary rounded-full px-4 py-2 text-sm font-mono text-muted-foreground border border-transparent transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/30 cursor-default"
                     >
                       <TextAnimate animation="blurInUp" by="word" duration={0.5} staggerDelay={0.04}>
                         {tech}
                       </TextAnimate>
                     </span>
                     </PremiumDraggable>
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
