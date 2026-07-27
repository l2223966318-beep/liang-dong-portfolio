import { productionMedia } from '../data/media'
import { capabilities, methodSteps } from '../data/profile'
import { MediaWithFallback } from './MediaWithFallback'

export function Capabilities() {
  return (
    <section
      className="capabilities"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <header className="capabilities__header">
        <div className="chapter-heading chapter-heading--capabilities">
          <strong>03<span>.</span></strong>
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
              <strong>{capability.evidence}</strong>
            </div>
            {capability.tone === 'citron' ? (
              <MediaWithFallback
                className="capability__media"
                src={productionMedia.capabilities.aigc}
                alt="透明晶体方块从分散到聚合的 AIGC 工作流视觉"
                fallbackTitle="AIGC WORKFLOW"
              />
            ) : null}
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
