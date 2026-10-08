import { missions } from '../data/missions'
import { persona } from '../data/persona'
import { appMeta } from '../apps/AppView'
import { EvidenceCard } from '../ui/EvidenceCard'
import { ProgressBar, StatRow } from '../ui/Progress'
import { missionCategory, missionConfidence as confidence } from '../ui/categories'
import { BrandMark } from '../ui/Brand'
import { IconAlert, IconShield, IconFolder } from '../ui/icons'

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
  const avgConf = Math.round(
    missions.reduce((a, m) => a + (confidence[m.id] ?? 80), 0) / missions.length,
  )

  return (
    <div className="dossier">
      <div className="ds-brand"><BrandMark size="sm" /></div>
      <div className="ds-stamp ico-row"><IconFolder size={15} /> DOSSIÊ COMPLETO</div>
      <h2>{persona.name}, {persona.age} · {persona.city}</h2>

      <div className="ds-score">
        <StatRow stats={[
          { label: 'pontos', value: String(score), tone: 'blue' },
          { label: 'acertos', value: `${correctCount}/${missions.length}`, tone: 'ok' },
          { label: 'tempo', value: fmt(seconds) },
        ]} />
      </div>

      <div className="ds-progress">
        <ProgressBar label="Evidências" value={missions.length} max={missions.length} tone="cyan" />
        <ProgressBar label="Missões" value={correctCount} max={missions.length} tone="blue" showPct={false} />
        <ProgressBar label="Confiança" value={avgConf} tone="auto" />
      </div>

      <section className="ds-clues">
        <h3>O que foi reunido só com posts públicos</h3>
        <div className="ds-ev-grid">
          {missions.map((m) => (
            <EvidenceCard
              key={m.id}
              category={missionCategory[m.id]}
              value={m.clueValue}
              source={appMeta[m.app].name}
              confidence={confidence[m.id]}
              xp={Math.round((confidence[m.id] ?? 80) / 4)}
            />
          ))}
        </div>
      </section>

      <section className="ds-risk">
        <h3 className="ico-row"><IconAlert size={16} /> O que alguém mal-intencionado faria com isso</h3>
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
        <h3 className="ico-row"><IconShield size={16} /> Como a Lia poderia ter evitado cada pista</h3>
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
