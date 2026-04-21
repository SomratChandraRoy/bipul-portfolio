import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { cn } from "../../lib/utils";

type RevealTone =
  | "lift"
  | "glide-left"
  | "glide-right"
  | "curtain"
  | "depth"
  | "float";

interface SectionCinematicRevealProps {
  children: ReactNode;
  tone?: RevealTone;
  className?: string;
  once?: boolean;
}

const revealVariants: Record<RevealTone, Variants> = {
  lift: {
    hidden: { opacity: 0, y: 70, scale: 0.98, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
    },
  },
  "glide-left": {
    hidden: { opacity: 0, x: -90, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  },
  "glide-right": {
    hidden: { opacity: 0, x: 90, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  },
  curtain: {
    hidden: { opacity: 0, y: 50, clipPath: "inset(0 0 100% 0)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 1, ease: [0.2, 0.9, 0.3, 1] },
    },
  },
  depth: {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.94,
      rotateX: 8,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { duration: 1.05, ease: [0.2, 0.8, 0.2, 1] },
    },
  },
  float: {
    hidden: { opacity: 0, y: 90, scale: 0.97, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.05, ease: [0.18, 1, 0.3, 1] },
    },
  },
};

const driftRangeMap: Record<RevealTone, [number, number]> = {
  lift: [24, -14],
  "glide-left": [28, -10],
  "glide-right": [28, -10],
  curtain: [20, -8],
  depth: [26, -16],
  float: [34, -20],
};

export function SectionCinematicReveal({
  children,
  tone = "lift",
  className,
  once = true,
}: SectionCinematicRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 5%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], driftRangeMap[tone]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0.92, 1, 1]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: "-5% 0px -10% 0px" }}
      variants={revealVariants[tone]}
      style={{ y, opacity }}
      className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}
