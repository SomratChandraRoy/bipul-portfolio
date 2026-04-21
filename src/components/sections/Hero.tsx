import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, ArrowRight, Star } from 'lucide-react'
import { tallyFormId } from '../../data/portfolio'
import { PremiumDraggable } from '../ui/PremiumDraggable'
import { scrollAnimations } from '../../hooks/useScrollAnimations'


/* ── Animation Orchestration ─────────────────────────────────────────────── */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const itemUp = scrollAnimations.fadeInUp

const itemScale = scrollAnimations.scaleIn

const itemDown = {
  hidden: { opacity: 0, y: -40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 70, damping: 18, mass: 0.8 },
  },
}

/* ── High-Performance Constellation Canvas ─────────────────────────────── */

function ConstellationNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let mouseX = -1000
    let mouseY = -1000
    
    const particleCount = window.innerWidth < 768 ? 50 : 100
    const connectionDistance = 220

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
      baseAlpha: number

      constructor() {
        if (!canvas) {
          x: 0; y: 0; vx: 0; vy: 0; size: 0; pulsePhase: 0; return
        }
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.35
        this.vy = (Math.random() - 0.5) * 0.35
        this.size = Math.random() > 0.88 ? Math.random() * 4 + 3 : Math.random() * 1.8 + 0.8
        this.pulsePhase = Math.random() * Math.PI * 2
        this.baseAlpha = 0.3 + Math.random() * 0.5
      }

      update() {
        if (!canvas) return
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
        
        this.pulsePhase += 0.012

        // Mouse repulsion — subtle push
        const dx = this.x - mouseX
        const dy = this.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.3
          this.x += (dx / dist) * force
          this.y += (dy / dist) * force
        }
      }

      draw() {
        if (!ctx) return
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5
        const currentSize = this.size + pulse * 1.2

        // Outer glow
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentSize * 3)
        g.addColorStop(0, `rgba(120, 170, 255, ${this.baseAlpha * (0.5 + pulse * 0.5)})`)
        g.addColorStop(0.4, `rgba(75, 131, 251, ${this.baseAlpha * 0.2})`)
        g.addColorStop(1, 'rgba(75, 131, 251, 0)')
        ctx.beginPath()
        ctx.arc(this.x, this.y, currentSize * 3, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 220, 255, ${this.baseAlpha * (0.6 + pulse * 0.4)})`
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      ctx.fillStyle = '#020617' 
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.shadowBlur = 0

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = 0.35 * Math.pow(1 - distance / connectionDistance, 1.8)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(100, 160, 255, ${opacity})`
            ctx.lineWidth = 0.8 + (1 - distance / connectionDistance) * 0.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Mouse connection lines
      if (mouseX > 0 && mouseY > 0) {
        particles.forEach(p => {
          const dx = p.x - mouseX
          const dy = p.y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const opacity = 0.25 * (1 - dist / 180)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(75, 131, 251, ${opacity})`
            ctx.lineWidth = 0.6
            ctx.moveTo(mouseX, mouseY)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
        })
      }

      particles.forEach(p => {
        p.update()
        p.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouse, { passive: true })
    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0"
    />
  )
}

/* ── Hero Section ───────────────────────────────────────────────────────── */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  // Parallax effects for background elements
  const bgY = useTransform(scrollY, [0, 500], [0, 150])
  const ringScale = useTransform(scrollY, [0, 600], [1, 1.15])
  const overlayOpacity = useTransform(scrollY, [0, 400], [1, 0.6])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#020617]" ref={sectionRef}>
      
      {/* Constellation Canvas with Parallax */}
      <motion.div style={{ y: bgY }}>
        <ConstellationNetwork />
      </motion.div>

      {/* Massive Orbital Rings with Parallax Scale */}
      <motion.div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none mix-blend-screen" style={{ opacity: overlayOpacity }}>
        <motion.div 
          className="absolute w-[130vw] h-[130vw] max-w-[1500px] max-h-[1500px] rounded-full border border-[#4b83fb]/8"
          style={{ boxShadow: '0 0 180px rgba(75, 131, 251, 0.08), inset 0 0 180px rgba(75, 131, 251, 0.08)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-[90vw] h-[90vw] max-w-[1100px] max-h-[1100px] rounded-full border border-[#4b83fb]/12 blur-[2px]"
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full border border-[#4b83fb]/15 blur-[1px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Central aurora bloom */}
        <div className="absolute w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(15,40,120,0.4)_0%,rgba(10,25,80,0.2)_30%,transparent_70%)] rounded-full blur-3xl" />
        
        {/* Top-right accent glow */}
        <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(75,131,251,0.06)_0%,transparent_60%)] rounded-full blur-3xl" />
        
        {/* Bottom-left accent glow */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(100,160,255,0.05)_0%,transparent_60%)] rounded-full blur-3xl" />
      </motion.div>

      {/* Side accent lines */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#4b83fb]/10 to-transparent pointer-events-none z-[2] hidden lg:block" style={{ left: '8%' }} />
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#4b83fb]/10 to-transparent pointer-events-none z-[2] hidden lg:block" style={{ right: '8%' }} />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col items-center">
          
          {/* Eyebrow Pill */}
          <PremiumDraggable className="w-auto" intensity="light">
            <motion.div
              variants={itemScale}
              className="mb-10 inline-flex items-center gap-3 rounded-full border border-[#4b83fb]/20 bg-[#061026]/70 backdrop-blur-2xl px-6 py-2.5 shadow-[0_0_40px_rgba(75,131,251,0.12),inset_0_1px_1px_rgba(255,255,255,0.06)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4b83fb] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60a5fa] shadow-[0_0_8px_rgba(96,165,250,0.6)]"></span>
              </span>
              <span className="text-xs sm:text-[13px] font-semibold tracking-widest text-slate-300/90 uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Available for new projects
              </span>
            </motion.div>
          </PremiumDraggable>

          {/* Main Headline */}
          <PremiumDraggable className="w-auto" intensity="heavy">
            <motion.h1 
              variants={itemUp}
              className="text-[34px] sm:text-5xl md:text-[72px] font-extrabold tracking-[-0.03em] text-white mb-2 leading-[1.06]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="inline-block">From Idea to </span>
              <span className="inline-block relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b83fb] via-[#60a5fa] to-[#a8caff]">
                  Earning Machine
                </span>
                {/* Animated underline accent */}
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#4b83fb] via-[#60a5fa] to-transparent"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
              <span className="text-[#4b83fb]">:</span>
              <br className="hidden sm:block" />
              <span className="text-slate-100/90">Web Systems Built for Scale<span className="text-[#4b83fb]">.</span></span>
            </motion.h1>
          </PremiumDraggable>

          {/* Subtitle */}
          <PremiumDraggable className="w-auto" intensity="normal">
            <motion.h2
              variants={itemUp}
              className="mt-7 max-w-3xl text-[15px] sm:text-lg md:text-[19px] leading-[1.8] text-slate-400/90 font-medium tracking-wide mx-auto px-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              I don't just write code. As a full-stack engineer, I build seamless digital ecosystems designed to{' '}
              <span className="text-slate-200 font-semibold relative">
                automate your growth
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-[#4b83fb]/40 to-transparent" />
              </span>,{' '}
              <span className="text-slate-200 font-semibold relative">
                capture leads
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-[#4b83fb]/40 to-transparent" />
              </span>, and{' '}
              <span className="text-slate-200 font-semibold relative">
                multiply your revenue
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-[#4b83fb]/40 to-transparent" />
              </span>.
            </motion.h2>
          </PremiumDraggable>

          {/* CTA Buttons */}
          <PremiumDraggable className="w-auto z-50" intensity="normal">
            <motion.div
              variants={itemUp}
              className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              {/* Primary CTA */}
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-10 py-4.5 rounded-full overflow-hidden text-[14px] sm:text-[15px] font-bold text-white transition-all duration-400 hover:scale-[1.04] active:scale-[0.96] shadow-[0_0_50px_rgba(75,131,251,0.3),0_8px_32px_-8px_rgba(75,131,251,0.4),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-4px_16px_rgba(0,0,0,0.5)] bg-gradient-to-b from-[#3575e8] to-[#152f6b] border border-[#60a5fa]/30"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <div className="absolute inset-0 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/15 to-transparent skew-x-[-25deg] -translate-x-[200%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="relative z-10">View My Proven Systems</span>
                <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-400 group-hover:translate-x-1.5" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                data-tally-open={tallyFormId}
                data-tally-layout="modal"
                data-tally-width="600"
                className="group relative inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl px-10 py-4.5 text-[14px] sm:text-[15px] font-bold text-slate-300 transition-all duration-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06] hover:scale-[1.04] active:scale-[0.96] shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <Star className="h-4 w-4 transition-all duration-400 group-hover:rotate-[20deg] group-hover:text-[#60a5fa]" />
                <span className="relative z-10">Book a Strategy Call</span>
              </a>
            </motion.div>
          </PremiumDraggable>

          {/* Tech badges */}
          <PremiumDraggable className="w-auto" intensity="light">
            <motion.div
              variants={itemUp}
              className="mt-14 flex flex-wrap items-center justify-center gap-3"
            >
              {['React', 'Django', 'TypeScript', 'AWS'].map((badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0.6, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.1, type: 'spring', stiffness: 100, damping: 15 }}
                  className="px-6 py-2.5 rounded-full text-[11px] sm:text-[12px] font-black tracking-[0.2em] text-[#8eb4ff]/90 bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:border-[#4b83fb]/30 hover:bg-[#4b83fb]/[0.06] hover:text-white transition-all duration-500 cursor-default uppercase"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {badge}
                </motion.div>
              ))}
            </motion.div>
          </PremiumDraggable>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[9px] font-black tracking-[0.35em] uppercase text-slate-500/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="h-6 w-px bg-gradient-to-b from-slate-500/40 to-transparent" />
          <ChevronDown className="h-3 w-3 text-slate-500/50 mt-1" />
        </motion.div>
      </motion.div>

      {/* Corner Ornaments */}
      <motion.div 
        className="absolute bottom-16 right-16 text-slate-500/15 z-10 pointer-events-none hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className="w-0.5 h-full bg-gradient-to-b from-transparent via-slate-400/40 to-transparent absolute rounded-full"></div>
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-slate-400/40 to-transparent absolute rounded-full"></div>
        </div>
      </motion.div>

      {/* Top-left floating badge */}
      <motion.div
        className="absolute top-32 left-8 lg:left-16 z-10 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="text-[10px] font-mono tracking-widest text-slate-600 uppercase flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-px bg-slate-600" />
            <span>EST. 2020</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-px bg-slate-600" />
            <span>FULL-STACK</span>
          </div>
        </div>
      </motion.div>

    </section>
  )
}
