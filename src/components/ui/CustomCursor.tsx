import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   CustomCursor V2 — Cinematic premium cursor system
   
   Multi-layer architecture:
     Layer 0: Particle trail spawner (canvas-based for perf)
     Layer 1: Outer magnetic ring with velocity-reactive size
     Layer 2: Inner glow orb with speed-based intensity
     Layer 3: Main pointer SVG with tilt + metallic shading
     Layer 4: Click shockwave
   ───────────────────────────────────────────────────────────── */

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
}

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Main cursor — snappy spring
  const springConfig = { stiffness: 900, damping: 50, mass: 0.12 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  // Glow layer — medium lag
  const glowX = useSpring(cursorX, { stiffness: 280, damping: 32, mass: 0.5 })
  const glowY = useSpring(cursorY, { stiffness: 280, damping: 32, mass: 0.5 })

  // Ring layer — heaviest lag for depth
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 22, mass: 0.8 })
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 22, mass: 0.8 })

  // Velocity tracking
  const velocity = useMotionValue(0)
  const smoothVelocity = useSpring(velocity, { stiffness: 100, damping: 20 })
  
  // Ring size reacts to speed
  const ringScale = useTransform(smoothVelocity, [0, 800], [1, 2.2])
  const ringOpacity = useTransform(smoothVelocity, [0, 300], [0.2, 0.6])
  const glowIntensity = useTransform(smoothVelocity, [0, 600], [0.3, 0.9])
  
  // Tilt based on movement direction
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const smoothTiltX = useSpring(tiltX, { stiffness: 300, damping: 25 })
  const smoothTiltY = useSpring(tiltY, { stiffness: 300, damping: 25 })

  const [isPointer, setIsPointer] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const lastPos = useRef({ x: -100, y: -100 })
  const lastTime = useRef(Date.now())
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animFrame = useRef(0)
  const spawnCounter = useRef(0)

  // ── Particle system (canvas-based for 60fps) ──
  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Resize canvas to window
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update & draw particles
    particles.current = particles.current.filter(p => {
      p.life -= 1
      p.x += p.vx
      p.y += p.vy
      p.vx *= 0.96
      p.vy *= 0.96

      const progress = p.life / p.maxLife
      const alpha = progress * 0.5
      const size = p.size * progress

      if (alpha <= 0 || size <= 0.1) return false

      // Glowing particle
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
      
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size)
      gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, 1)`)
      gradient.addColorStop(0.4, `hsla(${p.hue}, 70%, 55%, 0.6)`)
      gradient.addColorStop(1, `hsla(${p.hue}, 60%, 40%, 0)`)
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.restore()

      return p.life > 0
    })

    animFrame.current = requestAnimationFrame(updateParticles)
  }, [])

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) {
      setIsTouch(true)
      return
    }

    // Start particle render loop
    animFrame.current = requestAnimationFrame(updateParticles)

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const dt = Math.max(now - lastTime.current, 1)
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const speed = Math.sqrt(dx * dx + dy * dy) / dt * 16 // normalize to ~60fps

      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      velocity.set(speed * 60)

      // Tilt in movement direction
      if (speed > 0.5) {
        tiltX.set(dx * 0.8)
        tiltY.set(dy * 0.8)
      }

      // Spawn trail particles based on speed
      spawnCounter.current += speed
      if (spawnCounter.current > 2) {
        spawnCounter.current = 0
        const count = Math.min(Math.floor(speed / 3) + 1, 4)
        for (let i = 0; i < count; i++) {
          particles.current.push({
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            vx: -dx * 0.03 + (Math.random() - 0.5) * 1.5,
            vy: -dy * 0.03 + (Math.random() - 0.5) * 1.5,
            life: 30 + Math.random() * 25,
            maxLife: 55,
            size: 1.5 + Math.random() * 2.5,
            hue: 215 + Math.random() * 25, // blue range
          })
        }
      }

      lastPos.current = { x: e.clientX, y: e.clientY }
      lastTime.current = now

      if (!isVisible) setIsVisible(true)

      // Detect interactive elements
      const target = e.target as HTMLElement
      const computed = window.getComputedStyle(target)
      const isInteractive =
        computed.cursor === 'pointer' ||
        computed.cursor === 'grab' ||
        computed.cursor === 'grabbing' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[role="button"]') !== null

      setIsPointer(isInteractive)
    }

    const handleMouseDown = () => {
      setIsPressed(true)
      // Burst particles on click
      const cx = lastPos.current.x
      const cy = lastPos.current.y
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12
        particles.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * (2 + Math.random() * 3),
          vy: Math.sin(angle) * (2 + Math.random() * 3),
          life: 35 + Math.random() * 20,
          maxLife: 55,
          size: 2 + Math.random() * 2,
          hue: 215 + Math.random() * 30,
        })
      }
    }
    const handleMouseUp = () => setIsPressed(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      cancelAnimationFrame(animFrame.current)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, velocity, tiltX, tiltY, isVisible, updateParticles])

  if (isTouch) return null

  return (
    <>
      {/* ─── Hide OS cursor ─── */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>

      {/* ─── Canvas for particle trails ─── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9995]"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* ─── Layer 1: Outer velocity ring ─── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScale,
          opacity: ringOpacity,
        }}
      >
        <motion.div
          animate={{
            width: isPointer ? 56 : 40,
            height: isPointer ? 56 : 40,
            borderColor: isPointer ? 'rgba(75,131,251,0.5)' : 'rgba(75,131,251,0.2)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="rounded-full border"
          style={{
            background: 'radial-gradient(circle, rgba(75,131,251,0.06) 0%, transparent 70%)',
            backdropFilter: 'blur(1px)',
          }}
        />
      </motion.div>

      {/* ─── Layer 2: Inner glow orb ─── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: glowIntensity,
        }}
      >
        <motion.div
          animate={{
            scale: isPressed ? 0.6 : isPointer ? 1.4 : 1,
            width: 24,
            height: 24,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          style={{
            background: 'radial-gradient(circle, rgba(75,131,251,0.5) 0%, rgba(96,165,250,0.2) 40%, transparent 70%)',
            filter: 'blur(6px)',
          }}
          className="rounded-full"
        />
      </motion.div>

      {/* ─── Layer 3: Main premium arrow cursor ─── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          rotateX: smoothTiltY,
          rotateY: smoothTiltX,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isPressed ? 0.78 : isPointer ? 0.85 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 30,
          mass: 0.15,
          opacity: { duration: 0.12 },
        }}
      >
        <svg
          width="32"
          height="38"
          viewBox="0 0 32 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: isPointer
              ? 'drop-shadow(0 0 14px rgba(75,131,251,0.8)) drop-shadow(0 0 6px rgba(96,165,250,0.6)) drop-shadow(0 4px 12px rgba(0,0,0,0.4))'
              : 'drop-shadow(0 2px 8px rgba(0,0,0,0.7)) drop-shadow(0 0 10px rgba(75,131,251,0.25))',
            transition: 'filter 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Base shadow layer */}
          <path
            d="M3 2L3 27L9.8 21L15 33L19.5 31L14.3 19L23 19L3 2Z"
            fill="rgba(0,0,0,0.3)"
            transform="translate(0.5, 1)"
          />

          {/* Main body — deep metallic dark */}
          <path
            d="M3 2L3 27L9.8 21L15 33L19.5 31L14.3 19L23 19L3 2Z"
            fill="url(#bodyGrad)"
            stroke="url(#edgeGrad)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Inner energy channel — blue core */}
          <path
            d="M5 5.5L5 24L10.5 19.2L15.2 30L17.8 29L13 18.2L20 18.2L5 5.5Z"
            fill="url(#coreGrad)"
            opacity="0.85"
          />

          {/* Left edge chrome highlight */}
          <path
            d="M3.8 3L3.8 14L7 11L3.8 3Z"
            fill="url(#chromeHighlight)"
            opacity="0.7"
          />

          {/* Tip sparkle */}
          <circle cx="3.5" cy="2.5" r="1.5" fill="white" opacity="0.4">
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Bottom accent line */}
          <path
            d="M10 21.5L14.5 31.5"
            stroke="rgba(75,131,251,0.4)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          <defs>
            {/* Body: dark slate metallic */}
            <linearGradient id="bodyGrad" x1="3" y1="2" x2="22" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e2d4a" />
              <stop offset="25%" stopColor="#0f1a2e" />
              <stop offset="60%" stopColor="#081222" />
              <stop offset="100%" stopColor="#0a1628" />
            </linearGradient>

            {/* Edge: blue-silver chrome */}
            <linearGradient id="edgeGrad" x1="3" y1="2" x2="19" y2="33" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a8caff" />
              <stop offset="20%" stopColor="#4b83fb" />
              <stop offset="50%" stopColor="#2a5cc2" />
              <stop offset="80%" stopColor="#4b83fb" />
              <stop offset="100%" stopColor="#a8caff" />
            </linearGradient>

            {/* Inner core: blue energy */}
            <linearGradient id="coreGrad" x1="5" y1="5" x2="17" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4b83fb" stopOpacity="0.6" />
              <stop offset="30%" stopColor="#3668d4" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#1e3f8a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2a5cc2" stopOpacity="0.5" />
            </linearGradient>

            {/* Chrome highlight: white-to-blue */}
            <linearGradient id="chromeHighlight" x1="4" y1="3" x2="6" y2="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#a8caff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4b83fb" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ─── Layer 4: Click shockwave ─── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPressed ? [0.3, 3] : [0, 0],
          opacity: isPressed ? [0.7, 0] : [0, 0],
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-12 h-12 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(75,131,251,0.3) 0%, transparent 60%)',
            border: '1px solid rgba(75,131,251,0.3)',
          }}
        />
      </motion.div>

      {/* ─── Layer 5: Secondary click ring ─── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPressed ? [0.5, 4] : [0, 0],
          opacity: isPressed ? [0.4, 0] : [0, 0],
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        <div className="w-8 h-8 rounded-full border border-[#4b83fb]/20" />
      </motion.div>
    </>
  )
}
