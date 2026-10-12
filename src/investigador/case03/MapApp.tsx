import { landmarks, routes, type RouteVerdict } from '../../cases/case_03/map'
import type { InvestState } from './InvestigadorCase03'
import { IconMapPin, IconSearch, IconCheck } from '../../ui/icons'

const VERDICTS: { v: RouteVerdict; label: string }[] = [
  { v: 'compativel', label: 'Compatível' },
  { v: 'incompativel', label: 'Incompatível' },
  { v: 'indeterminado', label: 'Indeterminado' },
]

/** Fase 5 — reconstrução de percursos. Sem "ponto correto", sem captura. */
export function MapApp({ invest }: { invest: InvestState }) {
  const marked = routes.filter((r) => invest.routes[r.id]).length
  const allMarked = marked === routes.length
  return (
    <div className="mapa mapa-cold">
      <p className="mp-tip">
        <IconSearch size={14} /> Marque cada percurso como <b>compatível</b>, <b>incompatível</b> ou
        <b> indeterminado</b> com os documentos. Não existe um “lugar certo” — o objetivo é verificar
        possibilidades, não simular uma localização que as evidências não fornecem.
      </p>

      <div className="mp-canvas">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mp-bg" aria-hidden="true">
          <defs>
            <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#13261a" />
              <stop offset="1" stopColor="#0c1a12" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#grass)" />
          {/* muralha do castelo */}
          <rect x="18" y="18" width="64" height="66" rx="3" fill="#152417" stroke="#2c4433" strokeWidth="0.6" />
          <rect x="40" y="46" width="22" height="22" rx="1" fill="#1b2e20" stroke="#34513c" strokeWidth="0.5" />
          {/* percursos */}
          {routes.map((r) => (
            <line
              key={r.id}
              x1={r.from.x} y1={r.from.y} x2={r.to.x} y2={r.to.y}
              stroke="var(--warn)" strokeWidth="0.7" strokeDasharray="2 1.6" opacity="0.8"
            />
          ))}
        </svg>

        {landmarks.map((l) => (
          <span key={l.id} className="mp-mark" style={{ left: l.x + '%', top: l.y + '%' }}>
            <IconMapPin size={18} />
            <em>{l.label}</em>
          </span>
        ))}
      </div>

      <div className="rt-rows">
        {routes.map((r) => (
          <div key={r.id} className="rt-row">
            <div className="rt-head"><b>{r.label}</b><small>{r.sub}</small></div>
            <div className="an-opts">
              {VERDICTS.map((o) => (
                <button
                  key={o.v}
                  className={'an-opt' + (invest.routes[r.id] === o.v ? ' sel' : '')}
                  onClick={() => invest.setRoute(r.id, o.v)}
                >
                  {o.label}
                </button>
              ))}
            </div>
            {invest.routes[r.id] && <p className="rt-note">{r.note}</p>}
          </div>
        ))}
      </div>

      {allMarked ? (
        <div className="cm-lesson"><IconCheck size={16} /><p><b>Percursos avaliados.</b> Não há registro confiável do último ponto físico em que Marie foi vista com certeza — o portão leste não se sustenta como "última localização conhecida".</p></div>
      ) : (
        <p className="cm-hint">Marque os {routes.length} percursos ({marked}/{routes.length}) para avançar.</p>
      )}
    </div>
  )
}
