import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Capabilities } from './Capabilities'
import { Profile } from './Profile'

describe('Profile and Capabilities', () => {
  it('shows the profile summary without the evidence cards', () => {
    render(<Profile />)

    expect(
      screen.getByRole('img', { name: '由透明晶体切面构成的抽象身份雕塑' }),
    ).toHaveAttribute('src', '/assets/v32/profile-bust.webp')
    expect(
      screen.getByRole('heading', { name: '三年内容经验，从判断到落地。' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/2027 届西南财经大学新闻与传播硕士/),
    ).not.toBeInTheDocument()
    const education = screen.getByText('EDUCATION').closest('.profile__education')
    const profileTitle = screen.getByRole('heading', {
      name: '三年内容经验，从判断到落地。',
    })
    expect(education).toBeInTheDocument()
    if (!education) {
      throw new Error('Expected featured education block')
    }
    expect(
      education.compareDocumentPosition(profileTitle) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(screen.getByText('西南财经大学')).toBeInTheDocument()
    expect(screen.getByText('新闻与传播硕士')).toBeInTheDocument()
    expect(screen.getByText('GPA 3.6/4')).toBeInTheDocument()
    expect(screen.getByText('2027届')).toBeInTheDocument()
    expect(
      education.querySelector('.profile__education-signal'),
    ).not.toBeInTheDocument()
    expect(screen.getByText('广告学学士')).toBeInTheDocument()
    expect(screen.queryByLabelText('经历证据')).not.toBeInTheDocument()
    for (const value of ['3', '+38%', '600+', '3h → 1h']) {
      expect(screen.queryByText(value)).not.toBeInTheDocument()
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
