import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, MessageCircle, Star } from 'lucide-react'
import { tallyFormId } from '../../data/portfolio'

/* ── Animation Orchestration ─────────────────────────────────────────────── */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 20 },
  },
}

/* ── High-Performance Networking WebGL/Canvas Engine ─────────────────────── */

function ConstellationNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    
    // High density for deep space look
    const particleCount = window.innerWidth < 768 ? 40 : 80
    const connectionDistance = 250

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      pulsePhase: number

      constructor() {
        if (!canvas) {
          x: 0
          y: 0
          vx: 0
          vy: 0
          size: 0
          pulsePhase: 0
          return
        }
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        // Nodes vary in size, create "hubs" mimicking the heavy 3D joints in the picture
        this.size = Math.random() > 0.85 ? Math.random() * 4 + 3 : Math.random() * 2 + 1
        this.pulsePhase = Math.random() * Math.PI * 2
      }

      update() {
        if (!canvas) return
        this.x += this.vx
        this.y += this.vy

        // Smooth physical bounce 
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
        
        this.pulsePhase += 0.015
      }

      draw() {
        if (!ctx) return
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5 // Range 0 to 1
        const currentSize = this.size + pulse * 1.5

        ctx.beginPath()
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 210, 255, ${0.4 + pulse * 0.6})`
        ctx.fill()

        // Core glow layer
        ctx.shadowBlur = this.size * 5
        ctx.shadowColor = 'rgba(75, 131, 251, 1)'
      }
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      // Deep space black/blue background initialization frame
      ctx.fillStyle = '#020617' 
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Zero-out shadow to prevent lag on line drawing
      ctx.shadowBlur = 0

      // Connect physical data-lines dynamically by distance constraints
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            // Intensity perfectly aligns proximity weight mapping
            const opacity = 0.5 * Math.pow(1 - distance / connectionDistance, 1.5)
            ctx.strokeStyle = `rgba(120, 180, 255, ${opacity})`
            ctx.lineWidth = 1 + (1 - distance / connectionDistance)
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes on top of lines
      particles.forEach(p => {
        p.update()
        p.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  )
}

/* ── Hero Design Components Layout ───────────────────────────────────────── */

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#020617]">
      
      {/* Dynamic Native 2D Physics Array */}
      <ConstellationNetwork />

      {/* Massive Optical Flare Orbital Rings */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none mix-blend-screen">
        <motion.div 
          className="absolute w-[120vw] h-[120vw] max-w-[1400px] max-h-[1400px] rounded-full border-[2px] border-[#4b83fb]/10 opacity-70"
          style={{ boxShadow: '0 0 150px rgba(75, 131, 251, 0.15), inset 0 0 150px rgba(75, 131, 251, 0.15)' }}
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full border-[1px] border-[#4b83fb]/20 blur-[3px] opacity-40"
          animate={{ rotate: -360, scale: [1, 0.95, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        {/* Core Screen-Center Aurora Bloom */}
        <div className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(15,40,110,0.5)_0%,transparent_70%)] rounded-full blur-3xl opacity-80" />
      </div>

      {/* Hero Typography & Button Layout (Z-10 over Canvas) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col items-center">
          
          {/* Eyebrow Pill */}
          <motion.div
            variants={itemUp}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#4b83fb]/20 bg-[#061026]/80 backdrop-blur-xl px-5 py-2 shadow-[0_0_30px_rgba(75,131,251,0.15),inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4b83fb] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60a5fa]"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-300">
              Available for new projects
            </span>
          </motion.div>

          {/* Majestic Typography Header */}
          <motion.h1 
            variants={itemUp}
            className="text-[40px] sm:text-6xl md:text-[80px] font-bold tracking-tight text-white mb-2 leading-[1.05]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Building scalable <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b83fb] to-[#9cbfff] drop-shadow-[0_0_40px_rgba(75,131,251,0.4)]">
              digital products
            </span>
            <br className="hidden sm:block" />
            <span className="text-slate-200">with clean architecture<span className="text-[#4b83fb]">.</span></span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            variants={itemUp}
            className="mt-6 max-w-3xl text-sm sm:text-lg md:text-[19px] leading-relaxed text-slate-400 font-medium tracking-wide mx-auto px-4"
          >
            Senior full-stack developer in Dinajpur, Bangladesh, specializing in React, Django, and cloud-native infrastructure. I build affordable websites and high performance products for growing businesses.
          </motion.p>

          {/* CTA Primary Action Row */}
          <motion.div
            variants={itemUp}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            {/* View My Work - Immersive Crystalline Pill */}
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full overflow-hidden text-sm sm:text-[15px] font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_40px_rgba(75,131,251,0.35),inset_0_1px_2px_rgba(255,255,255,0.5),inset_0_-4px_12px_rgba(0,0,0,0.6)] bg-gradient-to-b from-[#2a68df] to-[#102a63] border border-[#60a5fa]/40"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {/* Dynamic Sweeping Internal Glass Edge Sheen */}
              <div className="absolute inset-0 w-[150%] h-[150%] bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out pointer-events-none" />
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Get In Touch - Optical Subsurface Glass Button */}
            <a
              href="#contact"
              data-tally-open={tallyFormId}
              data-tally-layout="modal"
              data-tally-width="600"
              className="group relative inline-flex items-center gap-2 rounded-full border border-slate-600/60 bg-[#061026]/40 backdrop-blur-2xl px-9 py-4 text-sm sm:text-[15px] font-bold text-slate-300 transition-all duration-300 hover:text-white hover:border-slate-400/80 hover:bg-[#0f1b38]/60 hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Technology Hierarchy Layer Pills */}
          <motion.div
            variants={itemUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {['React', 'Django', 'TypeScript', 'AWS'].map((badge) => (
              <div
                key={badge}
                className="px-6 py-2 rounded-full text-[11px] sm:text-[12px] font-black tracking-widest text-[#8eb4ff] bg-[#061026]/80 border border-[#4b83fb]/30 backdrop-blur-xl shadow-[0_4px_15px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.15)] hover:border-[#60a5fa] hover:bg-[#1a3875]/60 hover:text-white transition-all duration-300 cursor-default uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {badge}
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Centered Scroll Indicator Anchor */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[9px] font-black tracking-[0.3em] uppercase text-slate-500/80 drop-shadow-md">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-5 w-px bg-gradient-to-b from-slate-500/60 to-transparent mx-auto" />
          <ChevronDown className="h-3.5 w-3.5 text-slate-500/80 mt-1" />
        </motion.div>
      </motion.div>

      {/* Asthetic Corner Adornments (From Reference Image) */}
      
      {/* 4-Point Star Asset Graphic */}
      <motion.div 
        className="absolute bottom-12 right-12 lg:bottom-16 lg:right-16 text-slate-500/20 opacity-40 z-10 pointer-events-none hidden md:block"
        animate={{ rotate: 90 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
             <div className="w-1 h-full bg-slate-400 absolute rounded-full blur-[1px]"></div>
             <div className="w-full h-1 bg-slate-400 absolute rounded-full blur-[1px]"></div>
        </div>
      </motion.div>

      {/* Deep Blue Circular Icon Bubble (Bottom Right Offset) */}
      <motion.button 
        className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-12 h-12 rounded-full bg-gradient-to-tr from-[#1a44a3] to-[#4b83fb] flex items-center justify-center text-white shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.4)] hover:scale-110 active:scale-95 transition-all outline-none border border-[#8eb4ff]/50 z-50 group hover:shadow-[0_0_30px_rgba(75,131,251,0.6)]"
      >
        <MessageCircle className="w-5 h-5 fill-current opacity-90 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </section>
  )
}
