import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Investigador } from './investigador/Investigador'
import { Kali } from './kali/Kali'
import { Atc } from './atc/Atc'
import { IconSearch, IconTerminal, IconTarget, IconShield } from './ui/icons'
import './styles/base.css'

function Landing() {
  return (
    <div className="landing">
      <div className="landing-brand">
        <span className="landing-logo"><IconSearch size={30} /></span>
        <h1>OSINT Simulator</h1>
      </div>
      <div className="landing-tag">Observe. Correlacione. Investigue.</div>
      <p>Plataforma educativa de investigação digital: descubra o que uma pessoa fictícia deixou exposto nas redes.</p>
      <div className="landing-cards">
        <a className="lc lc-phone" href="?investigador">
          <span className="lc-ico"><IconSearch size={28} /></span>
          <b>Investigador</b>
          <small>Para o público. Investigue uma pessoa fictícia, descubra evidências e monte o dossiê.</small>
        </a>
        <a className="lc lc-kali" href="?kali">
          <span className="lc-ico"><IconTerminal size={28} /></span>
          <b>Analista</b>
          <small>Para o palestrante. Controle a investigação, demonstre técnicas e acompanhe as evidências.</small>
        </a>
        <a className="lc lc-atc" href="?atc">
          <span className="lc-ico"><IconTarget size={28} /></span>
          <b>Atacante</b>
          <small>Para simulações controladas de ataque e demonstrações educacionais.</small>
        </a>
      </div>
      <p className="landing-foot"><IconShield size={15} /> Pessoa e dados 100% fictícios.</p>
    </div>
  )
}

function Router() {
  const q = window.location.search
  if (q.includes('investigador')) return <Investigador />
  if (q.includes('atc')) return <Atc />
  if (q.includes('kali')) return <Kali />
  return <Landing />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
