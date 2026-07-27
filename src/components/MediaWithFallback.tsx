import { useState } from 'react'

type MediaWithFallbackProps = {
  src: string
  alt: string
  fallbackTitle: string
  className?: string
}

export function MediaWithFallback({
  src,
  alt,
  fallbackTitle,
  className,
}: MediaWithFallbackProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={className} role="img" aria-label={alt}>
        <span>{fallbackTitle}</span>
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
