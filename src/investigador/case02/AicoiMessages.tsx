import { useState } from 'react'
import { contacts, type AicoiContact } from '../../cases/case_02/messages'
import { caseImage } from '../../cases/images'
import { ImageLightbox } from '../../ui/ImageLightbox'
import type { HuntState } from './InvestigadorCase02'

/** App de mensagens (AICOI Chat): contatos + threads, com leads liberados por progresso. */
export function AicoiMessages({ hunt }: { hunt: HuntState }) {
  const [active, setActive] = useState<AicoiContact>(contacts[0])
  const [zoom, setZoom] = useState<{ src: string; cap?: string } | null>(null)

  const analiseOn = hunt.visited.has('analise') || Object.keys(hunt.attr).length > 0 || Object.keys(hunt.ev).length > 0

  function visible(c: AicoiContact) {
    return c.messages.filter((m) => {
      if (m.unlockAfter === 'analise') return analiseOn
      if (m.unlockAfter === 'local') return hunt.locationFound
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
            const imgSrc = m.image ? caseImage('case_02', m.image) : undefined
            return (
              <div key={i} className={'ct-msg ' + m.from}>
                <p>{m.text}</p>
                {imgSrc && (
                  <figure className="ct-cctv">
                    <button className="ct-cctv-btn" onClick={() => setZoom({ src: imgSrc, cap: m.imageCaption })}>
                      <img src={imgSrc} alt="Registro de CFTV" />
                      <span className="ct-cctv-tag">CFTV · CAM 04</span>
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

      {zoom && <ImageLightbox title="CFTV · CAM 04" src={zoom.src} caption={zoom.cap} onClose={() => setZoom(null)} />}
    </div>
  )
}
