import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { tallyFormId } from "../../data/portfolio";

const COLORS_TOP = ["#2e67ce", "#3f79df", "#5f8fdf", "#244f9f"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const prefersReducedMotion = useReducedMotion();
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarsePointer(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const controls = animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
    return () => controls.stop();
  }, [color, prefersReducedMotion]);

  const starConfig = useMemo(
    () =>
      isCoarsePointer
        ? { radius: 40, count: 900, factor: 3, speed: 0.7 }
        : { radius: 50, count: 1800, factor: 4, speed: 1.2 },
    [isCoarsePointer],
  );

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-[70vh] place-content-center overflow-hidden px-4 py-24 text-slate-200">
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-2 inline-block rounded-full bg-slate-700/45 px-3 py-1.5 text-sm">
          Available for New Projects
        </span>
        <h2 className="max-w-3xl bg-gradient-to-br from-white to-slate-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight">
          Build a Premium Web System That Grows Your Revenue
        </h2>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed text-slate-300/90">
          Let&apos;s design and launch a high-converting platform with modern UX,
          smooth performance, and business-first engineering.
        </p>
        <motion.button
          type="button"
          data-tally-open={tallyFormId}
          data-tally-layout="modal"
          data-tally-width="600"
          style={{ border, boxShadow }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.985 }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-slate-950/25 px-5 py-2.5 text-slate-50 transition-colors hover:bg-slate-950/55">
          Start your project
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 1] }}>
          <Stars
            radius={starConfig.radius}
            count={starConfig.count}
            factor={starConfig.factor}
            fade
            speed={starConfig.speed}
          />
        </Canvas>
      </div>
    </motion.section>
  );
};

