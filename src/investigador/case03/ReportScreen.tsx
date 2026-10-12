import { useState } from 'react'
import {
  evidences, comparisons, criteria, ACTIVE_PHASE_MAX,
  type EvTruth, type CmpTruth,
} from '../../cases/case_03/evidence'
import { closingReport, finalScene, type ReportResult } from '../../cases/case_03/endings'
import { caseImage } from '../../cases/images'
import { StatRow } from '../../ui/Progress'
import { BrandMark } from '../../ui/Brand'
import { IconCheck, IconAlert, IconShield, IconFolder } from '../../ui/icons'

const EV_LABEL: Record<EvTruth, string> = {
  confirmado: 'Confirmado', relato: 'Relato', hipotese: 'Hipótese', desconhecido: 'Desconhecido',
}
const CMP_LABEL: Record<CmpTruth, string> = {
  confirmada: 'Confirmada', acrescentada: 'Acrescentada', incerta: 'Incerta',
}

export function ReportScreen({
  result, ev, cmp, onRestart, onReview,
}: {
  result: ReportResult
  ev: Record<string, EvTruth>
  cmp: Record<string, CmpTruth>
  onRestart: () => void
  onReview: () => void
}) {
  const [showScene, setShowScene] = useState(false)
  const { ending, overclaims, correct, totalActive } = result
  const rejected = ending.rejected

  const evActive = evidences.filter((e) => e.phase <= ACTIVE_PHASE_MAX)
  const cmpActive = comparisons.filter((c) => c.phase <= ACTIVE_PHASE_MAX)
  const cmpCorrect = cmpActive.filter((c) => cmp[c.id] === c.truth).length

  if (showScene) {
    const child = caseImage('case_03', 'ultima_foto')
    const proj = caseImage('case_03', 'progressao_idade')
    return (
      <div className="rp-scene">
        <div className="rp-photos">
          {child && <figure><img src={child} alt="Marie em 1999" /><figcaption>Marie · 1999</figcaption></figure>}
          {proj && <figure><img src={proj} alt="Projeção 2026" /><figcaption>Projeção · 2026</figcaption></figure>}
        </div>
        <div className="rp-stamp">{finalScene.stamp}</div>
        <p className="rp-line">{finalScene.line}</p>
        <p className="rp-quote">{finalScene.quote}</p>
        <button className="ar-restart" onClick={onRestart}>↺ Investigar de novo</button>
      </div>
    )
  }

  return (
    <div className="aicoi-result">
      <div className="ar-brand"><BrandMark size="sm" /></div>

      <div className={'ar-hero ' + (rejected ? 'bad' : 'ok')}>
        <span className="ar-ic">{rejected ? <IconAlert size={38} /> : <IconFolder size={38} />}</span>
        <h1>Final {ending.id} — {ending.title}</h1>
        <p>{ending.summary}</p>
      </div>

      <div className="ar-stats">
        <StatRow stats={[
          { label: 'evidências corretas', value: `${correct}/${totalActive}`, tone: correct === totalActive ? 'ok' : 'blue' },
          { label: 'comparações corretas', value: `${cmpCorrect}/${cmpActive.length}`, tone: cmpCorrect === cmpActive.length ? 'ok' : 'blue' },
          { label: 'exageros (suspeita→certeza)', value: String(overclaims.length), tone: overclaims.length === 0 ? 'ok' : 'warn' },
        ]} />
      </div>

      {rejected && (
        <div className="ar-flag">
          <IconAlert size={16} />
          <p><b>Relatório rejeitado:</b> você elevou uma suspeita a certeza. Reveja os itens marcados como “Confirmado” que, na verdade, são relato, hipótese ou desconhecido — e emita novamente.</p>
        </div>
      )}

      {!rejected && (
        <div className="ar-closing">
          <h3>{closingReport.heading}</h3>
          <p className="ar-closing-meta"><b>Caso:</b> {closingReport.caseName} · <b>Ref.:</b> {closingReport.ref} · <b>Data:</b> {closingReport.date}</p>
          {closingReport.body.map((p, i) => <p key={i}>{p}</p>)}
          <p className="ar-closing-conc"><b>Conclusão:</b> {closingReport.conclusion}</p>
        </div>
      )}

      <section className="ar-sec">
        <h3><IconFolder size={15} /> Critérios da investigação</h3>
        <ul className="ar-crit">
          {criteria.map((c, i) => <li key={i} className="ok"><IconCheck size={15} /><span>{c}</span></li>)}
        </ul>
      </section>

      <section className="ar-sec">
        <h3>Quadro de evidências — seu veredito</h3>
        <div className="ar-rows">
          {evActive.map((e) => {
            const got = ev[e.id]
            const ok = got === e.truth
            return (
              <div key={e.id} className={'ar-row ' + (got ? (ok ? 'ok' : 'bad') : 'skip')}>
                <b>{e.text}</b>
                <span className="ar-ans">
                  {got ? EV_LABEL[got] : '—'} {got && !ok && <em>→ {EV_LABEL[e.truth]}</em>}
                </span>
                <p>{e.note}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="ar-sec">
        <h3>Depoimento × anotação — seu veredito</h3>
        <div className="ar-rows">
          {cmpActive.map((c) => {
            const got = cmp[c.id]
            const ok = got === c.truth
            return (
              <div key={c.id} className={'ar-row ' + (got ? (ok ? 'ok' : 'bad') : 'skip')}>
                <b>{c.info}</b>
                <span className="ar-ans">
                  {got ? CMP_LABEL[got] : '—'} {got && !ok && <em>→ {CMP_LABEL[c.truth]}</em>}
                </span>
                <p>{c.note}</p>
              </div>
            )
          })}
        </div>
      </section>

      <p className="ar-note">
        <IconShield size={14} /> AICOI, pessoas, documentos e locais são 100% fictícios. Relato não é
        prova; semelhança não é identificação; uma projeção não é retrato.
      </p>
      <div className="rp-actions">
        {rejected
          ? <button className="ar-restart" onClick={onReview}>← Corrigir relatório</button>
          : <button className="ar-restart" onClick={() => setShowScene(true)}>Ver cena final →</button>}
        <button className="rl-btn ghost" onClick={onRestart}>↺ Investigar de novo</button>
      </div>
    </div>
  )
}
