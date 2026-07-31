import { useState, type KeyboardEvent } from 'react'

import { projects, type Project } from '../data/portfolio'
import { MediaWithFallback } from './MediaWithFallback'
import { SectionTrack } from './SectionTrack'

type SelectedWorkProps = {
  onOpenProject: (project: Project, trigger: HTMLButtonElement) => void
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 44 16">
      <path d="M1 8h40M35 2l6 6-6 6" />
    </svg>
  )
}

function StepIcon({ direction }: { direction: 'previous' | 'next' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 16">
      <path
        d={
          direction === 'previous'
            ? 'M31 8H3M9 2 3 8l6 6'
            : 'M1 8h28M23 2l6 6-6 6'
        }
      />
    </svg>
  )
}

export function SelectedWork({
  onOpenProject,
}: SelectedWorkProps) {
  const [activeIndex, setActiveIndex] = useState(1)

  const moveActiveProject = (offset: number) => {
    setActiveIndex(
      (current) => (current + offset + projects.length) % projects.length,
    )
  }

  const handleProjectKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    moveActiveProject(event.key === 'ArrowLeft' ? -1 : 1)
  }

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <SectionTrack variant="work" />
      <header className="section-heading work__heading">
        <p className="section-index">
          <strong>
            02<span>.</span>
          </strong>
          <span>/ SELECTED WORK</span>
        </p>
        <h2 id="work-title">项目不是陈列，是问题与结果的连接。</h2>
        <div className="work__controls" aria-label="项目切换">
          <button
            type="button"
            aria-label="上一个项目"
            onClick={() => moveActiveProject(-1)}
          >
            <StepIcon direction="previous" />
          </button>
          <output aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(projects.length).padStart(2, '0')}
          </output>
          <button
            type="button"
            aria-label="下一个项目"
            onClick={() => moveActiveProject(1)}
          >
            <StepIcon direction="next" />
          </button>
        </div>
      </header>

      <div
        className="work__projects"
        role="group"
        aria-label="项目选择"
        tabIndex={0}
        onKeyDown={handleProjectKeys}
      >
        {projects.map((project, index) => (
          <article
            className={[
              'work-card',
              index === activeIndex ? 'is-active' : '',
              project.id === 'world-cup' ? 'work-card--world-cup' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-current={index === activeIndex ? 'true' : undefined}
            key={project.id}
          >
            <MediaWithFallback
              className="work-card__media"
              src={project.cover ?? project.media}
              alt={project.coverAlt ?? project.mediaAlt}
              fallbackTitle={project.titleEn}
              fallbackMark={`PROJECT / ${project.index}`}
              tone={
                project.id === 'world-cup'
                  ? 'cobalt'
                  : project.id === 'brand-marketing'
                    ? 'vermilion'
                    : 'teal'
              }
              variant="project"
            />
            <span className="work-card__index">
              {project.index}<i>.</i>
            </span>
            <div className="work-card__copy">
              <h3>{project.title}</h3>
              <p>{project.role}</p>
            </div>
            <div className="work-card__metrics">
              <strong className="work-card__metric">{project.metric}</strong>
              {project.id === 'world-cup' ? (
                <strong className="work-card__supporting-metric">
                  {project.supportingMetrics[0]}
                </strong>
              ) : null}
            </div>
            <button
              className="work-card__action"
              type="button"
              aria-label={`查看案例：${project.title}`}
              onClick={(event) =>
                onOpenProject(project, event.currentTarget)
              }
            >
              查看案例
              <ArrowIcon />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
