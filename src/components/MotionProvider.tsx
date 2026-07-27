import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

import { useMotionPreference } from '../hooks/useMotionPreference'

export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useMotionPreference()

  if (reducedMotion) return children

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
