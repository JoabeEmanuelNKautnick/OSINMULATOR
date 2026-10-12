import {
  evidences, annexItems, annexNote, type EvTruth,
} from '../../cases/case_03/evidence'
import type { InvestState } from './InvestigadorCase03'
import { IconFolder, IconAlert, IconCheck, IconSearch, IconLock, IconFile } from '../../ui/icons'

const EV_LABEL: Record<EvTruth, string> = {
  confirmado: 'Confirmado', relato: 'Relato', hipotese: 'Hipótese', desconhecido: 'Desconhecido',
}

/** App Relatório — revisão do quadro + índice de anexos (§13) + emissão graduada. */
export function RelatorioApp({ invest, onGoAnalise }: { invest: InvestState; onGoAnalise: () => void }) {
  const active = evidences.filter((e) => e.phase <= invest.unlockedMax)
  const answered = active.filter((e) => invest.ev[e.id]).length

  // Próximo passo pendente (guia o jogador pelos atos).
  let pending: string | null = null
  if (!invest.windowRegistered) pending = 'Reconstrua a Linha do tempo (Fase 1).'
  else if (!invest.camerasSolved) pending = 'Conclua o puzzle das Câmeras (Fase 4).'
  else if (!invest.actI_II_done) pending = 'Classifique todas as evidências e comparações das fases 1–4 (Análise).'
  else if (!invest.actIII_done) pending = 'Conclua o Ato III: Mapa, Montbleu e a pista de Acolhimento (Análise).'
  else if (!invest.reportReady) pending = 'Conclua a Fase 8 (mulher de 2026) e classifique os itens liberados.'

  return (
    <div className="relatorio">
      <p className="rl-intro">
        <IconFolder size={15} /> Revise suas classificações antes de encerrar. O relatório é
        <b> graduado pela qualidade da investigação</b> — não existe “resolver o caso”. Preserve a
        verdade central: o destino de Marie não foi confirmado.
      </p>

      {pending && (
        <div className="rl-warn"><IconLock size={15} /> <p><b>Pendente:</b> {pending}</p></div>
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

      {/* §13 — a última descoberta: o arquivo incompleto */}
      {invest.unlockedMax >= 8 && (
        <section className="rl-annex">
          <h4><IconFile size={15} /> Índice de anexos do registro consular (D31)</h4>
          <ul className="ax-list">
            {annexItems.map((a) => (
              <li key={a.id} className={a.present ? 'present' : 'missing'}>
                <span className="ax-id">{a.id}</span>
                <span className="ax-label">{a.label}</span>
                <span className="ax-status">{a.present ? 'Presente' : 'AUSENTE'}</span>
              </li>
            ))}
          </ul>
          <p className="ax-note"><IconAlert size={14} /> {annexNote}</p>
        </section>
      )}

      {!invest.reportReady && (
        <button className="rl-btn ghost" onClick={onGoAnalise}>
          <IconSearch size={15} /> Ir para a Análise
        </button>
      )}

      <button
        className="rl-btn submit"
        onClick={invest.submitReport}
        disabled={!invest.reportReady}
      >
        <IconCheck size={16} /> Emitir relatório de encerramento
      </button>
      <p className="rl-foot">Dica: o relatório é rejeitado se você elevar uma suspeita a certeza.</p>
    </div>
  )
}
