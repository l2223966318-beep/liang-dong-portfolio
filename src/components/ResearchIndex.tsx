import { reports, type Report } from '../data/portfolio'

type ResearchIndexProps = {
  onOpen: (report: Report, trigger: HTMLButtonElement) => void
}

export function ResearchIndex({ onOpen }: ResearchIndexProps) {
  return (
    <section className="research" id="research" aria-labelledby="research-title">
      <header className="section-heading section-heading--ink">
        <div>
          <p className="section-kicker">RESEARCH / INDEX</p>
          <h2 id="research-title">调研与分析</h2>
        </div>
        <p>把“我认为”变成“我为什么这样判断”。</p>
      </header>

      <div className="research__layout">
        <div className="research__cover" aria-hidden="true">
          <div className="research__cover-art" />
          <span>LD® RESEARCH ARCHIVE</span>
        </div>
        <div className="research__list">
          {reports.map((report) => (
            <button
              key={report.id}
              type="button"
              aria-label={`查看报告：${report.title}`}
              onClick={(event) => onOpen(report, event.currentTarget)}
            >
              <span>{report.index}</span>
              <strong>{report.title}</strong>
              <small>{report.category}</small>
              <i aria-hidden="true">↗</i>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
