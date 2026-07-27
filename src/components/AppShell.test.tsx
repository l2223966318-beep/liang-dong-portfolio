import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { AppShell } from './AppShell'

function mockMobileViewport(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn((query: string) => ({
      matches:
        query === '(max-width: 900px)'
          ? matches
          : query === '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  })
}

describe('AppShell', () => {
  it('keeps every approved section reachable from the primary navigation', () => {
    mockMobileViewport(false)
    render(
      <AppShell>
        <div />
      </AppShell>,
    )

    expect(screen.getByRole('link', { name: '项目' })).toHaveAttribute(
      'href',
      '#work',
    )
    expect(screen.getByRole('link', { name: 'AIGC' })).toHaveAttribute(
      'href',
      '#capabilities',
    )
    expect(screen.getByRole('link', { name: '研究' })).toHaveAttribute(
      'href',
      '#research',
    )
    expect(screen.getByRole('link', { name: '关于' })).toHaveAttribute(
      'href',
      '#profile',
    )
    expect(screen.getByRole('link', { name: '联系我' })).toHaveAttribute(
      'href',
      '#contact',
    )
    expect(screen.getByRole('button', { name: '打开导航' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )

    fireEvent.click(screen.getByRole('button', { name: '打开导航' }))
    expect(screen.getByRole('button', { name: '关闭导航' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )

    fireEvent.click(screen.getByRole('link', { name: '项目' }))
    expect(screen.getByRole('button', { name: '打开导航' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('keeps closed mobile navigation links out of the tab order', async () => {
    const user = userEvent.setup()
    mockMobileViewport(true)
    render(
      <AppShell>
        <div />
      </AppShell>,
    )

    const navigation = document.querySelector('#primary-navigation')
    expect(navigation).toHaveAttribute('inert')
    expect(navigation).toHaveAttribute('aria-hidden', 'true')

    await user.tab()
    expect(screen.getByRole('button', { name: '打开导航' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('link', { name: '联系我' })).toHaveFocus()
  })
})
