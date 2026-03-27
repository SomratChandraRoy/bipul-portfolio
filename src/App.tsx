import { useState, useEffect, useCallback } from 'react'
import { Navbar } from './components/layout/Navbar'
import { EntropyBackground } from './components/ui/EntropyBackground'

import { Hero } from './components/sections/Hero'
import { Stats } from './components/sections/Stats'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { CaseStudies } from './components/sections/CaseStudies'
import { Services } from './components/sections/Services'
import { TechStack } from './components/sections/TechStack'
import { Experience } from './components/sections/Experience'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/sections/Footer'
import { useScrollProgress } from './hooks/useScrollProgress'

function App() {
  const { scrollProgress, activeSection, isScrolled } = useScrollProgress()
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    const stored = localStorage.getItem('bipul-theme')
    if (stored === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
      setIsDark(false)
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.remove('dark')
      root.classList.add('light')
      localStorage.setItem('bipul-theme', 'light')
      setIsDark(false)
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
      localStorage.setItem('bipul-theme', 'dark')
      setIsDark(true)
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <EntropyBackground />
      <Navbar
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        isScrolled={isScrolled}
      />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <About />
        <Projects />
        <CaseStudies />
        <Services />
        <TechStack />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
