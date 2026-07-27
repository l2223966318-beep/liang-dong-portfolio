import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('keeps every approved section reachable from the primary navigation', () => {
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
})
