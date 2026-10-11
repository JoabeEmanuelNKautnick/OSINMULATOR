import { useEffect } from 'react'
import { IconX } from './icons'

/** Pop-up com o PDF embutido (usado no desktop). */
export function PdfModal({ title, url, onClose }: { title: string; url: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="pdfm-backdrop" onClick={onClose}>
      <div className="pdfm" onClick={(e) => e.stopPropagation()}>
        <div className="pdfm-bar">
          <span className="pdfm-title">{title}</span>
          <a className="pdfm-ext" href={url} target="_blank" rel="noopener noreferrer">abrir em nova aba ↗</a>
          <button className="pdfm-close" onClick={onClose} aria-label="Fechar"><IconX size={18} /></button>
        </div>
        <iframe className="pdfm-frame" src={url} title={title} />
      </div>
    </div>
  )
}
