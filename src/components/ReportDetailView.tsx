import { useEffect, useRef } from 'react'

import type { Report } from '../data/portfolio'
import { useScrollLock } from '../hooks/useScrollLock'

type ReportDetailViewProps = {
  report: Report
  onClose: () => void
}

export function ReportDetailView({ report, onClose }: ReportDetailViewProps) {
  const closeButton = useRef<HTMLButtonElement>(null)
  useScrollLock(true)

  useEffect(() => {
    closeButton.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        event.preventDefault()
        closeButton.current?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return (
    <div
      className="report-view"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`report-${report.id}`}
    >
      <header className="case-view__header">
        <span className="case-view__eyebrow">{report.index} / RESEARCH NOTE</span>
        <button
          className="case-view__close"
          ref={closeButton}
          type="button"
          aria-label="关闭报告"
          onClick={onClose}
        >
          CLOSE <i aria-hidden="true">×</i>
        </button>
      </header>
      <div className="report-view__content">
        <p>{report.category}</p>
        <h2 id={`report-${report.id}`}>{report.title}</h2>
        <div className="report-view__rule" />
        <p>{report.summary}</p>
        <aside>
          本页展示的是基于个人项目经验整理的研究摘要，不伪装为完整客户交付件。
        </aside>
      </div>
    </div>
  )
}
