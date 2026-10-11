import type { PhotoKind } from '../data/types'
import { activeCase } from '../cases/active'
import { caseImage } from '../cases/images'

export const avatarSrc = caseImage(activeCase.imagesFolder, activeCase.avatar)

export function Photo({ kind }: { kind: PhotoKind; zoom?: boolean }) {
  const src = caseImage(activeCase.imagesFolder, activeCase.photos[kind])
  return (
    <div className="photo" data-kind={kind}>
      {src ? <img src={src} alt="" loading="lazy" /> : null}
    </div>
  )
}
