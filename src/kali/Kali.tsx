import { useEffect, useState } from 'react'
import { missions } from '../data/missions'
import { persona, photoDetails } from '../data/persona'
import { Terminal, type Line } from './Terminal'
import { AppView, appMeta } from '../apps/AppView'
import {
  DossierPanel, WordlistPanel, RecoveryPanel, PhishingPanel, RiskMapPanel,
} from './attacks/panels'
import { IconAlert, IconPlay, IconKey, IconUnlock, IconMask, IconMap, IconProjector, IconGraph, type Icon } from '../ui/icons'
import { BrandMark } from '../ui/Brand'
import { Palestra } from '../palestra/Palestra'
import { InvestigationGraph } from '../ui/InvestigationGraph'
import '../styles/kali.css'

type View =
  | { kind: 'app'; app: 'fotogram' | 'correapp' | 'gamechat' }
  | { kind: 'dossier' }
  | { kind: 'wordlist' }
  | { kind: 'recovery' }
  | { kind: 'phishing' }
  | { kind: 'riskmap' }
  | { kind: 'graph' }

function reconLines(): Line[] {
  const out: Line[] = [{ text: 'recon --target lia.andrade --all', cls: 'cmd' }]
  for (const m of missions) {
    out.push({ text: '$ ' + m.command, cls: 'dim' })
    for (const o of m.output) out.push({ text: '  ' + o, cls: o.includes('[ok]') ? 'ok' : undefined })
  }
  out.push({ text: '[✓] dossiê completo: 9/9 pistas', cls: 'ok' })
  return out
}

const attacks: Record<string, { label: string; Icon: Icon; cmd: string; lines: Line[]; view: View }> = {
  wordlist: {
    label: 'Quebra de senha',
    Icon: IconKey,
    cmd: 'wordlist',
    view: { kind: 'wordlist' },
    lines: [
      { text: 'wordlist --from-dossier | bruteforce gamechat', cls: 'cmd' },
      { text: '  [*] gerando candidatos a partir do dossiê...', cls: 'dim' },
      { text: '  thor / thor2007 / Thor2007 / thor1403 / thor@2007', cls: 'dim' },
      { text: `  [*] testando ${persona.gamechat.nick}...`, cls: 'dim' },
      { text: `  [ok] senha encontrada: ${photoDetails.password}`, cls: 'ok' },
    ],
  },
  recovery: {
    label: 'Recuperar conta',
    Icon: IconUnlock,
    cmd: 'account-recovery',
    view: { kind: 'recovery' },
    lines: [
      { text: 'account-recovery --provider gamechat --auto', cls: 'cmd' },
      { text: '  [?] Nome do primeiro pet -> ' + photoDetails.pet, cls: 'dim' },
      { text: '  [?] Nome da mãe -> ' + photoDetails.mother, cls: 'dim' },
      { text: '  [?] Data de nascimento -> ' + photoDetails.birthday, cls: 'dim' },
      { text: '  [ok] perguntas de segurança respondidas', cls: 'ok' },
    ],
  },
  phishing: {
    label: 'Engenharia social',
    Icon: IconMask,
    cmd: 'pretext-gen',
    view: { kind: 'phishing' },
    lines: [
      { text: 'pretext-gen --target "mãe" --dossier lia', cls: 'cmd' },
      { text: '  [*] usando: nome da mãe, trabalho, avó', cls: 'dim' },
      { text: '  [ok] mensagem fabricada (ver painel ->)', cls: 'ok' },
    ],
  },
  riskmap: {
    label: 'Mapa de risco',
    Icon: IconMap,
    cmd: 'geo-correlate',
    view: { kind: 'riskmap' },
    lines: [
      { text: 'geo-correlate --runs --posts', cls: 'cmd' },
      { text: '  [*] cruzando GPS + horários + viagem...', cls: 'dim' },
      { text: '  [ok] endereço + rotina + ausência mapeados', cls: 'warn' },
    ],
  },
}

