import { useState } from 'react'
import { contacts, type AicoiContact } from '../../cases/case_03/messages'
import { caseImage } from '../../cases/images'
import { ImageLightbox } from '../../ui/ImageLightbox'
import type { InvestState } from './InvestigadorCase03'

/** Canal AICOI do CASE_03: contatos + threads, com pistas liberadas por progresso. */
export function MensagensApp({ invest }: { invest: InvestState }) {
  const [active, setActive] = useState<AicoiContact>(contacts[0])
  const [zoom, setZoom] = useState<{ src: string; cap?: string } | null>(null)

  function visible(c: AicoiContact) {
    return c.messages.filter((m) => {
      if (m.unlockAfter === 'linha') return invest.windowRegistered
      if (m.unlockAfter === 'analise') return invest.analiseStarted
      return true
    })
  }

  return (
    <div className="chat">
      <aside className="chat-list">
        {contacts.map((c) => (
          <button
            key={c.id}
            className={'chat-contact' + (c.id === active.id ? ' active' : '')}
            onClick={() => setActive(c)}
          >
            <span className="cc-av">{c.name.slice(0, 1)}</span>
            <span className="cc-meta">
              <b>{c.name}</b>
              <small>{c.role}</small>
            </span>
          </button>
        ))}
      </aside>

      <section className="chat-thread">
        <header className="ct-head">
          <b>{active.name}</b>
          <small>{active.role}</small>
        </header>
        <div className="ct-feed">
          {visible(active).map((m, i) => {
            const imgSrc = m.image ? caseImage('case_03', m.image) : undefined
            return (
              <div key={i} className={'ct-msg ' + m.from}>
                <p>{m.text}</p>
                {imgSrc && (
                  <figure className="ct-cctv">
                    <button className="ct-cctv-btn" onClick={() => setZoom({ src: imgSrc, cap: m.imageCaption })}>
                      <img src={imgSrc} alt="Material do caso" />
                      <span className="ct-cctv-tag">ARQUIVO</span>
                    </button>
                    {m.imageCaption && <figcaption>{m.imageCaption}</figcaption>}
                  </figure>
                )}
                {m.time && <span className="ct-time">{m.time}</span>}
              </div>
            )
          })}
        </div>
        <div className="ct-input" aria-hidden="true">
          <span>Canal somente leitura · treinamento</span>
        </div>
      </section>

      {zoom && <ImageLightbox title="Arquivo do caso" src={zoom.src} caption={zoom.cap} onClose={() => setZoom(null)} />}
    </div>
  )
}
