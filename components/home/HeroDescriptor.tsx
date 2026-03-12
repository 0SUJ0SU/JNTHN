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

const DISPLAY_SIZE = "clamp(28px, 6.5vw, 110px)";
const BRACKET_SIZE = "clamp(6px, 0.85vw, 14px)";
const ARROW_SIZE = "clamp(12px, 3vw, 80px)";
const SERIF_SIZE = "clamp(22px, 5.5vw, 96px)";

export default function HeroDescriptor() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <motion.div
        variants={containerReveal}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={prefersReducedMotion || isInView ? "visible" : "hidden"}
        className="absolute inset-0 flex flex-col justify-center gap-[3vw] px-4 py-[2vw] sm:px-[3vw]"
      >
        <div className="self-start">
          <motion.div variants={prefersReducedMotion ? {} : lineReveal}>
            <div className="flex flex-wrap items-start gap-[0.5vw]">
              <span
                className="font-display uppercase text-cream"
                style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}
              >
                JNTHN
              </span>
              <span
                className="self-center font-mono text-gold"
                style={{ fontSize: BRACKET_SIZE }}
              >
                [HOME]
              </span>
              <span
                className="font-display uppercase text-cream"
                style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}
              >
                IS THE FOLIO OF
              </span>
            </div>
          </motion.div>
          <motion.div variants={prefersReducedMotion ? {} : lineReveal}>
            <div className="flex flex-wrap items-baseline gap-[0.5vw]">
              <span
                className="font-display uppercase text-cream"
                style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}
              >
                JONATHAN
              </span>
              <span
                className="font-display uppercase text-gold"
                style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}
              >
                [ JOJO ]
              </span>
              <span
                className="font-display uppercase text-cream"
                style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}
              >
                SUGONDO
              </span>
              <span
                className="ml-[0.3vw] font-mono text-gold"
                style={{ fontSize: ARROW_SIZE, lineHeight: 1 }}
              >
                ↓
              </span>
            </div>
          </motion.div>
        </div>

        <div className="self-end text-right">
          <motion.div variants={prefersReducedMotion ? {} : lineReveal}>
            <span
              className="block font-display uppercase text-cream"
              style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}
            >
              DEVELOPER, CAR ENTHUSIAST,
            </span>
          </motion.div>
          <motion.div
            variants={prefersReducedMotion ? {} : lineReveal}
            className="flex flex-wrap items-baseline justify-end gap-[0.8vw]"
          >
            <span
              className="font-serif italic text-gold"
              style={{ fontSize: SERIF_SIZE, lineHeight: 1.05, marginRight: "0.3em" }}
            >
              and
            </span>
            <span
              className="font-display uppercase text-cream"
              style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}
            >
              ATMOSPHERE COLLECTOR
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
