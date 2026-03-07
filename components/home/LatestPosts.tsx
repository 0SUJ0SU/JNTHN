// components/home/LatestPosts.tsx
//
// Static blog preview — two hardcoded placeholder posts.
// Swap for real MDX reads in Phase 5a once blog infrastructure exists.
// Dark background bridges from the sand FeaturedWork section back to the Footer.
// Ruled lines + numbered entries mirror the visual language established in WhatIDo.

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const placeholderPosts = [
  {
    slug: 'on-building-things-nobody-asked-for',
    title: 'On Building Things Nobody Asked For',
    date: 'MAR 2026',
    lang: 'EN' as const,
  },
  {
    slug: 'teknologi-bukan-tujuan',
    title: 'Teknologi Bukan Tujuan',
    date: 'FEB 2026',
    lang: 'ID' as const,
  },
  {
    slug: 'what-i-learned-from-people-not-code',
    title: 'What I Learned From People, Not Code',
    date: 'JAN 2026',
    lang: 'EN' as const,
  },
] as const

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const postListReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
}

const postItemReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const postTitleHovered    = { opacity: 1, y: -5 }
const postTitleDimmed     = { opacity: 0.2, y: 0 }
const postTitleDefault    = { opacity: 1,  y: 0 }
const postTitleTransition = { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }

export default function LatestPosts() {
  const prefersReducedMotion = useReducedMotion()
  const [hoveredPostIndex, setHoveredPostIndex] = useState<number | null>(null)

  return (
    <section
      className="w-full h-screen flex flex-col justify-center"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
    >
      <div className="px-8 md:px-12">

        {/* Section label */}
        <motion.div
          variants={prefersReducedMotion ? {} : sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-10"
        >
          <span
            className="font-mono text-[0.65rem] uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-gold)' }}
          >
            [LATEST THOUGHTS]
          </span>
        </motion.div>

        {/* Top rule */}
        <div
          className="w-full h-px mb-0"
          style={{ backgroundColor: 'var(--color-cream)', opacity: 0.15 }}
        />

        {/* Post rows */}
        <motion.ul
          variants={prefersReducedMotion ? {} : postListReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {placeholderPosts.map((post, index) => (
            <motion.li
              key={post.slug}
              variants={prefersReducedMotion ? {} : postItemReveal}
              className="border-t flex items-baseline justify-between gap-6 py-7"
              style={{ borderColor: 'rgba(232,224,208,0.15)' }}
            >
              {/* Left — index + title */}
              <div className="flex items-baseline gap-5 min-w-0">
                <span
                  className="font-mono text-[0.6rem] tracking-wide flex-shrink-0"
                  style={{ color: 'var(--color-gold)', opacity: 0.6 }}
                >
                  [{String(index + 1).padStart(2, '0')}]
                </span>

                <Link href={`/blog/${post.slug}`}>
                  <motion.span
                    className="inline-block w-fit font-display uppercase leading-none cursor-pointer"
                    style={{ fontSize: 'clamp(22px, 3.5vw, 52px)', color: 'var(--color-cream)' }}
                    onMouseEnter={() => setHoveredPostIndex(index)}
                    onMouseLeave={() => setHoveredPostIndex(null)}
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : hoveredPostIndex === null
                          ? postTitleDefault
                          : hoveredPostIndex === index
                            ? postTitleHovered
                            : postTitleDimmed
                    }
                    transition={postTitleTransition}
                  >
                    {post.title}
                  </motion.span>
                </Link>
              </div>

              {/* Right — date + lang tag */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span
                  className="font-mono text-[0.6rem] tracking-wide"
                  style={{ color: 'var(--color-cream)', opacity: 0.4 }}
                >
                  {post.date}
                </span>
                <span
                  className="font-mono text-[0.6rem] tracking-wide"
                  style={{ color: 'var(--color-gold)' }}
                >
                  [{post.lang}]
                </span>
              </div>
            </motion.li>
          ))}
          <li className="border-t" style={{ borderColor: 'rgba(232,224,208,0.15)' }} />
        </motion.ul>

        {/* ALL POSTS link */}
        <motion.div
          variants={prefersReducedMotion ? {} : sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex justify-end mt-8"
        >
          <Link href="/blog">
            <motion.span
              className="flex items-center gap-2 cursor-pointer"
              initial={{ opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span
                className="font-mono text-[0.65rem] tracking-[0.14em] uppercase"
                style={{ color: 'var(--color-cream)' }}
              >
                ALL POSTS
              </span>
              <motion.span
                className="font-mono text-[0.65rem]"
                style={{ color: 'var(--color-gold)' }}
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                →
              </motion.span>
            </motion.span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
