'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'

type VinylPlayerState =
  | { status: 'closed' }
  | { status: 'open'; isPlaying: boolean }

const VINYL_PEEK_X  = 20
const VINYL_OPEN_X  = 56
const ALBUM_PEEK_X  = -20
const ALBUM_OPEN_X  = -56

const vinylSlideIn = {
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
}

export default function VinylPlayer() {
  const prefersReducedMotion = useReducedMotion()
  const audioRef             = useRef<HTMLAudioElement>(null)

  const [playerState, setPlayerState] = useState<VinylPlayerState>({ status: 'closed' })
  const [isHovered,   setIsHovered  ] = useState(false)

  function openPlayer() {
    setPlayerState({ status: 'open', isPlaying: false })
  }

  function closePlayerAndResetAudio() {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setPlayerState({ status: 'closed' })
  }

  function toggleTrackPlayback() {
    if (playerState.status !== 'open') return
    if (!audioRef.current) return

    if (playerState.isPlaying) {
      audioRef.current.pause()
      setPlayerState({ status: 'open', isPlaying: false })
    } else {
      audioRef.current.volume = 0.3
      audioRef.current.play()
      setPlayerState({ status: 'open', isPlaying: true })
    }
  }

  const vinylX = prefersReducedMotion
    ? VINYL_OPEN_X
    : playerState.status === 'open'
      ? VINYL_OPEN_X
      : isHovered
        ? VINYL_PEEK_X
        : 0

  const discIsSpinning =
    playerState.status === 'open' &&
    playerState.isPlaying &&
    !prefersReducedMotion

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="bracket text-cream">[CURRENTLY ON REPEAT]</span>

      <audio ref={audioRef} src="/footer-music.mp3" preload="none" />

      {/* Overflow visible so vinyl can extend right beyond album art bounds */}
      <div
        className="relative w-44 h-44 md:w-48 md:h-48 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <motion.div
          animate={{ x: vinylX }}
          transition={vinylSlideIn.transition}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          {/* Play button is a sibling to the spinning div so it never rotates with the disc */}
          <div className={`w-full h-full rounded-full bg-gold relative ${discIsSpinning ? 'animate-vinyl-spin' : ''}`}>
            <div className="absolute inset-[14%] rounded-full border border-bg-dark opacity-20" />
            <div className="absolute inset-[28%] rounded-full border border-bg-dark opacity-15" />
            <div className="absolute inset-[40%] rounded-full border border-bg-dark opacity-15" />
            <div className="absolute inset-[44%] rounded-full bg-bg-dark" />
          </div>

          {playerState.status === 'open' && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleTrackPlayback() }}
              aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div className="w-10 h-10 rounded-full bg-bg-dark flex items-center justify-center">
                {playerState.isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <rect x="2" y="2" width="3.5" height="10" fill="var(--color-cream)" />
                    <rect x="8.5" y="2" width="3.5" height="10" fill="var(--color-cream)" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 2L12 7L3 12V2Z" fill="var(--color-cream)" />
                  </svg>
                )}
              </div>
            </button>
          )}
        </motion.div>

        <motion.div
          animate={{
            x: prefersReducedMotion
              ? ALBUM_OPEN_X
              : playerState.status === 'open'
                ? ALBUM_OPEN_X
                : isHovered
                  ? ALBUM_PEEK_X
                  : 0
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-10 overflow-hidden rounded-xl cursor-pointer"
          onClick={playerState.status === 'closed' ? openPlayer : closePlayerAndResetAudio}
        >
          <Image
            src="/footer-music.jpg"
            alt="Drive Safe — Niall Horan & Myles Smith"
            fill
            sizes="(max-width: 768px) 160px, 192px"
            className="object-cover grayscale"
          />
        </motion.div>

      </div>

      <span className="bracket text-cream text-center">
        [DRIVE SAFE]
      </span>
    </div>
  )
}
