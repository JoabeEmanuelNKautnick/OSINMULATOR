import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Investigador } from './investigador/Investigador'
import { Kali } from './kali/Kali'
import './styles/base.css'

function Landing() {
  return (
    <div className="landing">
      <h1>OSINT Simulator</h1>
      <p>Uma experiência educativa sobre o que suas redes sociais revelam.</p>
      <div className="landing-cards">
        <a className="lc lc-phone" href="?investigador">
          <span className="lc-ico">📱</span>
          <b>Investigador</b>
          <small>Para o público · no celular. Resolva 9 missões e monte o dossiê.</small>
        </a>
        <a className="lc lc-kali" href="?kali">
          <span className="lc-ico">🐉</span>
          <b>Kali</b>
          <small>Para o palestrante · no computador. Recon + ataques simulados.</small>
        </a>
      </div>
      <p className="landing-foot">Pessoa e dados 100% fictícios.</p>
    </div>
  )
}

function Router() {
  const q = window.location.search
  if (q.includes('investigador')) return <Investigador />
  if (q.includes('kali')) return <Kali />
  return <Landing />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
