"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import useReducedMotion from "@/hooks/useReducedMotion";
import WorkDescriptor from "./WorkDescriptor";

export default function WorkHero() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const background = backgroundRef.current;
    const mark = markRef.current;
    if (!background || !mark) return;

    if (prefersReducedMotion) {
      gsap.set([background, mark], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });

      entrance
        .fromTo(background, { opacity: 0 }, { opacity: 1, duration: 1.3 })
        .fromTo(
          mark,
          { opacity: 0, y: 64 },
          { opacity: 1, y: 0, duration: 1.1 },
          "-=0.7"
        );
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="relative" style={{ height: "200vh", isolation: "isolate" }}>
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{ height: "200vh", opacity: prefersReducedMotion ? 1 : 0 }}
      >
        <Image
          src="/images/background-1.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      <div
        className="hero-gradient absolute inset-0 z-[1]"
        style={{ height: "200vh" }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-10" style={{ height: "200vh" }}>
        <section className="relative flex h-screen items-end justify-center overflow-hidden">
          <div className="mb-[5vh] w-full text-center md:mb-[3vh]">
            <span
              ref={markRef}
              className="inline-block select-none whitespace-nowrap font-display text-cream"
              style={{
                fontSize: "clamp(120px, 38vw, 600px)",
                lineHeight: 0.88,
                letterSpacing: "-0.01em",
                opacity: prefersReducedMotion ? 1 : 0,
              }}
              aria-label="WORK"
            >
              WORK
            </span>
          </div>
        </section>

        <WorkDescriptor />
      </div>
    </div>
  );
}
