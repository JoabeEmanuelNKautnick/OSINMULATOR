import type { Run } from '../data/persona'

// Mapa fictício desenhado em SVG. O trajeto "loop" sai e volta ao mesmo ponto.
export function RouteMap({ run, small }: { run: Run; small?: boolean }) {
  const loop = run.route === 'loop'
  return (
    <svg viewBox="0 0 300 180" width="100%" height={small ? 110 : 180} className="rmap">
      <rect width="300" height="180" fill="#dfe7e3" />
      {/* quarteirões */}
      <g stroke="#c3cec8" strokeWidth="10">
        <line x1="0" y1="50" x2="300" y2="50" />
        <line x1="0" y1="120" x2="300" y2="120" />
        <line x1="80" y1="0" x2="80" y2="180" />
        <line x1="200" y1="0" x2="200" y2="180" />
      </g>
      {loop ? (
        <>
          <path
            d="M80 120 L80 50 L200 50 L200 120 Z"
            fill="none"
            stroke="#e8491d"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <circle cx="80" cy="120" r="9" fill="#1b7a4b" />
          <text x="80" y="150" textAnchor="middle" fontSize="11" fill="#145">início/fim</text>
        </>
      ) : (
        <>
          <path d="M40 150 C 90 60, 170 140, 260 40" fill="none" stroke="#e8491d" strokeWidth="5" />
          <circle cx="40" cy="150" r="9" fill="#1b7a4b" />
          <circle cx="260" cy="40" r="9" fill="#c0392b" />
        </>
      )}
    </svg>
  )
}
