import { useState, useRef, useLayoutEffect, useEffect, type ReactNode } from 'react'
import { categories, type CategoryKey } from '../ui/categories'

const POP_W = 230

/**
 * Envolve um dado "investigável" num app. Ao clicar, abre um popover
 * explicando que pista aquela informação entrega. O popover usa position:fixed
 * (calculado a partir do elemento) para escapar do overflow/recorte dos cards.
 */
export function Clue({
  cat, insight, children,
}: {
  cat: CategoryKey
  insight: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number; up: boolean } | null>(null)
  const ref = useRef<HTMLButtonElement>(null)
  const c = categories[cat]

  useLayoutEffect(() => {
    if (!open) { setPos(null); return }
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const left = Math.max(8, Math.min(r.left, window.innerWidth - POP_W - 8))
    const up = r.bottom > window.innerHeight * 0.62
    setPos({ top: up ? r.top - 6 : r.bottom + 6, left, up })
  }, [open])

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => { window.removeEventListener('scroll', close, true); window.removeEventListener('resize', close) }
  }, [open])

  return (
    <button
      ref={ref}
      type="button"
      className={'clue' + (open ? ' open' : '')}
      style={{ ['--cc' as string]: c.color }}
      onClick={(e) => { e.stopPropagation(); setOpen((o) => !o) }}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && pos && (
        <span
          className="clue-pop"
          role="tooltip"
          style={{ top: pos.top, left: pos.left, transform: pos.up ? 'translateY(-100%)' : undefined }}
        >
          <span className="clue-cat"><c.Icon size={13} /> {c.label}</span>
          <span className="clue-text">{insight}</span>
        </span>
      )}
    </button>
  )
}
