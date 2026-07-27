import { MediaWithFallback } from './MediaWithFallback'

const workflow = ['热点聚合', '选题生成', '平台化改写', '风险审核', '日报整理']

export function AigcLab() {
  return (
    <section className="lab" id="lab" aria-labelledby="lab-title">
      <header className="lab__heading">
        <p className="section-kicker">AIGC / HUMAN IN THE LOOP</p>
        <h2 id="lab-title">
          <span>AIGC IS NOT</span>
          <span>THE ANSWER.</span>
          <span>IT&apos;S A LEVER.</span>
        </h2>
      </header>

      <div className="lab__grid">
        <MediaWithFallback
          className="lab__media"
          src="/assets/aigc-metal.webp"
          alt="明亮银色机械环形抽象视觉"
          fallbackTitle="AIGC / WORKFLOW"
        />
        <div className="lab__workflow">
          <div className="lab__result">
            <span>单次日报整理</span>
            <strong>3h → 1h</strong>
            <p>效率来自流程重组，不来自跳过人的判断。</p>
          </div>
          <ol>
            {workflow.map((step, index) => (
              <li key={step}>
                <span>0{index + 1}</span>
                <strong>{step}</strong>
                <i aria-hidden="true">↘</i>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
