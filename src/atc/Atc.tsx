import { useEffect, useRef, useState } from 'react'
import { attackMissions, type RevealKind } from '../data/attackMissions'
import { Terminal, type Line } from '../kali/Terminal'
import { AppView } from '../apps/AppView'
import { WordlistPanel, RecoveryPanel, PhishingPanel, RiskMapPanel } from '../kali/attacks/panels'
import { AttackMissionPanel } from './AttackMissionPanel'
import { LootReport } from './LootReport'
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
    setMi(0); setScore(0); setCorrect(0); setSeconds(0); setLines(intro); setReveal(null); setDone(false)
  }

  const m = attackMissions[mi]

  return (
    <div className="kali">
      <div className="kali-banner">⚠ SIMULAÇÃO EDUCATIVA — pessoa e dados 100% fictícios. Nenhum ataque real é executado.</div>
      <div className="kali-topbar">
        <span className="kali-dragon">🐉 Kali</span>
        <span className="kali-title">attack-lab — root@kali · modo missões</span>
        <span className="kali-clock">🎯 {score} pts · ⏱ {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</span>
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
                return (
                  <li key={am.id} className={st}>
                    <span className="atc-step-ic">{(done || i < mi) ? '✓' : i === mi ? '▶' : '🔒'}</span>
                    {am.objective}
                  </li>
                )
              })}
            </ol>
          </div>
        </aside>

        <main className="kali-main">
          <Terminal lines={lines} />
        </main>

        <section className="kali-view">
          <div className="kali-win-bar">
            <span className="kdot r" /><span className="kdot y" /><span className="kdot g" />
            <span className="kwin-title">{done ? 'loot-report' : reveal ? revealTitle(reveal) : 'briefing'}</span>
          </div>
          <div className="kali-win-body">
            {done ? (
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
