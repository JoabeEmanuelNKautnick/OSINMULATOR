import { useEffect, useRef, useState, type ReactNode, type PointerEvent as RPointerEvent } from 'react'
import { activeCase } from '../../cases/active'
import { caseImage } from '../../cases/images'
import { CaseFiles } from '../../ui/CaseFiles'
import { ImageLightbox } from '../../ui/ImageLightbox'
import {
  IconFile, IconImage, IconSearch, IconMap, IconX, IconChevronRight, type Icon,
} from '../../ui/icons'
import { AicoiMessages } from './AicoiMessages'
import { AnaliseApp } from './AnaliseApp'
import { MapApp } from './MapApp'
import type { HuntState } from './InvestigadorCase02'

export type AppKey = 'autos' | 'fichario' | 'mensagens' | 'analise' | 'mapa'

const APPS: { key: AppKey; name: string; desc: string; Icon: Icon; color: string }[] = [
  { key: 'autos',     name: 'Autos do caso', desc: 'Denúncia · Red Wanted · Mandado', Icon: IconFile,   color: '#9fb3c8' },
  { key: 'fichario',  name: 'Fichário',      desc: 'Foto do rosto · retrato falado',  Icon: IconImage,  color: 'var(--purple-2)' },
  { key: 'mensagens', name: 'Mensagens',     desc: 'Canal seguro AICOI',              Icon: IconSearch, color: 'var(--cyan)' },
  { key: 'analise',   name: 'Análise',       desc: 'Correlacione e classifique',      Icon: IconSearch, color: 'var(--blue)' },
  { key: 'mapa',      name: 'Mapa',          desc: 'Localizar o suspeito',            Icon: IconMap,    color: 'var(--warn)' },
]

function clockParts(ms: number) {
  const d = new Date(ms)
  const hh = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  const dd = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  return { hh, dd }
}

