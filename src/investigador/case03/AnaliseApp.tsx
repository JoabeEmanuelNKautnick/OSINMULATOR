import {
  evidences, comparisons, intro,
  montbleuFacts, acolhimentoRows, projecaoRows, matchDecisions,
  type EvTruth, type CmpTruth, type MatchRow, type RowVerdict,
} from '../../cases/case_03/evidence'
import type { InvestState } from './InvestigadorCase03'
import { IconSearch, IconLock, IconFolder, IconPaw, IconMapPin, IconImage } from '../../ui/icons'

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
const VERDICT_LABEL: Record<RowVerdict, string> = {
  compativel: 'Compatível', divergente: 'Divergente', 'sem-dados': 'Sem dados',
}

function MatchTable({ rows }: { rows: MatchRow[] }) {
  return (
    <div className="mt-table">
      {rows.map((r) => (
        <div key={r.id} className={'mt-row v-' + r.verdict}>
          <b>{r.label}</b>
          <span className="mt-marie">Marie: {r.marie}</span>
          <span className="mt-found">Encontrado: {r.encontrado}</span>
          <span className="mt-badge">{VERDICT_LABEL[r.verdict]}</span>
        </div>
      ))}
    </div>
  )
}

function Decision({ value, onPick }: { value?: string; onPick: (id: string) => void }) {
  return (
    <div className="an-opts an-opts-col">
      {matchDecisions.map((d) => (
        <button
          key={d.id}
          className={'an-opt an-opt-wide' + (value === d.id ? ' sel' : '')}
          onClick={() => onPick(d.id)}
        >
          {d.label}
        </button>
      ))}
    </div>
  )
}

/** App Análise: quadro de evidências + comparações + fases 6–8 (liberadas por progresso). */
export function AnaliseApp({ invest }: { invest: InvestState }) {
  const max = invest.unlockedMax
  const evActive = evidences.filter((e) => e.phase <= max)
  const evLocked = evidences.filter((e) => e.phase > max)
  const cmpActive = comparisons

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
              <span className="an-locktag"><IconLock size={13} /> Libera na fase {e.phase}</span>
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

      {/* Fase 6 — Montbleu */}
      <section className="an-sec">
        <h3><IconPaw size={15} /> Fase 6 — Arquivo de Montbleu</h3>
        {max >= 6 ? (
          <>
            <p className="an-tip">Registros familiares anteriores a 2000. Confirmam dados civis e o objeto — compatibilidade, não identidade.</p>
            <ul className="mb-facts">
              {montbleuFacts.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <p className="an-tip">Classifique no quadro acima a afirmação sobre o coelho (ela já está liberada).</p>
          </>
        ) : (
          <p className="an-locktag"><IconLock size={13} /> Conclua o Ato I–II para abrir o arquivo de Montbleu.</p>
        )}
      </section>

      {/* Fase 7 — Acolhimento */}
      <section className="an-sec">
        <h3><IconMapPin size={15} /> Fase 7 — Ficha de acolhimento</h3>
        {max >= 7 ? (
          <>
            <p className="an-tip">Um registro de menor não identificada, semanas após o desaparecimento. Compare e decida — sem transformar semelhança em identidade.</p>
            <MatchTable rows={acolhimentoRows} />
            <p className="an-tip">O que fazer com esta pista?</p>
            <Decision value={invest.acolhimentoDecision} onPick={invest.setAcolhimento} />
          </>
        ) : (
          <p className="an-locktag"><IconLock size={13} /> Conclua o Ato I–II para abrir a pista de acolhimento.</p>
        )}
      </section>

      {/* Fase 8 — Projeção 2026 */}
      <section className="an-sec">
        <h3><IconImage size={15} /> Fase 8 — A mulher de 2026</h3>
        {max >= 8 ? (
          <>
            <p className="an-tip">Projeção de envelhecimento × descrição de uma mulher adulta de um arquivo público fictício. Projeção não é retrato.</p>
            <MatchTable rows={projecaoRows} />
            <p className="an-tip">O que fazer com esta correspondência?</p>
            <Decision value={invest.projecaoDecision} onPick={invest.setProjecao} />
          </>
        ) : (
          <p className="an-locktag"><IconLock size={13} /> Conclua o Ato III (mapa + Montbleu + acolhimento) para abrir a fase 8.</p>
        )}
      </section>

      <div className="an-foot">
        <IconFolder size={15} /> Com o quadro montado, vá ao <b>Relatório</b> para encerrar a etapa investigativa.
      </div>
    </div>
  )
}
