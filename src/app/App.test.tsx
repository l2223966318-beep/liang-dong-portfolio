import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { App } from './App'

describe('App', () => {
  it('renders the approved portfolio statement', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /make signals matter/i }),
    ).toBeInTheDocument()
  })

  it('presents the approved hero positioning and evidence-based workflow', () => {
    render(<App />)

    const heroPositioning = screen.getByRole('heading', {
      name: '让内容成为增长资产',
    }).parentElement
    expect(heroPositioning).toHaveTextContent('内容策略 × 品牌增长 × AIGC')
    expect(screen.getByRole('link', { name: '查看项目' })).toHaveAttribute(
      'href',
      '#work',
    )
    expect(screen.getByText('CHENGDU · 2026')).toBeInTheDocument()
    expect(screen.queryByText('OPEN TO WORK')).not.toBeInTheDocument()
    expect(screen.queryByText('PORTFOLIO / 01—26')).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: '不只生产内容。 建立让内容持续生长的系统。',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('3h → 1h')).toBeInTheDocument()

    for (const step of [
      '热点聚合',
      '选题生成',
      '平台化改写',
      '风险审核',
      '日报整理',
    ]) {
      expect(screen.getByText(step)).toBeInTheDocument()
    }
  })

  it('opens a case study and restores focus when closed', async () => {
    const user = userEvent.setup()
    render(<App />)

    const trigger = screen.getByRole('button', {
      name: /查看案例：世界杯热点内容系统/,
    })
    await user.click(trigger)
    expect(
      screen.getByRole('dialog', { name: /世界杯热点内容系统/ }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '关闭案例' }))
    expect(trigger).toHaveFocus()
  })

  it('offers three reports, direct contact and a resume download', () => {
    render(<App />)

    expect(screen.getAllByRole('button', { name: /查看报告/ })).toHaveLength(3)
    expect(screen.getByRole('link', { name: '下载简历' })).toHaveAttribute(
      'href',
      '/resume/liang-dong-resume.pdf',
    )
    expect(screen.getByRole('link', { name: '发送邮件' })).toHaveAttribute(
      'href',
      'mailto:2223966318@qq.com',
    )
  })
})
