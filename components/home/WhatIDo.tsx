'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import SkillList from './SkillList'

const leftColumnReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const leftChildReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function WhatIDo() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-dark px-6 md:px-8 lg:px-12 py-24 md:py-16 md:min-h-screen flex items-center">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-[2fr_3fr] md:gap-16 lg:gap-24">

        <motion.div
          className="flex flex-col gap-5 md:max-w-xs"
          variants={prefersReducedMotion ? undefined : leftColumnReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={prefersReducedMotion ? undefined : leftChildReveal}
            className="relative w-full overflow-hidden aspect-[3/2]"
          >
            <Image
              src="/images/WhatIDo.jpeg"
              alt="Atmospheric photograph — personal perspective"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </motion.div>

          <motion.h2
            variants={prefersReducedMotion ? undefined : leftChildReveal}
            className="font-display text-lg uppercase leading-none text-cream md:text-xl"
          >
            <span className="font-serif font-normal normal-case italic text-gold text-2xl">
              logical
            </span>
            {' '}MIND,
            <br />
            <span className="font-serif font-normal normal-case italic text-gold text-2xl">
              human
            </span>
            {' '}HEART
          </motion.h2>

          <motion.p
            variants={prefersReducedMotion ? undefined : leftChildReveal}
            className="font-mono text-[9px] leading-relaxed text-cream/55"
          >
            I&apos;m a computer science student who cares about what gets
            built and why. I&apos;m still learning, but I&apos;ve come to
            believe that the best solutions start with understanding people.
            Their needs, their context, their reality. Logic guides how I
            think. Empathy guides how I work.
          </motion.p>

          <motion.div variants={prefersReducedMotion ? undefined : leftChildReveal}>
            <Link
              href="/info"
              className="inline-block w-fit border border-cream/40 px-4 py-1.5 font-mono text-[9px] text-cream transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-dark"
            >
              READ MY STORY
            </Link>
          </motion.div>
        </motion.div>

        <SkillList />

      </div>
    </section>
  )
}
