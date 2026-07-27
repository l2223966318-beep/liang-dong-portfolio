import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis } from 'lenis/react'
import { useRef, type ReactNode } from 'react'

import { useMotionPreference } from '../hooks/useMotionPreference'

gsap.registerPlugin(useGSAP)

if (
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function'
) {
  gsap.registerPlugin(ScrollTrigger)
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useMotionPreference()
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reducedMotion) return

      gsap.fromTo(
        '.hero__title span',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        },
      )
      gsap.to('.page-track__progress', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.app',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
      gsap.to('.profile__visual img', {
        rotate: 3,
        yPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: '.profile',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.fromTo(
        '.capability',
        { y: 48 },
        {
          y: 0,
          duration: 0.72,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.capabilities__grid',
            start: 'top 82%',
            once: true,
          },
        },
      )
      gsap.to('.contact__ring', {
        rotate: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.contact',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      const media = gsap.matchMedia()
      media.add('(min-width: 1001px)', () => {
        gsap.fromTo(
          '.work-card',
          { xPercent: (index) => (index - 1) * 2.5 },
          {
            xPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '.work__projects',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      return () => media.revert()
    },
    {
      scope: root,
      dependencies: [reducedMotion],
      revertOnUpdate: true,
    },
  )

  const content = (
    <div
      ref={root}
      className={reducedMotion ? 'motion-root' : 'motion-root has-motion'}
    >
      <span className="page-track" aria-hidden="true">
        <span className="page-track__progress" />
      </span>
      {children}
    </div>
  )

  if (reducedMotion) return content

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {content}
    </ReactLenis>
  )
}
