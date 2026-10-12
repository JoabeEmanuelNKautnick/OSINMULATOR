import type { CaseDoc } from '../types'

// Documentos do caso (empacotados pelo Vite). Casados por trecho do nome do arquivo.
const pdfs = import.meta.glob('./pdf/*.pdf', { eager: true, import: 'default' }) as Record<string, string>

function find(part: string): string {
  for (const path in pdfs) {
    if (path.toUpperCase().includes(part)) return pdfs[path]
  }
  return ''
}

export const docs: CaseDoc[] = [
  {
    id: 'denuncia',
    title: 'Registro de Denúncia Anônima',
    subtitle: 'Protocolo nº DEN-2026-111026 · relato não verificado',
    org: 'AICOI — Central de Denúncias',
    url: find('REGISTRO'),
  },
  {
    id: 'red-wanted',
    title: 'Red Wanted — Alerta Vermelho',
    subtitle: 'Difusão nº A-4251/2001-FICT · procurado internacional',
    org: 'AICOI — Cooperação Internacional',
    url: find('PROCURADO'),
  },
  {
    id: 'mandado',
    title: 'Mandado de Prisão Internacional',
    subtitle: 'Mandado nº 4501/2001 · captura e extradição',
    org: 'AICOI — Assessoria Jurídica',
    url: find('MANDADO'),
  },
]
