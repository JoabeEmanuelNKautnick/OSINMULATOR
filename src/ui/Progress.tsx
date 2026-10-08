export type Tone = 'purple' | 'blue' | 'ok' | 'warn' | 'danger'

const toneVar: Record<Tone, string> = {
  purple: 'var(--purple)',
  blue: 'var(--blue)',
  ok: 'var(--ok)',
  warn: 'var(--warn)',
  danger: 'var(--danger)',
}

/** Barra rotulada com percentual. tone 'auto' escolhe a cor pela faixa. */
export function ProgressBar({
  label, value, max = 100, tone = 'purple', showPct = true,
}: {
  label?: string
  value: number
  max?: number
  tone?: Tone | 'auto'
  showPct?: boolean
}) {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)))
  const t: Tone = tone === 'auto'
    ? (pct >= 80 ? 'ok' : pct >= 50 ? 'blue' : pct >= 30 ? 'warn' : 'danger')
    : tone
  return (
    <div className="pg">
      {(label || showPct) && (
        <div className="pg-top">
          {label && <span className="pg-label">{label}</span>}
          {showPct && <span className="pg-pct" style={{ color: toneVar[t] }}>{pct}%</span>}
        </div>
      )}
      <div className="pg-track">
        <span className="pg-fill" style={{ width: pct + '%', background: toneVar[t] }} />
      </div>
    </div>
  )
}

export interface Stat {
  label: string
  value: string
  tone?: Tone
}

/** Linha de métricas (pontos / acertos / tempo etc.). */
export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="stat-row">
      {stats.map((s, i) => (
        <div key={i} className="stat">
          <b style={s.tone ? { color: toneVar[s.tone] } : undefined}>{s.value}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  )
}
