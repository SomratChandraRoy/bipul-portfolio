import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Menu, X, Layers } from 'lucide-react'

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

// 3D Tilt Hook
function use3DTilt() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 })
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

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
  
  // Outer Container Tilt
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave, x, y } = use3DTilt()
  
  // Calculate dynamic glow position based on mouse pct
  const backgroundGlow = useTransform(
    [x, y],
    ([latestX, latestY]) => `radial-gradient(circle at ${(latestX as number + 0.5) * 100}% ${(latestY as number + 0.5) * 100}%, rgba(255, 255, 255, 0.08), transparent 40%)`
  )

  // Native anchor CSS smooth scroll performs better when elements do not unmount mid-click.
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

      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'pt-4' : 'pt-6 md:pt-8'}`} style={{ perspective: 1200 }}>
        <motion.nav 
          layout
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            rotateX, rotateY,
            transformStyle: "preserve-3d" // Enables 3D stacking inside
          }}
          className={`relative flex items-center justify-between transition-colors duration-700 ${isScrolled ? 'w-[calc(100%-2rem)] md:w-auto px-4 py-2 bg-background/80 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]' : 'w-[calc(100%-2rem)] max-w-5xl px-4 md:px-6 py-2 md:py-3 bg-secondary/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)]'}`}
        >
          {/* Dynamic Glow Overlay for 3D tension */}
          <motion.div 
            className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden mix-blend-screen"
            style={{ background: backgroundGlow }}
          />

          {/* Left: Logo & Status */}
          <motion.div layout className="flex items-center gap-3 relative z-10" style={{ transform: "translateZ(30px)" }}>
            <a href="#hero" className="flex items-center gap-2 group cursor-pointer focus:outline-none">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden shadow-inner flex-shrink-0">
                {/* 3D Spin core */}
                <motion.div 
                   animate={{ rotate: [0, 360] }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="w-[60%] h-[60%] border border-primary/40 rounded-full flex items-center justify-center relative shadow-[inset_0_0_10px_rgba(114,255,0,0.2)]"
                >
                    <motion.div 
                        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-[70%] h-[70%] border-[1.5px] border-primary rounded-full absolute"
                    />
                    <motion.div 
                        animate={{ rotateX: [360, 0], rotateZ: [0, 360] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="w-[80%] h-[80%] border border-white/40 rounded-full absolute"
                    />
                </motion.div>
                {/* Glow behind icon */}
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors drop-shadow-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Bipul<span className="text-primary group-hover:text-white transition-colors">.</span>
                </div>
                <motion.div 
                  initial={false}
                  animate={{ 
                    opacity: isScrolled ? 0 : 1, 
                    height: isScrolled ? 0 : 'auto',
                    overflow: 'hidden'
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden md:flex items-center gap-1.5 whitespace-nowrap mt-0.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
                  <span className="text-[11px] text-white/50 font-medium">Available for new projects</span>
                </motion.div>
              </div>
            </a>
          </motion.div>

          {/* Center: Links (Desktop) */}
          <motion.div 
            initial={false}
            animate={{ 
              opacity: isScrolled ? 0 : 1, 
              width: isScrolled ? 0 : 'auto',
              paddingLeft: isScrolled ? 0 : '1.5rem',
              paddingRight: isScrolled ? 0 : '1.5rem',
              marginLeft: isScrolled ? 0 : '1.5rem',
              marginRight: isScrolled ? 0 : '1.5rem',
              scale: isScrolled ? 0.95 : 1
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center bg-black/20 border border-white/5 rounded-full py-2.5 shadow-inner backdrop-blur-sm overflow-hidden whitespace-nowrap"
            style={{ transform: "translateZ(40px)" }}
          >
            {navLinks.map((link, i) => (
              <motion.div 
                key={link.section} 
                className="flex items-center relative group/link"
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', link.href);
                  }}
                  className="relative flex items-center justify-center text-[14px] font-medium tracking-wide px-4 py-2 rounded-full transition-all duration-300 w-full h-full"
                >
                      {/* Premium Hover Glow Backdrop */}
                      <span className="absolute inset-0 bg-white/5 rounded-full blur-md opacity-0 group-hover/link:opacity-100 transition-all duration-500 pointer-events-none" />
                      <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/link:opacity-100 rounded-full transition-all duration-400 border border-white/0 group-hover/link:border-white/10 pointer-events-none" />
                      
                      <span className={`relative z-10 ${activeSection === link.section ? 'text-primary drop-shadow-[0_0_8px_rgba(114,255,0,0.5)]' : 'text-white/60 group-hover/link:text-white group-hover/link:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300'}`}>
                        {link.label}
                      </span>
                    </a>
                    {i < navLinks.length - 1 && (
                      <span className="mx-1.5 text-white/10 text-xs shrink-0 font-light">|</span>
                    )}
                  </motion.div>
                ))}
          </motion.div>

          {/* Right: Actions */}
          <motion.div layout className="flex items-center gap-2 md:gap-3 relative z-10 shrink-0" style={{ transform: "translateZ(30px)" }}>

            <AnimatePresence mode="popLayout">
              {!isScrolled ? (
                <motion.a
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hidden md:flex items-center justify-center h-10 md:h-11 px-6 md:px-8 rounded-full bg-[#1a1c18]/80 text-[#fde047] border border-[#fde047]/40 text-sm font-semibold hover:border-[#fde047]/80 hover:shadow-[0_0_25px_rgba(253,224,71,0.25)] transition-all duration-500 overflow-hidden relative group focus:outline-none shadow-[inset_0_0_15px_rgba(253,224,71,0.1)] backdrop-blur-md shrink-0"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {/* Subtle noise/texture overlay for premium button feel */}
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')" }}></div>
                  
                  {/* Dynamic Hover Light Effect */}
                  <motion.div 
                    initial={{ x: '-150%' }}
                    whileHover={{ x: '150%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 w-[50%] h-full bg-gradient-to-r from-transparent via-[#fde047]/30 to-transparent skew-x-[-20deg] pointer-events-none opacity-0 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#fde047]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  
                  <span className="whitespace-nowrap relative z-10 tracking-wide drop-shadow-[0_0_4px_rgba(253,224,71,0.2)] group-hover:text-[#fef08a] group-hover:drop-shadow-[0_0_8px_rgba(253,224,71,0.5)] transition-all duration-300">Let's Talk</span>
                </motion.a>
              ) : (
                <motion.div layout className="relative" 
                     onMouseEnter={() => setCompactMenuOpen(true)}
                     onMouseLeave={() => setCompactMenuOpen(false)}>
                  <motion.button
                    layout
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-primary hover:border-primary hover:text-primary-foreground hover:shadow-[0_0_15px_rgba(114,255,0,0.3)] transition-all focus:outline-none"
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
                               e.preventDefault();
                               setCompactMenuOpen(false); 
                               document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
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
            
            <motion.a layout href="#contact" onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }} className="md:hidden flex items-center justify-center h-8 px-5 rounded-full bg-[#c8ff00] text-black text-[11px] font-bold shadow-[0_0_20px_rgba(200,255,0,0.3)] hover:shadow-[0_0_25px_rgba(200,255,0,0.5)] active:scale-95 transition-all focus:outline-none tracking-wider shrink-0 relative overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                LET'S TALK
            </motion.a>

            <motion.div layout className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-white/10 overflow-hidden ml-1 sm:ml-2 flex-shrink-0 shadow-[0_0_15px_rgba(200,255,0,0.15)] group cursor-pointer relative">
              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Bipul&backgroundColor=c8ff00`} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-full pointer-events-none" />
            </motion.div>

            <motion.button
              layout
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none border border-transparent hover:border-white/10"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </motion.div>
        </motion.nav>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[45] bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.section}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  setTimeout(() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }), 300);
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: i * 0.05 + 0.1, type: "spring", stiffness: 300, damping: 25 }}
                className={`text-4xl font-bold tracking-tighter transition-all ${
                  activeSection === link.section ? 'text-primary drop-shadow-[0_0_20px_rgba(114,255,0,0.6)]' : 'text-white/60 hover:text-white'
                }`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {link.label}
              </motion.a>
            ))}
            
             <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.4 }}
                className="mt-8 px-8 py-3 rounded-full bg-primary/10 border border-primary text-primary text-lg font-semibold hover:bg-primary hover:text-primary-foreground focus:outline-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Let's Talk
              </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
