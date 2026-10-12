import { useEffect, useRef, useState } from 'react'
import { caseImage } from '../../cases/images'
import { BrandMark } from '../../ui/Brand'
import { IconMaximize, IconX, IconChevronLeft, IconChevronRight, IconPlay } from '../../ui/icons'
import '../../styles/palestra.css'
import '../../styles/analista.css'

interface Chapter { tag: string; title: string; body: string; image?: string }

const faceBlur = caseImage('case_02', 'ultima_foto')
const recon = caseImage('case_02', 'Napoli CCTV_ Recon Mirosvalikov')

const CHAPTERS: Chapter[] = [
  { tag: 'A denúncia', title: 'Uma denúncia anônima', body: '03/10, 16h40 — alguém relata, por volta das 14h20, um homem na Pasticceria Buona Luce parecido com um procurado. É pista, não prova.' },
  { tag: 'CFTV', title: 'A câmera confirma a identidade', body: 'A CAM 04 (14:27) registra o suspeito e o G63 no mesmo frame. Match facial 97% com o procurado.', image: recon },
  { tag: 'Quem é', title: 'Mirosvalikov · "Baravsholov"', body: 'Russo, procurado por sete países. Sinais particulares: cicatriz facial e tatuagens no braço direito.' },
  { tag: 'Atenção', title: 'Mas isso é de 03/10', body: 'A CCTV confirma QUEM ele é — não ONDE ele está agora. O avistamento da Pasticceria já passou.' },
  { tag: 'Lead de hoje', title: 'O G63 reaparece', body: 'Hoje, 08:12 — o SUV (placa parcial "GHS") é flagrado entrando na zona portuária, bairro Artemiro Pascual.' },
  { tag: 'Dedução', title: 'Café + porto = Caffè del Porto', body: 'A rotina matinal de café (~07h45) cruzada com a zona do SUV aponta um único ponto: o Caffè del Porto.' },
  { tag: 'Captura', title: 'Uma janela de ~3 minutos', body: 'Localizado o alvo, a equipe tem minutos para agir — com a justificativa correta: correspondência plausível + localização corroborada.' },
]

const N = CHAPTERS.length

export function PalestraCase02({ onExit }: { onExit: () => void }) {
  const [step, setStep] = useState(0) // 0 = intro, 1..N capítulos, N+1 = final
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
            <div className="ps-case">CASE #02 · OPERAÇÃO BARAVSHOLOV</div>
            <h1 className="ps-title">Quem é? E onde está agora?</h1>
            <div className="ps-photo blur">{faceBlur && <img src={faceBlur} alt="" />}</div>
            <p className="ps-sub">Uma caçada que começa numa denúncia anônima.</p>
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
            <div className="ps-final-stamp">ALVO LOCALIZADO · CAPTURADO</div>
            <h1 className="ps-name">Mirosvalikov · "Baravsholov"</h1>
            <div className="ps-c2-lessons">
              <div><b>Denúncia anônima</b><span>é pista, não prova.</span></div>
              <div><b>Semelhança</b><span>não é identificação.</span></div>
              <div><b>Um gesto com a criança</b><span>não comprova crime.</span></div>
            </div>
            <div className="ps-final-msg">Investigação concluída</div>
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
