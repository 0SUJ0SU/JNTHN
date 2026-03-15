"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

const containerReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

const lineReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const DISPLAY_SIZE = "clamp(20px, 4.5vw, 76px)";
const SERIF_SIZE = "clamp(16px, 3.8vw, 66px)";

export default function WorkDescriptor() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <motion.div
        variants={containerReveal}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={prefersReducedMotion || isInView ? "visible" : "hidden"}
        className="absolute inset-0 flex items-center justify-center px-4 sm:px-[3vw]"
      >
        <div className="text-center">
          <motion.div variants={prefersReducedMotion ? {} : lineReveal}>
            <span
              className="font-display uppercase text-cream"
              style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}
            >
              THESE EITHER STARTED AS THINGS
            </span>
          </motion.div>

          <motion.div variants={prefersReducedMotion ? {} : lineReveal}>
            <span
              className="font-display uppercase text-cream"
              style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}
            >
              I WANTED{" "}
            </span>
            <span
              className="font-serif italic text-gold"
              style={{ fontSize: SERIF_SIZE, lineHeight: 1.05 }}
            >
              to solve
            </span>
            <span
              className="font-display uppercase text-cream"
              style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}
            >
              {" "}OR WANTED{" "}
            </span>
            <span
              className="font-serif italic text-gold"
              style={{ fontSize: SERIF_SIZE, lineHeight: 1.05 }}
            >
              to give someone.
            </span>
          </motion.div>

          <motion.div variants={prefersReducedMotion ? {} : lineReveal}>
            <span
              className="font-display uppercase text-cream"
              style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}
            >
              ALL OF THEM TAUGHT ME SOMETHING
            </span>
          </motion.div>

          <motion.div variants={prefersReducedMotion ? {} : lineReveal}>
            <span
              className="font-display uppercase text-cream"
              style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}
            >
              I COULDN&apos;T LEARN{" "}
            </span>
            <span
              className="font-serif italic text-gold"
              style={{ fontSize: SERIF_SIZE, lineHeight: 1.05 }}
            >
              any other way.
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
