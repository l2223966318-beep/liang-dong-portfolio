import { useEffect, useRef } from 'react'

import type { Project } from '../data/portfolio'
import { useScrollLock } from '../hooks/useScrollLock'
import { MediaWithFallback } from './MediaWithFallback'

type CaseStudyViewProps = {
  project: Project
  onClose: () => void
}

export function CaseStudyView({ project, onClose }: CaseStudyViewProps) {
  const closeButton = useRef<HTMLButtonElement>(null)
  useScrollLock(true)

  useEffect(() => {
    closeButton.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return (
    <div
      className="case-view"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`case-${project.id}`}
    >
      <header className="case-view__header">
        <span className="case-view__eyebrow">{project.index} / CASE STUDY</span>
        <button
          className="case-view__close"
          ref={closeButton}
          type="button"
          aria-label="关闭案例"
          onClick={onClose}
        >
          CLOSE <i aria-hidden="true">×</i>
        </button>
      </header>

      <div className="case-view__hero">
        <div>
          <p>{project.organization} · {project.period}</p>
          <h2 id={`case-${project.id}`}>{project.title}</h2>
          <p className="case-view__role">{project.role}</p>
        </div>
        <p className="case-view__metric">{project.metric}</p>
      </div>

      <MediaWithFallback
        className="case-view__media"
        src={project.media}
        alt={project.mediaAlt}
        fallbackTitle={project.titleEn}
      />

      <div className="case-view__body">
        <section>
          <span>01 / CONTEXT</span>
          <h3>项目背景与挑战</h3>
          <p>{project.challenge}</p>
        </section>
        <section>
          <span>02 / PROCESS</span>
          <h3>策略与过程</h3>
          <ol>
            {project.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
        </section>
        <section>
          <span>03 / OUTPUT</span>
          <h3>关键产出</h3>
          <div className="case-view__numbers">
            <strong>{project.metric}</strong>
            {project.supportingMetrics.map((metric) => (
              <p key={metric}>{metric}</p>
            ))}
          </div>
        </section>
        <section>
          <span>04 / REFLECTION</span>
          <h3>复盘</h3>
          <p>{project.reflection}</p>
        </section>
      </div>
    </div>
  )
}
