import { useEffect } from 'react'
import { IconX } from './icons'

/** Pop-up com uma imagem em tamanho grande (foto do rosto, retrato falado, etc.). */
export function ImageLightbox({
  title, src, caption, onClose,
}: {
  title: string
  src: string
  caption?: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="imgbx-backdrop" onClick={onClose}>
      <div className="imgbx" onClick={(e) => e.stopPropagation()}>
        <div className="imgbx-bar">
          <span className="imgbx-title">{title}</span>
          <button className="imgbx-close" onClick={onClose} aria-label="Fechar"><IconX size={18} /></button>
        </div>
        <div className="imgbx-body">
          <img src={src} alt={title} />
          {caption && <p className="imgbx-cap">{caption}</p>}
        </div>
      </div>
    </div>
  )
}
