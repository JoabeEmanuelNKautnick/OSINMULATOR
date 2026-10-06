import { useState } from 'react'
import type { Mission } from '../data/missions'
import { appMeta } from '../apps/AppView'

export function MissionPanel({
  mission,
  index,
  total,
  onAnswer,
}: {
  mission: Mission
  index: number
  total: number
  onAnswer: (correct: boolean) => void
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const revealed = picked !== null
  const correct = picked === mission.answer

  function choose(i: number) {
    if (revealed) return
    setPicked(i)
  }

  return (
    <div className="mp">
      <div className="mp-head">
        <span className="mp-count">MISSÃO {index + 1}/{total}</span>
        <span className="mp-app" style={{ color: appMeta[mission.app].color }}>
          {appMeta[mission.app].icon} {appMeta[mission.app].name}
        </span>
      </div>
      <h3 className="mp-q">{mission.question}</h3>
      <div className="mp-hint">🔎 Pista está no app {appMeta[mission.app].name}. Role e investigue.</div>

      <div className="mp-opts">
        {mission.options.map((o, i) => {
          let cls = 'mp-opt'
          if (revealed && i === mission.answer) cls += ' ok'
          if (revealed && i === picked && i !== mission.answer) cls += ' bad'
          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={revealed}>
              {o}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div className={'mp-feedback ' + (correct ? 'ok' : 'bad')}>
          <b>{correct ? '✓ Correto' : '✗ Resposta: ' + mission.options[mission.answer]}</b>
          <p>{mission.explanation}</p>
          <button className="mp-next" onClick={() => onAnswer(correct)}>
            {index + 1 === total ? 'Ver dossiê →' : 'Próxima pista →'}
          </button>
        </div>
      )}
    </div>
  )
}