export function Kali() {
  const [lines, setLines] = useState<Line[]>([
    { text: 'recon --help', cls: 'cmd' },
    { text: 'Ferramenta de demonstração OSINT (uso educativo).', cls: 'dim' },
    { text: 'Clique em "Recon completo" para reconstruir o dossiê.', cls: 'dim' },
  ])
  const [view, setView] = useState<View>({ kind: 'dossier' })
  const [presenting, setPresenting] = useState(false)

  function runRecon() { setLines(reconLines()); setView({ kind: 'dossier' }) }
  function runAttack(key: keyof typeof attacks) {
    setLines(attacks[key].lines)
    setView(attacks[key].view)
  }
  function openApp(app: 'fotogram' | 'correapp' | 'gamechat') {
    setLines([{ text: `cat evidence/${app}.json`, cls: 'cmd' }, { text: '[+] renderizando captura...', cls: 'dim' }])
    setView({ kind: 'app', app })
  }
  function runGraph() {
    setLines([
      { text: 'graph --build --from-dossier', cls: 'cmd' },
      { text: '  [*] correlacionando pessoas, contas, locais e eventos...', cls: 'dim' },
      { text: '  [ok] 12 nós · 14 conexões', cls: 'ok' },
    ])
    setView({ kind: 'graph' })
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (presenting) return // atalhos do Analista ficam mudos durante a projeção
      if (e.key === 'Enter') runRecon()
      const map: Record<string, keyof typeof attacks> = { '1': 'wordlist', '2': 'recovery', '3': 'phishing', '4': 'riskmap' }
      if (map[e.key]) runAttack(map[e.key])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [presenting])

  return (
    <div className="kali">
      <div className="kali-banner ico-row"><IconAlert size={14} /> SIMULAÇÃO EDUCATIVA — pessoa e dados 100% fictícios. Nenhuma ferramenta real é executada.</div>
      <div className="kali-topbar">
        <BrandMark size="sm" mode="Analista" />
        <span className="kali-title">osint-toolkit — root@kali</span>
        <button className="kproject" onClick={() => setPresenting(true)}>
          <IconProjector size={16} /> Projetar
        </button>
        <span className="kali-clock">{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      {presenting && <Palestra onExit={() => setPresenting(false)} />}

      <div className="kali-body">
        <aside className="kali-side">
          <div className="kali-group">
            <h4>Reconhecimento</h4>
            <button className="kbtn prime" onClick={runRecon}><IconPlay size={15} /> Recon completo <kbd>Enter</kbd></button>
            <div className="kali-subbtns">
              {(['fotogram', 'correapp', 'gamechat'] as const).map((a) => {
                const { Icon, name } = appMeta[a]
                return (
                  <button key={a} className="kbtn" onClick={() => openApp(a)}>
                    <Icon size={16} /> {name}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="kali-group">
            <h4>Inteligência</h4>
            <button className="kbtn" onClick={runGraph}><IconGraph size={16} /> Grafo de conexões</button>
          </div>
          <div className="kali-group">
            <h4>Ataques simulados</h4>
            {(Object.keys(attacks) as (keyof typeof attacks)[]).map((k, i) => {
              const { Icon, label } = attacks[k]
              return (
                <button key={k} className="kbtn attack" onClick={() => runAttack(k)}>
                  <Icon size={16} /> {label} <kbd>{i + 1}</kbd>
                </button>
              )
            })}
          </div>
        </aside>

        <main className="kali-main">
          <Terminal lines={lines} />
        </main>

        <section className="kali-view">
          <div className="kali-win-bar">
            <span className="kdot r" /><span className="kdot y" /><span className="kdot g" />
            <span className="kwin-title">{viewTitle(view)}</span>
          </div>
          <div className="kali-win-body">
            {view.kind === 'app' && <div className="kali-appframe"><AppView app={view.app} /></div>}
            {view.kind === 'dossier' && <DossierPanel />}
            {view.kind === 'wordlist' && <WordlistPanel />}
            {view.kind === 'recovery' && <RecoveryPanel />}
            {view.kind === 'phishing' && <PhishingPanel />}
            {view.kind === 'riskmap' && <RiskMapPanel />}
            {view.kind === 'graph' && <InvestigationGraph />}
          </div>
        </section>
      </div>
    </div>
  )
}

function viewTitle(v: View) {
  switch (v.kind) {
    case 'app': return 'evidence://' + v.app
    case 'dossier': return 'dossie.txt'
    case 'wordlist': return 'password-attack'
    case 'recovery': return 'account-recovery'
    case 'phishing': return 'social-engineering'
    case 'riskmap': return 'geo-risk'
    case 'graph': return 'graph://connections'
  }
}
