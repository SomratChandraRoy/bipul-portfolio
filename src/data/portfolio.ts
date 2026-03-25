export interface Project {
  id: string
  title: string
  description: string
  impact: string
  stack: string[]
  problem: string
  result: string
  category: 'fullstack' | 'frontend' | 'backend' | 'saas'
  image: string
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
  featured: boolean
}

export interface CaseStudy {
  id: string
  title: string
  client: string
  description: string
  metrics: { label: string; value: string }[]
  stack: string[]
}

export interface Service {
  title: string
  description: string
  icon: string
}

export interface Experience {
  year: string
  title: string
  company: string
  description: string
  highlights: string[]
}

export interface Testimonial {
  name: string
  role: string
  company: string
  text: string
  avatar: string
}

export interface Stat {
  value: string
  label: string
  suffix?: string
}

export const stats: Stat[] = [
  { value: '8', label: 'Years of Experience', suffix: '+' },
  { value: '50', label: 'Projects Delivered', suffix: '+' },
  { value: '99', label: 'Client Satisfaction', suffix: '%' },
  { value: '12', label: 'Open Source Contributions', suffix: '+' },
]

export const projects: Project[] = [
  {
    id: 'nexus-platform',
    title: 'Nexus Platform',
    description: 'Enterprise SaaS platform for workflow automation serving 10,000+ daily active users with real-time collaboration features.',
    impact: 'Reduced operational costs by 40% for enterprise clients',
    stack: ['React', 'TypeScript', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    problem: 'Legacy workflow systems were costing enterprises millions in lost productivity due to manual processes and disconnected tools.',
    result: '40% reduction in operational costs, 10K+ DAU, 99.9% uptime over 18 months',
    category: 'saas',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'pulse-analytics',
    title: 'Pulse Analytics',
    description: 'Real-time analytics dashboard processing 2M+ events daily with sub-second query performance and interactive visualizations.',
    impact: 'Enabled data-driven decisions for 200+ businesses',
    stack: ['Next.js', 'TypeScript', 'Python', 'ClickHouse', 'Kafka', 'Kubernetes'],
    problem: 'Existing analytics tools couldn\'t handle the volume and velocity of real-time event data at scale.',
    result: '2M+ daily events processed, <100ms p95 query latency, 200+ business customers',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    liveUrl: '#',
    caseStudyUrl: '#',
    featured: true,
  },
  {
    id: 'vault-auth',
    title: 'Vault Auth',
    description: 'Multi-tenant authentication system with SSO, RBAC, and audit logging, built for B2B SaaS applications.',
    impact: 'Powers authentication for 500K+ end users',
    stack: ['Django Ninja', 'WorkOS', 'PostgreSQL', 'Redis', 'Docker', 'GitHub Actions'],
    problem: 'B2B SaaS companies needed enterprise-grade auth with SSO that was easy to integrate and maintain.',
    result: '500K+ users authenticated, SOC 2 compliant, 15-minute average integration time',
    category: 'backend',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'meridian-cms',
    title: 'Meridian CMS',
    description: 'Headless content management system with visual editor, version control, and multi-language support for global brands.',
    impact: 'Manages content for 30+ international websites',
    stack: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'Cloudflare Workers'],
    problem: 'Global brands needed a flexible CMS that could handle multi-language content across dozens of regional sites.',
    result: '30+ websites managed, 12 languages supported, 60% faster content publishing',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'aurora-dashboard',
    title: 'Aurora Dashboard',
    description: 'Admin dashboard framework with dynamic forms, data tables, real-time notifications, and role-based access control.',
    impact: 'Used as internal tooling by 5 engineering teams',
    stack: ['React', 'TypeScript', 'Django Unfold', 'Tailwind CSS', 'WebSockets'],
    problem: 'Engineering teams were building repetitive admin UIs from scratch for each new product.',
    result: '5 teams adopted, 70% reduction in admin UI development time, 15+ dashboards built',
    category: 'frontend',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'streamline-api',
    title: 'Streamline API',
    description: 'High-performance REST API gateway with rate limiting, caching, and comprehensive monitoring for microservices architecture.',
    impact: 'Handles 50M+ API calls monthly with 99.99% uptime',
    stack: ['Python', 'Django Ninja', 'PostgreSQL', 'Redis', 'Nginx', 'Gunicorn', 'Kubernetes'],
    problem: 'Microservices needed a unified API gateway that could handle massive throughput while maintaining reliability.',
    result: '50M+ monthly API calls, 99.99% uptime, <50ms average response time',
    category: 'backend',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    githubUrl: '#',
    caseStudyUrl: '#',
    featured: false,
  },
]

