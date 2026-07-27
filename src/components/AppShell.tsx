import { useEffect, useState, type ReactNode } from 'react'

import { MotionProvider } from './MotionProvider'

const navItems = [
  ['项目', '#work'],
  ['AIGC', '#capabilities'],
  ['研究', '#research'],
  ['关于', '#profile'],
] as const

const mobileNavigationQuery = '(max-width: 760px)'

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileNavigation, setMobileNavigation] = useState(() =>
    typeof window.matchMedia === 'function'
      ? window.matchMedia(mobileNavigationQuery).matches
      : false,
  )

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return

    const mediaQuery = window.matchMedia(mobileNavigationQuery)
    const updateNavigationMode = () => setMobileNavigation(mediaQuery.matches)
    updateNavigationMode()
    mediaQuery.addEventListener('change', updateNavigationMode)

    return () =>
      mediaQuery.removeEventListener('change', updateNavigationMode)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const navigationClosed = mobileNavigation && !menuOpen

  return (
    <MotionProvider>
      <header className="site-header">
        <button
          className="site-menu"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? '关闭导航' : '打开导航'}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav
          className={menuOpen ? 'site-nav is-open' : 'site-nav'}
          id="primary-navigation"
          aria-label="作品集主导航"
          aria-hidden={navigationClosed || undefined}
          inert={navigationClosed || undefined}
        >
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              tabIndex={navigationClosed ? -1 : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="site-contact" href="#contact">
          联系我
        </a>
      </header>
      {children}
    </MotionProvider>
  )
}
