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
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const menuButtonReveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
}

const navOverlaySlide = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Nav() {
  const prefersReducedMotion = useReducedMotion()
  const [isScrolledPast, setIsScrolledPast] = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolledPast(window.scrollY > 80)
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
    : navOverlaySlide

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolledPast && !overlayOpen
            ? "bg-bg-dark/90 backdrop-blur-sm border-b border-cream/[0.06]"
            : "bg-transparent"
        }`}
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
              className="font-display text-cream text-2xl font-black uppercase tracking-tight leading-none hover:text-gold transition-colors duration-300"
            >
              JNTHN
            </Link>
          </motion.div>

          <motion.button
            variants={menuButtonReveal}
            initial={entranceInitial}
            animate="visible"
            onClick={() => setOverlayOpen((prev) => !prev)}
            className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-gold opacity-70 hover:opacity-100 transition-opacity duration-300"
            aria-label={overlayOpen ? "Close navigation" : "Open navigation"}
          >
            {overlayOpen ? "CLOSE" : "MENU"}
          </motion.button>
        </div>
      </nav>

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
