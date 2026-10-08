import { useEffect, useRef, useState } from 'react'
import { attackMissions, type RevealKind } from '../data/attackMissions'
import { Terminal, type Line } from '../kali/Terminal'
import { AppView, appMeta } from '../apps/AppView'
import type { AppId } from '../data/missions'
import { WordlistPanel, RecoveryPanel, PhishingPanel, RiskMapPanel } from '../kali/attacks/panels'
import { AttackMissionPanel } from './AttackMissionPanel'
import { LootReport } from './LootReport'
import { IconAlert, IconCheck, IconPlay, IconLock, IconTrophy, IconClock } from '../ui/icons'
import { BrandMark } from '../ui/Brand'
import '../styles/kali.css'

const CORRECT = 100
const WRONG = -25

const intro: Line[] = [
  { text: 'attack --target lia.andrade --interactive', cls: 'cmd' },
  { text: 'Modo ataque (simulação educativa). Resolva cada passo para avançar.', cls: 'dim' },
  { text: 'Responda a pergunta no painel à direita →', cls: 'dim' },
]

function RevealPanel({ kind }: { kind: RevealKind }) {
  switch (kind) {
    case 'wordlist': return <WordlistPanel />
    case 'recovery': return <RecoveryPanel />
    case 'phishing': return <PhishingPanel />
    case 'riskmap': return <RiskMapPanel />
    case 'gamechat': return <div className="kali-appframe"><AppView app="gamechat" /></div>
  }
}

function revealTitle(kind: RevealKind) {
  return { wordlist: 'password-attack', recovery: 'account-recovery', phishing: 'social-engineering', riskmap: 'geo-risk', gamechat: 'evidence://gamechat' }[kind]
}

export function Atc() {
  const [mi, setMi] = useState(0)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [lines, setLines] = useState<Line[]>(intro)
  const [reveal, setReveal] = useState<RevealKind | null>(null)
  const [done, setDone] = useState(false)
  const [evidenceApp, setEvidenceApp] = useState<AppId | null>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (done) return
    timer.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => { if (timer.current) window.clearInterval(timer.current) }
  }, [done])

  function answer(ok: boolean) {
    const m = attackMissions[mi]
    if (ok) {
      setScore((s) => s + CORRECT + Math.max(0, 40 - (seconds % 40)))
      setCorrect((c) => c + 1)
      setLines(m.terminal)
      setReveal(m.reveal)
    } else {
      setScore((s) => Math.max(0, s + WRONG))
    }
    if (mi + 1 >= attackMissions.length) {
      if (timer.current) window.clearInterval(timer.current)
      setTimeout(() => setDone(true), ok ? 600 : 0)
    } else {
      setMi((i) => i + 1)
    }
  }

  function restart() {
    setMi(0); setScore(0); setCorrect(0); setSeconds(0); setLines(intro); setReveal(null); setDone(false); setEvidenceApp(null)
  }

  const apps: AppId[] = ['fotogram', 'correapp', 'gamechat']

  const m = attackMissions[mi]

  return (
    <div className="kali">
      <div className="kali-banner ico-row"><IconAlert size={14} /> SIMULAÇÃO EDUCATIVA — pessoa e dados 100% fictícios. Nenhum ataque real é executado.</div>
      <div className="kali-topbar">
        <BrandMark size="sm" mode="Atacante" />
        <span className="kali-title">attack-lab — root@kali · modo missões</span>
        <span className="kali-clock ico-row"><IconTrophy size={14} /> {score} pts · <IconClock size={14} /> {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</span>
      </div>

      <div className="kali-body">
        <aside className="kali-side">
          <div className="kali-group">
            <h4>Plano de ataque</h4>
            <ol className="atc-steps">
              {attackMissions.map((am, i) => {
                let st = 'atc-step'
                if (done || i < mi) st += ' done'
                else if (i === mi) st += ' current'
                else st += ' locked'
                const done2 = done || i < mi
                return (
                  <li key={am.id} className={st}>
                    <span className="atc-step-ic">
                      {done2 ? <IconCheck size={14} /> : i === mi ? <IconPlay size={13} /> : <IconLock size={13} />}
                    </span>
                    {am.objective}
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="kali-group">
            <h4>Evidências (apps)</h4>
            <div className="atc-apps">
              {apps.map((a) => {
                const { Icon, name, color } = appMeta[a]
                return (
                  <button
                    key={a}
                    className={'atc-app' + (evidenceApp === a ? ' active' : '')}
                    onClick={() => setEvidenceApp((cur) => (cur === a ? null : a))}
                  >
                    <span className="atc-app-ic" style={{ background: color }}><Icon size={15} /></span>
                    {name}
                  </button>
                )
              })}
            </div>
            <p className="atc-apps-hint">Abra as redes públicas da alvo a qualquer momento para conferir as pistas.</p>
          </div>
        </aside>

        <main className="kali-main">
          <Terminal lines={lines} />
        </main>

        <section className="kali-view">
          <div className="kali-win-bar">
            <span className="kdot r" /><span className="kdot y" /><span className="kdot g" />
            <span className="kwin-title">{evidenceApp ? `evidence://${evidenceApp}` : done ? 'loot-report' : reveal ? revealTitle(reveal) : 'briefing'}</span>
            {evidenceApp && <button className="atc-app-close" onClick={() => setEvidenceApp(null)}>✕ fechar</button>}
          </div>
          <div className="kali-win-body">
            {evidenceApp ? (
              <div className="kali-appframe"><AppView app={evidenceApp} /></div>
            ) : done ? (
              <LootReport score={score} seconds={seconds} correctCount={correct} onRestart={restart} />
            ) : (
              <>
                <AttackMissionPanel
                  key={m.id}
                  mission={m}
                  index={mi}
                  total={attackMissions.length}
                  onAnswer={answer}
                />
                {reveal && <RevealPanel kind={reveal} />}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
