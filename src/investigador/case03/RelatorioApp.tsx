import { evidences, ACTIVE_PHASE_MAX, type EvTruth } from '../../cases/case_03/evidence'
import type { InvestState } from './InvestigadorCase03'
import { IconFolder, IconAlert, IconCheck, IconSearch } from '../../ui/icons'

const EV_LABEL: Record<EvTruth, string> = {
  confirmado: 'Confirmado', relato: 'Relato', hipotese: 'Hipótese', desconhecido: 'Desconhecido',
}

/** App Relatório — revisão do quadro + emissão do relatório de encerramento. */
export function RelatorioApp({ invest, onGoAnalise }: { invest: InvestState; onGoAnalise: () => void }) {
  const active = evidences.filter((e) => e.phase <= ACTIVE_PHASE_MAX)
  const answered = active.filter((e) => invest.ev[e.id]).length
  const complete = answered === active.length

  return (
    <div className="relatorio">
      <p className="rl-intro">
        <IconFolder size={15} /> Revise suas classificações antes de encerrar a etapa. O relatório é
        <b> graduado pela qualidade da investigação</b> — não existe “resolver o caso”. Preserve a
        verdade central: o destino de Marie não foi confirmado.
      </p>

      {!invest.windowRegistered && (
        <div className="rl-warn"><IconAlert size={15} /> <p>Reconstrua a <b>Linha do tempo</b> antes de encerrar.</p></div>
      )}

      <section className="rl-review">
        <h4>Quadro de evidências <span>{answered}/{active.length}</span></h4>
        <ul className="rl-list">
          {active.map((e) => {
            const got = invest.ev[e.id]
            return (
              <li key={e.id} className={'rl-item' + (got ? '' : ' empty')}>
                <span className="rl-claim">{e.text}</span>
                <span className="rl-verdict">{got ? EV_LABEL[got] : '— pendente'}</span>
              </li>
            )
          })}
        </ul>
      </section>

      {!complete && (
        <button className="rl-btn ghost" onClick={onGoAnalise}>
          <IconSearch size={15} /> Voltar à Análise ({active.length - answered} pendente{active.length - answered > 1 ? 's' : ''})
        </button>
      )}

      <button
        className="rl-btn submit"
        onClick={invest.submitReport}
        disabled={!complete || !invest.windowRegistered}
      >
        <IconCheck size={16} /> Emitir relatório de encerramento
      </button>
      <p className="rl-foot">Dica: o relatório é rejeitado se você elevar uma suspeita a certeza.</p>
    </div>
  )
}
