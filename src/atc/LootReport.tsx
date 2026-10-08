import { attackMissions } from '../data/attackMissions'
import { persona } from '../data/persona'
import { EvidenceCard } from '../ui/EvidenceCard'
import { StatRow } from '../ui/Progress'
import { attackCategory } from '../ui/categories'
import { IconUnlock, IconShield, IconAlert } from '../ui/icons'

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
        <StatRow stats={[
          { label: 'pontos', value: String(score), tone: 'danger' },
          { label: 'passos', value: `${correctCount}/${attackMissions.length}`, tone: 'ok' },
          { label: 'tempo', value: fmt(seconds) },
        ]} />
      </div>

      <section>
        <h3 className="ico-row"><IconUnlock size={15} /> O que foi capturado</h3>
        <div className="loot-ev-grid">
          {attackMissions.map((m) => (
            <EvidenceCard key={m.id} category={attackCategory[m.id]} value={m.loot.value} source={m.loot.label} compact />
          ))}
        </div>
        <p className="loot-note">
          Tudo isso saiu apenas de publicações públicas — e ninguém "invadiu" nada de verdade.
        </p>
      </section>

      <section className="loot-flip">
        <h3 className="ico-row"><IconShield size={15} /> Vira a chave: como a Lia barraria cada passo</h3>
        {attackMissions.map((m) => (
          <div key={m.id} className="loot-def">
            <b>{m.loot.label}</b>
            <p>{m.defense}</p>
          </div>
        ))}
      </section>

      <p className="loot-warn ico-row">
        <IconAlert size={15} /> Aplicar isto contra pessoas reais, sem autorização, é crime. Este exercício existe só
        para mostrar o risco e ensinar a defesa.
      </p>

      <button className="loot-restart" onClick={onRestart}>↺ Rodar de novo</button>
    </div>
  )
}
