import { useState } from 'react'
import { AicoiLogin } from './AicoiLogin'
import { AicoiDesktop, type AppKey } from './AicoiDesktop'
import { ReportScreen } from './ReportScreen'
import type { EvTruth, CmpTruth } from '../../cases/case_03/evidence'
import type { RouteVerdict } from '../../cases/case_03/map'
import { computeEnding, type ReportResult } from '../../cases/case_03/endings'
import { BackButton } from '../../ui/BackButton'
import '../../styles/case02.css'
import '../../styles/case03.css'

type Phase = 'login' | 'desktop' | 'report'

/** Estado compartilhado da investigação, passado para os apps do desktop. */
export interface InvestState {
  visited: Set<AppKey>
  timelineBuilt: boolean
  windowRegistered: boolean
  ev: Record<string, EvTruth>
  cmp: Record<string, CmpTruth>
  routes: Record<string, RouteVerdict>
  analiseStarted: boolean
  setEv: (id: string, v: EvTruth) => void
  setCmp: (id: string, v: CmpTruth) => void
  setRoute: (id: string, v: RouteVerdict) => void
  registerWindow: () => void
  submitReport: () => void
}

export function InvestigadorCase03() {
  const [phase, setPhase] = useState<Phase>('login')
  const [openApp, setOpenApp] = useState<AppKey | null>(null)
  const [visited, setVisited] = useState<Set<AppKey>>(new Set())

  const [windowRegistered, setWindowRegistered] = useState(false)
  const [ev, setEvState] = useState<Record<string, EvTruth>>({})
  const [cmp, setCmpState] = useState<Record<string, CmpTruth>>({})
  const [routes, setRoutesState] = useState<Record<string, RouteVerdict>>({})
  const [result, setResult] = useState<ReportResult | null>(null)
  const [now] = useState(() => Date.now())

  const analiseStarted =
    visited.has('analise') || Object.keys(ev).length > 0 || Object.keys(cmp).length > 0

  function openAppTracked(a: AppKey | null) {
    setOpenApp(a)
    if (a) setVisited((s) => new Set(s).add(a))
  }

  function submitReport() {
    setResult(computeEnding({ ev, cmp }))
    setPhase('report')
  }

  const invest: InvestState = {
    visited,
    timelineBuilt: windowRegistered,
    windowRegistered,
    ev,
    cmp,
    routes,
    analiseStarted,
    setEv: (id, v) => setEvState((m) => ({ ...m, [id]: v })),
    setCmp: (id, v) => setCmpState((m) => ({ ...m, [id]: v })),
    setRoute: (id, v) => setRoutesState((m) => ({ ...m, [id]: v })),
    registerWindow: () => setWindowRegistered(true),
    submitReport,
  }

  if (phase === 'login') {
    return (
      <div className="aicoi aicoi-loginwrap">
        <BackButton className="back-float" />
        <AicoiLogin onEnter={() => setPhase('desktop')} />
      </div>
    )
  }

  if (phase === 'report' && result) {
    return (
      <div className="aicoi">
        <BackButton className="back-float" />
        <ReportScreen
          result={result}
          ev={ev}
          cmp={cmp}
          onRestart={() => window.location.reload()}
          onReview={() => { setPhase('desktop'); openAppTracked('relatorio') }}
        />
      </div>
    )
  }

  return (
    <AicoiDesktop
      openApp={openApp}
      setOpenApp={openAppTracked}
      invest={invest}
      wallClock={now}
    />
  )
}
