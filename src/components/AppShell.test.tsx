import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('keeps every approved section reachable from the primary navigation', () => {
    render(
      <AppShell>
        <div />
      </AppShell>,
    )

    for (const label of ['WORK', 'LAB', 'RESEARCH', 'PROFILE']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })
})
