import { useState } from 'react'
import { contacts, type AicoiContact } from '../../cases/case_02/messages'
import type { HuntState } from './InvestigadorCase02'

/** App de mensagens (AICOI Chat): contatos + threads, com leads liberados por progresso. */
export function AicoiMessages({ hunt }: { hunt: HuntState }) {
  const [active, setActive] = useState<AicoiContact>(contacts[0])

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
          {visible(active).map((m, i) => (
            <div key={i} className={'ct-msg ' + m.from}>
              <p>{m.text}</p>
              {m.time && <span className="ct-time">{m.time}</span>}
            </div>
          ))}
        </div>
        <div className="ct-input" aria-hidden="true">
          <span>Canal somente leitura · treinamento</span>
        </div>
      </section>
    </div>
  )
}
