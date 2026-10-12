import { useState } from 'react'
import { AicoiLogin } from './AicoiLogin'
import { AicoiDesktop, type AppKey } from './AicoiDesktop'
import { ReportScreen } from './ReportScreen'
import {
  evidences, comparisons, type EvTruth, type CmpTruth, type Phase,
} from '../../cases/case_03/evidence'
import { routes, type RouteVerdict } from '../../cases/case_03/map'
import { computeEnding, type ReportResult } from '../../cases/case_03/endings'
import { BackButton } from '../../ui/BackButton'
import '../../styles/case02.css'
import '../../styles/case03.css'

type Phase2 = 'login' | 'desktop' | 'report'

/** Estado compartilhado da investigação, passado para os apps do desktop. */
export interface InvestState {
  visited: Set<AppKey>
  windowRegistered: boolean
  camerasSolved: boolean
  ev: Record<string, EvTruth>
  cmp: Record<string, CmpTruth>
  routes: Record<string, RouteVerdict>
  acolhimentoDecision?: string
  projecaoDecision?: string
  analiseStarted: boolean
  /** Até qual fase o conteúdo está liberado (4, 7 ou 8). */
  unlockedMax: Phase
  actI_II_done: boolean
  actIII_done: boolean
  reportReady: boolean
  setEv: (id: string, v: EvTruth) => void
  setCmp: (id: string, v: CmpTruth) => void
  setRoute: (id: string, v: RouteVerdict) => void
  solveCameras: () => void
  setAcolhimento: (id: string) => void
  setProjecao: (id: string) => void
  registerWindow: () => void
  submitReport: () => void
}

export function InvestigadorCase03() {
  const [phase, setPhase] = useState<Phase2>('login')
  const [openApp, setOpenApp] = useState<AppKey | null>(null)
  const [visited, setVisited] = useState<Set<AppKey>>(new Set())

  const [windowRegistered, setWindowRegistered] = useState(false)
  const [camerasSolved, setCamerasSolved] = useState(false)
  const [ev, setEvState] = useState<Record<string, EvTruth>>({})
  const [cmp, setCmpState] = useState<Record<string, CmpTruth>>({})
  const [routeMarks, setRoutesState] = useState<Record<string, RouteVerdict>>({})
  const [acolhimentoDecision, setAcolhimentoDecision] = useState<string | undefined>(undefined)
  const [projecaoDecision, setProjecaoDecision] = useState<string | undefined>(undefined)
  const [result, setResult] = useState<ReportResult | null>(null)
  const [now] = useState(() => Date.now())

  // --- progressão por atos ---------------------------------------------------
  const evP4 = evidences.filter((e) => e.phase <= 4)
  const cmpAll = comparisons
  const actI_II_done =
    windowRegistered && camerasSolved &&
    evP4.every((e) => ev[e.id]) && cmpAll.every((c) => cmp[c.id])

  const mapDone = routes.every((r) => routeMarks[r.id])
  const evP567 = evidences.filter((e) => e.phase >= 5 && e.phase <= 7)
  const actIII_done =
    actI_II_done && mapDone && evP567.every((e) => ev[e.id]) && !!acolhimentoDecision

  let unlockedMax: Phase = 4
  if (actI_II_done) unlockedMax = 7
  if (actIII_done) unlockedMax = 8

  const evActive = evidences.filter((e) => e.phase <= unlockedMax)
  const reportReady =
    unlockedMax >= 8 && evActive.every((e) => ev[e.id]) && !!projecaoDecision

  const analiseStarted =
    visited.has('analise') || Object.keys(ev).length > 0 || Object.keys(cmp).length > 0

  function openAppTracked(a: AppKey | null) {
    setOpenApp(a)
    if (a) setVisited((s) => new Set(s).add(a))
  }

  function submitReport() {
    setResult(computeEnding({ ev, cmp, acolhimentoDecision, projecaoDecision }, unlockedMax))
    setPhase('report')
  }

  const invest: InvestState = {
    visited, windowRegistered, camerasSolved, ev, cmp, routes: routeMarks,
    acolhimentoDecision, projecaoDecision, analiseStarted,
    unlockedMax, actI_II_done, actIII_done, reportReady,
    setEv: (id, v) => setEvState((m) => ({ ...m, [id]: v })),
    setCmp: (id, v) => setCmpState((m) => ({ ...m, [id]: v })),
    setRoute: (id, v) => setRoutesState((m) => ({ ...m, [id]: v })),
    solveCameras: () => setCamerasSolved(true),
    setAcolhimento: (id) => setAcolhimentoDecision(id),
    setProjecao: (id) => setProjecaoDecision(id),
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
          maxPhase={unlockedMax}
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
