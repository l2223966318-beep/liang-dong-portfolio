import { useState } from 'react'

import { projects, type Project } from '../data/portfolio'
import { MediaWithFallback } from './MediaWithFallback'

type WorkView = 'list' | 'grid'

type SelectedWorkProps = {
  onOpen: (project: Project, trigger: HTMLButtonElement) => void
}

export function SelectedWork({ onOpen }: SelectedWorkProps) {
  const [view, setView] = useState<WorkView>('list')

  return (
    <section className={`work work--${view}`} id="work" aria-labelledby="work-title">
      <header className="section-heading">
        <div>
          <p className="section-kicker section-kicker--light">SELECTED / 03</p>
          <h2 id="work-title">代表项目</h2>
        </div>
        <div className="view-switch" aria-label="切换作品布局">
          <button
            className={view === 'list' ? 'is-active' : ''}
            type="button"
            onClick={() => setView('list')}
          >
            LIST
          </button>
          <button
            className={view === 'grid' ? 'is-active' : ''}
            type="button"
            onClick={() => setView('grid')}
          >
            GRID
          </button>
        </div>
      </header>

      <div className="work-list">
        {projects.map((project) => (
          <article className="work-item" key={project.id}>
            <button
              className="work-item__trigger"
              type="button"
              aria-label={`查看案例：${project.title}`}
              onClick={(event) => onOpen(project, event.currentTarget)}
            >
              <span className="work-item__index">{project.index}</span>
              <span className="work-item__copy">
                <strong>{project.title}</strong>
                <small>{project.titleEn}</small>
              </span>
              <span className="work-item__metric">{project.metric}</span>
              <span className="work-item__arrow" aria-hidden="true">
                ↗
              </span>
            </button>
            <MediaWithFallback
              className="work-item__media"
              src={project.media}
              alt={project.mediaAlt}
              fallbackTitle={project.titleEn}
            />
          </article>
        ))}
      </div>
    </section>
  )
}
