import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "../../lib/utils";

type RevealTone =
  | "lift"
  | "glide-left"
  | "glide-right"
  | "curtain"
  | "depth"
  | "float"
  | "vault";

interface SectionCinematicRevealProps {
  children: ReactNode;
  tone?: RevealTone;
  className?: string;
}

const yDriftMap: Record<RevealTone, [number, number]> = {
  lift: [84, -14],
  "glide-left": [74, -12],
  "glide-right": [74, -12],
  curtain: [64, -8],
  depth: [90, -20],
  float: [96, -24],
  vault: [72, -18],
};

const rotateXMap: Record<RevealTone, [number, number]> = {
  lift: [7, 0],
  "glide-left": [5, 0],
  "glide-right": [5, 0],
  curtain: [3, 0],
  depth: [11, 0],
  float: [9, 0],
  vault: [14, 0],
};

const rotateYMap: Record<RevealTone, [number, number]> = {
  lift: [0, 0],
  "glide-left": [-7, 0],
  "glide-right": [7, 0],
  curtain: [0, 0],
  depth: [2, 0],
  float: [0, 0],
  vault: [4, 0],
};

export function SectionCinematicReveal({
  children,
  tone = "lift",
  className,
}: SectionCinematicRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarsePointer(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const usePerformanceMode = prefersReducedMotion || isCoarsePointer;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 94%", "end 8%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 34,
    mass: 0.35,
  });

  const y = useTransform(progress, [0, 1], yDriftMap[tone]);
  const opacity = useTransform(progress, [0, 0.2, 1], [0.52, 1, 1]);
  const scale = useTransform(progress, [0, 0.25, 1], [0.955, 1, 1]);
  const rotateX = useTransform(
    progress,
    [0, 1],
    usePerformanceMode ? [0, 0] : rotateXMap[tone],
  );
  const rotateY = useTransform(
    progress,
    [0, 1],
    usePerformanceMode ? [0, 0] : rotateYMap[tone],
  );
  const blur = useTransform(progress, [0, 0.25, 1], usePerformanceMode ? [0, 0, 0] : [8, 0, 0]);
  const blurFilter = useTransform(blur, (value) => `blur(${value}px)`);
  const glowOpacity = useTransform(progress, [0, 0.28, 1], usePerformanceMode ? [0, 0, 0] : [0, 0.45, 0.12]);
  const lineOpacity = useTransform(progress, [0, 0.2, 1], usePerformanceMode ? [0, 0, 0] : [0, 0.6, 0.12]);
  const clipPath =
    tone === "curtain" && !usePerformanceMode
      ? useTransform(
          progress,
          [0, 0.4, 1],
          ["inset(0 0 22% 0)", "inset(0 0 0% 0)", "inset(0 0 0% 0)"],
        )
      : undefined;

  const animatedPanelStyle = {
    scale,
    rotateX,
    rotateY,
    filter: blurFilter,
    transformPerspective: usePerformanceMode ? 0 : 1400,
    transformStyle: usePerformanceMode ? "flat" : ("preserve-3d" as const),
    ...(clipPath ? { clipPath } : {}),
  };

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={cn("relative will-change-transform overflow-x-hidden", className)}>
      <motion.div style={animatedPanelStyle} className="relative">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 -top-8 h-20 rounded-full bg-[radial-gradient(circle,rgba(75,131,251,0.28)_0%,rgba(75,131,251,0)_72%)] blur-2xl"
          style={{ opacity: glowOpacity }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
          style={{ opacity: lineOpacity }}
        />
        {children}
      </motion.div>
    </motion.div>
  );
}
