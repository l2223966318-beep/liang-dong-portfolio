import { MediaWithFallback } from './MediaWithFallback'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__meta">
        <p className="hero__role">内容策略 × 品牌增长 × AIGC</p>
        <p className="hero__place">SHANGHAI · 2026</p>
      </div>

      <h1 className="hero__title" id="hero-title">
        <span>MAKE</span>
        <span>SIGNALS</span>
        <span>MATTER.</span>
      </h1>

      <MediaWithFallback
        className="hero__media"
        src="/assets/hero-metal.webp"
        alt="明亮银灰环境中的抽象金属形态"
        fallbackTitle="LD / 2026"
      />

      <p className="hero__statement">把复杂的信息，变成值得传播的作品。</p>
      <span className="hero__edition">PORTFOLIO / 01—26</span>
    </section>
  )
}
