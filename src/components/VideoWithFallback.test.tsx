import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { VideoWithFallback } from './VideoWithFallback'

describe('VideoWithFallback', () => {
  it('exposes accessible playback and sound controls', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
    const play = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockResolvedValue()
    const pause = vi
      .spyOn(HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {})
    render(
      <VideoWithFallback
        src="/hero.mp4"
        poster="/hero.webp"
        label="首屏动态背景"
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: '暂停背景视频' }))
    expect(pause).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: '播放背景视频' }))
    expect(play).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: '开启背景声音' }))
    expect(
      screen.getByRole('button', { name: '静音背景视频' }),
    ).toBeInTheDocument()
  })

  it('uses the poster when motion is reduced', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })

    render(
      <VideoWithFallback
        src="/hero.mp4"
        poster="/hero.webp"
        label="首屏动态背景"
      />,
    )

    expect(
      screen.getByRole('img', { name: '首屏动态背景' }),
    ).toHaveAttribute('src', '/hero.webp')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('uses the poster when video loading fails', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })

    render(
      <VideoWithFallback
        src="/hero.mp4"
        poster="/hero.webp"
        label="首屏动态背景"
      />,
    )

    fireEvent.error(screen.getByLabelText('首屏动态背景'))

    expect(
      screen.getByRole('img', { name: '首屏动态背景' }),
    ).toHaveAttribute('src', '/hero.webp')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
