'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { DitherEffect } from '@/components/shaders/dither-effect'
import VinylPlayer from '@/components/home/VinylPlayer'

const footerSectionReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
} as const

const footerItemSlideUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const

const footerItemFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
} as const

const footerMotionReduced = {
  initial: 'visible',
  whileInView: 'visible',
} as const

const footerMotionFull = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.15 },
} as const

const headlineWords = ['COME', 'SAY', 'HELLO'] as const

export default function Footer() {
  const prefersReducedMotion = useReducedMotion()
  const motionConfig = prefersReducedMotion ? footerMotionReduced : footerMotionFull

  return (
    <section className="relative w-full h-full bg-bg-dark overflow-hidden">

      <DitherEffect
        src="/footer-bg.jpeg"
        alt=""
        darkColor="#1e3a2f"
        lightColor="#e8e0d0"
        waveColor="#1e3a2f"
        waveShape="warp"
        waveSpeed={0.3}
        waveOpacity={0.3}
        dotSize={5.0}
        halftoneStrength={0.7}
        brushSize={180}
        trailFade={0.97}
        hoverReveal={true}
        className="absolute inset-0 z-0"
      />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-bg-dark/70 via-bg-dark/20 to-bg-dark/30" />

      <motion.div
        variants={footerSectionReveal}
        {...motionConfig}
        className="absolute top-1/2 -translate-y-1/2 right-0 pr-28 md:pr-40 z-20 translate-x-[-20px] pointer-events-none"
      >
        <motion.div variants={footerItemSlideUp}>
          <VinylPlayer />
        </motion.div>
      </motion.div>

      <motion.div
        variants={footerItemFade}
        {...motionConfig}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
      >
        <Image
          src="/jumpa.png"
          alt="jumpa"
          width={540}
          height={1800}
          priority
          className="object-contain w-auto"
          style={{ height: '51vh', width: 'auto' }}
        />
      </motion.div>

      <motion.div
        variants={footerSectionReveal}
        {...motionConfig}
        className="absolute top-1/2 -translate-y-1/2 left-0 pl-28 md:pl-40 z-10 pointer-events-none"
      >
        {headlineWords.map((word) => (
          <motion.div key={word} variants={footerItemSlideUp}>
            <span className="font-display text-cream text-footer-headline block leading-[0.9] text-center">
              {word}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={footerSectionReveal}
        {...motionConfig}
        className="absolute bottom-10 left-10 right-10 flex justify-between items-end z-30 pointer-events-none"
      >
        <motion.a
          variants={footerItemFade}
          href="https://linkedin.com/in/jonathan-sugondo-6297a0287"
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-cream text-lg md:text-2xl tracking-wide hover:text-gold transition-colors duration-300 inline-flex items-center gap-2 pointer-events-auto"
        >
          <span>LINKEDIN</span>
          <span className="font-mono text-sm">→</span>
        </motion.a>
        <motion.a
          variants={footerItemFade}
          href="mailto:jonathansugondo@gmail.com"
          className="font-display text-cream text-lg md:text-2xl tracking-wide hover:text-gold transition-colors duration-300 inline-flex items-center gap-2 pointer-events-auto"
        >
          <span>EMAIL</span>
          <span className="font-mono text-sm">→</span>
        </motion.a>
      </motion.div>

    </section>
  )
}
