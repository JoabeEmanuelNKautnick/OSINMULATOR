import { useState } from 'react'
import { cameraZones, cameraStatuses, cameraLesson } from '../../cases/case_03/cameras'
import type { InvestState } from './InvestigadorCase03'
import { IconCamera, IconCheck, IconAlert, IconLock } from '../../ui/icons'

/** Fase 4 — associe cada zona de vigilância à situação documentada. */
export function CamerasApp({ invest }: { invest: InvestState }) {
  const [pick, setPick] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)

  const allPicked = cameraZones.every((z) => pick[z.id])
  const allCorrect = cameraZones.every((z) => pick[z.id] === z.correct)

  function verify() {
    setChecked(true)
    if (allPicked && allCorrect) invest.solveCameras()
  }

  return (
    <div className="cameras">
      <p className="cm-intro">
        <IconCamera size={15} /> Sistema de vigilância do Castelo Real. Associe cada zona à
        situação que os documentos realmente sustentam.
      </p>

      <div className="cm-canvas">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="cm-bg" aria-hidden="true">
          <rect x="0" y="0" width="100" height="100" fill="#0c1726" />
          <rect x="16" y="16" width="68" height="68" rx="3" fill="#122033" stroke="#24405e" strokeWidth="0.6" />
          <rect x="38" y="46" width="24" height="22" rx="1" fill="#162a41" stroke="#2c4a6b" strokeWidth="0.5" />
        </svg>
        {cameraZones.map((z) => {
          const st = checked ? (pick[z.id] === z.correct ? 'ok' : 'bad') : (pick[z.id] ? 'set' : '')
          return (
            <span key={z.id} className={'cm-node ' + st} style={{ left: z.x + '%', top: z.y + '%' }}>
              <IconCamera size={16} />
              <em>{z.label}</em>
            </span>
          )
        })}
      </div>

      <div className="cm-rows">
        {cameraZones.map((z) => {
          const sel = pick[z.id]
          const ok = checked && sel === z.correct
          const bad = checked && sel && sel !== z.correct
          return (
            <div key={z.id} className={'cm-row' + (ok ? ' ok' : bad ? ' bad' : '')}>
              <div className="cm-row-head">
                <b>{z.label}</b>
                {ok && <IconCheck size={15} />}
                {bad && <IconAlert size={15} />}
              </div>
              <div className="an-opts">
                {cameraStatuses.map((s) => (
                  <button
                    key={s.id}
                    className={'an-opt' + (sel === s.id ? ' sel' : '')}
                    onClick={() => { if (!invest.camerasSolved) { setPick((p) => ({ ...p, [z.id]: s.id })); setChecked(false) } }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {checked && sel && <p className="cm-note">{z.note}</p>}
            </div>
          )
        })}
      </div>

      {!invest.camerasSolved && (
        <button className="ln-btn" onClick={verify} disabled={!allPicked}>Verificar associações</button>
      )}
      {checked && allPicked && !allCorrect && (
        <div className="ln-feedback bad"><IconAlert size={16} /><p>Ainda há associações incorretas. Reveja e verifique de novo.</p></div>
      )}
      {invest.camerasSolved && (
        <div className="cm-lesson"><IconCheck size={16} /><p><b>Fase 4 concluída.</b> {cameraLesson}</p></div>
      )}
      {!invest.camerasSolved && !allPicked && (
        <p className="cm-hint"><IconLock size={13} /> Associe as 3 zonas para concluir a fase.</p>
      )}
    </div>
  )
}
