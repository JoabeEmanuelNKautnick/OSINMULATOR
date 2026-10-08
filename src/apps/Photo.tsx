import type { PhotoKind } from '../data/persona'

// Fotos da persona (pasta /imgs na raiz), empacotadas pelo Vite.
// Só .jpg/.jpeg — as artes de marca (.png) são importadas direto onde são usadas.
const files = import.meta.glob('../../imgs/case_01/*.{jpg,jpeg}', { eager: true, import: 'default' }) as Record<string, string>

const byName: Record<string, string> = {}
for (const path in files) {
  const name = path.split('/').pop()!.replace(/\.(jpg|jpeg)$/i, '')
  byName[name] = files[path]
}

// Cada "tipo de foto" aponta para um arquivo em /imgs.
const kindToFile: Record<PhotoKind, string> = {
  dog: 'thor',
  cake: 'bolo',
  badge: 'cracha',
  house: 'casa',
  beach: 'praia',
  coffee: 'cafe',
  sunset: 'pordosol',
  gym: 'academia',
}

export const avatarSrc = byName['perfil-lia'] ?? byName['lia']

export function Photo({ kind }: { kind: PhotoKind; zoom?: boolean }) {
  const src = byName[kindToFile[kind]]
  return (
    <div className="photo" data-kind={kind}>
      {src ? <img src={src} alt="" loading="lazy" /> : null}
    </div>
  )
}
