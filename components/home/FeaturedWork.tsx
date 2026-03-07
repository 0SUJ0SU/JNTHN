// components/home/FeaturedWork.tsx
//
// Scroll-driven reveal: "FEATURED — PROJECTS" heading fades out as the two project
// cards and VIEW ALL WORK button rise up from below. karya.png lives in its own
// always-visible layer centered between the cards. The outer section is 200vh tall
// to give the scroll animation room; the inner div sticks to the viewport.

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const featuredProjects = [
  {
    name: 'INVENTRA',
    stack: ['[NEXT.JS]', '[PRISMA]', '[NEXTAUTH]'],
  },
  {
    name: "VALENTINE'S",
    stack: ['[NEXT.JS]', '[TAILWIND]', '[FRAMER]'],
  },
] as const

const viewAllWorkButtonHover = {
  rest: { backgroundColor: 'var(--color-bg-dark)' },
  hover: {
    backgroundColor: 'var(--color-gold)',
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const viewAllWorkButtonTextHover = {
  rest: { color: 'var(--color-gold)' },
  hover: {
    color: 'var(--color-bg-dark)',
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const cardImageScale = {
  rest: { scale: 1 },
  hover: { scale: 0.98, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

const duplicateFadeIn = {
  rest: { opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
  hover: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

const MotionLink = motion(Link)

export default function FeaturedWork() {
  const prefersReducedMotion = useReducedMotion()
  const sectionScrollRef    = useRef<HTMLDivElement>(null)

  const [viewportHeight, setViewportHeight] = useState(1000)
  useEffect(() => { setViewportHeight(window.innerHeight) }, [])

  const { scrollYProgress } = useScroll({
    target: sectionScrollRef,
    offset: ['start start', 'end end'],
  })

  const headingOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0])
  const cardsY         = useTransform(scrollYProgress, [0.19, 0.75], [viewportHeight, viewportHeight * 0.05 + 13])

  return (
    <section
      ref={sectionScrollRef}
      className="relative h-[200vh]"
      style={{ backgroundColor: '#dddbd5' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── FEATURED / PROJECTS heading — fades out on scroll ── */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center"
          style={prefersReducedMotion ? { opacity: 0 } : { opacity: headingOpacity }}
        >
          <div className="grid w-full items-center" style={{ gridTemplateColumns: '1fr 14% 1fr' }}>
            <span
              className="font-display uppercase leading-none text-charcoal select-none text-right"
              style={{ fontSize: 'clamp(48.1px, 10.1vw, 150.1px)' }}
            >
              FEATURED
            </span>
            <div />
            <span
              className="font-display uppercase leading-none text-charcoal select-none text-left"
              style={{ fontSize: 'clamp(48.1px, 10.1vw, 150.1px)' }}
            >
              PROJECTS
            </span>
          </div>
        </motion.div>

        {/* ── karya.png — always visible, always centered ── */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
          <div className="relative w-[14%]" style={{ height: '370px' }}>
            <Image
              src="/karya.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* ── Cards + button — slide up on scroll ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 -mt-[32px]"
          style={prefersReducedMotion ? {} : { y: cardsY }}
        >
          {/* Cards row — center gap mirrors karya width */}
          <div className="flex w-full items-start gap-5 px-8 md:px-12">

            {/* Left card — Inventra */}
            <div className="flex flex-1 flex-col gap-2 scale-95">
              <span className="font-mono text-[0.65rem] uppercase tracking-wide text-charcoal pb-1">
                {featuredProjects[0].name}
              </span>
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative"
              >
                <motion.div
                  variants={cardImageScale}
                  className="relative w-full aspect-[4/3] overflow-hidden"
                >
                  <Image src="/wid-pic.jpeg" alt={featuredProjects[0].name} fill className="object-cover" />
                </motion.div>
                <motion.div
                  variants={duplicateFadeIn}
                  className="absolute overflow-hidden"
                  style={{ width: '58%', aspectRatio: '4/3', top: '25%', left: '21%' }}
                >
                  <Image src="/wid-pic.jpeg" alt="" fill className="object-cover" />
                </motion.div>
              </motion.div>
              <div className="flex justify-end gap-1 pt-1">
                {featuredProjects[0].stack.map((tag) => (
                  <span key={tag} className="font-mono text-[0.65rem] text-gold">{tag}</span>
                ))}
              </div>
            </div>

            {/* Center spacer — keeps cards clear of karya */}
            <div className="w-[14%] flex-shrink-0" />

            {/* Right card — Valentine's */}
            <div className="flex flex-1 flex-col gap-2 scale-95">
              <span className="font-mono text-[0.65rem] uppercase tracking-wide text-charcoal pb-1">
                {featuredProjects[1].name}
              </span>
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative"
              >
                <motion.div
                  variants={cardImageScale}
                  className="relative w-full aspect-[4/3] overflow-hidden"
                >
                  <Image src="/wid-pic.jpeg" alt={featuredProjects[1].name} fill className="object-cover" />
                </motion.div>
                <motion.div
                  variants={duplicateFadeIn}
                  className="absolute overflow-hidden"
                  style={{ width: '58%', aspectRatio: '4/3', top: '25%', left: '21%' }}
                >
                  <Image src="/wid-pic.jpeg" alt="" fill className="object-cover" />
                </motion.div>
              </motion.div>
              <div className="flex justify-end gap-1 pt-1">
                {featuredProjects[1].stack.map((tag) => (
                  <span key={tag} className="font-mono text-[0.65rem] text-gold">{tag}</span>
                ))}
              </div>
            </div>

          </div>

          {/* VIEW ALL WORK */}
          <MotionLink
            href="/work"
            variants={viewAllWorkButtonHover}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="mt-6 px-4 py-2 flex items-center justify-center"
          >
            <motion.span
              variants={viewAllWorkButtonTextHover}
              className="font-mono text-[0.65rem] tracking-[0.12em] uppercase"
            >
              VIEW ALL WORK
            </motion.span>
          </MotionLink>

        </motion.div>

      </div>
    </section>
  )
}
