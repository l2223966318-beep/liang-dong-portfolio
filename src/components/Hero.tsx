import { productionMedia } from '../data/media'
import { VideoWithFallback } from './VideoWithFallback'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <VideoWithFallback
        className="hero__media"
        src={productionMedia.hero.video}
        poster={productionMedia.hero.poster}
        label="彩色透明材质动态背景"
      />
      <p className="hero__mark">
        <span>LD</span> / 26
      </p>
      <h1 id="hero-title" className="hero__title">
        <span>MAKE</span>
        <span>SIGNALS</span>
        <span>MATTER.</span>
      </h1>
      <div className="hero__position">
        <h2>让内容成为增长资产</h2>
        <p>
          内容策略 <span>×</span> 品牌增长 <span>×</span> AIGC
        </p>
        <a href="#work">
          <span aria-hidden="true">→</span>
          查看项目
        </a>
      </div>
      <p className="hero__place">CHENGDU · 2026</p>
    </section>
  )
}
