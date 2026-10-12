import { useEffect, useRef, useState } from 'react'
import { AicoiLogin } from './AicoiLogin'
import { AicoiDesktop, type AppKey } from './AicoiDesktop'
import { CaptureBar } from './CaptureBar'
import { ResultScreen } from './ResultScreen'
import {
  CAPTURE_WINDOW_MS, WRONG_JUSTIFICATION_PENALTY_MS, MAX_STRIKES, spots, type MapSpot,
} from '../../cases/case_02/map'
import { attributes, evidences, type AttrTruth, type EvTruth } from '../../cases/case_02/conclusion'
import { BackButton } from '../../ui/BackButton'
import '../../styles/case02.css'

type Phase = 'login' | 'desktop' | 'result'
export type Outcome = 'none' | 'captured' | 'fled'
export type FledReason = 'timeout' | 'raid' | null
export type SpotVerdict = 'correct' | 'wrong' | 'fled'

/** Estado compartilhado da investigação, passado para os apps do desktop. */
export interface HuntState {
  attr: Record<string, AttrTruth>
  ev: Record<string, EvTruth>
  visited: Set<AppKey>
  locationFound: boolean
  spotId: string | null
  strikes: number
  maxStrikes: number
  analysisComplete: boolean
  leadsRead: boolean
  setAttr: (id: string, v: AttrTruth) => void
  setEv: (id: string, v: EvTruth) => void
  commitSpot: (s: MapSpot) => SpotVerdict
}

export function InvestigadorCase02() {
  const [phase, setPhase] = useState<Phase>('login')
  const [openApp, setOpenApp] = useState<AppKey | null>(null)
  const [visited, setVisited] = useState<Set<AppKey>>(new Set())

  const [attr, setAttrState] = useState<Record<string, AttrTruth>>({})
  const [ev, setEvState] = useState<Record<string, EvTruth>>({})

  const [locationFound, setLocationFound] = useState(false)
  const [spotId, setSpotId] = useState<string | null>(null)
  const [deadline, setDeadline] = useState<number | null>(null)
  const [outcome, setOutcome] = useState<Outcome>('none')
  const [reason, setReason] = useState<FledReason>(null)
  const [strikes, setStrikes] = useState(0)
  const [now, setNow] = useState(() => Date.now())
  const startedAt = useRef<number>(Date.now())
  const captureMs = useRef<number>(0)

  // notificações de SO
  const [unread, setUnread] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | null>(null)

  const analysisComplete = attributes.every((a) => attr[a.id]) && evidences.every((e) => ev[e.id])
  const leadsRead = visited.has('mensagens')
  const prevAnalise = useRef(false)
  const prevLoc = useRef(false)

  function fireToast(text: string) {
    setToast(text)
    setUnread(true)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 4500)
  }

  // relógio / tick
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 500)
    return () => window.clearInterval(t)
  }, [])

  // fuga por tempo esgotado
  useEffect(() => {
    if (locationFound && outcome === 'none' && deadline && Date.now() >= deadline) {
      captureMs.current = CAPTURE_WINDOW_MS
      setReason('timeout')
      setOutcome('fled')
      setPhase('result')
    }
  }, [now, locationFound, outcome, deadline])

  // novos leads (notificação de SO)
  const analiseOn = visited.has('analise') || Object.keys(attr).length > 0 || Object.keys(ev).length > 0
  useEffect(() => {
    if (phase !== 'desktop') return
    if (analiseOn && !prevAnalise.current) fireToast('Monitoramento/CFTV: novo lead sobre o SUV.')
    prevAnalise.current = analiseOn
    if (locationFound && !prevLoc.current) fireToast('Coordenação AICOI: janela de captura aberta.')
    prevLoc.current = locationFound
  }, [analiseOn, locationFound, phase])

  function openAppTracked(a: AppKey | null) {
    setOpenApp(a)
    if (a) {
      setVisited((s) => new Set(s).add(a))
      if (a === 'mensagens') setUnread(false)
    }
  }

  function commitSpot(s: MapSpot): SpotVerdict {
    if (locationFound || outcome !== 'none') return 'wrong'
    if (s.correct) {
      setSpotId(s.id)
      setLocationFound(true)
      setDeadline(Date.now() + CAPTURE_WINDOW_MS)
      return 'correct'
    }
    const next = strikes + 1
    setStrikes(next)
    if (next >= MAX_STRIKES) {
      setReason('raid')
      setOutcome('fled')
      setPhase('result')
      return 'fled'
    }
    return 'wrong'
  }

  function penalizeWrongJustification() {
    setDeadline((d) => (d ? d - WRONG_JUSTIFICATION_PENALTY_MS : d))
  }

  function onCapture() {
    if (!deadline) return
    captureMs.current = CAPTURE_WINDOW_MS - Math.max(0, deadline - Date.now())
    setOutcome('captured')
    setPhase('result')
  }

  const hunt: HuntState = {
    attr, ev, visited, locationFound, spotId, strikes, maxStrikes: MAX_STRIKES,
    analysisComplete, leadsRead,
    setAttr: (id, v) => setAttrState((m) => ({ ...m, [id]: v })),
    setEv: (id, v) => setEvState((m) => ({ ...m, [id]: v })),
    commitSpot,
  }

  if (phase === 'login') {
    return (
      <div className="aicoi aicoi-loginwrap">
        <BackButton className="back-float" />
        <AicoiLogin onEnter={() => { setPhase('desktop'); startedAt.current = Date.now() }} />
      </div>
    )
  }

  if (phase === 'result') {
    return (
      <div className="aicoi">
        <BackButton className="back-float" />
        <ResultScreen
          outcome={outcome}
          reason={reason}
          attr={attr}
          ev={ev}
          spotId={spotId}
          strikes={strikes}
          captureMs={captureMs.current}
          sessionMs={Date.now() - startedAt.current}
          onRestart={() => window.location.reload()}
        />
      </div>
    )
  }

  const remaining = deadline ? Math.max(0, deadline - now) : CAPTURE_WINDOW_MS
  const correctSpot = spots.find((s) => s.correct)

  return (
    <AicoiDesktop
      openApp={openApp}
      setOpenApp={openAppTracked}
      hunt={hunt}
      wallClock={now}
      unread={unread}
      toast={toast}
      locationLabel={correctSpot?.label}
    >
      {locationFound && outcome === 'none' && (
        <CaptureBar
          remainingMs={remaining}
          locationLabel={correctSpot?.label ?? 'local confirmado'}
          onCapture={onCapture}
          onWrongJustification={penalizeWrongJustification}
        />
      )}
    </AicoiDesktop>
  )
}
