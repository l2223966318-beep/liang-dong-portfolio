import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SelectedWork } from './SelectedWork'

describe('SelectedWork', () => {
  it('pairs the World Cup headline metric with its real supporting metric', () => {
    render(
      <SelectedWork
        onOpenProject={vi.fn()}
        onOpenReport={vi.fn()}
      />,
    )

    const supportingMetric = screen.getByText('53 位 UP 主协同')
    const card = supportingMetric.closest('.work-card')

    expect(card).toHaveTextContent('26 份热点日报')
    expect(supportingMetric).toHaveClass('work-card__supporting-metric')
  })

  it('switches active emphasis with controls and arrow keys', async () => {
    const user = userEvent.setup()
    render(
      <SelectedWork
        onOpenProject={vi.fn()}
        onOpenReport={vi.fn()}
      />,
    )

    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(3)
    expect(cards[1]).toHaveAttribute('aria-current', 'true')
    expect(screen.getByText('02 / 03')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '下一个项目' }))
    expect(cards[2]).toHaveAttribute('aria-current', 'true')
    expect(screen.getByText('03 / 03')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '上一个项目' }))
    expect(cards[1]).toHaveAttribute('aria-current', 'true')

    const sequence = screen.getByRole('group', { name: '项目选择' })
    sequence.focus()
    await user.keyboard('{ArrowLeft}')
    expect(cards[0]).toHaveAttribute('aria-current', 'true')
    expect(screen.getByText('01 / 03')).toBeInTheDocument()
  })
})
