import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { useScrollLock } from '../hooks/useScrollLock'
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
  const menuButton = useRef<HTMLButtonElement>(null)
  const navigation = useRef<HTMLElement>(null)
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

  const menuActive = mobileNavigation && menuOpen
  useScrollLock(menuActive)

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false)
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButton.current?.focus())
    }
  }, [])

  useEffect(() => {
    if (!menuActive) return

    const links = Array.from(
      navigation.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [],
    )
    links[0]?.focus()

    const isolateMenuFocus = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }

      if (event.key !== 'Tab' || links.length === 0) return

      const lastLink = links.at(-1)
      if (event.shiftKey && document.activeElement === menuButton.current) {
        event.preventDefault()
        lastLink?.focus()
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault()
        menuButton.current?.focus()
      }
    }

    window.addEventListener('keydown', isolateMenuFocus)
    return () => window.removeEventListener('keydown', isolateMenuFocus)
  }, [closeMenu, menuActive])

  const navigationClosed = mobileNavigation && !menuOpen

  return (
    <MotionProvider>
      <header className="site-header">
        <button
          className="site-menu"
          ref={menuButton}
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
          ref={navigation}
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
              onClick={() => closeMenu()}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          className="site-contact"
          href="#contact"
          aria-hidden={menuActive || undefined}
          tabIndex={menuActive ? -1 : undefined}
        >
          联系我
        </a>
      </header>
      <div
        className="site-content"
        aria-hidden={menuActive || undefined}
        inert={menuActive || undefined}
      >
        {children}
      </div>
    </MotionProvider>
  )
}
