import { persona, chat, chatUsers } from '../data/persona'
import { avatarSrc } from './Photo'
import { Clue } from './Clue'
import type { CategoryKey } from '../ui/categories'

// Mensagens que vazam informação sensível.
const msgClue: Record<string, { cat: CategoryKey; insight: string }> = {
  m4: { cat: 'evento', insight: 'Revela a rotina: sai para correr ter/qui às 6h10.' },
  m6: { cat: 'conta', insight: 'Admite que a senha é o nome do pet (thor2007) → senha previsível.' },
  m8: { cat: 'evento', insight: 'Anuncia viagem de 20 a 27/12 → casa vazia nesse período.' },
}

export function GameChat({ highlight }: { highlight?: string }) {
  const g = persona.gamechat
  return (
    <div className="gc">
      <header className="gc-top"># geral · {g.server}</header>

      <section className="gc-profile">
        <div className="gc-avatar">{avatarSrc ? <img src={avatarSrc} alt="" /> : '🌻'}</div>
        <div className="gc-id">
          <b>{g.displayName}</b>
          <code><Clue cat="conta" insight="Nick = nome do pet + ano de nascimento. É a base da senha mais provável.">@{g.nick}</Clue></code>
          <span className="gc-status">🎮 {g.status}</span>
          <p>{g.about}</p>
          <small>{g.since}</small>
        </div>
      </section>

      <div className="gc-feed">
        {chat.map((m) => {
          const u = chatUsers[m.author] ?? { color: '#aaa', display: m.author }
          return (
            <div key={m.id} className={'gc-msg' + (highlight === m.id ? ' hl' : '')} id={'msg-' + m.id}>
              <span className="gc-author" style={{ color: u.color }}>{u.display}</span>
              <span className="gc-time">{m.time}</span>
              <div className="gc-text">
                {msgClue[m.id] ? <Clue cat={msgClue[m.id].cat} insight={msgClue[m.id].insight}>{m.text}</Clue> : m.text}
              </div>
            </div>
          )
        })}
      </div>
      <div className="gc-bar">Enviar mensagem em #geral</div>
    </div>
  )
}
