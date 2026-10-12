import { activeCase } from '../cases/active'
import { BrandMark } from './Brand'
import { BackButton } from './BackButton'
import { IconTarget, IconShield } from './icons'

/** Tela mostrada quando um modo está bloqueado no caso ativo (ex.: Atacante no case_02). */
export function ModeUnavailable({ mode = 'Atacante' }: { mode?: string }) {
  return (
    <div className="mode-unav">
      <BackButton className="back-float" />
      <div className="mu-card">
        <div className="mu-brand"><BrandMark size="sm" /></div>
        <span className="mu-ico"><IconTarget size={40} /></span>
        <h1>Modo {mode} indisponível</h1>
        <p>
          O caso <b>CASE #{activeCase.number} · {activeCase.name}</b> não possui uma rota
          jogável de {mode.toLowerCase()}. É uma investigação documental, voltada à análise
          e à tomada de decisão baseada em evidências.
        </p>
        <a className="mu-btn" href={`?investigador&case=${activeCase.id}`}>Entrar como Investigador</a>
        <button className="mu-link" onClick={() => { window.location.href = window.location.pathname }}>
          ← voltar ao início
        </button>
        <p className="mu-foot"><IconShield size={14} /> Pessoa e dados 100% fictícios.</p>
      </div>
    </div>
  )
}
