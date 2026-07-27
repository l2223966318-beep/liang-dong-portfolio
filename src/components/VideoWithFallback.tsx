import { useEffect, useRef, useState } from 'react'

import { useMotionPreference } from '../hooks/useMotionPreference'
import { MediaWithFallback } from './MediaWithFallback'

type Props = {
  src: string
  poster: string
  label: string
  className?: string
  hasAudio?: boolean
}

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean
  }
}

export function VideoWithFallback({
  src,
  poster,
  label,
  className,
  hasAudio = false,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const reducedMotion = useMotionPreference()
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(true)
  const [failed, setFailed] = useState(false)
  const saveData =
    typeof navigator !== 'undefined' &&
    Boolean((navigator as NavigatorWithConnection).connection?.saveData)
  const showPoster = failed || reducedMotion || saveData

  useEffect(() => {
    if (showPoster) return

    const video = ref.current
    if (!video) return
    let active = true

    try {
      const playback = video.play()
      playback?.catch(() => {
        if (active) setFailed(true)
      })
    } catch {
      setFailed(true)
    }

    return () => {
      active = false
    }
  }, [showPoster, src])

  if (showPoster) {
    return (
      <div className={className}>
        <MediaWithFallback
          src={poster}
          alt={label}
          fallbackTitle="STATIC MEDIA"
          fallbackMark="HERO / 00"
          tone="silver"
          variant="editorial"
        />
      </div>
    )
  }

  const togglePlayback = async () => {
    const video = ref.current
    if (!video) return

    if (paused) {
      try {
        await video.play()
        setPaused(false)
      } catch {
        setFailed(true)
      }
    } else {
      video.pause()
      setPaused(true)
    }
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
        preload="metadata"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
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
        {hasAudio ? (
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
        ) : null}
      </div>
    </div>
  )
}
