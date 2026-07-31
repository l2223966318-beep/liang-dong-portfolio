import { HeroSignalBackground } from './HeroSignalBackground'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <HeroSignalBackground />
      <p className="hero__mark">
        <span>梁栋</span> / 26
      </p>
      <h1 id="hero-title" className="hero__title">
        <span>MAKE</span>
        <span>SIGNALS</span>
        <span>MATTER.</span>
      </h1>
      <div className="hero__position">
        <h2>让内容成为增长资产</h2>
        <p className="hero__position-meta">
          内容策略 <span>×</span> 增长运营 <span>×</span> 影像与 AIGC
        </p>
        <div className="hero__position-footer">
          <p className="hero__place">LIANG DONG · 2026</p>
          <a href="#work">
            <svg viewBox="0 0 48 20" aria-hidden="true">
              <path d="M0 10h43M36 3l7 7-7 7" />
            </svg>
            <span>查看项目</span>
          </a>
        </div>
      </div>
    </section>
  )
}
