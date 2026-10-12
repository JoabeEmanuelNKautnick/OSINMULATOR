import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react'
import { activeCase } from '../../cases/active'
import { caseImage } from '../../cases/images'
import { CaseFiles } from '../../ui/CaseFiles'
import { ImageLightbox } from '../../ui/ImageLightbox'
import {
  IconFile, IconImage, IconSearch, IconMap, IconClock, IconFolder, IconCamera, IconLock, IconX, IconChevronRight, type Icon,
} from '../../ui/icons'
import { MensagensApp } from './MensagensApp'
import { LinhaApp } from './LinhaApp'
import { CamerasApp } from './CamerasApp'
import { AnaliseApp } from './AnaliseApp'
import { MapApp } from './MapApp'
import { RelatorioApp } from './RelatorioApp'
import type { InvestState } from './InvestigadorCase03'

export type AppKey = 'autos' | 'ficha' | 'mensagens' | 'linha' | 'cameras' | 'analise' | 'mapa' | 'relatorio'

const APPS: { key: AppKey; name: string; desc: string; Icon: Icon; color: string }[] = [
  { key: 'autos',     name: 'Autos do caso', desc: 'Registro · Testemunho · Alerta · Óbito', Icon: IconFile,   color: '#9fb3c8' },
  { key: 'ficha',     name: 'Fichário',      desc: 'Fotos · coelho · caixa de leite',        Icon: IconImage,  color: 'var(--purple-2)' },
  { key: 'mensagens', name: 'Mensagens',     desc: 'Canal AICOI · Identificação',            Icon: IconSearch, color: 'var(--cyan)' },
  { key: 'linha',     name: 'Linha do tempo', desc: 'Reconstrua a manhã de 23/04',           Icon: IconClock,  color: 'var(--blue)' },
  { key: 'cameras',   name: 'Câmeras',       desc: 'Vigilância do pátio (fase 4)',           Icon: IconCamera, color: 'var(--purple)' },
  { key: 'analise',   name: 'Análise',       desc: 'Classifique fato/relato/hipótese',       Icon: IconSearch, color: 'var(--blue)' },
  { key: 'mapa',      name: 'Mapa',          desc: 'Percursos no castelo (fase 5)',          Icon: IconMap,    color: 'var(--warn)' },
  { key: 'relatorio', name: 'Relatório',     desc: 'Encerre a etapa investigativa',          Icon: IconFolder, color: 'var(--ok)' },
]

function clockParts(ms: number) {
  const d = new Date(ms)
  const hh = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  const dd = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  return { hh, dd }
}

export function AicoiDesktop({
  openApp, setOpenApp, invest, wallClock,
}: {
  openApp: AppKey | null
  setOpenApp: (a: AppKey | null) => void
  invest: InvestState
  wallClock: number
}) {
  const [menu, setMenu] = useState(false)
  const current = APPS.find((a) => a.key === openApp)
  const { hh, dd } = clockParts(wallClock)

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
    <div className="os os-cold" onClick={() => menu && setMenu(false)}>
      <div className="os-seal-wm" aria-hidden="true">AICOI</div>

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
            {openApp === 'ficha' && <Ficha />}
            {openApp === 'mensagens' && <MensagensApp invest={invest} />}
            {openApp === 'linha' && <LinhaApp invest={invest} />}
            {openApp === 'cameras' && <CamerasApp invest={invest} />}
            {openApp === 'analise' && <AnaliseApp invest={invest} />}
            {openApp === 'mapa' && (
              invest.actI_II_done
                ? <MapApp invest={invest} />
                : <LockedApp text="Conclua o Ato I–II (linha do tempo, câmeras e toda a análise das fases 1–4) para liberar o Mapa." />
            )}
            {openApp === 'relatorio' && <RelatorioApp invest={invest} onGoAnalise={() => setOpenApp('analise')} />}
          </div>
        </div>
      )}

      {/* Menu iniciar */}
      {menu && (
        <div className="os-startmenu" onClick={(e) => e.stopPropagation()}>
          <div className="sm-head">
            <div className="sm-seal">AICOI</div>
            <div><b>Portal AICOI</b><small>investigador · identificação</small></div>
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
          <b>AICOI</b>
          <span>Iniciar</span>
        </button>
        <div className="tb-running">
          {APPS.map((a) => (
            <button
              key={a.key}
              className={'tb-task' + (openApp === a.key ? ' active' : '')}
              onClick={() => setOpenApp(openApp === a.key ? null : a.key)}
              title={a.name}
            >
              <a.Icon size={16} />
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

/** Placeholder de app ainda bloqueado por progresso. */
function LockedApp({ text }: { text: string }) {
  return (
    <div className="locked-app">
      <IconLock size={28} />
      <p>{text}</p>
    </div>
  )
}

/** Fichário: galeria de imagens do caso (sem perfil social). */
function Ficha() {
  const [open, setOpen] = useState<{ title: string; src: string; caption: string } | null>(null)

  const items = [
    { key: 'ultima_foto', title: 'Última foto (dez/1999)', caption: 'Última fotografia conhecida de Marie, aos 5 anos.' },
    { key: 'progressao_idade', title: 'Projeção de idade (2026)', caption: 'Projeção digital de envelhecimento — estimativa, não retrato exato.' },
    { key: 'marie-e-papai', title: 'Marie e Paul', caption: 'Foto familiar anterior ao desaparecimento, com o coelho de pelúcia.' },
    { key: 'coelho', title: 'Coelho de pelúcia', caption: 'Branco com manchas castanhas — identificador narrativo, não prova.' },
    { key: 'caixaleite-missing', title: 'Caixa de leite · MISSING', caption: 'Campanha de divulgação (fictícia) — não é prova de paradeiro.' },
    { key: 'caixaleite-frente', title: 'Caixa de leite · frente', caption: 'Frente da embalagem da campanha MISSING.' },
    { key: 'jornal-machete-missing', title: 'Recorte de jornal', caption: '24/04/2000 — "pouco antes do meio-dia", sem fonte independente.' },
  ].map((i) => ({ ...i, src: caseImage('case_03', i.key) })).filter((i) => i.src) as { key: string; title: string; caption: string; src: string }[]

  return (
    <div className="fichario">
      <p className="fi-note">Materiais visuais do caso. Compare com cautela — semelhança não é identificação.</p>
      <div className="fi-grid">
        {items.map((i) => (
          <button key={i.key} className="fi-card" onClick={() => setOpen(i)}>
            <img src={i.src} alt={i.title} />
            <b>{i.title}</b>
          </button>
        ))}
      </div>
      {open && <ImageLightbox title={open.title} src={open.src} caption={open.caption} onClose={() => setOpen(null)} />}
    </div>
  )
}
