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
      <a className="hero__next" href="#profile" aria-label="前往关于我章节">
        <span className="hero__next-copy">
          <strong>01<span>.</span></strong>
          <span>
            <small>PROFILE</small>
            关于我
          </span>
          <svg viewBox="0 0 48 20" aria-hidden="true">
            <path d="M0 10h43M36 3l7 7-7 7" />
          </svg>
        </span>
        <span className="hero__next-media" aria-hidden="true">
          <img src={productionMedia.research.beauty} alt="" />
          <img src={productionMedia.research.worldCup} alt="" />
          <img src={productionMedia.research.aigc} alt="" />
        </span>
      </a>
    </section>
  )
}
