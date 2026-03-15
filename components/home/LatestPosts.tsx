'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import type { BlogPost } from '@/types/blog'

const hoveredTitle = { opacity: 1, color: '#b8a164' }
const dimmedTitle = { opacity: 0.2, color: '#e8e0d0' }
const restingTitle = { opacity: 1, color: '#e8e0d0' }
const hoverTransition = { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as const }

const listReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const postReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

function formatPostDate(isoDate: string): string {
  return new Date(isoDate)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase()
}

function LatestPostsBackground() {
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

export default function LatestPosts({ posts }: { posts: BlogPost[] }) {
  const prefersReducedMotion = useReducedMotion()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (posts.length === 0) return null

  return (
    <section className="relative bg-dark px-6 md:px-8 lg:px-12 py-24 md:py-32 lg:py-40">
      <LatestPostsBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        <span className="font-mono text-[10px] text-gold/60 tracking-wide block mb-10">
          [LATEST POSTS]
        </span>

        <motion.ul
          className="flex flex-col"
          variants={prefersReducedMotion ? undefined : listReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          role="list"
        >
          {posts.map((post, index) => (
            <motion.li
              key={post.slug}
              variants={prefersReducedMotion ? undefined : postReveal}
              className="border-t border-cream/[.12] py-6 md:py-8"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <motion.span
                  className="inline-block w-fit cursor-pointer font-display text-3xl md:text-4xl lg:text-5xl uppercase leading-none"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : hoveredIndex === null
                        ? restingTitle
                        : hoveredIndex === index
                          ? hoveredTitle
                          : dimmedTitle
                  }
                  transition={hoverTransition}
                >
                  {post.title}
                </motion.span>
                <span className="flex gap-3 mt-2 font-mono text-[10px] tracking-wide text-cream/35">
                  <span>{formatPostDate(post.date)}</span>
                  <span className="text-gold/60">[{post.lang.toUpperCase()}]</span>
                </span>
              </Link>
            </motion.li>
          ))}
          <li className="border-t border-cream/[.12]" aria-hidden="true" />
        </motion.ul>

        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-block border border-cream/40 px-5 py-2 font-mono text-[0.65rem] tracking-[0.12em] uppercase text-cream transition-colors duration-300 hover:bg-cream hover:text-dark"
          >
            ALL POSTS
          </Link>
        </div>
      </div>
    </section>
  )
}
