import { useState } from 'react'

type MediaWithFallbackProps = {
  src: string
  alt: string
  fallbackTitle: string
  fallbackMark?: string
  tone?: 'cobalt' | 'vermilion' | 'teal' | 'citron' | 'silver' | 'ink'
  variant?: 'identity' | 'project' | 'research' | 'capability' | 'editorial'
  className?: string
}

export function MediaWithFallback({
  src,
  alt,
  fallbackTitle,
  fallbackMark = 'MEDIA / OFFLINE',
  tone = 'silver',
  variant = 'editorial',
  className,
}: MediaWithFallbackProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    const fallbackClassName = [
      className,
      'media-fallback',
      `media-fallback--${tone}`,
      `media-fallback--${variant}`,
    ]
      .filter(Boolean)
      .join(' ')
    const accessibility = alt
      ? { role: 'img', 'aria-label': alt }
      : { 'aria-hidden': true as const }

    return (
      <div className={fallbackClassName} {...accessibility}>
        <span className="media-fallback__mark">{fallbackMark}</span>
        <strong className="media-fallback__title">{fallbackTitle}</strong>
        <span className="media-fallback__signal" aria-hidden="true">
          LD / 26
        </span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  )
}
