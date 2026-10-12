import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Investigador } from './investigador/Investigador'
import { InvestigadorCase02 } from './investigador/case02/InvestigadorCase02'
import { Kali } from './kali/Kali'
import { Atc } from './atc/Atc'
import { ModeUnavailable } from './ui/ModeUnavailable'
import { IconSearch, IconTerminal, IconTarget, IconShield, IconGithub, IconChevronLeft } from './ui/icons'
import { caseList, type Case } from './cases'
import { activeCase } from './cases/active'
import { caseImage } from './cases/images'
import logoUrl from '../imgs/logos/osinmulator_logo.png'
import './styles/base.css'

const GITHUB_URL = 'https://github.com/JoabeEmanuelNKautnick/OSINMULATOR'

function Landing() {
  const [picked, setPicked] = useState<Case | null>(null)

  return (
    <div className="landing">
      <div className="landing-hero">
        <img src={logoUrl} alt="OSINMULATOR — Simulador de OSINT" />
      </div>
      <div className="landing-tag">Observe. Correlacione. Investigue.</div>

      {!picked ? (
        <>
          <p>Escolha um caso para investigar.</p>
          <div className="case-cards">
            {caseList.map((c) => (
              <button key={c.id} className="case-card" onClick={() => setPicked(c)}>
                <span className="case-thumb">
                  {caseImage(c.imagesFolder, c.avatar) && <img src={caseImage(c.imagesFolder, c.avatar)} alt="" />}
                </span>
                <span className="case-tag">CASE #{c.number}</span>
                <b>{c.name}</b>
                <small>{c.city} · {c.kind === 'documental' ? 'investigação documental' : `${c.missions.length} pistas`}</small>
              </button>
            ))}
            <div className="case-card soon"><span>+ em breve</span></div>
          </div>
        </>
      ) : (
        <>
          <button className="case-back" onClick={() => setPicked(null)}>
            <IconChevronLeft size={16} /> trocar caso
          </button>
          <div className="case-current">CASE #{picked.number} · {picked.name} · {picked.city}</div>
          <p>Escolha uma visão.</p>
          <div className="landing-cards">
            <a className="lc lc-phone" href={`?investigador&case=${picked.id}`}>
              <span className="lc-ico"><IconSearch size={28} /></span>
              <b>Investigador</b>
              <small>Para o público. Investigue uma pessoa fictícia, descubra evidências e monte o dossiê.</small>
            </a>
            <a className="lc lc-kali" href={`?kali&case=${picked.id}`}>
              <span className="lc-ico"><IconTerminal size={28} /></span>
              <b>Analista</b>
              <small>Para o palestrante. Controle a investigação, demonstre técnicas e acompanhe as evidências.</small>
            </a>
            {picked.attackerDisabled ? (
              <div className="lc lc-atc disabled" aria-disabled="true">
                <span className="lc-ico"><IconTarget size={28} /></span>
                <b>Atacante</b>
                <small>Indisponível neste caso — investigação documental, sem rota de atacante.</small>
              </div>
            ) : (
              <a className="lc lc-atc" href={`?atc&case=${picked.id}`}>
                <span className="lc-ico"><IconTarget size={28} /></span>
                <b>Atacante</b>
                <small>Para simulações controladas de ataque e demonstrações educacionais.</small>
              </a>
            )}
          </div>
        </>
      )}

      <a className="gh-btn" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        <IconGithub size={18} /> Ver projeto no GitHub
      </a>
      <p className="landing-foot"><IconShield size={15} /> Pessoa e dados 100% fictícios.</p>
    </div>
  )
}

function Router() {
  const q = window.location.search
  if (q.includes('investigador')) {
    return activeCase.kind === 'documental' ? <InvestigadorCase02 /> : <Investigador />
  }
  if (q.includes('atc')) return activeCase.attackerDisabled ? <ModeUnavailable /> : <Atc />
  if (q.includes('kali')) return <Kali />
  return <Landing />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
