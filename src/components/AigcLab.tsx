import { aigcProjects, getAigcShowcaseUrl } from '../data/aigc'

type AigcLabProps = {
  onOpen: (projectId: string) => void
}

export function AigcLab({ onOpen }: AigcLabProps) {
  return (
    <section className="aigc-lab" id="aigc" aria-labelledby="aigc-title">
      <header className="aigc-lab__header">
        <div className="chapter-heading chapter-heading--aigc">
          <strong>
            03<span>.</span>
          </strong>
          <p>/ AIGC LAB</p>
        </div>
        <div>
          <h2 id="aigc-title">把 AI 变成可以工作的产品。</h2>
          <p>
            从内容工作台、数据自动化到互动叙事与视觉生成，
            每个项目都从真实问题出发，由人工判断完成最后一公里。
          </p>
        </div>
      </header>

      <div className="aigc-lab__grid">
        {aigcProjects.map((project) => (
          <article
            className="aigc-card"
            data-tone={project.tone}
            key={project.id}
          >
            <a
              href={getAigcShowcaseUrl(project.id)}
              aria-label={`查看AI案例：${project.title}`}
              onClick={(event) => {
                if (
                  event.button !== 0 ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                ) {
                  return
                }

                event.preventDefault()
                onOpen(project.id)
              }}
            >
              <div className="aigc-card__media">
                {project.cover.kind === 'video' ? (
                  <video
                    src={project.cover.src}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  />
                ) : (
                  <img
                    src={project.cover.src}
                    alt=""
                    loading="lazy"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="aigc-card__veil" aria-hidden="true" />
              <div className="aigc-card__topline">
                <span>{project.index}</span>
                <span>{project.category}</span>
              </div>
              <div className="aigc-card__copy">
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </div>
              <span className="aigc-card__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
