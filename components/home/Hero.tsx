"use client"

import { useEffect, useRef } from "react"
import { motion, useReducedMotion, useInView } from "framer-motion"
import gsap from "gsap"

// ── Framer Motion Variants ────────────────────────────────────────────────────

const descriptorContainerReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
}

const descriptorLineReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const backgroundRef = useRef<HTMLDivElement>(null)
  const markRef = useRef<HTMLSpanElement>(null)
  const section2Ref = useRef<HTMLElement>(null)

  const isSection2InView = useInView(section2Ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (shouldReduceMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo(
        backgroundRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.3 }
      ).fromTo(
        markRef.current,
        { opacity: 0, y: 64 },
        { opacity: 1, y: 0, duration: 1.1 },
        "-=0.7"
      )
    })

    return () => ctx.revert()
  }, [shouldReduceMotion])

  return (
    <div className="relative" style={{ height: "200vh", isolation: "isolate" }}>

      {/* ── Background — plain image, spans full 200vh, scrolls with page ── */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full z-0"
        style={{
          height: "200vh",
          opacity: shouldReduceMotion ? 1 : 0,
          backgroundImage: "url('/hero-bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Dark overlay for legibility ── */}
      <div
        className="absolute inset-0 w-full z-[1]"
        style={{
          height: "200vh",
          background: "linear-gradient(to bottom, rgba(13,20,16,0.45) 0%, rgba(13,20,16,0.3) 50%, rgba(13,20,16,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Content layer ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ height: "200vh" }}
      >

        {/* ── Section 1: JNTHN Mark ── */}
        <section className="relative h-screen overflow-hidden flex items-center justify-center">
          <div className="w-full text-center" style={{ overflow: "visible", marginTop: "230px" }}>
            <span
              ref={markRef}
              className="font-display text-cream select-none whitespace-nowrap inline-block"
              style={{
                fontSize: "38vw",
                lineHeight: 0.88,
                letterSpacing: "-0.01em",
                opacity: shouldReduceMotion ? 1 : 0,
              }}
              aria-label="JNTHN"
            >
              JNTHN
            </span>
          </div>
        </section>

        {/* ── Section 2: Descriptor ── */}
        <section
          ref={section2Ref}
          className="relative h-screen overflow-hidden"
        >
          <motion.div
            variants={descriptorContainerReveal}
            initial="hidden"
            animate={isSection2InView ? "visible" : "hidden"}
            className="absolute inset-0 flex flex-col justify-center gap-y-16 py-14 px-6 md:px-14 lg:px-20"
          >

            {/* ── Top-left block ── */}
            <div className="self-start">
              <motion.div variants={descriptorLineReveal}>
                <div className="flex items-start gap-x-3 flex-wrap">
                  <span className="font-display text-cream uppercase" style={{ fontSize: "clamp(30px, 6.2vw, 110px)", lineHeight: 1.05 }}>JNTHN</span>
                  <span className="font-mono text-cream/40 self-center" style={{ fontSize: "clamp(8px, 0.85vw, 14px)" }}>[HOME]</span>
                  <span className="font-display text-cream uppercase" style={{ fontSize: "clamp(30px, 6.2vw, 110px)", lineHeight: 1.05 }}>IS THE FOLIO OF</span>
                </div>
              </motion.div>
              <motion.div variants={descriptorLineReveal}>
                <div className="flex items-baseline gap-x-3 flex-wrap">
                  <span className="font-display text-cream uppercase" style={{ fontSize: "clamp(30px, 6.2vw, 110px)", lineHeight: 1.05 }}>JONATHAN</span>
                  <span className="font-display text-gold uppercase" style={{ fontSize: "clamp(30px, 6.2vw, 110px)", lineHeight: 1.05 }}>[ JOJO ]</span>
                  <span className="font-display text-cream uppercase" style={{ fontSize: "clamp(30px, 6.2vw, 110px)", lineHeight: 1.05 }}>SUGONDO</span>
                  <span className="font-mono text-cream/50 ml-2" style={{ fontSize: "clamp(20px, 4vw, 80px)", lineHeight: 1 }}>↓</span>
                </div>
              </motion.div>
            </div>

            {/* ── Bottom-right block ── */}
            <div className="self-end text-right">
              <motion.div variants={descriptorLineReveal}>
                <span className="font-display text-cream uppercase block" style={{ fontSize: "clamp(30px, 6.2vw, 110px)", lineHeight: 1.05 }}>
                  DEVELOPER, CAR ENTHUSIAST,
                </span>
              </motion.div>
              <motion.div variants={descriptorLineReveal} className="flex items-baseline gap-x-4 flex-wrap justify-end">
                <span className="font-serif text-gold italic" style={{ fontSize: "clamp(26px, 5.4vw, 96px)", lineHeight: 1.05 }}>and</span>
                <span className="font-display text-cream uppercase" style={{ fontSize: "clamp(30px, 6.2vw, 110px)", lineHeight: 1.05 }}>ATMOSPHERE COLLECTOR</span>
              </motion.div>
            </div>

          </motion.div>
        </section>

      </div>
    </div>
  )
}
