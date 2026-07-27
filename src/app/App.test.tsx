import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from './App'

describe('App', () => {
  it('renders the approved portfolio statement', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /make signals matter/i }),
    ).toBeInTheDocument()
  })
})
