import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { VideoWithFallback } from './VideoWithFallback'

describe('VideoWithFallback', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      value: undefined,
    })
  })

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
        {...{ hasAudio: true }}
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
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()

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

  it('uses the poster immediately when data saver is enabled', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      value: { saveData: true },
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

  it('falls back to the poster when initial playback is rejected', async () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockRejectedValue(
      new DOMException('Autoplay blocked', 'NotAllowedError'),
    )

    render(
      <VideoWithFallback
        src="/hero.mp4"
        poster="/hero.webp"
        label="首屏动态背景"
      />,
    )

    await waitFor(() =>
      expect(
        screen.getByRole('img', { name: '首屏动态背景' }),
      ).toHaveAttribute('src', '/hero.webp'),
    )
  })

  it('synchronizes controls with native play and pause events', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()

    render(
      <VideoWithFallback
        src="/hero.mp4"
        poster="/hero.webp"
        label="首屏动态背景"
      />,
    )

    const video = screen.getByLabelText('首屏动态背景')
    fireEvent.pause(video)
    expect(
      screen.getByRole('button', { name: '播放背景视频' }),
    ).toBeInTheDocument()
    fireEvent.play(video)
    expect(
      screen.getByRole('button', { name: '暂停背景视频' }),
    ).toBeInTheDocument()
  })

  it('only shows the sound control when audio is declared', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()

    const { rerender } = render(
      <VideoWithFallback
        src="/silent.mp4"
        poster="/hero.webp"
        label="无声背景"
      />,
    )
    expect(
      screen.queryByRole('button', { name: '开启背景声音' }),
    ).not.toBeInTheDocument()

    rerender(
      <VideoWithFallback
        src="/ambient.mp4"
        poster="/hero.webp"
        label="有声背景"
        {...{ hasAudio: true }}
      />,
    )
    expect(
      screen.getByRole('button', { name: '开启背景声音' }),
    ).toBeInTheDocument()
  })
})
