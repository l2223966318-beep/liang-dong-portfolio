import { projects, type Project, type Report } from '../data/portfolio'
import { MediaWithFallback } from './MediaWithFallback'
import { ResearchIndex } from './ResearchIndex'
import { SectionTrack } from './SectionTrack'

type SelectedWorkProps = {
  onOpenProject: (project: Project, trigger: HTMLButtonElement) => void
  onOpenReport: (report: Report, trigger: HTMLButtonElement) => void
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 44 16">
      <path d="M1 8h40M35 2l6 6-6 6" />
    </svg>
  )
}

export function SelectedWork({
  onOpenProject,
  onOpenReport,
}: SelectedWorkProps) {
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
      </header>

      <div className="work__projects">
        {projects.map((project) => (
          <article className="work-card" key={project.id}>
            <MediaWithFallback
              className="work-card__media"
              src={project.media}
              alt={project.mediaAlt}
              fallbackTitle={project.titleEn}
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

      <ResearchIndex onOpen={onOpenReport} />
    </section>
  )
}
