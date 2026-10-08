import { categories, type CategoryKey } from './categories'

export interface EvidenceCardProps {
  category: CategoryKey
  value: string
  source?: string        // app/fonte (ex.: Fotogram)
  confidence?: number     // 0-100
  xp?: number
  isNew?: boolean         // dispara a animação de "nova evidência"
  compact?: boolean
}

function confTone(c: number) {
  if (c >= 80) return 'ok'
  if (c >= 50) return 'blue'
  if (c >= 30) return 'warn'
  return 'danger'
}

export function EvidenceCard({
  category, value, source, confidence, xp, isNew, compact,
}: EvidenceCardProps) {
  const cat = categories[category]
  const { Icon } = cat
  return (
    <div className={'ev-card' + (isNew ? ' is-new' : '') + (compact ? ' compact' : '')}>
      <span className="ev-ic" style={{ color: cat.color, background: `color-mix(in srgb, ${cat.color} 16%, transparent)` }}>
        <Icon size={compact ? 18 : 22} />
      </span>
      <div className="ev-body">
        <span className="ev-cat" style={{ color: cat.color }}>{cat.label}</span>
        <span className="ev-value">{value}</span>
        {(source || confidence != null) && (
          <div className="ev-meta">
            {source && <span className="ev-src">{source}</span>}
            {confidence != null && (
              <span className={'ev-conf ' + confTone(confidence)}>{confidence}%</span>
            )}
          </div>
        )}
      </div>
      {xp != null && <span className="ev-xp">+{xp} XP</span>}
    </div>
  )
}
