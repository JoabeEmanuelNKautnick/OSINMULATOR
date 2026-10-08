import { missions } from '../data/missions'
import { appMeta } from '../apps/AppView'
import { categories, missionCategory, missionConfidence } from './categories'
import { IconCheck } from './icons'
import '../styles/timeline.css'

// Ordem em que as pistas foram reunidas. Sem relógio: no Analista não há
// uma sessão real cronometrada (o recon reconstrói tudo de uma vez).
export function InvestigationTimeline() {
  return (
    <div className="tl">
      <div className="tl-hint">Linha do tempo — ordem em que as pistas foram reunidas</div>
      <ol className="tl-list">
        {missions.map((m, i) => {
          const cat = categories[missionCategory[m.id]]
          const conf = missionConfidence[m.id]
          return (
            <li className="tl-item" key={m.id} style={{ animationDelay: `${i * 0.08}s`, ['--nc' as string]: cat.color }}>
              <span className="tl-step">{i + 1}</span>
              <span className="tl-dot"><cat.Icon size={14} /></span>
              <div className="tl-body">
                <b className="tl-action">{m.clueLabel}: {m.clueValue}</b>
                <span className="tl-meta">
                  <span className="tl-src">{appMeta[m.app].name}</span>
                  <span className="tl-conf">{conf}%</span>
                </span>
              </div>
            </li>
          )
        })}
        <li className="tl-item tl-final" style={{ animationDelay: `${missions.length * 0.08}s` }}>
          <span className="tl-step" />
          <span className="tl-dot done"><IconCheck size={14} /></span>
          <div className="tl-body"><b className="tl-action">Investigação concluída</b></div>
        </li>
      </ol>
    </div>
  )
}
