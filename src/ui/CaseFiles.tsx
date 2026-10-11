import { useState } from 'react'
import { activeCase } from '../cases/active'
import type { CaseDoc } from '../cases/types'
import { BrandMark } from './Brand'
import { PdfModal } from './PdfModal'
import { IconFile, IconLock, IconX, IconChevronRight } from './icons'
import '../styles/casefiles.css'

function isDesktop() {
  try { return window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches } catch { return false }
}

export function CaseFiles({
  unlockedAll = false,
  initialDoc,
  onClose,
}: {
  unlockedAll?: boolean
  initialDoc?: string            // id do doc a abrir de cara (ex.: 'npd')
  onClose: () => void
}) {
  const [modal, setModal] = useState<CaseDoc | null>(() => {
    if (!initialDoc) return null
    const d = activeCase.docs.find((x) => x.id === initialDoc)
    return d && d.url && isDesktop() ? d : null
  })

  function open(d: CaseDoc) {
    if (!d.url) return
    if (isDesktop()) setModal(d)
    else window.open(d.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="cf-overlay" onClick={onClose}>
      <div className="cf-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="cf-head">
          <BrandMark size="sm" mode="Autos do caso" />
          <button className="cf-close" onClick={onClose} aria-label="Fechar"><IconX size={18} /></button>
        </div>
        <div className="cf-sub">CASE #{activeCase.number} · {activeCase.name}</div>

        <div className="cf-list">
          {activeCase.docs.map((d) => {
            const locked = d.lockedUntilDone && !unlockedAll
            if (locked) {
              return (
                <div key={d.id} className="cf-doc locked">
                  <span className="cf-ic"><IconLock size={20} /></span>
                  <div className="cf-body">
                    <b>{d.title}</b>
                    <small>{d.subtitle}</small>
                    <span className="cf-locktag">Conclua a investigação para liberar</span>
                  </div>
                </div>
              )
            }
            return (
              <button key={d.id} className="cf-doc" onClick={() => open(d)}>
                <span className="cf-ic"><IconFile size={20} /></span>
                <div className="cf-body">
                  <b>{d.title}</b>
                  <small>{d.subtitle}</small>
                  <span className="cf-org">{d.org}</span>
                </div>
                <span className="cf-go"><IconChevronRight size={18} /></span>
              </button>
            )
          })}
        </div>

        <p className="cf-note">Documentos fictícios, para fins educativos.</p>
      </div>

      {modal && <PdfModal title={modal.title} url={modal.url} onClose={() => setModal(null)} />}
    </div>
  )
}
