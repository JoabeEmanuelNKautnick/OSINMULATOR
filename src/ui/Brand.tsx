/* ============================================================
   Marca OSINMULATOR — emblema SVG + letreiro (wordmark).
   Emblema: lupa + globo + anel de HUD (azul/ciano, como a logo).
   Letreiro: imagem do wordmark em fundo transparente (imgs/).
   ============================================================ */
import letreiroUrl from '../../imgs/osinmulator_letreiro_trim.png'

export function BrandEmblem({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* anel de HUD externo (segmentado) */}
      <circle cx="20" cy="20" r="17.5" stroke="var(--cyan)" strokeWidth="1.3"
        strokeLinecap="round" strokeDasharray="10 7" opacity="0.6" />
      {/* lente da lupa */}
      <circle cx="20" cy="20" r="13" stroke="var(--cyan)" strokeWidth="2.6" />
      {/* cabo */}
      <path d="M29.5 29.5L40 40" stroke="var(--cyan)" strokeWidth="3.2" strokeLinecap="round" />
      {/* globo */}
      <circle cx="20" cy="20" r="9" stroke="var(--blue)" strokeWidth="1.6" />
      <ellipse cx="20" cy="20" rx="4" ry="9" stroke="var(--blue)" strokeWidth="1.3" />
      <path d="M11 20h18M12.2 15h15.6M12.2 25h15.6" stroke="var(--blue)" strokeWidth="1.1" strokeLinecap="round" />
      {/* fragmentos de pixel (motivo da logo) */}
      <rect x="34" y="7" width="3.2" height="3.2" rx="0.6" fill="var(--cyan)" opacity="0.9" />
      <rect x="39" y="10" width="2.2" height="2.2" rx="0.5" fill="var(--cyan)" opacity="0.6" />
    </svg>
  )
}

export function BrandMark({
  size = 'md', showSub = false, mode, emblem = true,
}: {
  size?: 'sm' | 'md' | 'lg'
  showSub?: boolean
  mode?: string
  emblem?: boolean
}) {
  return (
    <span className={'brand brand-' + size}>
      {emblem && <BrandEmblem size={size === 'lg' ? 40 : size === 'sm' ? 22 : 28} />}
      <span className="brand-text">
        <span className="brand-word">
          <img className="brand-letreiro" src={letreiroUrl} alt="OSINMULATOR" />
          {mode && <span className="brand-mode">· {mode}</span>}
        </span>
        {showSub && <span className="brand-sub">Simulador de OSINT</span>}
      </span>
    </span>
  )
}
