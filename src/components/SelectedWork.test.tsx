import { render, screen } from '@testing-library/react'
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
})
