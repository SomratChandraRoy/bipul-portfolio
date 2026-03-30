import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   CustomCursor V3 — Cinematic luxury cursor experience
   
   Architecture:
     Canvas Layer: Smooth comet trail + ambient particles
     DOM Layer 1:  Morphing magnetic ring 
     DOM Layer 2:  Ambient orb glow
     DOM Layer 3:  Premium SVG arrow with velocity stretch
     DOM Layer 4:  Click shockwave system
   ───────────────────────────────────────────────────────────── */

interface TrailPoint {
  x: number
  y: number
  time: number
}

interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  size: number; hue: number; sat: number
}

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Main arrow — ultra-responsive
  const springX = useSpring(cursorX, { stiffness: 1200, damping: 55, mass: 0.08 })
  const springY = useSpring(cursorY, { stiffness: 1200, damping: 55, mass: 0.08 })

  // Glow orb — dreamy lag
  const glowX = useSpring(cursorX, { stiffness: 200, damping: 28, mass: 0.6 })
  const glowY = useSpring(cursorY, { stiffness: 200, damping: 28, mass: 0.6 })

  // Ring — deep trailing
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 20, mass: 1.0 })
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 20, mass: 1.0 })

  // Velocity & direction
  const velocityMV = useMotionValue(0)
  const smoothVel = useSpring(velocityMV, { stiffness: 80, damping: 18 })
  const dirX = useMotionValue(0)
  const dirY = useMotionValue(0)
  const smoothDirX = useSpring(dirX, { stiffness: 200, damping: 20 })
  const smoothDirY = useSpring(dirY, { stiffness: 200, damping: 20 })

  // Dynamic transforms
  const ringScale = useTransform(smoothVel, [0, 600], [1, 2.5])
  const ringOpacity = useTransform(smoothVel, [0, 200, 600], [0.15, 0.35, 0.55])
  const glowOpacity = useTransform(smoothVel, [0, 400], [0.25, 0.85])
  // Arrow stretches in movement direction
  const stretchX = useTransform(smoothVel, [0, 500], [1, 1.12])
  const skewAngle = useTransform(smoothDirX, [-15, 15], [4, -4])

  const [isPointer, setIsPointer] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const lastPos = useRef({ x: -100, y: -100 })
  const lastTime = useRef(Date.now())
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trail = useRef<TrailPoint[]>([])
  const particles = useRef<Particle[]>([])
  const animFrame = useRef(0)
  const breathPhase = useRef(0)

  // ── Canvas render loop: comet trail + particles ──
  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) { animFrame.current = requestAnimationFrame(render); return }
    const ctx = canvas.getContext('2d')
    if (!ctx) { animFrame.current = requestAnimationFrame(render); return }

    const W = window.innerWidth
    const H = window.innerHeight
    if (canvas.width !== W * devicePixelRatio || canvas.height !== H * devicePixelRatio) {
      canvas.width = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    ctx.clearRect(0, 0, W, H)
    const now = Date.now()

    // ── Draw comet trail ──
    trail.current = trail.current.filter(p => now - p.time < 400)
    if (trail.current.length > 2) {
      for (let i = 1; i < trail.current.length; i++) {
        const p = trail.current[i]
        const prev = trail.current[i - 1]
        const age = (now - p.time) / 400 // 0 → 1
        const alpha = (1 - age) * 0.35
        const width = (1 - age) * 6

        if (alpha <= 0 || width <= 0.2) continue

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.strokeStyle = `hsla(218, 80%, 65%, 1)`
        ctx.lineWidth = width
        ctx.lineCap = 'round'
        ctx.shadowColor = 'rgba(75, 131, 251, 0.5)'
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
        ctx.restore()
      }
    }

    // ── Draw ambient particles ──
    breathPhase.current += 0.02
    particles.current = particles.current.filter(p => {
      p.life -= 1
      p.x += p.vx
      p.y += p.vy
      p.vx *= 0.965
      p.vy *= 0.965

      const progress = p.life / p.maxLife
      const alpha = progress * progress * 0.6 // quadratic fade
      const size = p.size * (0.3 + progress * 0.7)

      if (alpha <= 0.01) return false

      ctx.save()
      ctx.globalAlpha = alpha
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 1.5)
      g.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, 72%, 1)`)
      g.addColorStop(0.5, `hsla(${p.hue}, ${p.sat}%, 58%, 0.5)`)
      g.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, 45%, 0)`)
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(p.x, p.y, size * 1.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      return true
    })

    // ── Idle ambient floating dots near cursor ──
    if (Math.random() < 0.15 && trail.current.length > 0) {
      const last = trail.current[trail.current.length - 1]
      const angle = Math.random() * Math.PI * 2
      const dist = 15 + Math.random() * 25
      particles.current.push({
        x: last.x + Math.cos(angle) * dist,
        y: last.y + Math.sin(angle) * dist,
        vx: Math.cos(angle) * 0.2,
        vy: Math.sin(angle) * 0.2 - 0.3,
        life: 50 + Math.random() * 40,
        maxLife: 90,
        size: 0.8 + Math.random() * 1.2,
        hue: 215 + Math.random() * 20,
        sat: 60 + Math.random() * 25,
      })
    }

    animFrame.current = requestAnimationFrame(render)
  }, [])

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) { setIsTouch(true); return }

    animFrame.current = requestAnimationFrame(render)

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const dt = Math.max(now - lastTime.current, 1)
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const speed = Math.sqrt(dx * dx + dy * dy) / dt * 16

      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      velocityMV.set(speed * 50)
      dirX.set(dx * 0.6)
      dirY.set(dy * 0.6)

      // Add trail point
      trail.current.push({ x: e.clientX, y: e.clientY, time: now })

      // Speed-based particle spawning
      if (speed > 1.5) {
        const count = Math.min(Math.floor(speed / 4) + 1, 3)
        for (let i = 0; i < count; i++) {
          particles.current.push({
            x: e.clientX + (Math.random() - 0.5) * 10,
            y: e.clientY + (Math.random() - 0.5) * 10,
            vx: -dx * 0.04 + (Math.random() - 0.5) * 2,
            vy: -dy * 0.04 + (Math.random() - 0.5) * 2 - 0.5,
            life: 35 + Math.random() * 30,
            maxLife: 65,
            size: 1.2 + Math.random() * 2,
            hue: 210 + Math.random() * 30,
            sat: 65 + Math.random() * 20,
          })
        }
      }

      lastPos.current = { x: e.clientX, y: e.clientY }
      lastTime.current = now
      if (!isVisible) setIsVisible(true)

      // Interactive detection
      const target = e.target as HTMLElement
      const cs = window.getComputedStyle(target)
      setIsPointer(
        cs.cursor === 'pointer' || cs.cursor === 'grab' || cs.cursor === 'grabbing' ||
        target.tagName === 'A' || target.tagName === 'BUTTON' ||
        !!target.closest('a,button,[role="button"]')
      )
    }

    const handleMouseDown = () => {
      setIsPressed(true)
      // Click burst
      const cx = lastPos.current.x, cy = lastPos.current.y
      for (let i = 0; i < 16; i++) {
        const angle = (Math.PI * 2 * i) / 16
        const spd = 2 + Math.random() * 4
        particles.current.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          life: 40 + Math.random() * 25,
          maxLife: 65,
          size: 1.5 + Math.random() * 2.5,
          hue: 210 + Math.random() * 35,
          sat: 70 + Math.random() * 20,
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
  }, [cursorX, cursorY, velocityMV, dirX, dirY, isVisible, render])

  if (isTouch) return null

  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

      {/* Canvas: comet trail + particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9995]"
      />

      {/* Ring — morphs on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
          scale: ringScale, opacity: ringOpacity,
        }}
      >
        <motion.div
          animate={{
            width: isPointer ? 60 : 36,
            height: isPointer ? 60 : 36,
            borderRadius: '50%',
            borderWidth: isPointer ? 2 : 1,
            borderColor: isPointer ? 'rgba(75,131,251,0.5)' : 'rgba(75,131,251,0.18)',
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          className="rounded-full border border-solid"
          style={{
            background: isPointer
              ? 'radial-gradient(circle, rgba(75,131,251,0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(75,131,251,0.04) 0%, transparent 70%)',
            backdropFilter: 'blur(0.5px)',
          }}
        />
      </motion.div>

      {/* Glow orb */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: glowX, y: glowY,
          translateX: '-50%', translateY: '-50%',
          opacity: glowOpacity,
        }}
      >
        <motion.div
          animate={{
            scale: isPressed ? 0.5 : isPointer ? 1.6 : 1,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          className="w-7 h-7 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(75,131,251,0.45) 0%, rgba(96,165,250,0.15) 45%, transparent 70%)',
            filter: 'blur(5px)',
          }}
        />
      </motion.div>

      {/* Main arrow — premium SVG with velocity stretch */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX, y: springY,
          scaleX: stretchX,
          skewY: skewAngle,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isPressed ? 0.76 : isPointer ? 0.88 : 1,
        }}
        transition={{
          type: 'spring', stiffness: 700, damping: 35, mass: 0.12,
          opacity: { duration: 0.1 },
        }}
      >
        <svg
          width="30" height="36" viewBox="0 0 30 36"
          fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: isPointer
              ? 'drop-shadow(0 0 16px rgba(75,131,251,0.85)) drop-shadow(0 0 6px rgba(96,165,250,0.6)) drop-shadow(0 4px 14px rgba(0,0,0,0.5))'
              : 'drop-shadow(0 3px 8px rgba(0,0,0,0.7)) drop-shadow(0 0 12px rgba(75,131,251,0.3))',
            transition: 'filter 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Shadow */}
          <path d="M3 2L3 26L9.5 20.5L14.5 32L18.5 30L13.5 18L22 18L3 2Z"
            fill="rgba(0,0,0,0.25)" transform="translate(0.6, 1.2)" />

          {/* Body */}
          <path d="M3 2L3 26L9.5 20.5L14.5 32L18.5 30L13.5 18L22 18L3 2Z"
            fill="url(#b3)" stroke="url(#e3)" strokeWidth="1.3" strokeLinejoin="round" />

          {/* Blue core */}
          <path d="M5 5L5 23.5L10.2 18.8L14.8 29.5L17 28.5L12.4 17.8L19.5 17.8L5 5Z"
            fill="url(#c3)" opacity="0.8" />

          {/* Chrome edge */}
          <path d="M3.7 3L3.7 13L6.5 10.5L3.7 3Z" fill="url(#h3)" opacity="0.65" />

          {/* Animated sparkle at tip */}
          <circle cx="3.2" cy="2.2" r="1.8" fill="white" opacity="0.3">
            <animate attributeName="opacity" values="0.15;0.45;0.15" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="r" values="1.5;2.2;1.5" dur="2.5s" repeatCount="indefinite" />
          </circle>

          {/* Energy line on tail */}
          <path d="M9.8 21L14 31" stroke="rgba(75,131,251,0.35)" strokeWidth="0.7" strokeLinecap="round">
            <animate attributeName="stroke-opacity" values="0.2;0.5;0.2" dur="1.8s" repeatCount="indefinite" />
          </path>

          {/* Secondary inner sparkle */}
          <circle cx="5.5" cy="10" r="1" fill="rgba(150,190,255,0.3)">
            <animate attributeName="opacity" values="0;0.4;0" dur="3s" repeatCount="indefinite" />
          </circle>

          <defs>
            <linearGradient id="b3" x1="3" y1="2" x2="20" y2="31" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1a2a48" />
              <stop offset="30%" stopColor="#0e1828" />
              <stop offset="65%" stopColor="#071020" />
              <stop offset="100%" stopColor="#0c1830" />
            </linearGradient>
            <linearGradient id="e3" x1="3" y1="2" x2="18" y2="31" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#b8d4ff" />
              <stop offset="25%" stopColor="#4b83fb" />
              <stop offset="55%" stopColor="#2554b8" />
              <stop offset="80%" stopColor="#4b83fb" />
              <stop offset="100%" stopColor="#b8d4ff" />
            </linearGradient>
            <linearGradient id="c3" x1="5" y1="5" x2="16" y2="27" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4b83fb" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#3568cc" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#1c3d88" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2a5cc2" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="h3" x1="4" y1="3" x2="6" y2="13" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#a8caff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4b83fb" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Click shockwave */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isPressed ? [0.3, 3.5] : [0, 0],
          opacity: isPressed ? [0.65, 0] : [0, 0],
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-10 h-10 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(75,131,251,0.25) 0%, transparent 60%)',
            border: '1.5px solid rgba(75,131,251,0.35)',
          }}
        />
      </motion.div>

      {/* Second shockwave ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isPressed ? [0.5, 5] : [0, 0],
          opacity: isPressed ? [0.35, 0] : [0, 0],
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
      >
        <div className="w-6 h-6 rounded-full border border-[#4b83fb]/15" />
      </motion.div>
    </>
  )
}
