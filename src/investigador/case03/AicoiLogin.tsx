import { useState } from 'react'
import { IconLock, IconShield } from '../../ui/icons'

/** Tela de login fictícia do AICOI (Dep. de Identificação) — o jogador só clica em Entrar. */
export function AicoiLogin({ onEnter }: { onEnter: () => void }) {
  const [authing, setAuthing] = useState(false)

  function enter() {
    if (authing) return
    setAuthing(true)
    window.setTimeout(onEnter, 1300)
  }

  return (
    <div className="aicoi-login">
      <div className="al-card">
        <div className="al-logo">
          <div className="al-logo-fallback">AICOI</div>
        </div>
        <h1>Portal do Investigador</h1>
        <p className="al-sub">Departamento de Identificação e Desaparecimento (fictício)</p>

        <label className="al-field">
          <span>Usuário</span>
          <input type="text" value="aicoi-identificacao-078" readOnly tabIndex={-1} />
        </label>
        <label className="al-field">
          <span>Senha</span>
          <div className="al-pass">
            <input type="password" value="0000000000" readOnly tabIndex={-1} />
            <IconLock size={16} />
          </div>
        </label>

        <button className="al-enter" onClick={enter} disabled={authing}>
          {authing ? 'Autenticando…' : 'Entrar'}
        </button>

        {authing && (
          <div className="al-boot">
            <div className="scanline" />
            <ul>
              <li>› validando credenciais</li>
              <li>› reabrindo caso Y-9862/2000-FICT-R1</li>
              <li>› carregando autos e cronologia</li>
            </ul>
          </div>
        )}

        <p className="al-foot"><IconShield size={13} /> Ambiente de treinamento · dados 100% fictícios</p>
      </div>
    </div>
  )
}
