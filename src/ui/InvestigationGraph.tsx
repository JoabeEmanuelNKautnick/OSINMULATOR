import { useMemo, useState } from 'react'
import { graphNodes, graphEdges, type GraphNode } from '../data/graph'
import { categories } from './categories'
import '../styles/graph.css'

function nodeColor(n: GraphNode) { return n.color ?? categories[n.type].color }
function NodeIcon({ n, size }: { n: GraphNode; size: number }) {
  const I = n.icon ?? categories[n.type].Icon
  return <I size={size} />
}

export function InvestigationGraph() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const active = selected ?? hovered

  const byId = useMemo(() => Object.fromEntries(graphNodes.map((n) => [n.id, n])), [])
  const neighbors = useMemo(() => {
    if (!active) return null
    const set = new Set<string>([active])
    for (const e of graphEdges) {
      if (e.from === active) set.add(e.to)
      if (e.to === active) set.add(e.from)
    }
    return set
  }, [active])

  const sel = selected ? byId[selected] : null
  const selCount = selected ? graphEdges.filter((e) => e.from === selected || e.to === selected).length : 0

  return (
    <div className="graph" onClick={() => setSelected(null)}>
      <div className="graph-hint">Grafo de conexões — clique num nó para isolar suas ligações</div>

      <svg className="graph-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {graphEdges.map((e, i) => {
          const a = byId[e.from], b = byId[e.to]
          if (!a || !b) return null
          const incident = active ? (e.from === active || e.to === active) : false
          const cls = 'g-edge' + (active ? (incident ? ' hot' : ' dim') : '')
          return (
            <line
              key={i} className={cls}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              pathLength={100}
              style={{ animationDelay: `${0.3 + i * 0.06}s` }}
            />
          )
        })}
      </svg>

      {/* rótulos das arestas (HTML, para não distorcer) */}
      {graphEdges.map((e, i) => {
        const a = byId[e.from], b = byId[e.to]
        if (!a || !b || !e.label) return null
        const incident = active ? (e.from === active || e.to === active) : false
        const show = !active || incident
        return (
          <span
            key={'l' + i}
            className={'g-edge-label' + (show ? '' : ' hidden')}
            style={{ left: `${(a.x + b.x) / 2}%`, top: `${(a.y + b.y) / 2}%` }}
          >{e.label}</span>
        )
      })}

      {graphNodes.map((n, i) => {
        const dim = neighbors ? !neighbors.has(n.id) : false
        const hot = neighbors ? neighbors.has(n.id) : false
        const cls = 'g-node' + (n.center ? ' center' : '') + (dim ? ' dim' : '') + (hot ? ' hot' : '') + (selected === n.id ? ' sel' : '')
        const color = nodeColor(n)
        return (
          <button
            key={n.id}
            className={cls}
            style={{ left: `${n.x}%`, top: `${n.y}%`, ['--nc' as string]: color, animationDelay: `${i * 0.05}s` }}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={(ev) => { ev.stopPropagation(); setSelected((s) => (s === n.id ? null : n.id)) }}
          >
            <span className="g-node-ic"><NodeIcon n={n} size={n.center ? 22 : 18} /></span>
            <span className="g-node-text">
              <b>{n.label}</b>
              {n.sub && <small>{n.sub}</small>}
            </span>
          </button>
        )
      })}

      {sel && (
        <div className="graph-detail" onClick={(e) => e.stopPropagation()} style={{ ['--nc' as string]: nodeColor(sel) }}>
          <span className="gd-cat"><span className="gd-ic"><NodeIcon n={sel} size={16} /></span>{categories[sel.type].label}</span>
          <b className="gd-value">{sel.label}</b>
          {sel.sub && <span className="gd-sub">{sel.sub}</span>}
          <span className="gd-count">{selCount} conexão{selCount === 1 ? '' : 'ões'}</span>
        </div>
      )}
    </div>
  )
}
