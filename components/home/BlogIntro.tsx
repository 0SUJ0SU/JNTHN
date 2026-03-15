'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

const lineReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

function BlogIntroBackground() {
  return (
    <>
      <div className="absolute inset-0">
        <Image
          src="/images/background-2.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            #101010 0%,
            #101010 8%,
            rgb(16 16 16 / 0.7) 20%,
            rgb(16 16 16 / 0.5) 45%,
            rgb(16 16 16 / 0.7) 70%,
            #101010 90%,
            #101010 100%
          )`,
        }}
      />
    </>
  )
}

export default function BlogIntro() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative h-screen flex items-center justify-center bg-dark overflow-hidden">
      <BlogIntroBackground />
      <motion.div
        className="relative z-10 text-center px-6 md:px-8 lg:px-12"
        variants={prefersReducedMotion ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          variants={prefersReducedMotion ? undefined : lineReveal}
          className="font-display uppercase leading-[0.95] text-cream"
          style={{ fontSize: 'clamp(36px, 8vw, 130px)' }}
        >
          I WRITE TO{' '}
          <span
            className="font-serif font-normal normal-case italic text-gold"
            style={{ fontSize: 'clamp(42px, 9.5vw, 150px)' }}
          >
            think.
          </span>
        </motion.p>

        <motion.p
          variants={prefersReducedMotion ? undefined : lineReveal}
          className="font-display uppercase leading-[0.95] text-cream"
          style={{ fontSize: 'clamp(36px, 8vw, 130px)' }}
        >
          I{' '}
          <span
            className="font-serif font-normal normal-case italic text-gold"
            style={{ fontSize: 'clamp(42px, 9.5vw, 150px)' }}
          >
            notice
          </span>{' '}
          PEOPLE, TECHNOLOGY,
        </motion.p>

        <motion.p
          variants={prefersReducedMotion ? undefined : lineReveal}
          className="font-display uppercase leading-[0.95] text-cream"
          style={{ fontSize: 'clamp(36px, 8vw, 130px)' }}
        >
          AND{' '}
          <span
            className="font-serif font-normal normal-case italic text-gold"
            style={{ fontSize: 'clamp(42px, 9.5vw, 150px)' }}
          >
            the space between.
          </span>
        </motion.p>
      </motion.div>
    </section>
  )
}
