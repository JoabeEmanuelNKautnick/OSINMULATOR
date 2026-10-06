import { missions } from '../data/missions'
import { persona } from '../data/persona'

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function Dossier({
  score,
  seconds,
  correctCount,
  onRestart,
}: {
  score: number
  seconds: number
  correctCount: number
  onRestart: () => void
}) {
  return (
    <div className="dossier">
      <div className="ds-stamp">DOSSIÊ COMPLETO</div>
      <h2>{persona.name}, {persona.age} · {persona.city}</h2>

      <div className="ds-score">
        <div><b>{score}</b><span>pontos</span></div>
        <div><b>{correctCount}/{missions.length}</b><span>acertos</span></div>
        <div><b>{fmt(seconds)}</b><span>tempo</span></div>
      </div>

      <section className="ds-clues">
        <h3>O que foi reunido só com posts públicos</h3>
        {missions.map((m) => (
          <div key={m.id} className="ds-clue">
            <span className="ds-label">{m.clueLabel}</span>
            <span className="ds-value">{m.clueValue}</span>
          </div>
        ))}
      </section>

      <section className="ds-risk">
        <h3>⚠️ O que alguém mal-intencionado faria com isso</h3>
        <ul>
          <li><b>Invasão de conta:</b> a senha "{persona.gamechat.nick}" é adivinhável e serve para testar login e perguntas de segurança (pet, mãe, nascimento).</li>
          <li><b>Golpe do parente:</b> sabendo o nome da mãe e detalhes da família, dá para enviar mensagens falsas se passando pela Lia.</li>
          <li><b>Risco presencial:</b> endereço, rotina fixa e período de viagem juntos expõem a pessoa e a casa vazia.</li>
        </ul>
        <p className="ds-note">
          Nenhum dado aqui é real. O objetivo é mostrar como peças soltas se somam.
        </p>
      </section>

      <section className="ds-avoid">
        <h3>✅ Como a Lia poderia ter evitado cada pista</h3>
        {missions.map((m) => (
          <div key={m.id} className="ds-avoid-item">
            <b>{m.clueLabel}</b>
            <p>{m.avoid}</p>
          </div>
        ))}
      </section>

      <button className="ds-restart" onClick={onRestart}>↺ Investigar de novo</button>
    </div>
  )
}