export const caseStudies: CaseStudy[] = [
  {
    id: 'nexus-case',
    title: 'Scaling Nexus to 10K DAU',
    client: 'Nexus Platform',
    description: 'How I redesigned the architecture to handle 10x traffic growth while reducing infrastructure costs by 35%.',
    metrics: [
      { label: 'DAU Growth', value: '10x' },
      { label: 'Cost Reduction', value: '35%' },
      { label: 'Uptime', value: '99.9%' },
    ],
    stack: ['React', 'Django', 'PostgreSQL', 'Redis', 'AWS'],
  },
  {
    id: 'pulse-case',
    title: 'Real-Time at Scale',
    client: 'Pulse Analytics',
    description: 'Building a real-time analytics pipeline that processes 2M+ events daily with sub-second query performance.',
    metrics: [
      { label: 'Events/Day', value: '2M+' },
      { label: 'Query Latency', value: '<100ms' },
      { label: 'Customers', value: '200+' },
    ],
    stack: ['Next.js', 'Python', 'ClickHouse', 'Kafka'],
  },
  {
    id: 'vault-case',
    title: 'Enterprise Auth Done Right',
    client: 'Vault Auth',
    description: 'Designing a multi-tenant auth system that scales to 500K+ users while maintaining SOC 2 compliance.',
    metrics: [
      { label: 'Users', value: '500K+' },
      { label: 'Integration Time', value: '15min' },
      { label: 'Compliance', value: 'SOC 2' },
    ],
    stack: ['Django Ninja', 'WorkOS', 'PostgreSQL'],
  },
]

export const services: Service[] = [
  {
    title: 'Scalable Web Applications',
    description: 'Full-stack applications built with modern frameworks, designed to handle growth from MVP to millions of users.',
    icon: 'Globe',
  },
  {
    title: 'SaaS Platforms',
    description: 'Multi-tenant platforms with authentication, billing, analytics, and admin dashboards—ready for production.',
    icon: 'Layers',
  },
  {
    title: 'API Architecture',
    description: 'High-performance REST and GraphQL APIs with rate limiting, caching, and comprehensive documentation.',
    icon: 'Zap',
  },
  {
    title: 'Dashboard & Admin Panels',
    description: 'Data-rich admin interfaces with real-time updates, complex filtering, and role-based access control.',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Authentication Systems',
    description: 'Enterprise-grade auth with SSO, RBAC, audit logging, and multi-tenant support for B2B applications.',
    icon: 'Shield',
  },
  {
    title: 'DevOps & Deployment',
    description: 'CI/CD pipelines, containerized deployments, and infrastructure automation for reliable, scalable operations.',
    icon: 'Container',
  },
]

export const techStack = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Django', 'Django Ninja', 'Python', 'Node.js', 'GraphQL'],
  databases: ['PostgreSQL', 'Redis', 'MongoDB', 'ClickHouse'],
  devops: ['Docker', 'Kubernetes', 'Nginx', 'Gunicorn', 'GitHub Actions'],
  tools: ['WorkOS', 'Unfold Admin', 'Kafka', 'AWS', 'Cloudflare'],
}

export const experiences: Experience[] = [
  {
    year: '2024 — Present',
    title: 'Senior Full-Stack Engineer',
    company: 'Independent / Consulting',
    description: 'Leading architecture and development of enterprise SaaS products, focusing on scalability, clean code, and business impact.',
    highlights: ['Delivered 12+ projects', 'Architected systems handling 50M+ API calls/month', 'Mentored 5 junior developers'],
  },
  {
    year: '2021 — 2024',
    title: 'Full-Stack Developer',
    company: 'TechForge Labs',
    description: 'Built and maintained mission-critical web applications for fintech and healthcare clients, driving product growth.',
    highlights: ['Led team of 4 engineers', 'Reduced deployment time by 80%', 'Shipped 3 major product launches'],
  },
  {
    year: '2019 — 2021',
    title: 'Frontend Developer',
    company: 'Digital Pulse Agency',
    description: 'Crafted high-performance user interfaces for startups and enterprises, focusing on accessibility and modern design.',
    highlights: ['Built 20+ client websites', 'Improved Core Web Vitals by 45%', 'Introduced component library'],
  },
  {
    year: '2017 — 2019',
    title: 'Junior Developer',
    company: 'CodeCraft Studios',
    description: 'Started my journey building responsive websites and learning the fundamentals of web development and software engineering.',
    highlights: ['Completed 30+ projects', 'Self-taught Django and React', 'Won internal hackathon'],
  },
]

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'Nexus Technologies',
    text: 'One of the most talented engineers I\'ve worked with. The architecture decisions were spot-on, and the code quality was exceptional. Our platform scaled effortlessly thanks to the foundation that was built.',
    avatar: 'SC',
  },
  {
    name: 'Marcus Rivera',
    role: 'Head of Product',
    company: 'Pulse Analytics',
    text: 'Not just a developer—a true product thinker. Every technical decision was made with the end user in mind. The dashboard they built became our most-loved feature.',
    avatar: 'MR',
  },
  {
    name: 'Elena Volkov',
    role: 'Engineering Lead',
    company: 'TechForge Labs',
    text: 'A rare combination of deep technical expertise and excellent communication. They could break down complex problems into elegant solutions and explain them to any audience.',
    avatar: 'EV',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const socialLinks = {
  github: 'https://github.com',
  linkedin: 'https://www.linkedin.com/in/bipul-roy',
  twitter: 'https://x.com/BipulUnexpected',
  email: 'info@bipul.tech',
}

export const tallyFormId = 'VLVJEa'
