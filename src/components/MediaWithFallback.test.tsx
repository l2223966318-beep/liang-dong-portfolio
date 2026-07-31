import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Profile } from './Profile'
import { MediaWithFallback } from './MediaWithFallback'
import { ResearchIndex } from './ResearchIndex'
import { SelectedWork } from './SelectedWork'

describe('MediaWithFallback', () => {
  it('renders an information-bearing code-native cover on image failure', () => {
    render(
      <MediaWithFallback
        src="/missing.webp"
        alt="项目信息图"
        fallbackTitle="SIGNAL SYSTEM"
        fallbackMark="PROJECT / 01"
        tone="cobalt"
        variant="project"
      />,
    )

    fireEvent.error(screen.getByRole('img', { name: '项目信息图' }))

    const fallback = screen.getByRole('img', { name: '项目信息图' })
    expect(fallback).toHaveClass(
      'media-fallback',
      'media-fallback--cobalt',
      'media-fallback--project',
    )
    expect(fallback).toHaveTextContent('PROJECT / 01')
    expect(fallback).toHaveTextContent('SIGNAL SYSTEM')
  })

  it('keeps decorative fallback covers out of the accessibility tree', () => {
    const { container } = render(
      <MediaWithFallback
        src="/missing.webp"
        alt=""
        fallbackTitle="RESEARCH"
        tone="silver"
        variant="research"
      />,
    )

    fireEvent.error(container.querySelector('img') as HTMLImageElement)

    const fallback = container.querySelector('.media-fallback')
    expect(fallback).toHaveAttribute('aria-hidden', 'true')
    expect(fallback).not.toHaveAttribute('role')
    expect(fallback).not.toHaveAttribute('aria-label')
  })

  it('provides reliable Profile, project and research failure paths', () => {
    const profile = render(<Profile />)
    fireEvent.error(
      screen.getByRole('img', {
        name: '由透明晶体切面构成的抽象身份雕塑',
      }),
    )
    expect(
      screen.getByRole('img', {
        name: '由透明晶体切面构成的抽象身份雕塑',
      }),
    ).toHaveClass('media-fallback')
    profile.unmount()

    const work = render(
      <SelectedWork onOpenProject={vi.fn()} />,
    )
    fireEvent.error(screen.getByAltText('2026 世界杯足球赛事海报'))
    expect(
      screen.getByRole('img', { name: '2026 世界杯足球赛事海报' }),
    ).toHaveClass('media-fallback')
    work.unmount()

    const research = render(<ResearchIndex onOpen={vi.fn()} />)
    const researchImage = research.container.querySelector(
      '.research__media',
    ) as HTMLImageElement
    fireEvent.error(researchImage)
    const fallback = research.container.querySelector(
      '.research__media.media-fallback',
    )
    expect(fallback).toHaveAttribute('aria-hidden', 'true')
    expect(fallback).not.toHaveAttribute('role')
  })
})
