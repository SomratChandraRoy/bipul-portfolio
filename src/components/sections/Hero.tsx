import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { FiSend } from "react-icons/fi";
import { tallyFormId } from "../../data/portfolio";
import { PremiumDraggable } from "../ui/PremiumDraggable";
import { TextAnimate } from "../ui/TextAnimate";
import { PremiumTyping } from "../ui/PremiumTyping";
import { GradientText } from "../ui/GradientText";
import { SplitText } from "../ui/SplitText";
import { GlowingText } from "../ui/GlowingText";
import { FloatingElement } from "../ui/FloatingElement";

/* ── Animation Orchestration ─────────────────────────────────────────────── */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 18,
      mass: 0.8,
    },
  },
};

const itemScale = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 16,
      mass: 1,
    },
  },
};

/* ── Multiple Hero Headlines ─────────────────────────────────────────────── */

interface HeadlineVariant {
  mainHeadline: string;
  subHeadline: string;
  highlightWords?: string[];
}

const headlineVariants: HeadlineVariant[] = [
  {
    mainHeadline: "From Idea to Earning Machine: Web Systems Built for Scale.",
    subHeadline:
      "I don't just write code. As a full-stack engineer, I build seamless digital ecosystems designed to automate your growth, capture leads, and multiply your revenue.",
    highlightWords: [
      "automate your growth",
      "capture leads",
      "multiply your revenue",
    ],
  },
  {
    mainHeadline: 'Stop Buying "Websites." Invest in a Digital Business Asset.',
    subHeadline:
      "Turn your bottlenecked business into a smooth, high-converting earning system. I deliver end-to-end full-stack web solutions that look beautiful and perform ruthlessly.",
    highlightWords: [
      "high-converting earning system",
      "beautiful",
      "perform ruthlessly",
    ],
  },
  {
    mainHeadline:
      "Code That Converts. Systems That Scale Your Business Smoothly.",
    subHeadline:
      "Transform your vision into a profitable reality. I architect custom, full-stack web applications that eliminate technical friction and accelerate your earning potential.",
    highlightWords: [
      "profitable reality",
      "eliminate technical friction",
      "earning potential",
    ],
  },
  {
    mainHeadline:
      "Your Idea. A Proven Earning System. Seamless Business Growth.",
    subHeadline:
      "Leverage 20+ years of digital business expertise. I engineer custom full-stack web platforms that bridge the gap between your concept and your cash flow.",
    highlightWords: ["20+ years", "bridge the gap", "cash flow"],
  },
];

/* ── High-Performance Constellation Canvas ─────────────────────────────── */

function ConstellationNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 26 : 70;
    const connectionDistance = 220;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulsePhase: number;
      baseAlpha: number;

      constructor() {
        if (!canvas) {
          x: 0;
          y: 0;
          vx: 0;
          vy: 0;
          size: 0;
          pulsePhase: 0;
          return;
        }
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size =
          Math.random() > 0.88
            ? Math.random() * 4 + 3
            : Math.random() * 1.8 + 0.8;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.baseAlpha = 0.3 + Math.random() * 0.5;
      }

      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.pulsePhase += 0.012;
      }

      draw() {
        if (!ctx) return;
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
        const currentSize = this.size + pulse * 1.2;

        // Outer glow
        const g = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          currentSize * 3,
        );
        g.addColorStop(
          0,
          `rgba(120, 170, 255, ${this.baseAlpha * (0.5 + pulse * 0.5)})`,
        );
        g.addColorStop(0.4, `rgba(46, 103, 206, ${this.baseAlpha * 0.2})`);
        g.addColorStop(1, "rgba(46, 103, 206, 0)");
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${this.baseAlpha * (0.6 + pulse * 0.4)})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.shadowBlur = 0;

      if (!isMobile) {
        // Connection lines are visually rich but expensive; skip on mobile/tablet.
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const opacity =
                0.35 * Math.pow(1 - distance / connectionDistance, 1.8);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(100, 160, 255, ${opacity})`;
              ctx.lineWidth = 0.8 + (1 - distance / connectionDistance) * 0.8;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
  );
}

/* ── Hero Section ───────────────────────────────────────────────────────── */

export function Hero() {
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentHeadlineIndex((prev) => (prev + 1) % headlineVariants.length);
        setIsTransitioning(false);
      }, 500);
    }, 12000); // Change headline every 12 seconds

    return () => clearInterval(interval);
  }, []);

  const currentHeadline = headlineVariants[currentHeadlineIndex];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden bg-[#0d1220]">
      {/* Constellation Canvas */}
      <ConstellationNetwork />

      {/* Enhanced Floating particles effect - Premium layer with multiple orbs */}
      <motion.div className="absolute inset-0 z-[0.5] pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-[#2e67ce]/25 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#5f8fdf]/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/3 w-32 h-32 bg-[#a4bce8]/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      {/* Massive Orbital Rings with Premium Effects */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none mix-blend-screen">
        {/* Outer ring with glow */}
        <motion.div
          className="absolute w-[130vw] h-[130vw] max-w-[1500px] max-h-[1500px] rounded-full border border-[#2e67ce]/10"
          style={{
            boxShadow:
              "0 0 180px rgba(46, 103, 206, 0.1), inset 0 0 180px rgba(46, 103, 206, 0.1)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />

        {/* Middle ring */}
        <motion.div
          className="absolute w-[90vw] h-[90vw] max-w-[1100px] max-h-[1100px] rounded-full border border-[#2e67ce]/14 blur-[2px]"
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full border border-[#2e67ce]/18 blur-[1px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />

        {/* Premium particles in rings */}
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-[#2e67ce] shadow-[0_0_20px_rgba(46,103,206,0.75)]"
          style={{
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            top: ["50%", "30%", "50%"],
            left: ["50%", "60%", "50%"],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Central aurora bloom with enhanced glow */}
        <div className="absolute w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(18,41,89,0.55)_0%,rgba(12,27,58,0.32)_30%,transparent_70%)] rounded-full blur-3xl" />

        {/* Top-right accent glow - Enhanced */}
        <motion.div
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(46,103,206,0.14)_0%,transparent_60%)] rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bottom-left accent glow - Enhanced */}
        <motion.div
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(110,156,232,0.12)_0%,transparent_60%)] rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center">
          {/* Eyebrow Pill */}
          <PremiumDraggable className="w-auto" intensity="light">
            <motion.div
              variants={itemScale}
              className="mb-10 inline-flex items-center gap-3 rounded-full border border-[#2e67ce]/24 bg-[#0f1628]/72 backdrop-blur-2xl px-6 py-2.5 shadow-[0_0_40px_rgba(46,103,206,0.15),inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2e67ce] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5f8fdf] shadow-[0_0_8px_rgba(95,143,223,0.6)]"></span>
              </span>
              <span
                className="text-xs sm:text-[13px] font-semibold tracking-widest text-slate-300/90 uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Available for new projects
              </span>
            </motion.div>
          </PremiumDraggable>

          {/* Main Headline with Premium Text Animations */}
          <PremiumDraggable className="w-auto" intensity="heavy">
            <motion.div
              variants={itemUp}
              className="min-h-[80px] sm:min-h-[120px] md:min-h-[160px] flex items-center justify-center"
              key={`headline-${currentHeadlineIndex}`}>
              <motion.h1
                className="text-[32px] sm:text-[48px] md:text-[80px] font-black tracking-[-0.02em] text-white mb-0 leading-[1.08]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-0.02em",
                }}
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                transition={{ duration: 0.4 }}>
                {/* Clean, simple single animation for entire headline with premium emotional feel */}
                <TextAnimate
                  animation="blurInUp"
                  by="word"
                  duration={2.8}
                  staggerDelay={0.12}
                  className="inline">
                  {currentHeadline.mainHeadline}
                </TextAnimate>
              </motion.h1>
            </motion.div>
          </PremiumDraggable>

          {/* Subtitle with Enhanced Effects */}
          <PremiumDraggable className="w-auto" intensity="normal">
            <motion.h2
              variants={itemUp}
              className="mt-8 sm:mt-10 max-w-4xl text-[14px] sm:text-[16px] md:text-[19px] leading-[1.75] text-slate-300/80 font-medium mx-auto px-4 min-h-[56px] sm:min-h-[100px]"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.01em",
              }}
              animate={{ opacity: isTransitioning ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              key={`subtitle-${currentHeadlineIndex}`}>
              <TextAnimate
                animation="blurInUp"
                by="word"
                duration={3}
                delay={0.8}
                staggerDelay={0.05}
                className="inline">
                {currentHeadline.subHeadline}
              </TextAnimate>
            </motion.h2>
          </PremiumDraggable>

          {/* CTA Buttons */}
          <PremiumDraggable className="w-auto z-50" intensity="normal">
            <motion.div
              variants={itemUp}
              className="mt-8 sm:mt-14 w-full max-w-[760px] px-4 sm:px-0 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              {/* Primary CTA */}
              <a
                href="#projects"
                className="cta-neumorphism group relative w-full sm:w-auto sm:min-w-[280px] inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4.5 rounded-full overflow-hidden text-[14px] sm:text-[15px] font-bold text-white transition-all duration-400 active:scale-[0.96] shadow-[0_0_50px_rgba(46,103,206,0.32),0_8px_32px_-8px_rgba(46,103,206,0.45),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-4px_16px_rgba(0,0,0,0.5)] bg-gradient-to-b from-[#2e67ce] to-[#1b3f85] border border-[#5f8fdf]/30"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <div className="absolute inset-0 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/15 to-transparent skew-x-[-25deg] -translate-x-[200%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="relative z-10">View My Proven Systems</span>
                <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-400 lg:group-hover:translate-x-1.5" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                data-tally-open={tallyFormId}
                data-tally-layout="modal"
                data-tally-width="600"
                className="cta-neumorphism group relative w-full sm:w-auto sm:min-w-[280px] inline-flex items-center justify-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl px-8 sm:px-10 py-4.5 text-[14px] sm:text-[15px] font-bold text-slate-300 transition-all duration-400 lg:hover:text-[#9ab7e7] lg:hover:border-white/20 lg:hover:bg-white/[0.06] active:scale-[0.96] shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <FiSend className="h-4 w-4 transition-all duration-400 lg:group-hover:-translate-y-0.5 lg:group-hover:translate-x-0.5 lg:group-hover:text-[#5f8fdf]" />
                <span className="relative z-10">Book a Strategy Call</span>
              </a>
            </motion.div>
          </PremiumDraggable>

          {/* Tech badges with enhanced animations */}
          <PremiumDraggable className="w-auto" intensity="light">
            <motion.div
              variants={itemUp}
              className="mt-20 flex flex-wrap items-center justify-center gap-3">
              {["React", "Django", "TypeScript", "AWS"].map((badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, y: 25, filter: "blur(12px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 2.1 + i * 0.15,
                    duration: 0.9,
                    type: "spring",
                    stiffness: 90,
                    damping: 16,
                  }}>
                  <div
                    className="px-5 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-[0.12em] text-slate-300/70 bg-white/[0.05] border border-white/[0.1] backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:border-[#5f8fdf]/50 hover:bg-[#2e67ce]/[0.12] hover:text-slate-100 transition-all duration-500 cursor-default uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {badge}
                  </div>
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
        transition={{ delay: 2, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
        <span
          className="text-[9px] font-black tracking-[0.35em] uppercase text-slate-500/60"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center">
          <div className="h-6 w-px bg-gradient-to-b from-slate-500/40 to-transparent" />
          <ChevronDown className="h-3 w-3 text-slate-500/50 mt-1" />
        </motion.div>
      </motion.div>

      {/* Corner Ornaments with Premium Animation */}
      <FloatingElement
        duration={8}
        distance={12}
        className="absolute bottom-16 right-16 text-slate-500/15 z-10 pointer-events-none hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="w-0.5 h-full bg-gradient-to-b from-transparent via-slate-400/40 to-transparent absolute rounded-full"></div>
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-slate-400/40 to-transparent absolute rounded-full"></div>
          </div>
        </motion.div>
      </FloatingElement>

      {/* Top-left floating badge */}
      <motion.div
        className="absolute top-32 left-8 lg:left-16 z-10 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ delay: 2, duration: 1 }}>
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
  );
}
