import { useState } from 'react'
import { spots, MAX_STRIKES } from '../../cases/case_02/map'
import type { HuntState } from './InvestigadorCase02'
import { IconMapPin, IconAlert, IconCheck, IconSearch, IconLock } from '../../ui/icons'

/** App Mapa: dedução travada por análise + leads; despacho por tentativas limitadas. */
export function MapApp({
  hunt, locationLabel, onGoMessages, onGoAnalise,
}: {
  hunt: HuntState
  locationLabel?: string
  onGoMessages: () => void
  onGoAnalise: () => void
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ text: string; kind: 'ok' | 'bad' } | null>(null)

  const ready = hunt.analysisComplete && hunt.leadsRead
  const triesLeft = MAX_STRIKES - hunt.strikes

  function confirm() {
    if (!ready || !selected || hunt.locationFound) return
    const spot = spots.find((s) => s.id === selected)!
    const verdict = hunt.commitSpot(spot)
    if (verdict === 'correct') setMsg({ text: spot.feedback, kind: 'ok' })
    else setMsg({ text: spot.feedback, kind: 'bad' })
  }

  return (
    <div className="mapa">
      {!hunt.locationFound && (
        <div className="mp-top">
          <p className="mp-tip">
            <IconSearch size={14} /> Onde o suspeito está <b>agora</b>? Cruze a rotina da denúncia com o lead do SUV e <b>despache a equipe</b>. Você tem <b>{triesLeft}</b> {triesLeft === 1 ? 'tentativa' : 'tentativas'}.
          </p>
          {!ready && (
            <div className="mp-lock">
              <IconLock size={15} />
              <span>Leads insuficientes para agir.</span>
              {!hunt.leadsRead && <button className="mp-link" onClick={onGoMessages}>abrir Mensagens</button>}
              {!hunt.analysisComplete && <button className="mp-link" onClick={onGoAnalise}>concluir Análise</button>}
            </div>
          )}
        </div>
      )}
      {hunt.locationFound && (
        <p className="mp-found"><IconCheck size={15} /> Localização confirmada: <b>{locationLabel}</b>. Emita a ordem de captura antes que a janela feche.</p>
      )}

      <div className="mp-canvas">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mp-bg" aria-hidden="true">
          <defs>
            <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0b2436" />
              <stop offset="1" stopColor="#071a28" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#sea)" />
          <path d="M0 0 H100 V60 Q80 56 62 64 Q46 70 32 64 Q16 58 0 68 Z" fill="#0e2233" stroke="#1c3550" strokeWidth="0.4" />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={'v' + i} x1={(i + 1) * 10} y1="0" x2={(i + 1) * 10} y2="100" stroke="#12283b" strokeWidth="0.2" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={'h' + i} x1="0" y1={(i + 1) * 10} x2="100" y2={(i + 1) * 10} stroke="#12283b" strokeWidth="0.2" />
          ))}
        </svg>

        {spots.map((s) => {
          const isSel = selected === s.id
          const isChosen = hunt.locationFound && s.correct
          return (
            <button
              key={s.id}
              className={'mp-spot' + (isSel ? ' sel' : '') + (isChosen ? ' chosen' : '')}
              style={{ left: s.x + '%', top: s.y + '%' }}
              onClick={() => !hunt.locationFound && setSelected(s.id)}
              disabled={hunt.locationFound}
              title={s.label}
            >
              <IconMapPin size={20} />
              <span className="mp-label">{s.label}<em>{s.sub}</em></span>
            </button>
          )
        })}
      </div>

      {!hunt.locationFound && (
        <button className="mp-dispatch" onClick={confirm} disabled={!ready || !selected}>
          {selected ? `Despachar equipe → ${spots.find((s) => s.id === selected)?.label}` : 'Selecione um ponto no mapa'}
        </button>
      )}

      {msg && (
        <div className={'mp-feedback ' + msg.kind}>
          {msg.kind === 'ok' ? <IconCheck size={16} /> : <IconAlert size={16} />}
          <p>{msg.text}{msg.kind === 'bad' && triesLeft > 0 && <><br /><b>Tentativas restantes: {triesLeft}.</b></>}</p>
        </div>
      )}
    </div>
  )
}
