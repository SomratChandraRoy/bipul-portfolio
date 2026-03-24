import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, XIcon } from '../ui/SocialIcons'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 18 } },
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary font-mono">Contact</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Let&apos;s work together
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can build something great.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: info */}
            <motion.div variants={fadeUp} className="space-y-6">
              <div className="glass-panel rounded-xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">hello@bipul.dev</p>
                  <p className="text-xs text-muted-foreground mt-1">Drop me a line anytime</p>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Available Worldwide</p>
                  <p className="text-xs text-muted-foreground mt-1">Remote-first, flexible timezone</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200">
                  <GitHubIcon className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200">
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200">
                  <XIcon className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Right: Tally CTA */}
            <motion.div variants={fadeUp}>
              <div className="glass-panel rounded-xl p-8 md:p-10 text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Send className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Send me a message
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Fill out a quick form and I&apos;ll get back to you within 24 hours. Let&apos;s turn your idea into reality.
                </p>
                <button
                  data-tally-open="VLVJEa"
                  data-tally-emoji-text="👋"
                  data-tally-emoji-animation="wave"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <Send className="w-4 h-4" />
                  Get In Touch
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
