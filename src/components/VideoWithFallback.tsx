import { useRef, useState } from 'react'

import { useMotionPreference } from '../hooks/useMotionPreference'

type Props = {
  src: string
  poster: string
  label: string
  className?: string
}

export function VideoWithFallback({ src, poster, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const reducedMotion = useMotionPreference()
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(true)
  const [failed, setFailed] = useState(false)

  if (failed || reducedMotion) {
    return (
      <div className={className}>
        <img src={poster} alt={label} />
      </div>
    )
  }

  const togglePlayback = async () => {
    const video = ref.current
    if (!video) return

    if (paused) await video.play()
    else video.pause()

    setPaused(!paused)
  }

  return (
    <div className={className}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        autoPlay
        onError={() => setFailed(true)}
        aria-label={label}
      />
      <div className="hero__controls">
        <button
          className="hero__control hero__control--playback"
          type="button"
          onClick={togglePlayback}
          aria-label={paused ? '播放背景视频' : '暂停背景视频'}
        >
          <span
            className={paused ? 'playback-icon is-paused' : 'playback-icon'}
            aria-hidden="true"
          />
        </button>
        <button
          className="hero__control hero__control--sound"
          type="button"
          onClick={() => setMuted((value) => !value)}
          aria-label={muted ? '开启背景声音' : '静音背景视频'}
        >
          <span
            className={muted ? 'sound-icon is-muted' : 'sound-icon'}
            aria-hidden="true"
          >
            <i />
          </span>
        </button>
      </div>
    </div>
  )
}
