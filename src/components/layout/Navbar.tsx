import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Menu, X, Layers } from 'lucide-react'
import { PremiumDraggable } from '../ui/PremiumDraggable'

const navLinks = [
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Projects', href: '#projects', section: 'projects' },
  { label: 'Services', href: '#services', section: 'services' },
  { label: 'Experience', href: '#experience', section: 'experience' },
  { label: 'Contact', href: '#contact', section: 'contact' },
]

interface NavbarProps {
  scrollProgress: number
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
    x.set(middleX * 0.18) // Apply exact gravitational inertia
    y.set(middleY * 0.18)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, x: springX, y: springY, handleMouse, handleLeave }
}

function MagneticItem({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const { ref, x, y, handleMouse, handleLeave } = useMagneticInteraction()
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.9 + delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}  
    >
      <motion.div 
        ref={ref} 
        onMouseMove={handleMouse} 
        onMouseLeave={handleLeave} 
        style={{ x, y }}
        className="w-full h-full"
        whileTap={{ scale: 0.90 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
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

  export function Navbar({ scrollProgress, activeSection, isScrolled }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [compactMenuOpen, setCompactMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isNavHovered, setIsNavHovered] = useState(false)
  
  // Outer Container Tilt
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave, x, y } = use3DTilt()
  
  // Calculate intense premium dynamic glow position based on mouse pct
  const backgroundGlow = useTransform(
    [x, y],
    ([latestX, latestY]) => `radial-gradient(1200px circle at ${(latestX as number + 0.5) * 100}% ${(latestY as number + 0.5) * 100}%, rgba(75, 131, 251, 0.08), transparent 40%)`
  )

  // Bulletproof custom cinematic scroll engine bridging Framer layout conflicts
  const premiumScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (!target) return;

    // Temporarily neuter CSS smooth scroll so our JS loop doesn't fight it and abort halfway!
    document.documentElement.style.scrollBehavior = 'auto';

    const targetPosition = target.getBoundingClientRect().top + window.scrollY - 80;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000; // 1 second extremely luxurious cinematic glide
    let start: number | null = null;

    // Apple-tier EaseInOutQuint profile
    const easeInOutQuint = (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      
      window.scrollTo(0, startPosition + distance * easeInOutQuint(percent));

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        // Restore CSS smooth scroll once perfectly landed
        document.documentElement.style.scrollBehavior = 'smooth';
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left"
        style={{ scaleX: scrollProgress }}
      />
      
      {/* Mobile Status Bar (Pre-scroll) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-0 w-full z-50 flex justify-center pt-2 pointer-events-none"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-muted-foreground uppercase opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              STATUS: AVAILABLE FOR NEW CONTRACTS
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ y: -120, opacity: 0, rotateX: -20, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'pt-4' : 'pt-6 md:pt-8'}`} style={{ perspective: 1200 }}
      >
        <motion.nav 
          layout
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={(e) => { handleMouseMove(e); setIsNavHovered(true); }}
          onMouseLeave={() => { handleMouseLeave(); setIsNavHovered(false); }}
          style={{ 
            rotateX, rotateY,
            transformStyle: "preserve-3d" // Enables 3D stacking inside
          }}
          className={`relative flex items-center justify-between transition-all duration-700 ${isScrolled ? 'w-[calc(100%-2rem)] md:w-auto px-4 py-2 bg-[#020617]/90 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]' : `w-[calc(100%-2rem)] max-w-5xl px-4 md:px-6 py-2 md:py-3 rounded-[2rem] ${isNavHovered ? 'bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'bg-transparent border-transparent shadow-none backdrop-blur-none'}`}`}
        >
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
          <motion.div layout className="flex items-center gap-3 relative z-10 shrink-0" style={{ transform: "translateZ(30px)" }}>
            <PremiumDraggable intensity="light" className="w-auto">
            <a href="#hero" className="flex items-center gap-2 group cursor-pointer focus:outline-none pr-2">
               
              <div className="flex flex-col justify-center">
                
                {/* Typography Logo Engine - Expanding Apple-style Hover Reveal */}
                <div className="flex items-center text-2xl md:text-[28px] font-bold tracking-tight text-white/90 group-hover:text-white transition-all duration-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  
                  {/* Large Floating Hero "B" */}
                  <div className="relative flex items-center justify-center flex-shrink-0 h-9 md:h-11 lg:h-[48px] z-20">
                    <motion.img 
                      src="/b.png" 
                      alt="Bipul" 
                      className="h-full w-auto object-contain relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:-translate-y-1"
                      initial={{ filter: "drop-shadow(0px 0px 0px rgba(75,131,251,0))" }}
                      whileHover={{ filter: "drop-shadow(0px 10px 25px rgba(75,131,251,0.6))" }}
                    />
                    {/* Glowing footprint physics */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-8 bg-primary/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                  
                  {/* Dynamic Name Reveal - 'ipul.' hidden by default */}
                  <div 
                    className="overflow-hidden flex items-baseline max-w-0 opacity-0 -ml-4 group-hover:ml-0.5 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" 
                  >
                    <span className="tracking-tighter">ipul</span>
                    <span className="text-primary drop-shadow-[0_0_8px_rgba(75,131,251,0.6)]">.</span>
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
            </PremiumDraggable>
          </motion.div>

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
                             <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-t-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 shadow-[0_-2px_8px_rgba(75,131,251,0.6)]" />
                          </motion.div>
                      )}
                    </a>
              </MagneticItem>
                ))}
          </motion.div>

          {/* Right: Actions */}
          <motion.div layout className="flex items-center gap-2 md:gap-3 relative z-10 shrink-0" style={{ transform: "translateZ(30px)" }}>

            <AnimatePresence mode="popLayout">
              {!isScrolled ? (
                <MagneticItem>
                <PremiumDraggable intensity="light" className="w-auto">
                <motion.a
                  layout
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
                </PremiumDraggable>
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
                    className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-primary hover:border-primary hover:text-primary-foreground hover:shadow-[0_0_15px_rgba(75,131,251,0.3)] transition-all focus:outline-none"
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
            
            <PremiumDraggable intensity="feather" className="w-auto shrink-0">
            <motion.a layout href="#contact" onClick={(e) => {
              setMobileOpen(false);
              premiumScrollTo(e, '#contact');
            }} className="md:hidden flex items-center justify-center h-8 px-5 rounded-full bg-[#4b83fb] text-white text-[11px] font-bold shadow-[0_0_20px_rgba(75,131,251,0.3)] hover:shadow-[0_0_25px_rgba(75,131,251,0.5)] active:scale-95 transition-all focus:outline-none tracking-wider shrink-0 relative overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                LET'S TALK
            </motion.a>
            </PremiumDraggable>

            <MagneticItem className="flex-shrink-0 relative">
              <PremiumDraggable intensity="light" className="w-auto">
              <motion.div layout className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-white/10 overflow-hidden sm:ml-2 shadow-[0_0_15px_rgba(75,131,251,0.15)] group cursor-pointer relative">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Bipul&backgroundColor=4b83fb`} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-full pointer-events-none" />
              </motion.div>
              </PremiumDraggable>
            </MagneticItem>

            <MagneticItem className="lg:hidden flex-shrink-0">
              <PremiumDraggable intensity="feather" className="w-auto">
              <motion.button
                layout
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none border border-transparent hover:border-white/10 relative overflow-hidden"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5 relative z-10" /> : <Menu className="w-5 h-5 relative z-10" />}
                <div className="absolute inset-0 bg-white/10 opacity-0 active:opacity-100 transition-opacity" />
              </motion.button>
              </PremiumDraggable>
            </MagneticItem>
          </motion.div>
        </motion.nav>
      </motion.div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(32px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[45] bg-black/90 lg:hidden flex flex-col items-center justify-center gap-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(75,131,251,0.15),transparent_60%)] pointer-events-none" />

            {navLinks.map((link, i) => (
              <div key={link.section} className="overflow-hidden">
                <PremiumDraggable intensity="heavy" className="w-auto">
                <motion.a
                  href={link.href}
                  onClick={(e) => {
                    setMobileOpen(false);
                    premiumScrollTo(e, link.href);
                  }}
                  initial={{ y: "110%", opacity: 0, rotate: 6 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: "-110%", opacity: 0, rotate: -6 }}
                  transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`block text-5xl md:text-6xl font-black tracking-tighter uppercase ${
                    activeSection === link.section ? 'text-primary drop-shadow-[0_0_30px_rgba(75,131,251,0.3)]' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 hover:text-white'
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {link.label}
                </motion.a>
                </PremiumDraggable>
              </div>
            ))}
            
             <PremiumDraggable intensity="normal" className="w-auto">
             <motion.a
                href="#contact"
                onClick={(e) => {
                  setMobileOpen(false);
                  premiumScrollTo(e, '#contact');
                }}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 px-10 py-4 rounded-full bg-black border border-white/10 text-white shadow-[inset_0_0_20px_rgba(75,131,251,0.1)] text-lg font-bold hover:border-primary/50 transition-all focus:outline-none tracking-widest uppercase relative overflow-hidden group"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <div className="absolute inset-0 w-[50%] h-[150%] bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-[-30deg] pointer-events-none z-20 group-hover:translate-x-[250%] transition-transform duration-1000" />
                Let's Talk
              </motion.a>
              </PremiumDraggable>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
