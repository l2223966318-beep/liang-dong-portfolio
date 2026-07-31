import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Hero } from './Hero'

describe('Hero', () => {
  it('keeps the hero free of the bottom preview rail', () => {
    const { container } = render(<Hero />)

    expect(container.querySelector('.hero__next')).not.toBeInTheDocument()
  })
})