export function AicoiDesktop({
  openApp, setOpenApp, hunt, wallClock, unread, toast, locationLabel, children,
}: {
  openApp: AppKey | null
  setOpenApp: (a: AppKey | null) => void
  hunt: HuntState
  wallClock: number
  unread: boolean
  toast: string | null
  locationLabel?: string
  children?: ReactNode
}) {
  const [menu, setMenu] = useState(false)
  const current = APPS.find((a) => a.key === openApp)
  const seal = caseImage('case_02', 'logo-aicoi')
  const { hh, dd } = clockParts(wallClock)

  // posição da janela (arrastável); recentra ao trocar de app
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  useEffect(() => { setPos(null) }, [openApp])
  const drag = useRef<{ dx: number; dy: number } | null>(null)
  function startDrag(e: RPointerEvent) {
    const el = (e.currentTarget as HTMLElement).closest('.os-window') as HTMLElement
    if (!el) return
    const r = el.getBoundingClientRect()
    drag.current = { dx: e.clientX - r.left, dy: e.clientY - r.top }
    const move = (ev: PointerEvent) => {
      if (!drag.current) return
      const x = Math.max(0, Math.min(window.innerWidth - 80, ev.clientX - drag.current.dx))
      const y = Math.max(0, Math.min(window.innerHeight - 120, ev.clientY - drag.current.dy))
      setPos({ x, y })
    }
    const up = () => { drag.current = null; window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  const isWindowed = openApp && openApp !== 'autos'
  const winStyle = pos ? { left: pos.x, top: pos.y, transform: 'none' } : undefined

  function launch(a: AppKey) { setOpenApp(a); setMenu(false) }
  function logoff() { window.location.href = window.location.pathname }

  return (
    <div className="os" onClick={() => menu && setMenu(false)}>
      {seal && <img className="os-watermark" src={seal} alt="" aria-hidden="true" />}

      {/* Ícones da área de trabalho */}
      <div className="os-icons">
        {APPS.map((a) => (
          <button key={a.key} className="os-icon" onDoubleClick={() => launch(a.key)} onClick={() => launch(a.key)}>
            <span className="os-icon-img" style={{ color: a.color }}><a.Icon size={30} /></span>
            <span className="os-icon-label">{a.name}</span>
          </button>
        ))}
      </div>

      {/* Autos abre o overlay compartilhado */}
      {openApp === 'autos' && <CaseFiles unlockedAll onClose={() => setOpenApp(null)} />}

      {/* Janela de app */}
      {isWindowed && (
        <div className="os-window" style={winStyle}>
          <div className="os-titlebar" onPointerDown={startDrag}>
            <span className="os-dots">
              <i className="d-close" onClick={() => setOpenApp(null)} title="Fechar" />
              <i className="d-min" />
              <i className="d-max" />
            </span>
            <span className="os-wtitle">{current?.name}</span>
            <button className="os-wclose" onClick={() => setOpenApp(null)} aria-label="Fechar"><IconX size={15} /></button>
          </div>
          <div className="os-wbody">
            {openApp === 'fichario' && <Fichario />}
            {openApp === 'mensagens' && <AicoiMessages hunt={hunt} />}
            {openApp === 'analise' && <AnaliseApp hunt={hunt} />}
            {openApp === 'mapa' && <MapApp hunt={hunt} locationLabel={locationLabel} onGoMessages={() => setOpenApp('mensagens')} onGoAnalise={() => setOpenApp('analise')} />}
          </div>
        </div>
      )}

      {/* Barra de captura / overlays do root */}
      {children}

      {/* Toast de notificação */}
      {toast && <div className="os-toast">{toast}</div>}

      {/* Menu iniciar */}
      {menu && (
        <div className="os-startmenu" onClick={(e) => e.stopPropagation()}>
          <div className="sm-head">
            {seal && <img src={seal} alt="" />}
            <div><b>Portal AICOI</b><small>investigador-455</small></div>
          </div>
          <div className="sm-apps">
            {APPS.map((a) => (
              <button key={a.key} className="sm-app" onClick={() => launch(a.key)}>
                <span style={{ color: a.color }}><a.Icon size={18} /></span>
                <span className="sm-txt"><b>{a.name}</b><small>{a.desc}</small></span>
                <IconChevronRight size={14} />
              </button>
            ))}
          </div>
          <button className="sm-logoff" onClick={logoff}>Sair / trocar caso</button>
        </div>
      )}

      {/* Barra de tarefas */}
      <div className="os-taskbar">
        <button className={'tb-start' + (menu ? ' on' : '')} onClick={(e) => { e.stopPropagation(); setMenu((m) => !m) }}>
          {seal ? <img src={seal} alt="AICOI" /> : <b>AICOI</b>}
          <span>Iniciar</span>
        </button>
        <div className="tb-running">
          {APPS.map((a) => (
            <button
              key={a.key}
              className={'tb-task' + (openApp === a.key ? ' active' : '') + (a.key === 'mensagens' && unread ? ' alert' : '')}
              onClick={() => setOpenApp(openApp === a.key ? null : a.key)}
              title={a.name}
            >
              <a.Icon size={16} />
              {a.key === 'mensagens' && unread && <span className="tb-badge" />}
            </button>
          ))}
        </div>
        <div className="tb-tray">
          <span className="tb-case">CASE #{activeCase.number}</span>
          <span className="tb-clock"><b>{hh}</b><small>{dd}</small></span>
        </div>
      </div>
    </div>
  )
}

/** Fichário: foto do rosto + retrato falado (NÃO usa perfil.png). */
function Fichario() {
  const rosto = caseImage('case_02', 'ultima_foto')
  const retrato = caseImage('case_02', 'retrato_falado')
  const [open, setOpen] = useState<{ title: string; src: string; caption: string } | null>(null)

  const items = [
    { title: 'Foto do rosto', src: rosto, caption: 'Imagem anexada ao caso. Semelhança não é identificação.' },
    { title: 'Retrato falado', src: retrato, caption: 'Retrato falado difundido em canal de notícias — fonte indireta.' },
  ].filter((i) => i.src) as { title: string; src: string; caption: string }[]

  return (
    <div className="fichario">
      <p className="fi-note">Materiais visuais do suspeito. Compare com cautela.</p>
      <div className="fi-grid">
        {items.map((i) => (
          <button key={i.title} className="fi-card" onClick={() => setOpen(i)}>
            <img src={i.src} alt={i.title} />
            <b>{i.title}</b>
          </button>
        ))}
      </div>
      {open && <ImageLightbox title={open.title} src={open.src} caption={open.caption} onClose={() => setOpen(null)} />}
    </div>
  )
}
