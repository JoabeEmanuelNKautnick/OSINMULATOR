import { useState } from 'react'
import type { AttackMission } from '../data/attackMissions'
import { IconTarget, IconCheck, IconAlert } from '../ui/icons'

export function AttackMissionPanel({
  mission,
  index,
  total,
  onAnswer,
}: {
  mission: AttackMission
  index: number
  total: number
  onAnswer: (correct: boolean) => void
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const revealed = picked !== null
  const correct = picked === mission.answer

  return (
    <div className="amp">
      <div className="amp-head">
        <span className="amp-count">PASSO {index + 1}/{total}</span>
        <span className="amp-obj ico-row"><IconTarget size={14} /> {mission.objective}</span>
      </div>
      <h3 className="amp-q">{mission.question}</h3>

      <div className="amp-opts">
        {mission.options.map((o, i) => {
          let cls = 'amp-opt'
          if (revealed && i === mission.answer) cls += ' ok'
          if (revealed && i === picked && i !== mission.answer) cls += ' bad'
          return (
            <button key={i} className={cls} onClick={() => !revealed && setPicked(i)} disabled={revealed}>
              <kbd>{i + 1}</kbd> {o}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div className={'amp-feedback ' + (correct ? 'ok' : 'bad')}>
          <b className="ico-row">{correct ? <><IconCheck size={15} /> Passo executado</> : <><IconAlert size={15} /> Correto: {mission.options[mission.answer]}</>}</b>
          <button className="amp-next" onClick={() => onAnswer(correct)}>
            {index + 1 === total ? 'Ver relatório →' : 'Próximo passo →'}
          </button>
        </div>
      )}
    </div>
  )
}
