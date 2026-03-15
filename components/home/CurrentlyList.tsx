'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { CurrentlyItem } from '@/types/content'

const entryHovered = { opacity: 1, y: -5 }
const entryDimmed = { opacity: 0.2, y: 0 }
const entryDefault = { opacity: 1, y: 0 }
const entryTransition = { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as const }

export default function CurrentlyList({
  buildingItems,
  studyingItems,
}: {
  buildingItems: CurrentlyItem[]
  studyingItems: CurrentlyItem[]
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-6">
      {buildingItems.length > 0 && (
        <CurrentlyGroup
          label="BUILDING"
          entries={buildingItems}
          startIndex={0}
          hoveredIndex={hoveredIndex}
          onHover={setHoveredIndex}
        />
      )}
      {studyingItems.length > 0 && (
        <CurrentlyGroup
          label="STUDYING"
          entries={studyingItems}
          startIndex={buildingItems.length}
          hoveredIndex={hoveredIndex}
          onHover={setHoveredIndex}
        />
      )}
    </div>
  )
}

function CurrentlyGroup({
  label,
  entries,
  startIndex,
  hoveredIndex,
  onHover,
}: {
  label: string
  entries: CurrentlyItem[]
  startIndex: number
  hoveredIndex: number | null
  onHover: (index: number | null) => void
}) {
  return (
    <div>
      <span className="font-mono text-[10px] text-gold tracking-wide mb-4 block">
        [{label}]
      </span>
      {entries.map((entry, localIndex) => {
        const globalIndex = startIndex + localIndex
        return (
          <div
            key={entry.label}
            className="border-t border-cream/[.12] py-[22px] cursor-default"
            onMouseEnter={() => onHover(globalIndex)}
            onMouseLeave={() => onHover(null)}
          >
            <motion.div
              animate={
                hoveredIndex === null
                  ? entryDefault
                  : hoveredIndex === globalIndex
                    ? entryHovered
                    : entryDimmed
              }
              transition={entryTransition}
            >
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase leading-none text-cream">
                {entry.label}
              </h3>
              <span className="font-mono text-[10px] text-cream/35 mt-1.5 block">
                {entry.detail}
              </span>
            </motion.div>
          </div>
        )
      })}
      <div className="border-t border-cream/[.12]" />
    </div>
  )
}
