import { persona, runs } from '../data/persona'
import { RouteMap } from './RouteMap'
import { avatarSrc } from './Photo'
import { Clue } from './Clue'

export function CorreApp({ highlight }: { highlight?: string }) {
  return (
    <div className="ca">
      <header className="ca-top">
        <span className="ca-logo">◭ CorreApp</span>
      </header>
      <section className="ca-profile">
        <div className="ca-avatar">{avatarSrc ? <img src={avatarSrc} alt="" /> : '🏃‍♀️'}</div>
        <div>
          <b>{persona.correapp.handle}</b>
          <p>{persona.correapp.club}</p>
        </div>
      </section>

      <div className="ca-feed">
        {runs.map((r) => (
          <article key={r.id} className={'ca-run' + (highlight === r.id ? ' hl' : '')} id={'run-' + r.id}>
            <div className="ca-run-head">
              <b>{r.title}</b>
              <span>{r.weekday} · {r.date}</span>
            </div>
            <RouteMap run={r} small />
            <div className="ca-metrics">
              <div><b>{r.km}</b><span>km</span></div>
              <div>
                <b><Clue cat="evento" insight="Horário de saída. Repetido em vários dias, revela uma rotina previsível.">{r.start}</Clue></b>
                <span>início</span>
              </div>
              <div><b>{r.end}</b><span>fim</span></div>
              <div><b>{r.pace}</b><span>ritmo</span></div>
            </div>
            <div className="ca-place">
              📍 <Clue cat="local" insight={r.route === 'loop'
                ? 'Início e fim na mesma rua, repetidos → provável endereço de casa.'
                : 'Ponto de partida revela a região frequentada pela pessoa.'}>{r.startPlace}</Clue> → {r.endPlace}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
