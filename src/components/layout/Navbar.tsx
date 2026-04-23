import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { Layers } from 'lucide-react'
import { PremiumDraggable } from '../ui/PremiumDraggable'

const navLinks = [
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Projects', href: '#projects', section: 'projects' },
  { label: 'Services', href: '#services', section: 'services' },
  { label: 'Experience', href: '#experience', section: 'experience' },
  { label: 'Contact', href: '#contact', section: 'contact' },
]

interface NavbarProps {
  activeSection: string
  isScrolled: boolean
}

// High-End Magnetic Interaction Hook
function useMagneticInteraction() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springX = useSpring(x, { stiffness: 450, damping: 25, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 450, damping: 25, mass: 0.2 })

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    x.set(middleX * 0.18)
    y.set(middleY * 0.18)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, x: springX, y: springY, handleMouse, handleLeave }
}

function MagneticItem({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const outerRef = useRef<HTMLDivElement>(null)
  
  // Magnetic hover offset
  const magnetX = useMotionValue(0)
  const magnetY = useMotionValue(0)
  const springMX = useSpring(magnetX, { stiffness: 350, damping: 22, mass: 0.25 })
  const springMY = useSpring(magnetY, { stiffness: 350, damping: 22, mass: 0.25 })

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.9 + delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}  
    >
      <motion.div 
        ref={outerRef}
        onMouseMove={(e) => {
          if (!outerRef.current) return
          const rect = outerRef.current.getBoundingClientRect()
          const mx = e.clientX - (rect.left + rect.width / 2)
          const my = e.clientY - (rect.top + rect.height / 2)
          magnetX.set(mx * 0.22)
          magnetY.set(my * 0.22)
        }}
        onMouseLeave={() => {
          magnetX.set(0)
          magnetY.set(0)
        }}
        style={{ 
          x: springMX, 
          y: springMY,
        }}
        whileHover={{ 
          scale: 1.06, 
          filter: 'brightness(1.12) drop-shadow(0 4px 12px rgba(46,103,206,0.24))',
        }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 400, damping: 22, mass: 0.25 }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// 3D Tilt Hook
function use3DTilt() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { rotateX, rotateY, x, y, handleMouseMove, handleMouseLeave }
}

  export function Navbar({ activeSection, isScrolled }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [compactMenuOpen, setCompactMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isNavHovered, setIsNavHovered] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Outer Container Tilt
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave, x, y } = use3DTilt()
  
  // Calculate intense premium dynamic glow position based on mouse pct
  const backgroundGlow = useTransform(
    [x, y],
    ([latestX, latestY]) => `radial-gradient(1200px circle at ${(latestX as number + 0.5) * 100}% ${(latestY as number + 0.5) * 100}%, rgba(75, 131, 251, 0.08), transparent 40%)`
  )

  // Smooth premium scroll with stable native behavior
  const premiumScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const target = document.getElementById(id)
    if (!target) return

    const offset = 88
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      


      <motion.div 
        initial={{ y: -120, opacity: 0, rotateX: -20, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <div className={`transition-all duration-700 pointer-events-auto ${isScrolled ? 'pt-3 md:pt-4' : 'pt-3 md:pt-8'}`} style={{ perspective: 1200 }}>
          <motion.nav 
            layout
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={(e) => { handleMouseMove(e as any); setIsNavHovered(true); }}
            onMouseLeave={() => { handleMouseLeave(); setIsNavHovered(false); }}
            style={{ 
              rotateX, rotateY,
              transformStyle: "preserve-3d"
            }}
            animate={{
              scale: isNavHovered ? 1.01 : 1,
              filter: isNavHovered ? 'brightness(1.03)' : 'brightness(1)',
            }}
            className={`relative flex items-center justify-between transition-[background,backdrop-filter,border-color,box-shadow,border-width] duration-700 ${isScrolled 
              ? `w-[calc(100vw-2rem)] md:w-auto px-3 md:px-4 py-2 md:py-2 rounded-2xl md:rounded-full
                 ${isNavHovered 
                   ? 'bg-[#020617]/85 backdrop-blur-3xl border border-white/[0.08] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]' 
                   : 'bg-transparent backdrop-blur-none border-0 shadow-none'}` 
              : `w-[calc(100vw-2rem)] max-w-5xl px-3 md:px-6 py-2.5 md:py-3 rounded-2xl md:rounded-[2rem] 
                 ${isNavHovered 
                   ? 'bg-[#0a1628]/60 backdrop-blur-2xl border border-white/[0.08] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]' 
                   : 'bg-transparent backdrop-blur-none border-0 shadow-none'}`}`}
          >
          {/* Subtle gradient top-edge shine (only on hover) */}
          <div className={`absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#2e67ce]/30 to-transparent pointer-events-none transition-opacity duration-700 ${isNavHovered ? 'opacity-100' : 'opacity-0'}`} />
          {/* Hardware-Accelerated Dynamic Spotlight Geometry Tracing Layer */}
          <motion.div 
            className={`absolute inset-0 z-0 pointer-events-none rounded-[inherit] transition-opacity duration-700 ${isNavHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              background: useTransform(
                [x, y],
                ([latestX, latestY]) => `radial-gradient(150px circle at ${(latestX as number + 0.5) * 100}% ${(latestY as number + 0.5) * 100}%, rgba(75, 131, 251, 0.45), transparent 100%)`
              ),
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px' // Exactly tracing the 1px perimeter
            }}
          />

          {/* Dynamic Glow Overlay for 3D tension */}
          <motion.div 
            className={`absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden mix-blend-screen z-0 transition-opacity duration-700 ${isNavHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: backgroundGlow }}
          />

          {/* Left: Logo & Status */}
          <div className="flex items-center gap-2 md:gap-3 relative z-10 shrink-0">
            <MagneticItem>
            <a href="#hero" className="flex items-center gap-2 group cursor-pointer focus:outline-none" onClick={(e) => premiumScrollTo(e, '#hero')}>
               
              <div className="flex flex-col justify-center">
                
                {/* Typography Logo Engine - Expanding Apple-style Hover Reveal */}
                <div className="flex items-center text-xl md:text-[28px] font-bold tracking-tight text-white/90 group-hover:text-white transition-all duration-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  
                  {/* Large Floating Hero "B" */}
                  <div className="relative flex items-center justify-center flex-shrink-0 h-8 md:h-11 lg:h-[48px] z-20">
                    <motion.img 
                      src="/b.png" 
                      alt="Bipul" 
                      className="h-full w-auto object-contain relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:-translate-y-1"
                      initial={{ filter: "drop-shadow(0px 0px 0px rgba(46,103,206,0))" }}
                      whileHover={{ filter: "drop-shadow(0px 10px 25px rgba(46,103,206,0.62))" }}
                    />
                    {/* Glowing footprint physics */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-8 bg-primary/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                  
                  {/* Dynamic Name Reveal - 'ipul.' hidden by default */}
                  <div 
                    className="overflow-hidden flex items-baseline max-w-0 opacity-0 -ml-4 group-hover:ml-0.5 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" 
                  >
                    <span className="tracking-tighter">ipul</span>
                    <span className="text-primary drop-shadow-[0_0_8px_rgba(46,103,206,0.65)]">.</span>
                  </div>

                </div>
                
                <motion.div 
                  initial={false}
                  animate={{ 
                    opacity: isScrolled ? 0 : 1, 
                    height: isScrolled ? 0 : 'auto',
                    overflow: 'hidden'
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden md:flex items-center gap-1.5 whitespace-nowrap mt-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
                  <span className="text-[11px] text-white/50 font-medium">Available for new projects</span>
                </motion.div>

              </div>
            </a>
            </MagneticItem>
          </div>

          {/* Center: Links (Desktop) */}
          <motion.div 
            initial={false}
            animate={{ 
              opacity: isScrolled ? 0 : 1, 
              width: isScrolled ? 0 : 'auto',
              scale: isScrolled ? 0.9 : 1
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            // Prevent flex-shrinking clipping and remove dangerous wide margins that force squeeze bugs
            className={`hidden lg:flex items-center justify-center gap-1 bg-black/30 border border-white/[0.08] rounded-full py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl overflow-hidden whitespace-nowrap min-w-max shrink-0 ${isScrolled ? 'mx-0 px-0' : 'mx-2 xl:mx-auto px-2'}`}
            style={{ transform: "translateZ(40px)", pointerEvents: isScrolled ? 'none' : 'auto' }}
          >
            {navLinks.map((link, i) => (
              <MagneticItem 
                key={link.section} 
                className="flex items-center relative group/link shrink-0"
                delay={i * 0.08}
              >
                <a
                  href={link.href}
                  onClick={(e) => premiumScrollTo(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.section)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative flex items-center justify-center text-[14px] font-medium px-5 py-2 rounded-full transition-all duration-400 w-full h-full tracking-wide"
                >
                      {/* Fluid Sliding Hover Capsule Geometry */}
                      {hoveredLink === link.section && (
                         <motion.span 
                           layoutId="navHoverPill"
                           className="absolute inset-0 bg-white/[0.05] border border-white/5 rounded-full z-0 block" 
                           transition={{ type: "spring", stiffness: 450, damping: 30 }}
                         />
                      )}
                      
                      <span className={`relative z-10 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        activeSection === link.section 
                          ? 'text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' 
                          : hoveredLink === null 
                            ? 'text-neutral-400'
                            : hoveredLink === link.section
                              ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                              : 'text-neutral-400 scale-[0.93] blur-[0.6px] opacity-40'
                      }`}>
                        {link.label}
                      </span>
                      
                      {/* Premium Active Marker Jump */}
                      {activeSection === link.section && (
                          <motion.div 
                             layoutId="activeNavIndicator"
                             className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.02]"
                             transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          >
                             <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-t-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 shadow-[0_-2px_8px_rgba(46,103,206,0.62)]" />
                          </motion.div>
                      )}
                    </a>
              </MagneticItem>
                ))}
          </motion.div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 md:gap-3 relative z-10 shrink-0">

            <AnimatePresence mode="popLayout">
              {!isScrolled ? (
                <MagneticItem>
                <motion.a
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  href="#contact"
                  onClick={(e) => premiumScrollTo(e, '#contact')}
                  className="hidden md:flex items-center justify-center h-10 md:h-11 px-6 md:px-8 rounded-full bg-black border border-white/10 text-white/90 text-[13px] font-semibold hover:border-white/30 hover:text-white transition-all duration-500 overflow-hidden relative group focus:outline-none backdrop-blur-xl shrink-0"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {/* Extreme Premium Interaction Lighting */}
                  <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-duration-500 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]" />
                  
                  {/* Dynamic Sweeping Sheen */}
                  <motion.div 
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none opacity-0 group-hover:opacity-100" 
                  />
                  
                  <span className="whitespace-nowrap relative z-10 tracking-wide transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Let's Talk</span>
                </motion.a>
                </MagneticItem>
              ) : (
                <motion.div layout className="relative" 
                     onMouseEnter={() => setCompactMenuOpen(true)}
                     onMouseLeave={() => setCompactMenuOpen(false)}>
                  <motion.button
                    layout
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-primary hover:border-primary hover:text-primary-foreground hover:shadow-[0_0_15px_rgba(46,103,206,0.35)] transition-all focus:outline-none"
                    aria-label="Compact Menu"
                  >
                    <Layers className="w-4 h-4" />
                  </motion.button>
                  
                  {/* Compact Hover Dropdown */}
                  <AnimatePresence>
                    {compactMenuOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute right-0 top-full mt-4 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 z-50 flex flex-col"
                      >
                         {navLinks.map((link) => (
                           <a 
                             key={link.section} 
                             href={link.href} 
                             onClick={(e) => { 
                               setCompactMenuOpen(false); 
                               premiumScrollTo(e, link.href);
                             }} 
                             className="px-4 py-2.5 text-sm font-medium text-white/70 hover:text-primary hover:bg-white/5 rounded-xl transition-colors active:scale-95 origin-left"
                           >
                             {link.label}
                           </a>
                         ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
            
            <MagneticItem className="shrink-0 md:hidden">
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                premiumScrollTo(e as any, '#contact');
              }} className="relative flex items-center justify-center gap-1.5 h-[34px] px-4 rounded-xl bg-gradient-to-b from-[#2e67ce] to-[#1b3f85] border border-[#5f8fdf]/25 text-white text-[10px] font-bold shadow-[0_2px_12px_-2px_rgba(46,103,206,0.45),inset_0_1px_0_rgba(255,255,255,0.2)] active:scale-[0.96] transition-all focus:outline-none tracking-[0.12em] overflow-hidden shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  HIRE ME
              </a>
            </MagneticItem>

            <MagneticItem className="flex-shrink-0 relative hidden md:block">
              <div className="w-11 h-11 rounded-full border border-white/[0.15] overflow-hidden ml-2 shadow-[0_0_12px_rgba(46,103,206,0.24),0_0_0_1px_rgba(46,103,206,0.14)] group cursor-pointer relative">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Bipul&backgroundColor=2e67ce`} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.08] rounded-full pointer-events-none" />
              </div>
            </MagneticItem>

            <MagneticItem className="lg:hidden flex-shrink-0">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative flex flex-col items-center justify-center w-[34px] h-[34px] md:w-10 md:h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 hover:bg-white/[0.08] hover:text-white transition-all duration-300 focus:outline-none active:scale-90"
                aria-label="Toggle menu"
              >
                <div className="relative w-[13px] h-[9px] flex flex-col justify-between">
                  <motion.span 
                    animate={mobileOpen ? { rotate: 45, y: 3.75, width: '100%' } : { rotate: 0, y: 0, width: '100%' }} 
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="h-[1.5px] bg-current rounded-full origin-center block" 
                  />
                  <motion.span 
                    animate={mobileOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 0.6, opacity: 0.5 }} 
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="h-[1.5px] bg-current rounded-full origin-right block" 
                  />
                  <motion.span 
                    animate={mobileOpen ? { rotate: -45, y: -3.75, width: '100%' } : { rotate: 0, y: 0, width: '100%' }} 
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="h-[1.5px] bg-current rounded-full origin-center block" 
                  />
                </div>
              </button>
            </MagneticItem>
          </div>
          </motion.nav>
        </div>
      </motion.div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[45] lg:hidden flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Super premium frosted glass backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-[#020617]/70 backdrop-blur-3xl saturate-150"
            />
            
            {/* Cinematic background light pools */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#2e67ce]/22 blur-[80px]" 
               />
               <motion.div 
                 animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#9ab8e8]/12 blur-[100px]" 
               />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 w-full px-6">
              {navLinks.map((link, i) => (
                <div key={link.section} className="w-full overflow-hidden flex justify-center">
                  <PremiumDraggable intensity="heavy" className="w-auto">
                  <motion.a
                    href={link.href}
                    onClick={(e) => {
                      setMobileOpen(false);
                      premiumScrollTo(e, link.href);
                    }}
                    initial={{ y: "120%", opacity: 0, scale: 0.9, rotate: 4 }}
                    animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ y: "-50%", opacity: 0, scale: 0.95 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`block py-2 text-4xl sm:text-5xl font-black tracking-tighter uppercase relative group ${
                      activeSection === link.section 
                        ? 'text-white drop-shadow-[0_0_20px_rgba(46,103,206,0.6)]' 
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#2e67ce] -translate-y-1/2 scale-x-0 group-hover:scale-x-100 active:scale-x-100 transition-transform duration-500 origin-left ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                  </motion.a>
                  </PremiumDraggable>
                </div>
              ))}
              
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "80%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"
              />

              <PremiumDraggable intensity="normal" className="w-auto">
              <motion.a
                  href="#contact"
                  onClick={(e) => {
                    setMobileOpen(false);
                    premiumScrollTo(e, '#contact');
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-2 flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] text-sm font-bold tracking-[0.2em] uppercase relative overflow-hidden group"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <span className="relative z-10 flex items-center gap-2">
                    Start a Project
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7444 7.2958 10.8 7.4727 10.7816 7.64716C10.7632 7.82163 10.6698 7.97906 10.5284 8.084L5.27838 11.9791C5.05602 12.1438 4.73977 12.1001 4.57508 11.8778C4.41039 11.6554 4.45408 11.3392 4.67644 11.1745L9.36622 7.69615L6.13486 4.24831C5.94599 4.04685 5.9562 3.73043 6.15766 3.54156C6.1579 3.54133 6.15815 3.5411 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                  </span>
                </motion.a>
                </PremiumDraggable>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
