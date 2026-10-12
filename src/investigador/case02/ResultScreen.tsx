import {
  attributes, evidences, criteria,
  type AttrTruth, type EvTruth,
} from '../../cases/case_02/conclusion'
import { spots } from '../../cases/case_02/map'
import { StatRow } from '../../ui/Progress'
import { BrandMark } from '../../ui/Brand'
import { IconCheck, IconAlert, IconShield, IconTarget, IconFolder } from '../../ui/icons'
import type { Outcome, FledReason } from './InvestigadorCase02'

const ATTR_LABEL: Record<AttrTruth, string> = { coincide: 'Coincide', diverge: 'Diverge', 'sem-dados': 'Sem dados' }
const EV_LABEL: Record<EvTruth, string> = { fato: 'Fato', relato: 'Relato', hipotese: 'Hipótese' }

function fmt(ms: number) {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

export function ResultScreen({
  outcome, reason, attr, ev, spotId, strikes, captureMs, sessionMs, onRestart,
}: {
  outcome: Outcome
  reason: FledReason
  attr: Record<string, AttrTruth>
  ev: Record<string, EvTruth>
  spotId: string | null
  strikes: number
  captureMs: number
  sessionMs: number
  onRestart: () => void
}) {
  const captured = outcome === 'captured'
  const attrCorrect = attributes.filter((a) => attr[a.id] === a.truth).length
  const evCorrect = evidences.filter((e) => ev[e.id] === e.truth).length
  const childAsFact = ev['ev-crianca'] === 'fato'
  const correctSpot = spots.find((s) => s.correct)

  // critérios (§9) — status computável onde dá
  const critStatus: ('ok' | 'bad')[] = [
    'ok', // consultou documentos (chegou até aqui)
    attr['nome'] === 'sem-dados' ? 'ok' : 'bad', // identidade vem dos docs, não da denúncia
    attr['tatuagens'] === 'coincide' && attr['cicatriz'] === 'coincide' ? 'ok' : 'bad',
    ev['ev-horarios'] === 'relato' && ev['ev-suv'] === 'relato' && ev['ev-identidade'] === 'hipotese' ? 'ok' : 'bad',
    ev['ev-crianca'] !== 'fato' ? 'ok' : 'bad',
    evCorrect >= evidences.length - 1 ? 'ok' : 'bad',
    captured ? 'ok' : 'bad',
  ]

  return (
    <div className="aicoi-result">
      <div className="ar-brand"><BrandMark size="sm" /></div>

      <div className={'ar-hero ' + (captured ? 'ok' : 'bad')}>
        <span className="ar-ic">{captured ? <IconTarget size={38} /> : <IconAlert size={38} />}</span>
        <h1>{captured ? 'SUSPEITO CAPTURADO' : 'O SUSPEITO FUGIU'}</h1>
        <p>
          {captured
            ? `Equipe despachada a tempo para ${correctSpot?.label}. A correspondência era plausível e a localização, corroborada — captura para fins de verificação e extradição.`
            : reason === 'raid'
              ? 'Despachos sucessivos no lugar errado expuseram a operação. O suspeito percebeu a movimentação e deixou a cidade antes de ser localizado.'
              : spotId
                ? `A localização (${correctSpot?.label}) estava certa, mas a janela de captura fechou antes da ordem. O alvo deixou a área.`
                : 'A janela de captura expirou. Sem ação a tempo, o alvo deixou a área.'}
        </p>
      </div>

      <div className="ar-stats">
        <StatRow stats={[
          { label: 'atributos', value: `${attrCorrect}/${attributes.length}`, tone: attrCorrect === attributes.length ? 'ok' : 'blue' },
          { label: 'evidências', value: `${evCorrect}/${evidences.length}`, tone: evCorrect === evidences.length ? 'ok' : 'blue' },
          { label: 'despachos errados', value: String(strikes), tone: strikes === 0 ? 'ok' : 'warn' },
          { label: captured ? 'tempo p/ capturar' : 'tempo de sessão', value: captured ? fmt(captureMs) : fmt(sessionMs) },
        ]} />
      </div>

      {childAsFact && (
        <div className="ar-flag">
          <IconAlert size={16} />
          <p><b>Atenção:</b> você classificou a interação com a criança como <b>fato / crime</b>. O relato descreve apenas um gesto — isso não comprova delito. Trate como hipótese.</p>
        </div>
      )}

      <section className="ar-sec">
        <h3><IconFolder size={15} /> Critérios da investigação</h3>
        <ul className="ar-crit">
          {criteria.map((c, i) => (
            <li key={i} className={critStatus[i]}>
              {critStatus[i] === 'ok' ? <IconCheck size={15} /> : <IconAlert size={15} />}
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="ar-sec">
        <h3>Correlação — seu veredito</h3>
        <div className="ar-rows">
          {attributes.map((a) => {
            const got = attr[a.id]
            const ok = got === a.truth
            return (
              <div key={a.id} className={'ar-row ' + (got ? (ok ? 'ok' : 'bad') : 'skip')}>
                <b>{a.label}</b>
                <span className="ar-ans">
                  {got ? ATTR_LABEL[got] : '—'} {got && !ok && <em>→ {ATTR_LABEL[a.truth]}</em>}
                </span>
                <p>{a.note}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="ar-sec">
        <h3>Classificação de evidências</h3>
        <div className="ar-rows">
          {evidences.map((e) => {
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

      <p className="ar-note">
        <IconShield size={14} /> AICOI, pessoas, documentos e locais são 100% fictícios. Denúncia anônima
        é pista, não prova; semelhança não é identificação.
      </p>
      <button className="ar-restart" onClick={onRestart}>↺ Investigar de novo</button>
    </div>
  )
}
