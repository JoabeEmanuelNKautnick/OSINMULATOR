import { persona, chat, chatUsers } from '../data/persona'
import { avatarSrc } from './Photo'

export function GameChat({ highlight }: { highlight?: string }) {
  const g = persona.gamechat
  return (
    <div className="gc">
      <header className="gc-top"># geral · {g.server}</header>

      <section className="gc-profile">
        <div className="gc-avatar">{avatarSrc ? <img src={avatarSrc} alt="" /> : '🌻'}</div>
        <div className="gc-id">
          <b>{g.displayName}</b>
          <code>@{g.nick}</code>
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
              <div className="gc-text">{m.text}</div>
            </div>
          )
        })}
      </div>
      <div className="gc-bar">Enviar mensagem em #geral</div>
    </div>
  )
}
