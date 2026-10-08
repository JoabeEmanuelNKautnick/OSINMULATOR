/* ============================================================
   Ícones SVG inline — 24px, stroke, currentColor.
   Troque por assets depois, se quiser: a API (size/className) é estável.
   ============================================================ */
import type { SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number
}

export type Icon = (p: IconProps) => JSX.Element

function base({ size = 24, strokeWidth = 1.8, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...rest,
  }
}

/* ---- Modos ---- */
export const IconSearch: Icon = (p) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
)
export const IconTerminal: Icon = (p) => (
  <svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9l3 3-3 3" /><path d="M13 15h4" /></svg>
)
export const IconTarget: Icon = (p) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></svg>
)

/* ---- Apps ---- */
export const IconCamera: Icon = (p) => (
  <svg {...base(p)}><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><circle cx="12" cy="12.5" r="3.5" /></svg>
)
export const IconActivity: Icon = (p) => (
  <svg {...base(p)}><path d="M3 12h4l2.5-6 4 13 2.5-7H21" /></svg>
)
export const IconGamepad: Icon = (p) => (
  <svg {...base(p)}><path d="M7 10v4M5 12h4" /><circle cx="15.5" cy="11" r="1" fill="currentColor" stroke="none" /><circle cx="18" cy="13.5" r="1" fill="currentColor" stroke="none" /><rect x="2.5" y="6.5" width="19" height="11" rx="4.5" /></svg>
)

/* ---- Categorias de evidência ---- */
export const IconPerson: Icon = (p) => (
  <svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" /></svg>
)
export const IconAt: Icon = (p) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 5 2.2A9 9 0 1 0 12 21" /></svg>
)
export const IconMapPin: Icon = (p) => (
  <svg {...base(p)}><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
)
export const IconBuilding: Icon = (p) => (
  <svg {...base(p)}><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" /></svg>
)
export const IconCalendar: Icon = (p) => (
  <svg {...base(p)}><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></svg>
)
export const IconImage: Icon = (p) => (
  <svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.8" /><path d="M21 16l-5-5-8 8" /></svg>
)
export const IconFile: Icon = (p) => (
  <svg {...base(p)}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M8.5 13h7M8.5 16.5h7" /></svg>
)
export const IconAccount: Icon = (p) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="10" r="3" /><path d="M6.5 18.5c1-2.5 3-3.5 5.5-3.5s4.5 1 5.5 3.5" /></svg>
)
export const IconFlag: Icon = (p) => (
  <svg {...base(p)}><path d="M5 21V4" /><path d="M5 4h11l-1.5 3L16 10H5" /></svg>
)
export const IconServer: Icon = (p) => (
  <svg {...base(p)}><rect x="3.5" y="4" width="17" height="7" rx="2" /><rect x="3.5" y="13" width="17" height="7" rx="2" /><path d="M7 7.5h0M7 16.5h0" /></svg>
)

/* ---- UI ---- */
export const IconCheck: Icon = (p) => (
  <svg {...base(p)}><path d="M4 12.5l5 5L20 6.5" /></svg>
)
export const IconLock: Icon = (p) => (
  <svg {...base(p)}><rect x="4.5" y="10" width="15" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" /></svg>
)
export const IconPlay: Icon = (p) => (
  <svg {...base(p)}><path d="M7 5l12 7-12 7z" /></svg>
)
export const IconClock: Icon = (p) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
)
export const IconTrophy: Icon = (p) => (
  <svg {...base(p)}><path d="M7 4h10v4a5 5 0 0 1-10 0z" /><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 15h6M8 20h8M12 15v5" /></svg>
)
export const IconShield: Icon = (p) => (
  <svg {...base(p)}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
)
export const IconAlert: Icon = (p) => (
  <svg {...base(p)}><path d="M12 4l9 16H3z" /><path d="M12 10v4" /><circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" /></svg>
)
export const IconChevronLeft: Icon = (p) => (
  <svg {...base(p)}><path d="M15 6l-6 6 6 6" /></svg>
)
export const IconChevronRight: Icon = (p) => (
  <svg {...base(p)}><path d="M9 6l6 6-6 6" /></svg>
)
export const IconKey: Icon = (p) => (
  <svg {...base(p)}><circle cx="8" cy="15" r="4" /><path d="M11 12l8-8M17 6l2 2M14 9l2 2" /></svg>
)
export const IconUnlock: Icon = (p) => (
  <svg {...base(p)}><rect x="4.5" y="10" width="15" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 7.5-2" /><circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" /></svg>
)
export const IconMask: Icon = (p) => (
  <svg {...base(p)}><path d="M3 7c3-1 15-1 18 0 0 6-2 10-4 10-1.5 0-2.5-2-5-2s-3.5 2-5 2c-2 0-4-4-4-10z" /><path d="M8.5 11c.8-.6 2-.6 2.8 0M12.7 11c.8-.6 2-.6 2.8 0" /></svg>
)
export const IconMap: Icon = (p) => (
  <svg {...base(p)}><path d="M9 4L3.5 6.2v13.3L9 17l6 2.5 5.5-2.2V4L15 6.5z" /><path d="M9 4v13M15 6.5v13" /></svg>
)
export const IconWifi: Icon = (p) => (
  <svg {...base(p)}><path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8 15.5a5 5 0 0 1 8 0" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></svg>
)
export const IconBattery: Icon = (p) => (
  <svg {...base(p)}><rect x="2.5" y="8" width="16" height="8" rx="2" /><rect x="4.5" y="10" width="10" height="4" rx="1" fill="currentColor" stroke="none" /><path d="M21 11v2" /></svg>
)
export const IconFolder: Icon = (p) => (
  <svg {...base(p)}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
)
export const IconGithub: Icon = (p) => (
  <svg {...base(p)}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.5-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.9 1.5a13.4 13.4 0 0 0-7 0C6.1 1.1 4.9 1.5 4.9 1.5a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3.3 8.7c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.6V22" /></svg>
)
export const IconProjector: Icon = (p) => (
  <svg {...base(p)}><rect x="3" y="7" width="18" height="11" rx="2" /><circle cx="14" cy="12.5" r="3" /><path d="M7 11.5h0M7 14.5h0M18 20l-1-2M6 20l1-2" /></svg>
)
export const IconMaximize: Icon = (p) => (
  <svg {...base(p)}><path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" /></svg>
)
export const IconX: Icon = (p) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>
)
export const IconEye: Icon = (p) => (
  <svg {...base(p)}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
)
export const IconGraph: Icon = (p) => (
  <svg {...base(p)}><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="7" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M7.8 7.6l2.6 8M16.6 8.9l-3 7M8.3 6.4l7.3.4" /></svg>
)
export const IconPaw: Icon = (p) => (
  <svg {...base(p)}><ellipse cx="7" cy="8.5" rx="1.7" ry="2.3" /><ellipse cx="12" cy="6.5" rx="1.7" ry="2.3" /><ellipse cx="17" cy="8.5" rx="1.7" ry="2.3" /><path d="M12 12c-2.8 0-5 2-5 4.2 0 1.6 1.3 2.3 2.6 1.9 1.6-.5 3.2-.5 4.8 0 1.3.4 2.6-.3 2.6-1.9C17 14 14.8 12 12 12z" /></svg>
)
