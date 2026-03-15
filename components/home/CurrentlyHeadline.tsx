'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const childFadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function CurrentlyHeadline({ animated }: { animated: boolean }) {
  const variants = animated ? childFadeUp : undefined

  return (
    <>
      <motion.span
        variants={variants}
        className="font-mono text-[10px] text-gold/60 tracking-wide"
      >
        [CURRENTLY]
      </motion.span>

      <motion.h2
        variants={variants}
        className="font-display uppercase leading-[0.9] text-cream"
        style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
      >
        STILL{' '}
        <span
          className="font-serif font-normal normal-case italic text-gold"
          style={{ fontSize: 'clamp(44px, 13vw, 80px)' }}
        >
          somewhere
        </span>
        <br />
        IN{' '}
        <span
          className="font-serif font-normal normal-case italic text-gold"
          style={{ fontSize: 'clamp(44px, 13vw, 80px)' }}
        >
          between
        </span>
      </motion.h2>

      <motion.p
        variants={variants}
        className="font-mono text-[9px] leading-relaxed text-cream/45 max-w-xs"
      >
        I don&apos;t have it all figured out. I have gaps, blind spots,
        and things I&apos;m only beginning to understand. Here&apos;s
        where I am right now.
      </motion.p>

      <motion.div variants={variants}>
        <Link
          href="/work"
          className="inline-block border border-cream/40 px-5 py-2 font-mono text-[0.65rem] tracking-[0.12em] uppercase text-cream transition-colors duration-300 hover:bg-cream hover:text-dark mt-2"
        >
          ON THE SIDE
        </Link>
      </motion.div>

      <motion.span
        variants={variants}
        className="font-mono text-[10px] text-gold/40 tracking-wide mt-4"
      >
        [LAST UPDATED MARCH 2026]
      </motion.span>
    </>
  )
}
