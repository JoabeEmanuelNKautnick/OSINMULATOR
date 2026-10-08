import { useEffect, useRef, useState } from 'react'
import { missions } from '../data/missions'
import { persona } from '../data/persona'
import { appMeta } from '../apps/AppView'
import { avatarSrc } from '../apps/Photo'
import { EvidenceCard } from '../ui/EvidenceCard'
import { ProgressBar } from '../ui/Progress'
import { BrandMark } from '../ui/Brand'
import { categories, missionCategory, missionConfidence } from '../ui/categories'
import { IconMaximize, IconX, IconEye, IconChevronLeft, IconChevronRight, IconPlay } from '../ui/icons'
import '../styles/palestra.css'

const N = missions.length

export function Palestra({ onExit }: { onExit: () => void }) {
  // step: 0 = intro, 1..N = evidências, N+1 = final
  const [step, setStep] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  const foundCount = step === 0 ? 0 : step > N ? N : (step - 1) + (revealed ? 1 : 0)
  const avgConf = foundCount === 0 ? 0 : Math.round(
    missions.slice(0, foundCount).reduce((a, m) => a + (missionConfidence[m.id] ?? 80), 0) / foundCount,
  )

  function next() {
    if (step === 0) { setStep(1); setRevealed(false); return }
    if (step <= N) {
      if (!revealed) { setRevealed(true); return }
      if (step < N) { setStep(step + 1); setRevealed(false) }
      else { setStep(N + 1) }
    }
  }
  function prev() {
    if (step === 0) return
    if (step === N + 1) { setStep(N); setRevealed(true); return }
    if (revealed) { setRevealed(false); return }
    const p = step - 1
    setStep(p); setRevealed(p >= 1)
  }
  function restart() { setStep(0); setRevealed(false) }

  function toggleFullscreen() {
    const el = root.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    else el.requestFullscreen().catch(() => {})
  }

  function exit() {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    onExit()
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); next() }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      else if (e.key === 'r' || e.key === 'R') restart()
      else if (e.key === 'Escape') { if (!document.fullscreenElement) exit() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const m = step >= 1 && step <= N ? missions[step - 1] : null
  const cat = m ? categories[missionCategory[m.id]] : null

  return (
    <div className="ps" ref={root}>
      {/* barra de controle */}
      <div className="ps-bar">
        <BrandMark size="sm" mode="Palestra" />
        <div className="ps-bar-actions">
          <button className="ps-ctrl" onClick={toggleFullscreen} title="Tela cheia"><IconMaximize size={18} /></button>
          <button className="ps-ctrl" onClick={exit} title="Sair (Esc)"><IconX size={18} /></button>
        </div>
      </div>

      <div className="ps-stage">
        {step === 0 && (
          <div className="ps-slide ps-intro">
            <div className="ps-case">CASE #001</div>
            <h1 className="ps-title">Quem é esta pessoa?</h1>
            <div className="ps-photo blur">{avatarSrc && <img src={avatarSrc} alt="" />}</div>
            <p className="ps-sub">Uma investigação só com o que ela deixou público.</p>
            <div className="ps-count">0 / {N} evidências</div>
            <button className="ps-cta" onClick={() => { toggleFullscreen(); next() }}>
              <IconPlay size={22} /> Iniciar
            </button>
          </div>
        )}

        {m && cat && (
          <div className="ps-slide ps-evidence" key={m.id}>
            <div className="ps-mhead">
              <span className="ps-mcount">MISSÃO {step} / {N}</span>
              <span className="ps-mcat" style={{ color: cat.color }}>
                <cat.Icon size={18} /> {cat.label}
              </span>
            </div>
            <h2 className="ps-q">{m.question}</h2>

            {!revealed ? (
              <div className="ps-await">
                <div className="ps-source ico-row">
                  {(() => { const I = appMeta[m.app].Icon; return <I size={20} /> })()}
                  Fonte: {appMeta[m.app].name}
                </div>
                <button className="ps-cta" onClick={() => setRevealed(true)}>
                  <IconEye size={22} /> Revelar pista
                </button>
              </div>
            ) : (
              <div className="ps-reveal">
                <div className="ps-evcard">
                  <EvidenceCard
                    category={missionCategory[m.id]}
                    value={m.clueValue}
                    source={appMeta[m.app].name}
                    confidence={missionConfidence[m.id]}
                    xp={Math.round((missionConfidence[m.id] ?? 80) / 4)}
                    isNew
                  />
                </div>
                <p className="ps-defense">{m.avoid}</p>
              </div>
            )}
          </div>
        )}

        {step === N + 1 && (
          <div className="ps-slide ps-final">
            <div className="ps-final-stamp">TARGET IDENTIFIED</div>
            <div className="ps-photo">{avatarSrc && <img src={avatarSrc} alt="" />}</div>
            <h1 className="ps-name">{persona.name}</h1>
            <div className="ps-conf">Confiança {avgConf}%</div>
            <div className="ps-totais">
              <div><b>{N}</b><span>evidências</span></div>
              <div><b>{N}</b><span>missões</span></div>
              <div><b>{new Set(Object.values(missionCategory)).size}</b><span>categorias</span></div>
            </div>
            <div className="ps-final-msg">Investigação concluída</div>
            <div className="ps-final-actions">
              <button className="ps-cta ghost" onClick={restart}>↺ Recomeçar</button>
              <button className="ps-cta" onClick={exit}>Sair</button>
            </div>
          </div>
        )}
      </div>

      {/* rodapé: progresso + navegação */}
      {step !== 0 && (
        <div className="ps-foot">
          <button className="ps-nav" onClick={prev} title="Anterior (←)"><IconChevronLeft size={22} /></button>
          <div className="ps-foot-prog">
            <div className="ps-foot-bars">
              <ProgressBar label="Evidências" value={foundCount} max={N} tone="cyan" showPct={false} />
              <ProgressBar label="Confiança" value={avgConf} tone="auto" />
            </div>
            <span className="ps-foot-count">{foundCount} / {N} evidências</span>
          </div>
          <button className="ps-nav" onClick={next} title="Próximo (→)"><IconChevronRight size={22} /></button>
        </div>
      )}
    </div>
  )
}
