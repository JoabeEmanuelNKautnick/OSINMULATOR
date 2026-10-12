import { attributes, evidences, intro, type AttrTruth, type EvTruth } from '../../cases/case_02/conclusion'
import type { HuntState } from './InvestigadorCase02'
import { IconSearch, IconMap } from '../../ui/icons'

const ATTR_OPTS: { v: AttrTruth; label: string }[] = [
  { v: 'coincide', label: 'Coincide' },
  { v: 'diverge', label: 'Diverge' },
  { v: 'sem-dados', label: 'Sem dados' },
]
const EV_OPTS: { v: EvTruth; label: string }[] = [
  { v: 'fato', label: 'Fato' },
  { v: 'relato', label: 'Relato' },
  { v: 'hipotese', label: 'Hipótese' },
]

/** App Análise: o jogador monta a teoria — correlação de atributos + classificação. */
export function AnaliseApp({ hunt }: { hunt: HuntState }) {
  const attrDone = attributes.filter((a) => hunt.attr[a.id]).length
  const evDone = evidences.filter((e) => hunt.ev[e.id]).length

  return (
    <div className="analise">
      <p className="an-intro">{intro}</p>

      <section className="an-sec">
        <h3><IconSearch size={15} /> Correlação — Denúncia × Procurado <span>{attrDone}/{attributes.length}</span></h3>
        <p className="an-tip">Para cada atributo, diga se os dois lados coincidem, divergem ou se falta dado.</p>
        <div className="an-rows">
          {attributes.map((a) => (
            <div key={a.id} className="an-row">
              <div className="an-row-head"><b>{a.label}</b></div>
              <div className="an-cmp">
                <span className="an-from"><em>Denúncia:</em> {a.fromDenuncia}</span>
                <span className="an-from"><em>Procurado:</em> {a.fromProcurado}</span>
              </div>
              <div className="an-opts">
                {ATTR_OPTS.map((o) => (
                  <button
                    key={o.v}
                    className={'an-opt' + (hunt.attr[a.id] === o.v ? ' sel' : '')}
                    onClick={() => hunt.setAttr(a.id, o.v)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="an-sec">
        <h3><IconSearch size={15} /> Classificação de evidências <span>{evDone}/{evidences.length}</span></h3>
        <p className="an-tip">Separe o que é fato documentado, relato não verificado ou hipótese.</p>
        <div className="an-rows">
          {evidences.map((e) => (
            <div key={e.id} className="an-row">
              <div className="an-row-head"><span className="an-claim">{e.text}</span></div>
              <div className="an-opts">
                {EV_OPTS.map((o) => (
                  <button
                    key={o.v}
                    className={'an-opt' + (hunt.ev[e.id] === o.v ? ' sel' : '')}
                    onClick={() => hunt.setEv(e.id, o.v)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="an-foot">
        <IconMap size={15} /> Com a teoria montada, vá ao <b>Mapa</b> para localizar o suspeito.
      </div>
    </div>
  )
}
