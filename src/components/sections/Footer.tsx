import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, XIcon } from '../ui/SocialIcons'
import { socialLinks } from '../../data/portfolio'
import { PremiumDraggable } from '../ui/PremiumDraggable'
import { scrollAnimations } from '../../hooks/useScrollAnimations'

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const socialProfiles = [
  { icon: GitHubIcon, href: socialLinks.github, label: 'GitHub' },
  { icon: LinkedInIcon, href: socialLinks.linkedin, label: 'LinkedIn' },
  { icon: XIcon, href: socialLinks.twitter, label: 'Twitter' },
]

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <footer className="border-t border-border" ref={ref}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Top row */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
          }}
        >
          {/* Logo + tagline */}
          <PremiumDraggable className="w-auto">
          <div>
            <a href="#hero" className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Bipul<span className="text-primary">.</span>
            </a>
            <p className="mt-1 text-sm text-muted-foreground">
              Building the future, one commit at a time.
            </p>
          </div>
          </PremiumDraggable>

          {/* Quick links */}
          <nav className="flex flex-wrap items-center gap-6">
            {quickLinks.map((link) => (
              <PremiumDraggable key={link.label} intensity="feather" className="w-auto">
              <a
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
              </PremiumDraggable>
            ))}
          </nav>

          {/* Social icons */}
          <PremiumDraggable className="w-auto">
          <div className="flex items-center gap-3">
            {socialProfiles.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>
          </PremiumDraggable>
        </motion.div>

        {/* Bottom row */}
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <PremiumDraggable intensity="feather" className="w-auto">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Bipul. All rights reserved.
          </p>
          </PremiumDraggable>
          <PremiumDraggable intensity="feather" className="w-auto">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with React, Tailwind, and{' '}
            <Heart className="w-3 h-3 text-primary inline" /> attention to detail.
          </p>
          </PremiumDraggable>
        </div>
      </div>
    </footer>
  )
}
