import type { PhotoKind } from '../data/persona'

// Imagens reais da Lia (pasta /imgs na raiz), empacotadas pelo Vite.
const files = import.meta.glob('../../imgs/*.{jpg,jpeg,png}', { eager: true, import: 'default' }) as Record<string, string>

const byName: Record<string, string> = {}
for (const path in files) {
  const name = path.split('/').pop()!.replace(/\.(jpg|jpeg|png)$/i, '')
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
