import { useEffect, useRef, useState } from 'react'
import { caseImage } from '../../cases/images'
import { BrandMark } from '../../ui/Brand'
import { IconMaximize, IconX, IconChevronLeft, IconChevronRight, IconPlay } from '../../ui/icons'
import '../../styles/palestra.css'
import '../../styles/analista.css'

interface Chapter { tag: string; title: string; body: string; image?: string }

const child = caseImage('case_03', 'ultima_foto')
const jornal = caseImage('case_03', 'jornal-machete-missing')
const proj = caseImage('case_03', 'progressao_idade')

const CHAPTERS: Chapter[] = [
  { tag: 'A reabertura', title: 'Um caso frio, 26 anos depois', body: 'Marie desapareceu aos 5 anos no Castelo Real, em Londres, em 23/04/2000. Em 2026 o AICOI reabre o caso. O objetivo não é “encontrar Marie” — é investigar com rigor.' },
  { tag: 'Os 5 minutos', title: 'A janela 11h45–11h50', body: 'Paul percebeu a ausência às 11h45; a testemunha viu uma menina ~11h50. É uma referência inicial — não prova de que ela sumiu exatamente nesse intervalo.' },
  { tag: 'A imprensa', title: 'Uma fonte que parece muitas', body: 'O jornal diz “pouco antes do meio-dia”, sem citar a testemunha. Informação repetida não é confirmação independente.', image: jornal },
  { tag: 'A testemunha', title: 'O que ela viu — e o que não viu', body: 'Margaret descreveu coelho e roupa, não o rosto. Lembrou de um casal idoso por perto, mas afirma: NÃO viu com quem a menina foi.' },
  { tag: 'As câmeras', title: 'As câmeras que não gravaram', body: 'As câmeras do pátio estavam em manutenção. A falta de imagens não prova sabotagem — nem que alguém saiu com Marie.' },
  { tag: 'A armadilha', title: 'Uma certidão de óbito', body: 'Há uma certidão de óbito nos autos. É da MÃE, Amélie (†1997) — não de Marie. Ler o documento evita a conclusão errada.' },
  { tag: 'O desfecho', title: 'Por que o caso continua aberto', body: 'Projeção não é retrato; semelhança não é identidade. O relatório é graduado pela honestidade da investigação, não por uma solução.', image: proj },
]

const N = CHAPTERS.length

export function PalestraCase03({ onExit }: { onExit: () => void }) {
  const [step, setStep] = useState(0)
  const root = useRef<HTMLDivElement>(null)

  function next() { setStep((s) => Math.min(N + 1, s + 1)) }
  function prev() { setStep((s) => Math.max(0, s - 1)) }
  function restart() { setStep(0) }

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

  const ch = step >= 1 && step <= N ? CHAPTERS[step - 1] : null

  return (
    <div className="ps" ref={root}>
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
            <div className="ps-case">CASE #03 · 26 ANOS DE SILÊNCIO</div>
            <h1 className="ps-title">O que dá para saber — e o que não dá?</h1>
            <div className="ps-photo">{child && <img src={child} alt="" />}</div>
            <p className="ps-sub">Um desaparecimento que continua sem resposta.</p>
            <button className="ps-cta" onClick={() => { toggleFullscreen(); next() }}><IconPlay size={22} /> Iniciar</button>
          </div>
        )}

        {ch && (
          <div className="ps-slide ps-c2" key={step}>
            <div className="ps-mhead">
              <span className="ps-mcount">CAPÍTULO {step} / {N}</span>
              <span className="ps-c2-tag">{ch.tag}</span>
            </div>
            <h2 className="ps-q">{ch.title}</h2>
            {ch.image && <div className="ps-c2-img"><img src={ch.image} alt="" /></div>}
            <p className="ps-c2-body">{ch.body}</p>
          </div>
        )}

        {step === N + 1 && (
          <div className="ps-slide ps-final">
            <div className="ps-final-stamp">CASO INCONCLUSIVO · ALERTA ATIVO</div>
            <h1 className="ps-name">Marie Joan Elise Salles</h1>
            <div className="ps-c2-lessons">
              <div><b>Relato</b><span>não é prova.</span></div>
              <div><b>Semelhança</b><span>não é identificação.</span></div>
              <div><b>Projeção</b><span>não é retrato.</span></div>
            </div>
            <div className="ps-final-msg">26 anos depois, ainda existem perguntas sem resposta.</div>
            <div className="ps-final-actions">
              <button className="ps-cta ghost" onClick={restart}>↺ Recomeçar</button>
              <button className="ps-cta" onClick={exit}>Sair</button>
            </div>
          </div>
        )}
      </div>

      {step !== 0 && (
        <div className="ps-foot">
          <button className="ps-nav" onClick={prev} title="Anterior (←)"><IconChevronLeft size={22} /></button>
          <span className="ps-foot-count">{Math.min(step, N)} / {N}</span>
          <button className="ps-nav" onClick={next} title="Próximo (→)"><IconChevronRight size={22} /></button>
        </div>
      )}
    </div>
  )
}
