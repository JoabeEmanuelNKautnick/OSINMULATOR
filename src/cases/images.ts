// Fotos dos casos, empacotadas pelo Vite. Indexadas por pasta do caso.
// .jpg/.jpeg/.png — as artes de marca (pasta /imgs/logos) ficam de fora.
const files = import.meta.glob('../../imgs/*/*.{jpg,jpeg,png}', { eager: true, import: 'default' }) as Record<string, string>

// byFolder['case_01']['thor'] -> url
const byFolder: Record<string, Record<string, string>> = {}
for (const path in files) {
  const parts = path.split('/')
  const name = parts.pop()!.replace(/\.(jpg|jpeg|png)$/i, '')
  const folder = parts.pop()!
  if (folder === 'logos') continue // marca/brand, não é foto de caso
  ;(byFolder[folder] ??= {})[name] = files[path]
}

export function caseImage(folder: string, name: string): string | undefined {
  return byFolder[folder]?.[name]
}
