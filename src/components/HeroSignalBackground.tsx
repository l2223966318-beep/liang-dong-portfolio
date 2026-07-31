import { useState } from 'react'

import { productionMedia } from '../data/media'
import { useMotionPreference } from '../hooks/useMotionPreference'

const signalFrames = [
  {
    id: 'world-cup',
    src: productionMedia.hero.floatingPosters.worldCup,
  },
  {
    id: 'opera',
    src: productionMedia.hero.floatingPosters.opera,
  },
  {
    id: 'jewelry',
    src: productionMedia.hero.floatingPosters.jewelry,
  },
  {
    id: 'food',
    src: productionMedia.hero.floatingPosters.food,
  },
  {
    id: 'space',
    src: productionMedia.hero.floatingPosters.space,
  },
] as const

export function HeroSignalBackground() {
  const reducedMotion = useMotionPreference()
  const [paused, setPaused] = useState(false)
  const isPaused = reducedMotion || paused

  return (
    <div
      className="hero__media hero-signal"
      data-paused={isPaused ? 'true' : 'false'}
    >
      <div className="hero-signal__scene" aria-hidden="true">
        <span className="hero-signal__grid" />
        <span className="hero-signal__scan" />

        <svg
          className="hero-signal__rails"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
        >
          <path
            className="hero-signal__rail hero-signal__rail--glass"
            d="M-60 590C130 520 210 590 350 500S565 275 740 320s165 140 340 70"
          />
          <path
            className="hero-signal__rail hero-signal__rail--glass"
            d="M120-40C250 110 180 260 360 300s310-115 470 20 40 270 250 330"
          />
          <path
            className="hero-signal__rail hero-signal__rail--signal"
            d="M-40 525C150 430 245 505 380 425S610 245 780 340s165 80 300 10"
          />
          {[95, 255, 430, 620, 810, 945].map((x, index) => (
            <g
              className="hero-signal__node"
              key={x}
              transform={`translate(${x} ${[475, 465, 390, 300, 350, 362][index]})`}
            >
              <circle r="11" />
              <circle r="3.5" />
            </g>
          ))}
        </svg>

        <span className="hero-signal__prism" />
        <span className="hero-signal__orbit hero-signal__orbit--one" />
        <span className="hero-signal__orbit hero-signal__orbit--two" />

        <div className="hero-signal__frames">
          {signalFrames.map((frame) => (
            <figure
              className={`hero-signal__frame hero-signal__frame--${frame.id}`}
              key={frame.id}
            >
              <img src={frame.src} alt="" />
              <span />
            </figure>
          ))}
        </div>
      </div>

      {!reducedMotion ? (
        <div className="hero__controls">
          <button
            className="hero__control hero__control--playback"
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? '播放背景动画' : '暂停背景动画'}
          >
            <span
              className={paused ? 'playback-icon is-paused' : 'playback-icon'}
              aria-hidden="true"
            />
          </button>
        </div>
      ) : null}
    </div>
  )
}
