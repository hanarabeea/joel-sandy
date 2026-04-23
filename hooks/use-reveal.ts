"use client"

import { useEffect, useRef } from "react"

/**
 * Attaches an IntersectionObserver to a container ref.
 * All children with class "reveal" inside the container get
 * .is-visible added when they enter the viewport.
 * CSS handles the actual animation (compositor-thread only).
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const targets = container.querySelectorAll<HTMLElement>(".reveal")
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target) // fire once
          }
        })
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    )

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [threshold])

  return ref
}
