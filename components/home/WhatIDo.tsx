'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const whatIDoItems = [
  'DEVELOP FOR MOBILE',
  'CRAFT FOR THE WEB',
  'WORK WITH DATA',
  'THINK ABOUT PEOPLE',
  'LEAD WITH CLARITY',
  'BUILD WITH PURPOSE',
]

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

const skillListReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
}

const skillItemReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const skillTextHovered    = { opacity: 1, y: -5 }
const skillTextDimmed     = { opacity: 0.2, y: 0 }
const skillTextDefault    = { opacity: 1,  y: 0 }
const skillTextTransition = { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }

export default function WhatIDo() {
  const prefersReducedMotion = useReducedMotion()
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState<number | null>(null)

  return (
    <section
      className="h-screen overflow-hidden flex items-center px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: '#101010' }}
    >
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-24">

        {/* ── Left column ── */}
        <motion.div
          className="flex flex-col gap-5 max-w-[304px]"
          variants={prefersReducedMotion ? undefined : leftColumnReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={prefersReducedMotion ? undefined : leftChildReveal}
            className="relative w-full overflow-hidden aspect-[6/4]"
          >
            <Image
              src="/wid-pic.jpeg"
              alt="Jonathan"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

          <motion.div
            variants={prefersReducedMotion ? undefined : leftChildReveal}
            className="flex flex-col gap-0"
          >
            <h2 className="font-display text-lg uppercase leading-none text-cream md:text-xl">
              LOGICAL MIND,
            </h2>
            <h2 className="font-display text-lg uppercase leading-none text-cream md:text-xl">
              <span className="accent-italic">human</span>
              {' '}HEART
            </h2>
          </motion.div>

          <motion.p
            variants={prefersReducedMotion ? undefined : leftChildReveal}
            className="font-mono text-[9px] leading-relaxed text-cream/55 max-w-xs"
          >
            I&apos;m a computer science student who cares about what gets built
            and why. I&apos;m still learning, but I&apos;ve come to believe that
            the best solutions start with understanding people. Their needs, their
            context, their reality. Logic guides how I think. Empathy guides how
            I work.
          </motion.p>

          <motion.button
            variants={prefersReducedMotion ? undefined : leftChildReveal}
            className="w-fit border border-cream/40 px-4 py-1.5 font-mono text-[9px] text-cream transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-bg-dark"
          >
            READ MY STORY
          </motion.button>
        </motion.div>

        {/* ── Right column ── */}
        <div className="flex flex-col">
          <span className="bracket mb-2 text-cream/35">[WHAT I DO]</span>

          <motion.ul
            className="flex flex-col"
            variants={prefersReducedMotion ? undefined : skillListReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {whatIDoItems.map((skill, index) => (
              <motion.li
                key={skill}
                variants={prefersReducedMotion ? undefined : skillItemReveal}
                className="border-t border-cream/15 py-3"
              >
                <motion.span
                  className="inline-block w-fit cursor-default font-display text-3xl uppercase leading-none text-cream md:text-4xl"
                  onMouseEnter={() => setHoveredSkillIndex(index)}
                  onMouseLeave={() => setHoveredSkillIndex(null)}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : hoveredSkillIndex === null
                        ? skillTextDefault
                        : hoveredSkillIndex === index
                          ? skillTextHovered
                          : skillTextDimmed
                  }
                  transition={skillTextTransition}
                >
                  {skill}
                </motion.span>
              </motion.li>
            ))}
            <li className="border-t border-cream/15" />
          </motion.ul>

          <div className="mt-5 flex justify-between">
            <span className="bracket text-cream/25">[STILL LEARNING]</span>
            <span className="bracket text-cream/25">[JNTHN © 2026]</span>
          </div>
        </div>

      </div>
    </section>
  )
}
