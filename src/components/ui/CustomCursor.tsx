import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   CustomCursor — Clean Figma-style cursor
   
   • Default: sleek arrow pointer
   • Clickable (links/buttons): hand pointer 👆
   • Draggable (grab zones): open hand ✋
   • Dragging (active): closed hand ✊
   • Smooth spring-based following
   • Desktop only
   ───────────────────────────────────────────────────────────── */

type CursorMode = 'default' | 'pointer' | 'grab' | 'grabbing'

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 1000, damping: 60, mass: 0.1 })
  const springY = useSpring(cursorY, { stiffness: 1000, damping: 60, mass: 0.1 })

  const [mode, setMode] = useState<CursorMode>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const prevMode = useRef<CursorMode>('default')

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) { setIsTouch(true); return }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement
      const cs = window.getComputedStyle(target)
      const cursorStyle = cs.cursor

      if (cursorStyle === 'grabbing') {
        setMode('grabbing')
      } else if (cursorStyle === 'grab') {
        setMode('grab')
      } else if (
        cursorStyle === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[role="button"]') !== null ||
        target.closest('[data-cursor="pointer"]') !== null
      ) {
        setMode('pointer')
      } else {
        setMode('default')
      }
    }

    const handleMouseDown = () => {
      setIsPressed(true)
      // If in grab mode, switch to grabbing
      if (prevMode.current === 'grab') {
        setMode('grabbing')
      }
    }
    const handleMouseUp = () => {
      setIsPressed(false)
      if (prevMode.current === 'grabbing') {
        setMode('grab')
      }
    }
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isVisible])

  // Track previous mode for grab→grabbing transitions
  useEffect(() => {
    prevMode.current = mode
  }, [mode])

  if (isTouch) return null

  return (
    <>
      {/* Hide OS cursor globally */}
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: springX, y: springY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isPressed && mode === 'default' ? 0.85 : 1,
        }}
        transition={{ 
          opacity: { duration: 0.1 },
          scale: { type: 'spring', stiffness: 600, damping: 25 }
        }}
      >
        {/* Default Arrow */}
        {mode === 'default' && (
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
            <path d="M2.5 1L2.5 22L7.5 17.5L12 26L15.5 24.5L11 15.5L18 15.5L2.5 1Z"
              fill="#0C1221" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        )}

        {/* Pointer Hand — clickable areas */}
        {mode === 'pointer' && (
          <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'translate(-4px, -1px)', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
            {/* Index finger pointing up */}
            <rect x="10" y="1" width="5.5" height="14" rx="2.75" fill="#0C1221" stroke="white" strokeWidth="1.2" />
            {/* Middle finger */}
            <rect x="16.5" y="5" width="5" height="12" rx="2.5" fill="#0C1221" stroke="white" strokeWidth="1.2" />
            {/* Ring finger */}
            <rect x="22" y="7" width="4.5" height="11" rx="2.25" fill="#0C1221" stroke="white" strokeWidth="1.2" />
            {/* Thumb */}
            <rect x="3" y="13" width="5" height="9" rx="2.5" fill="#0C1221" stroke="white" strokeWidth="1.2" transform="rotate(-15 3 13)" />
            {/* Palm */}
            <path d="M6 16C6 14 8 12 10 12H24C25.5 12 27 13.5 27 15.5V24C27 27.5 24 30.5 20.5 30.5H13C9.5 30.5 6 27 6 23.5V16Z"
              fill="#0C1221" stroke="white" strokeWidth="1.2" />
          </svg>
        )}

        {/* Grab Hand — open hand for draggable areas */}
        {mode === 'grab' && (
          <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'translate(-10px, -4px)', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
            {/* Index finger */}
            <rect x="7" y="1" width="4.5" height="12" rx="2.25" fill="#0C1221" stroke="white" strokeWidth="1.2" />
            {/* Middle finger */}
            <rect x="12.5" y="0.5" width="4.5" height="12.5" rx="2.25" fill="#0C1221" stroke="white" strokeWidth="1.2" />
            {/* Ring finger */}
            <rect x="18" y="2" width="4.5" height="11" rx="2.25" fill="#0C1221" stroke="white" strokeWidth="1.2" />
            {/* Pinky */}
            <rect x="23" y="4.5" width="4" height="9.5" rx="2" fill="#0C1221" stroke="white" strokeWidth="1.2" />
            {/* Thumb */}
            <rect x="1" y="10" width="4.5" height="8" rx="2.25" fill="#0C1221" stroke="white" strokeWidth="1.2" transform="rotate(-20 1 10)" />
            {/* Palm */}
            <path d="M4 14C4 12.5 5.5 11 7 11H25C26.5 11 27.5 12.5 27.5 14V22C27.5 25.5 24.5 28.5 21 28.5H11C7.5 28.5 4 25 4 21.5V14Z"
              fill="#0C1221" stroke="white" strokeWidth="1.2" />
          </svg>
        )}

        {/* Grabbing Hand — closed fist while dragging */}
        {mode === 'grabbing' && (
          <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'translate(-10px, -6px)', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
            {/* Curled fingers — rounded bumps */}
            <rect x="5" y="1" width="4.5" height="7" rx="2.25" fill="#0C1221" stroke="white" strokeWidth="1.2" />
            <rect x="10.5" y="0" width="4.5" height="7.5" rx="2.25" fill="#0C1221" stroke="white" strokeWidth="1.2" />
            <rect x="16" y="1" width="4.5" height="7" rx="2.25" fill="#0C1221" stroke="white" strokeWidth="1.2" />
            <rect x="21" y="3" width="4" height="6" rx="2" fill="#0C1221" stroke="white" strokeWidth="1.2" />
            {/* Thumb wrapping */}
            <rect x="1" y="7" width="4.5" height="7" rx="2.25" fill="#0C1221" stroke="white" strokeWidth="1.2" transform="rotate(-10 1 7)" />
            {/* Palm/fist body */}
            <path d="M3 8C3 6.5 4.5 5 6 5H23.5C25 5 26.5 6.5 26.5 8.5V18C26.5 21.5 23.5 24.5 20 24.5H10C6.5 24.5 3 21 3 17.5V8Z"
              fill="#0C1221" stroke="white" strokeWidth="1.2" />
          </svg>
        )}
      </motion.div>
    </>
  )
}
