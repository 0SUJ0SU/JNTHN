"use client"

import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useState, useEffect } from "react"

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/work" },
  { label: "SIDE", href: "/side" },
  { label: "BLOG", href: "/blog" },
] as const

const markReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const menuButtonReveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 },
  },
}

const navOverlaySlide = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] as const },
  },
}

const overlayLinksContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const overlayLinkReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const menuButtonHover = {
  rest: { backgroundColor: "var(--color-bg-dark)" },
  hover: {
    backgroundColor: "var(--color-gold)",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const menuButtonTextHover = {
  rest: { color: "var(--color-gold)" },
  hover: {
    color: "var(--color-bg-dark)",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function Nav() {
  const prefersReducedMotion = useReducedMotion()
  const [navVisible, setNavVisible] = useState(true)
  const [overlayOpen, setOverlayOpen] = useState(false)

  useEffect(() => {
    let previousScrollY = window.scrollY

    const onScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > previousScrollY
      setNavVisible(currentScrollY < 10 || !scrollingDown)
      previousScrollY = currentScrollY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [overlayOpen])

  const entranceInitial = prefersReducedMotion ? "visible" : "hidden"
  const overlayVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : (navOverlaySlide as import("framer-motion").Variants)

  return (
    <>
      <motion.nav
        animate={{ y: navVisible || overlayOpen ? 0 : "-100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="flex items-center justify-between px-8 md:px-12 py-5">
          <motion.div
            variants={markReveal}
            initial={entranceInitial}
            animate="visible"
          >
            <Link
              href="/"
              onClick={() => setOverlayOpen(false)}
              className="font-display text-gold text-2xl font-black uppercase tracking-tight leading-none"
            >
              JNTHN
            </Link>
          </motion.div>

          <motion.div
            variants={menuButtonReveal}
            initial={entranceInitial}
            animate="visible"
          >
            <motion.button
              variants={menuButtonHover}
              initial="rest"
              whileHover="hover"
              animate="rest"
              onClick={() => setOverlayOpen((prev) => !prev)}
              className="px-4 py-2"
              aria-label={overlayOpen ? "Close navigation" : "Open navigation"}
            >
              <motion.span
                variants={menuButtonTextHover}
                className="font-mono text-[0.65rem] tracking-[0.12em] uppercase"
              >
                {overlayOpen ? "CLOSE" : "MENU"}
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-bg-dark flex flex-col justify-end px-8 md:px-12 pb-20 pt-28"
          >
            <motion.ul
              variants={overlayLinksContainer}
              initial="hidden"
              animate="visible"
              className="list-none flex flex-col gap-2"
            >
              {NAV_LINKS.map((navLink) => (
                <motion.li key={navLink.href} variants={overlayLinkReveal}>
                  <Link
                    href={navLink.href}
                    onClick={() => setOverlayOpen(false)}
                    className="font-display text-cream text-[clamp(3.5rem,10vw,7rem)] font-black uppercase leading-[0.9] tracking-tight hover:text-gold transition-colors duration-300 block"
                  >
                    {navLink.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
