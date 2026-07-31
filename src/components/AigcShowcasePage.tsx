import { useEffect } from 'react'

import type { AigcMedia, AigcProject } from '../data/aigc'

type AigcShowcasePageProps = {
  project: AigcProject
  onBack: () => void
}

function ProjectMedia({
  media,
  priority = false,
}: {
  media: AigcMedia
  priority?: boolean
}) {
  return (
    <figure className="aigc-showcase__figure">
      {media.kind === 'video' ? (
        <video
          src={media.src}
          aria-label={media.label ?? media.alt}
          controls
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={media.src}
          alt={media.alt}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      <figcaption>{media.caption}</figcaption>
    </figure>
  )
}

export function AigcShowcasePage({
  project,
  onBack,
}: AigcShowcasePageProps) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${project.title} — 梁栋作品集`
    window.scrollTo({ top: 0, left: 0 })

    return () => {
      document.title = previousTitle
    }
  }, [project])

  return (
    <main
      className="aigc-showcase"
      data-tone={project.tone}
      aria-labelledby="aigc-showcase-title"
    >
      <header className="aigc-showcase__nav">
        <a
          href="/"
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
            onBack()
          }}
        >
          <span aria-hidden="true">←</span>
          返回作品集
        </a>
        <p>LIANG DONG / AIGC CASE STUDY</p>
        <span>{project.index}</span>
      </header>

      <section className="aigc-showcase__hero">
        <div className="aigc-showcase__hero-copy">
          <p>{project.category}</p>
          <h1 id="aigc-showcase-title">{project.title}</h1>
          <h2>{project.subtitle}</h2>
          <p className="aigc-showcase__summary">{project.summary}</p>
        </div>
        <ProjectMedia media={project.cover} priority />
      </section>

      <section className="aigc-showcase__body">
        <aside className="aigc-showcase__tools">
          <p>TOOLS / STACK</p>
          <ul>
            {project.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </aside>

        <div className="aigc-showcase__story">
          <section>
            <p className="aigc-showcase__eyebrow">01 / THE PROBLEM</p>
            <h2>先解决真实工作里的摩擦。</h2>
            <p>{project.problem}</p>
          </section>

          <section>
            <p className="aigc-showcase__eyebrow">02 / THE WORKFLOW</p>
            <h2>把能力组织成一条完整路径。</h2>
            <ol className="aigc-showcase__workflow">
              {project.workflow.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <p className="aigc-showcase__eyebrow">03 / HUMAN × AI</p>
            <h2>AI 放大效率，人保留判断。</h2>
            <p>{project.collaboration}</p>
          </section>

          <section>
            <p className="aigc-showcase__eyebrow">04 / OUTCOME</p>
            <h2>最终交付，不止一张效果图。</h2>
            <ul className="aigc-showcase__outcomes">
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      {project.gallery.length > 0 ? (
        <section className="aigc-showcase__gallery" aria-label="项目画面">
          <header>
            <p>SELECTED FRAMES</p>
            <h2>从系统到画面，查看具体细节。</h2>
          </header>
          <div>
            {project.gallery.map((media) => (
              <ProjectMedia media={media} key={media.src} />
            ))}
          </div>
        </section>
      ) : null}

      <footer className="aigc-showcase__footer">
        <p>END OF CASE / {project.index}</p>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault()
            onBack()
          }}
        >
          返回全部作品 <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </main>
  )
}
