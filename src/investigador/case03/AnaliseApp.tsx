import {
  evidences, comparisons, intro, ACTIVE_PHASE_MAX,
  type EvTruth, type CmpTruth,
} from '../../cases/case_03/evidence'
import type { InvestState } from './InvestigadorCase03'
import { IconSearch, IconLock, IconFolder } from '../../ui/icons'

const EV_OPTS: { v: EvTruth; label: string }[] = [
  { v: 'confirmado', label: 'Confirmado' },
  { v: 'relato', label: 'Relato' },
  { v: 'hipotese', label: 'Hipótese' },
  { v: 'desconhecido', label: 'Desconhecido' },
]
const CMP_OPTS: { v: CmpTruth; label: string }[] = [
  { v: 'confirmada', label: 'Confirmada' },
  { v: 'acrescentada', label: 'Acrescentada' },
  { v: 'incerta', label: 'Incerta' },
]

/** App Análise: classificar evidências (4 valores) + comparar depoimento × anotação. */
export function AnaliseApp({ invest }: { invest: InvestState }) {
  const evActive = evidences.filter((e) => e.phase <= ACTIVE_PHASE_MAX)
  const evLocked = evidences.filter((e) => e.phase > ACTIVE_PHASE_MAX)
  const cmpActive = comparisons.filter((c) => c.phase <= ACTIVE_PHASE_MAX)

  const evDone = evActive.filter((e) => invest.ev[e.id]).length
  const cmpDone = cmpActive.filter((c) => invest.cmp[c.id]).length

  return (
    <div className="analise">
      <p className="an-intro">{intro}</p>

      <section className="an-sec">
        <h3><IconSearch size={15} /> Quadro de evidências <span>{evDone}/{evActive.length}</span></h3>
        <p className="an-tip">Classifique cada afirmação: fato <b>confirmado</b>, <b>relato</b> testemunhal, <b>hipótese</b> ou <b>desconhecido</b>.</p>
        <div className="an-rows">
          {evActive.map((e) => (
            <div key={e.id} className="an-row">
              <div className="an-row-head"><span className="an-claim">{e.text}</span></div>
              <div className="an-opts an-opts-4">
                {EV_OPTS.map((o) => (
                  <button
                    key={o.v}
                    className={'an-opt' + (invest.ev[e.id] === o.v ? ' sel' : '')}
                    onClick={() => invest.setEv(e.id, o.v)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {evLocked.map((e) => (
            <div key={e.id} className="an-row locked">
              <div className="an-row-head"><span className="an-claim">{e.text}</span></div>
              <span className="an-locktag"><IconLock size={13} /> Disponível nas fases {e.phase}+</span>
            </div>
          ))}
        </div>
      </section>

      <section className="an-sec">
        <h3><IconSearch size={15} /> Depoimento × anotação complementar <span>{cmpDone}/{cmpActive.length}</span></h3>
        <p className="an-tip">Para cada informação, diga se a carta de testemunho a <b>confirma</b>, a <b>acrescenta</b> (não estava no resumo da imprensa) ou a deixa <b>incerta</b>.</p>
        <div className="an-rows">
          {cmpActive.map((c) => (
            <div key={c.id} className="an-row">
              <div className="an-row-head"><b>{c.info}</b></div>
              <div className="an-cmp"><span className="an-from">{c.detail}</span></div>
              <div className="an-opts">
                {CMP_OPTS.map((o) => (
                  <button
                    key={o.v}
                    className={'an-opt' + (invest.cmp[c.id] === o.v ? ' sel' : '')}
                    onClick={() => invest.setCmp(c.id, o.v)}
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
        <IconFolder size={15} /> Com o quadro montado, vá ao <b>Relatório</b> para encerrar a etapa investigativa.
      </div>
    </div>
  )
}
