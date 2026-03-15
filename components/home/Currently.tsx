'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import currentlyData from '@/content/currently.json'
import type { CurrentlyItem } from '@/types/content'
import CurrentlyHeadline from './CurrentlyHeadline'
import CurrentlyList from './CurrentlyList'

const leftStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

function CurrentlyBackground() {
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

export default function Currently() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const scrollingListRef = useRef<HTMLDivElement>(null)
  const allItems = currentlyData as CurrentlyItem[]
  const buildingItems = allItems.filter(entry => entry.type === 'building')
  const studyingItems = allItems.filter(entry => entry.type === 'studying')
  const [scrollExtent, setScrollExtent] = useState({
    startY: 0,
    endY: 0,
    height: '100vh',
  })

  const recalculateScrollExtent = useCallback(() => {
    const leftEl = leftPanelRef.current
    const listEl = scrollingListRef.current
    if (!leftEl || !listEl) return
    const leftHeight = leftEl.offsetHeight
    if (leftHeight === 0) return
    const viewportHeight = window.innerHeight
    const listHeight = listEl.scrollHeight
    const leftTop = (viewportHeight - leftHeight) / 2
    const leftBottom = leftTop + leftHeight
    const travelDistance = Math.abs(leftTop - (leftBottom - listHeight))
    setScrollExtent({
      startY: leftTop,
      endY: leftBottom - listHeight,
      height: `${viewportHeight + travelDistance * 2.5}px`,
    })
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    requestAnimationFrame(recalculateScrollExtent)
    const layoutObserver = new ResizeObserver(recalculateScrollExtent)
    if (leftPanelRef.current) layoutObserver.observe(leftPanelRef.current)
    if (scrollingListRef.current) layoutObserver.observe(scrollingListRef.current)
    window.addEventListener('resize', recalculateScrollExtent)
    return () => {
      layoutObserver.disconnect()
      window.removeEventListener('resize', recalculateScrollExtent)
    }
  }, [recalculateScrollExtent, prefersReducedMotion])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const listScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    [scrollExtent.startY, scrollExtent.endY],
  )

  if (allItems.length === 0) return null

  if (prefersReducedMotion) {
    return (
      <section className="relative bg-dark px-6 md:px-8 lg:px-12 py-24 md:py-32">
        <CurrentlyBackground />
        <div className="relative mx-auto max-w-7xl flex flex-col gap-5">
          <CurrentlyHeadline animated={false} />
          <div className="mt-6">
            <CurrentlyList buildingItems={buildingItems} studyingItems={studyingItems} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="relative">
      <section className="bg-dark px-6 md:px-8 lg:px-12 py-24 md:py-32 lg:hidden">
        <CurrentlyBackground />
        <div className="relative mx-auto max-w-7xl flex flex-col gap-5">
          <CurrentlyHeadline animated={false} />
          <div className="mt-6">
            <CurrentlyList buildingItems={buildingItems} studyingItems={studyingItems} />
          </div>
        </div>
      </section>

      <section
        ref={sectionRef}
        className="relative hidden lg:block bg-dark"
        style={{ height: scrollExtent.height }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <CurrentlyBackground />
          <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-[2fr_3fr] gap-24 px-12">
            <motion.div
              className="flex h-screen flex-col justify-center"
              variants={leftStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div ref={leftPanelRef} className="flex flex-col gap-5">
                <CurrentlyHeadline animated />
              </div>
            </motion.div>
            <motion.div ref={scrollingListRef} className="relative" style={{ y: listScrollY }}>
              <CurrentlyList buildingItems={buildingItems} studyingItems={studyingItems} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
