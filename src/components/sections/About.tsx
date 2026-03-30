import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download } from "lucide-react";
import { PremiumDraggable } from "../ui/PremiumDraggable";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}>
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-16">
            <PremiumDraggable intensity="light">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary font-mono">
                  About
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The story behind the code
              </h2>
            </PremiumDraggable>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: abstract profile visual */}
            <motion.div variants={fadeUp} className="relative">
              <PremiumDraggable>
                <div className="aspect-square rounded-2xl glass-panel p-6 md:p-10 flex items-center justify-center overflow-hidden relative">
                  {/* Decorative background elements */}
                  <div className="absolute top-6 right-6 w-20 h-20 rounded-full border border-primary/20" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 rounded border border-accent/20 rotate-12" />
                  <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-primary/30" />
                  <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-accent/30" />

                  {/* Main visual */}
                  <div className="text-center relative z-10">
                    <div className="relative inline-flex items-center justify-center">
                      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_25%_20%,rgba(75,131,251,0.42),transparent_62%)] blur-xl scale-110" />
                      <img
                        src="/profile.jpg"
                        alt="Profile"
                        className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-[1.75rem] object-cover border border-white/20 shadow-[0_30px_80px_-26px_rgba(75,131,251,0.75)] ring-1 ring-primary/35"
                      />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground font-mono">
                      full-stack developer
                    </p>
                  </div>
                </div>
              </PremiumDraggable>
            </motion.div>

            {/* Right: story text */}
            <div className="space-y-6">
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed">
                <PremiumDraggable intensity="light">
                  I&apos;m a senior full-stack developer based in{" "}
                  <span className="text-foreground font-medium">
                    Dinajpur, Bangladesh
                  </span>{" "}
                  with{" "}
                  <span className="text-foreground font-medium">
                    8+ years of experience
                  </span>{" "}
                  building affordable websites and digital products that scale.
                  My work sits at the intersection of clean engineering,
                  thoughtful design, and real business outcomes.
                </PremiumDraggable>
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed">
                I specialize in the{" "}
                <span className="text-foreground font-medium">
                  React and Django ecosystems
                </span>
                , designing systems from database schemas to pixel-perfect
                interfaces. Every project starts with understanding the problem
                deeply—then architecting a solution that&apos;s maintainable,
                performant, and built to last. I deliver end-to-end web
                development for clients across Bangladesh with clear scope,
                pricing, and reliable delivery.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed">
                When I&apos;m not coding, I&apos;m mentoring developers,
                contributing to open source, or exploring the latest in{" "}
                <span className="text-foreground font-medium">
                  cloud-native infrastructure
                </span>
                . I believe the best software is built by people who care about
                both the code and the people who use it.
              </motion.p>

              <motion.div variants={fadeUp} className="pt-4">
                <PremiumDraggable intensity="light" className="w-auto">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:scale-[1.02] active:scale-[0.98]">
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </PremiumDraggable>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
