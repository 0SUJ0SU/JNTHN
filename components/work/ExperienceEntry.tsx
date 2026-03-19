'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ExperienceEntry as ExperienceEntryType } from '@/types/content'

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
]

function formatDate(isoMonth: string): string {
  const [year, month] = isoMonth.split('-')
  const monthIndex = parseInt(month, 10) - 1
  return `${MONTHS[monthIndex]} ${year}`
}

function formatRange(
  startDate: string,
  endDate: string | null,
  current: boolean
): string {
  const start = formatDate(startDate)
  const end = current ? 'PRESENT' : endDate ? formatDate(endDate) : ''
  return `${start} – ${end}`
}

const containerReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const childReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

interface ExperienceEntryProps {
  entry: ExperienceEntryType
  index: number
  alignRight: boolean
}

export default function ExperienceEntry({
  entry,
  index,
  alignRight,
}: ExperienceEntryProps) {
  const prefersReducedMotion = useReducedMotion()
  const number = String(index + 1).padStart(2, '0')
  const range = formatRange(entry.startDate, entry.endDate, entry.current)

  const alignment = alignRight
    ? 'items-start text-left md:items-end md:text-right'
    : 'items-start text-left'

  return (
    <motion.article
      className={`flex flex-col ${alignment}`}
      variants={prefersReducedMotion ? undefined : containerReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.span
        className="font-mono text-xs tracking-wider text-gold"
        variants={prefersReducedMotion ? undefined : childReveal}
      >
        [{number}]
      </motion.span>

      <motion.h3
        className="mt-2 font-display text-4xl uppercase leading-[0.85] text-cream sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl"
        variants={prefersReducedMotion ? undefined : childReveal}
      >
        {entry.company}
      </motion.h3>

      <motion.div
        className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] tracking-wider sm:text-xs"
        variants={prefersReducedMotion ? undefined : childReveal}
      >
        <span className="text-cream/50">[{entry.role.toUpperCase()}]</span>
        <span className="text-cream/50">[{entry.location.toUpperCase()}]</span>
        <span className={entry.current ? 'text-gold' : 'text-cream/50'}>
          [{range}]
        </span>
      </motion.div>

      <motion.p
        className="mt-3 max-w-md font-mono text-xs leading-relaxed text-cream/50"
        variants={prefersReducedMotion ? undefined : childReveal}
      >
        {entry.description}
      </motion.p>
    </motion.article>
  )
}
