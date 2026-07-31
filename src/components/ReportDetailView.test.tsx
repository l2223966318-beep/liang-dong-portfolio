import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { reports } from '../data/portfolio'
import { ReportDetailView } from './ReportDetailView'

describe('ReportDetailView', () => {
  it('shows the resume-backed source, focus and outcomes', () => {
    render(<ReportDetailView report={reports[0]} onClose={vi.fn()} />)

    expect(screen.getByText('深圳易威行 · 海外增长运营')).toBeInTheDocument()
    expect(screen.getByText('独立站落地页 PV +22%')).toBeInTheDocument()
    expect(screen.getByText('海外社媒互动量 +15%')).toBeInTheDocument()
    expect(screen.getByText('合作内容覆盖 12 万+')).toBeInTheDocument()
  })
})
