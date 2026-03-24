import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, XIcon } from '../ui/SocialIcons'
import { appwriteConfig, submitContactMessage } from '../../lib/appwrite'
import { socialLinks } from '../../data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 18 } },
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'submitting' | 'success' | 'error'; message?: string }>({ type: 'idle' })

  const socialProfiles = [
    { icon: GitHubIcon, href: socialLinks.github, label: 'GitHub' },
    { icon: LinkedInIcon, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: XIcon, href: socialLinks.twitter, label: 'Twitter' },
  ]

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!appwriteConfig.configured) {
      setFormStatus({
        type: 'error',
        message: 'Contact form is not configured yet. Please add your Appwrite environment variables.',
      })
      return
    }

    setFormStatus({ type: 'submitting' })
    try {
      await submitContactMessage(formData)
      setFormData({ name: '', email: '', message: '' })
      setFormStatus({ type: 'success', message: 'Thanks! Your message has been sent.' })
    } catch (error) {
      console.error('Failed to submit contact message', error)
      setFormStatus({ type: 'error', message: 'Something went wrong. Please try again shortly.' })
    }
  }

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
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {socialLinks.email}
                  </a>
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
                {socialProfiles.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </motion.div>

            {/* Right: Appwrite contact form */}
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
                <form className="space-y-4 text-left" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full rounded-lg border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    className="w-full rounded-lg border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project"
                    rows={4}
                    required
                    className="w-full rounded-lg border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                  <button
                    type="submit"
                    disabled={formStatus.type === 'submitting'}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <Send className="w-4 h-4" />
                    {formStatus.type === 'submitting' ? 'Sending...' : 'Send message'}
                  </button>
                </form>
                {formStatus.type !== 'idle' && formStatus.message && (
                  <p
                    className={`text-xs ${formStatus.type === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}
                    role={formStatus.type === 'error' ? 'alert' : 'status'}
                    aria-live={formStatus.type === 'error' ? 'assertive' : 'polite'}
                  >
                    {formStatus.message}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
