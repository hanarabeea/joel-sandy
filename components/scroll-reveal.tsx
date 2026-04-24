"use client"

import { useEffect } from "react"

/**
 * Mounts a single global IntersectionObserver that watches ALL
 * elements with class reveal / reveal-left / reveal-right / reveal-scale.
 * Adds .in-view when they enter the viewport — CSS handles the animation.
 *
 * Mount this ONCE in the layout. Zero JS runs on scroll.
 */
export function ScrollReveal() {
  useEffect(() => {
    const selector = ".reveal, .reveal-left, .reveal-right, .reveal-scale"

    const observe = () => {
      const targets = document.querySelectorAll<HTMLElement>(selector)
      if (!targets.length) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view")
              observer.unobserve(entry.target) // fire once per element
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -60px 0px",
        }
      )

      targets.forEach((el) => observer.observe(el))
      return observer
    }

    // Small delay so Next.js hydration & dynamic imports finish first
    const timer = setTimeout(() => {
      const observer = observe()
      // Re-scan after 1s to catch any late-mounted dynamic components
      const rescan = setTimeout(() => observe(), 1000)
      return () => {
        clearTimeout(rescan)
        observer?.disconnect()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return null
}
