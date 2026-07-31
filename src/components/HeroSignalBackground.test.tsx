import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { HeroSignalBackground } from './HeroSignalBackground'

vi.mock('../hooks/useMotionPreference', () => ({
  useMotionPreference: () => false,
}))

describe('HeroSignalBackground', () => {
  it('floats one World Cup poster with four other AIGC poster works', () => {
    const { container } = render(<HeroSignalBackground />)
    const posters = Array.from(
      container.querySelectorAll<HTMLImageElement>('.hero-signal__frame img'),
      (image) => image.getAttribute('src'),
    )

    expect(posters).toEqual([
      '/assets/aigc/poster-worldcup.webp',
      '/assets/aigc/design-opera.webp',
      '/assets/aigc/design-jewelry.webp',
      '/assets/aigc/design-food.webp',
      '/assets/aigc/design-space.webp',
    ])
    expect(posters.filter((poster) => poster?.includes('worldcup'))).toHaveLength(
      1,
    )
  })

  it('lets visitors pause and resume the signal composition', async () => {
    const user = userEvent.setup()
    const { container } = render(<HeroSignalBackground />)

    expect(container.querySelectorAll('.hero-signal__frame')).toHaveLength(5)
    expect(container.querySelector('.hero-signal')).toHaveAttribute(
      'data-paused',
      'false',
    )

    await user.click(
      screen.getByRole('button', { name: '暂停背景动画' }),
    )

    expect(container.querySelector('.hero-signal')).toHaveAttribute(
      'data-paused',
      'true',
    )
    expect(
      screen.getByRole('button', { name: '播放背景动画' }),
    ).toBeInTheDocument()
  })
})
