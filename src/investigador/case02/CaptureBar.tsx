import { useState } from 'react'
import { captureJustifications } from '../../cases/case_02/conclusion'
import { IconClock, IconTarget, IconAlert } from '../../ui/icons'

function fmt(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000))
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

/** Barra fixa com a contagem regressiva + ordem de captura (exige justificativa correta). */
export function CaptureBar({
  remainingMs, locationLabel, onCapture, onWrongJustification,
}: {
  remainingMs: number
  locationLabel: string
  onCapture: () => void
  onWrongJustification: () => void
}) {
  const [open, setOpen] = useState(false)
  const [wrong, setWrong] = useState<string | null>(null)
  const urgent = remainingMs <= 30_000

  function choose(correct: boolean, feedback: string) {
    if (correct) { onCapture(); return }
    onWrongJustification()
    setWrong(feedback + ' (−30s na janela)')
  }

  return (
    <>
      <div className={'cap-bar' + (urgent ? ' urgent' : '')}>
        <span className="cap-loc"><IconTarget size={16} /> {locationLabel}</span>
        <span className="cap-count"><IconClock size={16} /> {fmt(remainingMs)}</span>
        <button className="cap-go" onClick={() => setOpen(true)}>Emitir ordem de captura</button>
      </div>

      {open && (
        <div className="cap-modal-bg" onClick={() => setOpen(false)}>
          <div className="cap-modal" onClick={(e) => e.stopPropagation()}>
            <h3><IconTarget size={18} /> Ordem de captura</h3>
            <p className="cap-q">Com que justificativa você aciona a equipe?</p>
            <div className="cap-opts">
              {captureJustifications.map((j) => (
                <button key={j.id} className="cap-opt" onClick={() => choose(j.correct, j.feedback)}>
                  {j.label}
                </button>
              ))}
            </div>
            {wrong && (
              <div className="cap-wrong"><IconAlert size={15} /> <p>{wrong}</p></div>
            )}
            <button className="cap-cancel" onClick={() => setOpen(false)}>cancelar</button>
          </div>
        </div>
      )}
    </>
  )
}
