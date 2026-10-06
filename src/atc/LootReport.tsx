import { attackMissions } from '../data/attackMissions'
import { persona } from '../data/persona'

function fmt(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${(s % 60).toString().padStart(2, '0')}`
}

export function LootReport({
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
    <div className="loot">
      <div className="loot-stamp">INVASÃO CONCLUÍDA</div>
      <h2>Alvo: {persona.name} · {persona.city}</h2>

      <div className="loot-score">
        <div><b>{score}</b><span>pontos</span></div>
        <div><b>{correctCount}/{attackMissions.length}</b><span>passos</span></div>
        <div><b>{fmt(seconds)}</b><span>tempo</span></div>
      </div>

      <section>
        <h3>💀 O que foi capturado</h3>
        {attackMissions.map((m) => (
          <div key={m.id} className="loot-item">
            <span className="loot-label">{m.loot.label}</span>
            <span className="loot-value">{m.loot.value}</span>
          </div>
        ))}
        <p className="loot-note">
          Tudo isso saiu apenas de publicações públicas — e ninguém "invadiu" nada de verdade.
        </p>
      </section>

      <section className="loot-flip">
        <h3>🛡️ Vira a chave: como a Lia barraria cada passo</h3>
        {attackMissions.map((m) => (
          <div key={m.id} className="loot-def">
            <b>{m.loot.label}</b>
            <p>{m.defense}</p>
          </div>
        ))}
      </section>

      <p className="loot-warn">
        ⚠ Aplicar isto contra pessoas reais, sem autorização, é crime. Este exercício existe só
        para mostrar o risco e ensinar a defesa.
      </p>

      <button className="loot-restart" onClick={onRestart}>↺ Rodar de novo</button>
    </div>
  )
}
