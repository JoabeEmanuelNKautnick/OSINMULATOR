import { persona, posts } from '../data/persona'
import { Photo, avatarSrc } from './Photo'
import { Clue } from './Clue'
import type { CategoryKey } from '../ui/categories'

// Comentários de familiares que expõem parentesco.
const commentClue: Record<string, { cat: CategoryKey; insight: string }> = {
  'sandra.andrade73': { cat: 'pessoa', insight: 'Comentou "minha filha" → é a mãe. Parentesco útil para golpe do parente.' },
  'rosa.andrade': { cat: 'pessoa', insight: 'Comentou "netinha" → é a avó.' },
}

export function Fotogram({ highlight }: { highlight?: string }) {
  return (
    <div className="fg">
      <header className="fg-top">
        <span className="fg-logo">Fotogram</span>
      </header>

      <section className="fg-profile">
        <div className="fg-avatar">{avatarSrc ? <img src={avatarSrc} alt="" /> : '🌻'}</div>
        <div className="fg-stats">
          <div><b>{posts.length}</b><span>posts</span></div>
          <div><b>{persona.fotogram.followers}</b><span>seguidores</span></div>
          <div><b>{persona.fotogram.following}</b><span>seguindo</span></div>
        </div>
      </section>
      <div className="fg-bio">
        <b>@{persona.fotogram.handle}</b>
        <p>{persona.fotogram.bio}</p>
      </div>

      <div className="fg-feed">
        {posts.map((p) => (
          <article key={p.id} className={'fg-post' + (highlight === p.id ? ' hl' : '')} id={'post-' + p.id}>
            <div className="fg-post-head">
              <span className="fg-mini">{avatarSrc ? <img src={avatarSrc} alt="" /> : '🌻'}</span>
              <div>
                <b>{persona.fotogram.handle}</b>
                {p.location && (
                  <span className="fg-loc">
                    <Clue cat="local" insight="Local marcado no post — ajuda a mapear lugares frequentados e a cidade.">{p.location}</Clue>
                  </span>
                )}
              </div>
            </div>
            <Photo kind={p.photo} />
            <div className="fg-actions">❤️ {p.likes} · 💬 {p.comments.length}</div>
            <div className="fg-cap">
              <b>{persona.fotogram.handle}</b> {p.caption}
            </div>
            {p.comments.map((c, i) => {
              const cl = commentClue[c.author]
              return (
                <div key={i} className="fg-comment">
                  {cl ? <Clue cat={cl.cat} insight={cl.insight}><b>{c.author}</b></Clue> : <b>{c.author}</b>} {c.text}
                </div>
              )
            })}
            <div className="fg-date">{p.date}</div>
          </article>
        ))}
      </div>
    </div>
  )
}
