import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Capabilities } from './Capabilities'
import { Profile } from './Profile'

describe('Profile and Capabilities', () => {
  it('shows the approved profile evidence', () => {
    render(<Profile />)

    expect(
      screen.getByRole('heading', { name: '三年内容经验，从判断到落地。' }),
    ).toBeInTheDocument()
    for (const value of ['3', '8,000+', '150+', '3h → 1h']) {
      expect(screen.getByText(value)).toBeInTheDocument()
    }
  })

  it('connects every capability to evidence', () => {
    render(<Capabilities />)

    for (const label of ['内容策略', '品牌增长', '影像与视觉', 'AIGC 工作流']) {
      expect(screen.getByRole('heading', { name: label })).toBeInTheDocument()
    }
    expect(screen.getByText('发现信号')).toBeInTheDocument()
    expect(screen.getByText('组织叙事')).toBeInTheDocument()
    expect(screen.getByText('推动增长')).toBeInTheDocument()
  })
})
