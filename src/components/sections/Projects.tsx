import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, FileText } from 'lucide-react'
import { GitHubIcon } from '../ui/SocialIcons'
import { PremiumDraggable } from '../ui/PremiumDraggable'
import { projects, type Project } from '../../data/portfolio'

/* ── Filter Tabs ─────────────────────────────────────────────────────────── */

const filters = ['All', 'Full-Stack', 'Frontend', 'Backend', 'SaaS'] as const
type Filter = (typeof filters)[number]

const filterMap: Record<Filter, Project['category'] | null> = {
  All: null,
  'Full-Stack': 'fullstack',
  Frontend: 'frontend',
  Backend: 'backend',
  SaaS: 'saas',
}

/* ── 3D Tilt Hook ────────────────────────────────────────────────────────── */

function useCardTilt() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -8, y: x * 8 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return { tilt, handleMouseMove, handleMouseLeave }
}

/* ── Project Card ────────────────────────────────────────────────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { tilt, handleMouseMove, handleMouseLeave } = useCardTilt()
  const [expanded, setExpanded] = useState(false)

  const categoryLabel: Record<Project['category'], string> = {
    fullstack: 'Full-Stack',
    frontend: 'Frontend',
    backend: 'Backend',
    saas: 'SaaS',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      style={{
        perspective: 800,
      }}
    >
      <PremiumDraggable
        className="glass-panel rounded-xl overflow-hidden cursor-pointer group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setExpanded((p) => !p)}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        whileHover={{ y: -4, boxShadow: '0 16px 48px -8px hsl(221 96% 64% / 0.12)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image area */}
        <div className="h-48 bg-secondary relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>

        {/* Body */}
        <div className="p-6 space-y-3">
          <span className="text-xs font-mono text-primary bg-primary/10 rounded-full px-2 py-0.5">
            {categoryLabel[project.category]}
          </span>
          <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
          <p className="text-sm text-primary font-medium">{project.impact}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

          {/* Stack chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="bg-secondary rounded px-2 py-0.5 text-xs text-muted-foreground font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Problem & Result — revealed on expand */}
          <motion.div
            initial={false}
            animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-3 border-t border-border">
              <div>
                <span className="text-xs uppercase text-muted-foreground font-mono tracking-wider">
                  Problem:
                </span>
                <p className="text-sm text-foreground mt-1">{project.problem}</p>
              </div>
              <div>
                <span className="text-xs uppercase text-primary font-mono tracking-wider">
                  Result:
                </span>
                <p className="text-sm text-foreground mt-1">{project.result}</p>
              </div>
            </div>
          </motion.div>

          {/* Link buttons */}
          <div className="flex items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <FileText className="h-3.5 w-3.5" />
                Case Study
              </a>
            )}
          </div>
        </div>
      </PremiumDraggable>
    </motion.div>
  )
}

/* ── Projects Section ────────────────────────────────────────────────────── */

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const featured = projects.filter((p) => p.featured)
  const filtered =
    activeFilter === 'All'
      ? featured
      : featured.filter((p) => p.category === filterMap[activeFilter])

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-xs font-mono uppercase tracking-widest text-primary">
              Featured Work
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Projects that make an{' '}
            <span className="text-gradient-primary">impact</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl">
            Each project represents a unique challenge solved with thoughtful architecture
            and attention to detail.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="mt-10 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
