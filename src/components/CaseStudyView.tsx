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
        fallbackMark={`${project.index} / CASE STUDY`}
        tone={
          project.id === 'world-cup'
            ? 'cobalt'
            : project.id === 'brand-marketing'
              ? 'vermilion'
              : 'teal'
        }
        variant="project"
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
          <div className="case-view__reflection">
            <p>{project.reflection}</p>
            {project.reflectionDocument ? (
              <a
                className="case-view__summary-link"
                href={project.reflectionDocument.href}
                download
                aria-label={`下载总结：${project.reflectionDocument.title}`}
              >
                <span>
                  <strong>{project.reflectionDocument.title}</strong>
                  <small>{project.reflectionDocument.description}</small>
                </span>
                <svg viewBox="0 0 28 32" aria-hidden="true">
                  <path d="M14 1v20M8 15l6 6 6-6M3 25v5h22v-5" />
                </svg>
              </a>
            ) : null}
          </div>
        </section>
        {project.documents?.length ? (
          <section>
            <span>05 / DAILY REPORTS</span>
            <h3>热点日报样本</h3>
            <div className="case-view__documents" aria-label="热点日报下载">
              {project.documents.map((document) => (
                <a
                  key={document.href}
                  href={document.href}
                  download
                  aria-label={`下载热点日报：${document.title}`}
                >
                  <span>
                    <strong>{document.title}</strong>
                    <small>{document.description}</small>
                  </span>
                  <svg viewBox="0 0 28 32" aria-hidden="true">
                    <path d="M14 1v20M8 15l6 6 6-6M3 25v5h22v-5" />
                  </svg>
                </a>
              ))}
            </div>
          </section>
        ) : null}
        {project.videos?.length ? (
          <section>
            <span>05 / VIDEO WORKS</span>
            <h3>影像作品</h3>
            <div className="case-view__videos" aria-label="视频号影像作品">
              {project.videos.map((video) => (
                <a
                  className="case-view__video-card"
                  href={video.href}
                  key={video.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`在微信视频号打开：${video.title}`}
                >
                  <img src={video.cover} alt="" loading="lazy" />
                  <span className="case-view__video-play" aria-hidden="true">
                    <svg viewBox="0 0 32 32">
                      <path d="m12 8 12 8-12 8V8Z" />
                    </svg>
                  </span>
                  <div className="case-view__video-copy">
                    <strong>{video.title}</strong>
                    <small>{video.description}</small>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}
