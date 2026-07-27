import type { ReactNode } from 'react'

import { MotionProvider } from './MotionProvider'

const navItems = [
  ['WORK', '#work'],
  ['LAB', '#lab'],
  ['RESEARCH', '#research'],
  ['PROFILE', '#profile'],
] as const

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <header className="site-header">
        <a className="site-mark" href="#top" aria-label="返回首页">
          LD<sup>®</sup>
        </a>
        <nav className="site-nav" aria-label="作品集主导航">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <span className="site-status">
          <i aria-hidden="true" />
          OPEN TO WORK
        </span>
      </header>
      {children}
    </MotionProvider>
  )
}
