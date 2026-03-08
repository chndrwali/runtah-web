"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface UseGsapRevealOptions {
  /** Distance to translate Y (in pixels) */
  y?: number;
  /** Distance to translate X (in pixels) */
  x?: number;
  /** Stagger delay between elements */
  stagger?: number;
  /** Animation duration */
  duration?: number;
  /** Initial delay */
  delay?: number;
  /** The CSS class to target elements within the ref */
  targetClass?: string;
  /** GSAP easing */
  ease?: string;
}

export function useGsapReveal<T extends HTMLElement>(
  options: UseGsapRevealOptions = {},
) {
  const ref = useRef<T>(null);

  const {
    y = 50,
    x = 0,
    stagger = 0.15,
    duration = 0.8,
    delay = 0,
    targetClass = ".gsap-reveal",
    ease = "power3.out",
  } = options;

  useGSAP(
    () => {
      // Find all elements to reveal
      const elements = ref.current?.querySelectorAll(targetClass);

      if (!elements || elements.length === 0) return;

      // Make elements visible right before animation to prevent FOUC, but GSAP `from` handles opacity from 0
      gsap.set(elements, { opacity: 0 });

      gsap.fromTo(
        elements,
        {
          y: y,
          x: x,
          opacity: 0,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: ease,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: ref },
  );

  return ref;
}
