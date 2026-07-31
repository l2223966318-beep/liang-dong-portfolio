type SectionTrackProps = {
  variant: 'profile' | 'work' | 'contact'
}

function TrackNode({ cx, cy }: { cx: number; cy: number }) {
  return (
    <span
      className="section-track__node"
      style={{ left: `${cx}%`, top: `${cy}%` }}
    />
  )
}

export function SectionTrack({ variant }: SectionTrackProps) {
  if (variant === 'profile') {
    return (
      <div
        className="section-track section-track--profile"
        aria-hidden="true"
      >
        <svg
          className="section-track__drawing"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path className="section-track__rail" d="M50 0V76.5M0 76.5H99" />
          <path className="section-track__arrow" d="m97.6 75.4 1.4 1.1-1.4 1.1" />
        </svg>
        <TrackNode cx={4.5} cy={76.5} />
        <TrackNode cx={24.5} cy={76.5} />
        <TrackNode cx={49} cy={76.5} />
        <TrackNode cx={74.5} cy={76.5} />
      </div>
    )
  }

  if (variant === 'work') {
    return (
      <div
        className="section-track section-track--work"
        aria-hidden="true"
      >
        <svg
          className="section-track__drawing"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path className="section-track__rail" d="M50 0V24M0 97H99" />
          <path className="section-track__arrow" d="m97.6 95.9 1.4 1.1-1.4 1.1" />
        </svg>
        <TrackNode cx={50} cy={24} />
        <TrackNode cx={4} cy={97} />
        <TrackNode cx={20} cy={97} />
        <TrackNode cx={48} cy={97} />
        <TrackNode cx={80} cy={97} />
      </div>
    )
  }

  return (
    <div
      className="section-track section-track--contact"
      aria-hidden="true"
    >
      <svg
        className="section-track__drawing"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          className="section-track__rail"
          d="M0 62.5H6V92Q6 94 8 94H83L99 74V0"
        />
      </svg>
      <TrackNode cx={6} cy={62.5} />
    </div>
  )
}
