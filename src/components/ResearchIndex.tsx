import { reports, type Report } from '../data/portfolio'
import { MediaWithFallback } from './MediaWithFallback'

type ResearchIndexProps = {
  onOpen: (report: Report, trigger: HTMLButtonElement) => void
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 44 16">
      <path d="M1 8h40M35 2l6 6-6 6" />
    </svg>
  )
}

export function ResearchIndex({ onOpen }: ResearchIndexProps) {
  return (
    <section className="research" id="research" aria-labelledby="research-title">
      <header className="research__heading">
        <h2 id="research-title">
          RESEARCH
          <span>/ NOTES</span>
        </h2>
      </header>

      <div className="research__list">
        {reports.map((report) => (
          <button
            key={report.id}
            type="button"
            aria-label={`查看报告：${report.title}`}
            onClick={(event) => onOpen(report, event.currentTarget)}
          >
            <MediaWithFallback
              className="research__media"
              src={report.cover}
              alt=""
              fallbackTitle={report.category}
              fallbackMark={report.index}
              tone={
                report.id === 'beauty-audience'
                  ? 'vermilion'
                  : report.id === 'world-cup-opportunity'
                    ? 'cobalt'
                    : 'teal'
              }
              variant="research"
            />
            <span className="research__index">
              {report.index.replace('R.', '')}<i>.</i>
            </span>
            <span className="research__copy">
              <strong>{report.title}</strong>
              <small>{report.category}</small>
              <span>
                查看报告
                <ArrowIcon />
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
