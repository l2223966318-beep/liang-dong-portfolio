import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import { App } from './App'

describe('App', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/')
  })

  it('renders the approved portfolio statement', () => {
    render(<App />)

    expect(screen.getByText('梁栋')).toBeInTheDocument()
    expect(screen.queryByText('LD')).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /make signals matter/i }),
    ).toBeInTheDocument()
  })

  it('presents the approved hero positioning and five-chapter narrative', () => {
    render(<App />)

    const heroPositioning = screen.getByRole('heading', {
      name: '让内容成为增长资产',
    }).parentElement
    expect(heroPositioning).toHaveTextContent(
      '内容策略 × 增长运营 × 影像与 AIGC',
    )
    expect(screen.getByRole('link', { name: '查看项目' })).toHaveAttribute(
      'href',
      '#work',
    )
    expect(screen.getByText('LIANG DONG · 2026')).toBeInTheDocument()
    expect(screen.queryByText('OPEN TO WORK')).not.toBeInTheDocument()
    expect(screen.queryByText('PORTFOLIO / 01—26')).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: '三年内容经验，从判断到落地。',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: '既能判断方向，也能把它做出来。',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: "LET'S MAKE IT MATTER." }),
    ).toBeInTheDocument()
    expect(screen.queryByText('3h → 1h')).not.toBeInTheDocument()
    expect(screen.getByText('效率 +60% · 日报 3h → 1h')).toBeInTheDocument()

    for (const step of ['发现信号', '组织叙事', '推动增长']) {
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
    expect(
      screen.getByRole('link', {
        name: '下载热点日报：世界杯热点日报 · 07.20',
      }),
    ).toHaveAttribute('href', '/assets/documents/world-cup-daily-0720.docx')
    expect(
      screen.getByRole('link', {
        name: '下载热点日报：世界杯热点日报 · 06.10',
      }),
    ).toHaveAttribute('href', '/assets/documents/world-cup-daily-0610.docx')
    expect(
      screen.getByRole('link', {
        name: '下载总结：世界杯专项内容运营项目 · 数据与内容总结',
      }),
    ).toHaveAttribute('href', '/assets/documents/world-cup-content-summary.docx')

    await user.click(screen.getByRole('button', { name: '关闭案例' }))
    await waitFor(() => expect(trigger).toHaveFocus())

    const brandTrigger = screen.getByRole('button', {
      name: '查看案例：品牌内容营销与投放优化',
    })
    await user.click(brandTrigger)
    expect(
      screen.getByRole('link', {
        name: '下载总结：4 月湿巾舆情营销复盘文档',
      }),
    ).toHaveAttribute(
      'href',
      '/assets/documents/wet-wipes-sentiment-review-april.docx',
    )
    await user.click(screen.getByRole('button', { name: '关闭案例' }))

    const cityTrigger = screen.getByRole('button', {
      name: '查看案例：城市影像内容生产',
    })
    await user.click(cityTrigger)
    const cityVideoLinks = screen.getAllByRole('link', {
      name: /在微信视频号打开：/,
    })
    expect(cityVideoLinks).toHaveLength(5)
    expect(cityVideoLinks[0]).toHaveAttribute(
      'href',
      'https://weixin.qq.com/sph/Aksjjj047x',
    )
    expect(cityVideoLinks[0]).toHaveAttribute('target', '_blank')
  })

  it('uses browser history to close project overlays', async () => {
    const user = userEvent.setup()
    render(<App />)

    const projectTrigger = screen.getByRole('button', {
      name: /查看案例：世界杯热点内容系统/,
    })
    await user.click(projectTrigger)
    expect(window.history.state).toHaveProperty('portfolioOverlay')
    window.history.back()
    await waitFor(() =>
      expect(
        screen.queryByRole('dialog', { name: /世界杯热点内容系统/ }),
      ).not.toBeInTheDocument(),
    )
    await waitFor(() => expect(projectTrigger).toHaveFocus())

  })

  it('offers project actions, direct contact and a resume download', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: '项目不是陈列，是问题与结果的连接。',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', { name: /查看案例/ }),
    ).toHaveLength(3)
    expect(screen.queryByRole('heading', { name: /research/i })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: '下载简历' })).toHaveAttribute(
      'href',
      '/resume/梁栋简历-一周内到岗-可实习3-6月.pdf',
    )
    expect(screen.getByRole('link', { name: '下载 PDF 简历' })).toHaveAttribute(
      'download',
      '梁栋简历-一周内到岗-可实习3-6月.pdf',
    )
    expect(screen.getByRole('link', { name: '发送邮件' })).toHaveAttribute(
      'href',
      'mailto:2223966318@qq.com',
    )
  })

  it('offers six AI projects with stable showcase URLs', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: '把 AI 变成可以工作的产品。' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /查看AI案例：/ })).toHaveLength(6)
    expect(
      screen.getByRole('link', {
        name: '查看AI案例：WorldCup Copilot',
      }),
    ).toHaveAttribute('href', '/?showcase=worldcup-copilot')
    expect(
      screen.getByRole('link', {
        name: '查看AI案例：华服镜界 Hanfu Mirror',
      }),
    ).toHaveAttribute('href', '/?showcase=hanfu-mirror')
  })

  it('navigates to a dedicated AI showcase and returns with browser history', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('link', {
        name: '查看AI案例：WorldCup Copilot',
      }),
    )

    expect(window.location.search).toBe('?showcase=worldcup-copilot')
    expect(
      screen.getByRole('heading', { name: 'WorldCup Copilot' }),
    ).toBeInTheDocument()
    expect(screen.getByText('体育赛事智能传播助手')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'WorldCup Copilot 产品首页' }),
    ).toHaveAttribute(
      'src',
      '/assets/aigc/worldcup-dashboard.webp',
    )

    window.history.back()
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /make signals matter/i }),
      ).toBeInTheDocument(),
    )
  })

  it('opens a direct Hanfu Mirror URL with its embedded demo video', () => {
    window.history.replaceState({}, '', '/?showcase=hanfu-mirror')
    render(<App />)

    expect(
      screen.getByRole('heading', { name: '华服镜界 Hanfu Mirror' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('华服镜界产品演示视频')).toHaveAttribute(
      'src',
      '/assets/aigc/hanfu-mirror-demo.mp4',
    )
    expect(screen.getByRole('link', { name: '返回作品集' })).toHaveAttribute(
      'href',
      '/',
    )
  })
})
