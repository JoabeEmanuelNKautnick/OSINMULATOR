import type { CaseDoc } from '../types'

// PDFs dos autos (empacotados pelo Vite). Casados por trecho do nome do arquivo.
const pdfs = import.meta.glob('./pdf/*.pdf', { eager: true, import: 'default' }) as Record<string, string>

function find(part: string): string {
  for (const path in pdfs) {
    if (path.toUpperCase().includes(part)) return pdfs[path]
  }
  return ''
}

export const docs: CaseDoc[] = [
  {
    id: 'ipl',
    title: 'Inquérito Policial',
    subtitle: 'IPL nº 0001/2026 · Portaria de Instauração',
    org: 'Polícia Civil — DEICC',
    url: find('INQU'),
  },
  {
    id: 'iml',
    title: 'Laudo Cadavérico (Necropsia)',
    subtitle: 'Laudo nº 0001/2026 · Exame Médico-Legal',
    org: 'Instituto Médico-Legal',
    url: find('CADAV'),
  },
  {
    id: 'npd',
    title: 'Laudo Pericial',
    subtitle: 'Laudo nº 0001/2026 · Exame em Equipamento Computacional',
    org: 'Instituto de Criminalística — NPD',
    url: find('PERICIAL'),
    lockedUntilDone: true,
  },
]
