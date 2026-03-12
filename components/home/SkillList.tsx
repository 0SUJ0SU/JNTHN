'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import skillsData from '@/content/skills.json'

const sortedSkills = [...skillsData].sort((a, b) => a.order - b.order)

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

const liftedState = { opacity: 1, y: -5 }
const dimmedState = { opacity: 0.2, y: 0 }
const restingState = { opacity: 1, y: 0 }
const hoverTransition = { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }

export default function SkillList() {
  const prefersReducedMotion = useReducedMotion()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col">
      <span className="font-mono text-xs tracking-wider text-gold mb-2">
        [WHAT I DO]
      </span>

      <motion.ul
        className="flex flex-col"
        variants={prefersReducedMotion ? undefined : skillListReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        role="list"
      >
        {sortedSkills.map((skill, index) => {
          const isHovered = hoveredIndex === index
          const isDimmed = hoveredIndex !== null && !isHovered

          return (
            <motion.li
              key={skill.label}
              variants={prefersReducedMotion ? undefined : skillItemReveal}
              className="border-t border-cream/15 py-3"
            >
              <motion.span
                className="inline-block w-fit cursor-default font-display text-3xl uppercase leading-none text-cream md:text-4xl"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : hoveredIndex === null
                      ? restingState
                      : isHovered
                        ? liftedState
                        : dimmedState
                }
                transition={hoverTransition}
              >
                {skill.label}
              </motion.span>
            </motion.li>
          )
        })}
        <li className="border-t border-cream/15" aria-hidden="true" />
      </motion.ul>

      <div className="mt-5 flex justify-between font-mono text-[10px] tracking-wider text-gold uppercase">
        <span>[STILL LEARNING]</span>
        <span>[JNTHN © 2026]</span>
      </div>
    </div>
  )
}
