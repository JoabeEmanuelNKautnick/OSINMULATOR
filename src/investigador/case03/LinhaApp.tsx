import { useMemo, useState } from 'react'
import { builderEvents, WINDOW, type BuilderEvent } from '../../cases/case_03/timeline'
import type { InvestState } from './InvestigadorCase03'
import { IconClock, IconCheck, IconAlert, IconSearch } from '../../ui/icons'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Fase 1 — o jogador clica os eventos da manhã de 23/04 em ordem cronológica. */
export function LinhaApp({ invest }: { invest: InvestState }) {
  const pool = useMemo(() => shuffle(builderEvents), [])
  const [seq, setSeq] = useState<BuilderEvent[]>([])
  const [checked, setChecked] = useState(false)

  const placedIds = new Set(seq.map((e) => e.id))
  const remaining = pool.filter((e) => !placedIds.has(e.id))
  const allPlaced = seq.length === builderEvents.length
  const correct = seq.every((e, i) => e.order === i)

  function place(e: BuilderEvent) {
    if (invest.windowRegistered) return
    setSeq((s) => [...s, e])
    setChecked(false)
  }
  function reset() {
    setSeq([])
    setChecked(false)
  }
  function verify() {
    setChecked(true)
    if (allPlaced && correct) invest.registerWindow()
  }

  return (
    <div className="linha">
      <p className="ln-intro">
        <IconClock size={15} /> Reconstrua a manhã de <b>23/04/2000</b>. Clique os eventos na ordem
        cronológica. Ao acertar, o sistema registra a janela inicial de investigação.
      </p>

      {!invest.windowRegistered && (
        <section className="ln-pool">
          <h4>Eventos disponíveis</h4>
          <div className="ln-chips">
            {remaining.length === 0 ? (
              <span className="ln-empty">Todos posicionados — clique em “Verificar ordem”.</span>
            ) : remaining.map((e) => (
              <button key={e.id} className="ln-chip" onClick={() => place(e)}>
                <b>{e.time}</b> {e.label}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="ln-seq">
        <h4>Sua linha do tempo</h4>
        <ol className="ln-list">
          {seq.map((e, i) => {
            const ok = e.order === i
            const cls = checked ? (ok ? 'ok' : 'bad') : ''
            return (
              <li key={e.id} className={'ln-item ' + cls}>
                <span className="ln-time">{e.time}</span>
                <div className="ln-body">
                  <b>{e.label}</b>
                  <small>{e.source}</small>
                </div>
                {checked && (ok ? <IconCheck size={15} /> : <IconAlert size={15} />)}
              </li>
            )
          })}
          {seq.length === 0 && <li className="ln-hint">Clique um evento acima para começar.</li>}
        </ol>

        <div className="ln-actions">
          {!invest.windowRegistered && (
            <>
              <button className="ln-btn ghost" onClick={reset} disabled={seq.length === 0}>Recomeçar</button>
              <button className="ln-btn" onClick={verify} disabled={!allPlaced}>Verificar ordem</button>
            </>
          )}
        </div>

        {checked && allPlaced && !correct && (
          <div className="ln-feedback bad">
            <IconAlert size={16} />
            <p>A ordem ainda não está correta. Ajuste pelos horários (10h30 → 13h00) e verifique de novo.</p>
          </div>
        )}

        {invest.windowRegistered && (
          <div className="ln-window">
            <h4><IconSearch size={15} /> {WINDOW.label}: {WINDOW.from} – {WINDOW.to}</h4>
            <p>{WINDOW.note}</p>
          </div>
        )}
      </section>
    </div>
  )
}
