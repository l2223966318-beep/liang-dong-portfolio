import { productionMedia } from '../data/media'
import { capabilities, methodSteps } from '../data/profile'
import { MediaWithFallback } from './MediaWithFallback'

export function Capabilities() {
  const mediaByTone = {
    cobalt: productionMedia.projects.worldCup,
    vermilion: productionMedia.projects.beauty,
    silver: productionMedia.projects.city,
    citron: productionMedia.capabilities.aigc,
  } as const

  return (
    <section
      className="capabilities"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <header className="capabilities__header">
        <div className="chapter-heading chapter-heading--capabilities">
          <strong>04<span>.</span></strong>
          <p>/ CAPABILITIES</p>
        </div>
        <h2 id="capabilities-title">既能判断方向，也能把它做出来。</h2>
      </header>

      <div className="capabilities__grid">
        {capabilities.map((capability) => (
          <article
            className="capability"
            data-tone={capability.tone}
            key={capability.index}
          >
            <p className="capability__index">{capability.index}<span>.</span></p>
            <h3>{capability.title}</h3>
            <p className="capability__description">{capability.description}</p>
            <div className="capability__evidence">
              <span>证据 / EVIDENCE</span>
              <strong>
                {capability.tone === 'vermilion' ? (
                  <>
                    <span className="capability__evidence-context">
                      {capability.evidence.replace(/\s\+\d+%$/, '')}
                    </span>
                    <span className="capability__evidence-metric">
                      {capability.evidence.match(/\+\d+%$/)?.[0]}
                    </span>
                  </>
                ) : capability.evidence}
              </strong>
            </div>
            <MediaWithFallback
              className="capability__media"
              src={mediaByTone[capability.tone]}
              alt={`${capability.title}能力视觉`}
              fallbackTitle={capability.title}
              fallbackMark={`CAPABILITY / ${capability.index}`}
              tone={
                capability.tone === 'silver' ? 'silver' : capability.tone
              }
              variant="capability"
            />
          </article>
        ))}
      </div>

      <ol className="capabilities__method" aria-label="工作方法">
        {methodSteps.map((step) => (
          <li key={step}>
            <span aria-hidden="true" />
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
    </section>
  )
}
