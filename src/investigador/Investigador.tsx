import { useEffect, useRef, useState } from 'react'
import { missions } from '../data/missions'
import { persona } from '../data/persona'
import { AppView, appMeta } from '../apps/AppView'
import { MissionPanel } from './MissionPanel'
import { Dossier } from './Dossier'
import { IconSearch, IconLock, IconTrophy, IconClock, IconWifi, IconBattery } from '../ui/icons'
import { ProgressBar } from '../ui/Progress'
import '../styles/phone.css'
import '../styles/forensic.css'

type Phase = 'home' | 'app' | 'transition' | 'playing' | 'dossier'
const CORRECT = 100
const WRONG = -25

export function Investigador() {
  const [phase, setPhase] = useState<Phase>('home')
  const [openApp, setOpenApp] = useState<'fotogram' | 'correapp' | 'gamechat' | null>(null)
  const [mi, setMi] = useState(0)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (phase === 'playing') {
      timer.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
      return () => { if (timer.current) window.clearInterval(timer.current) }
    }
  }, [phase])

  function startInvestigation() {
    setPhase('transition')
    setTimeout(() => setPhase('playing'), 2600)
  }

  function answer(ok: boolean) {
    setScore((s) => Math.max(0, s + (ok ? CORRECT + Math.max(0, 40 - seconds % 40) : WRONG)))
    if (ok) setCorrect((c) => c + 1)
    if (mi + 1 >= missions.length) {
      if (timer.current) window.clearInterval(timer.current)
      setPhase('dossier')
    } else {
      setMi((i) => i + 1)
    }
  }

  function restart() {
    setPhase('home'); setOpenApp(null); setMi(0); setScore(0); setCorrect(0); setSeconds(0)
  }

  const now = new Date()
  const clock = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="phone-wrap">
      <div className="phone">
        <div className="phone-status">
          <span>{clock}</span>
          <span className="ico-row">
            {phase === 'playing'
              ? <><IconLock size={13} /> MODO FORENSE</>
              : <><IconWifi size={14} /> <IconBattery size={14} /> 100%</>}
          </span>
        </div>

        {/* HOME */}
        {phase === 'home' && (
          <div className="home">
            <div className="home-wallpaper" />
            <div className="home-greet">
              <h1>{clock}</h1>
              <p>Segunda-feira, celular de {persona.name}</p>
            </div>
            <div className="home-grid">
              {(['fotogram', 'correapp', 'gamechat'] as const).map((a) => {
                const { Icon, name, color } = appMeta[a]
                return (
                  <button key={a} className="home-icon" onClick={() => { setOpenApp(a); setPhase('app') }}>
                    <span className="hi-badge" style={{ background: color }}><Icon size={28} /></span>
                    <span>{name}</span>
                  </button>
                )
              })}
            </div>
            <button className="home-start" onClick={startInvestigation}>
              <IconSearch size={18} /> Iniciar investigação
            </button>
            <p className="home-disclaimer">Simulação educativa · pessoa e dados fictícios</p>
          </div>
        )}

        {/* APP aberto no modo "celular normal" */}
        {phase === 'app' && openApp && (
          <div className="app-screen">
            <AppView app={openApp} />
            <button className="back-btn" onClick={() => setPhase('home')}>‹ Início</button>
          </div>
        )}

        {/* TRANSIÇÃO */}
        {phase === 'transition' && (
          <div className="transition">
            <div className="scanline" />
            <div className="glitch" data-text="ACESSANDO DADOS…">ACESSANDO DADOS…</div>
            <ul className="boot">
              <li>› montando imagem do dispositivo</li>
              <li>› indexando Fotogram · CorreApp · GameChat</li>
              <li>› modo investigador forense ATIVO</li>
            </ul>
          </div>
        )}

        {/* PLAYING */}
        {phase === 'playing' && (
          <div className="forensic">
            <div className="hud">
              <span className="hud-stat ico-row"><IconTrophy size={15} /> {score} pts</span>
              <div className="hud-prog">
                <ProgressBar label="Evidências" value={mi} max={missions.length} tone="purple" />
              </div>
              <span className="hud-stat ico-row"><IconClock size={15} /> {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</span>
            </div>
            <div className="forensic-app">
              <AppView app={missions[mi].app} highlight={missions[mi].evidence} />
            </div>
            <MissionPanel
              key={missions[mi].id}
              mission={missions[mi]}
              index={mi}
              total={missions.length}
              onAnswer={answer}
            />
          </div>
        )}

        {/* DOSSIÊ */}
        {phase === 'dossier' && (
          <div className="app-screen">
            <Dossier score={score} seconds={seconds} correctCount={correct} onRestart={restart} />
          </div>
        )}
      </div>
    </div>
  )
}
