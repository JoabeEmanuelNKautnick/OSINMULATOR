import type { CaseDoc } from '../types'

// Autos do CASE_03 — os 4 documentos formais que já existem em ./pdf (nenhum outro
// será criado; todo o resto da investigação é conteúdo in-app). Casados por um trecho
// ÚNICO do nome do arquivo (find() compara em MAIÚSCULAS).
const pdfs = import.meta.glob('./pdf/*.pdf', { eager: true, import: 'default' }) as Record<string, string>

function find(part: string): string {
  for (const path in pdfs) {
    if (path.toUpperCase().includes(part)) return pdfs[path]
  }
  return ''
}

export const docs: CaseDoc[] = [
  {
    id: 'registro',
    title: 'Registro de Desaparecimento de Pessoa',
    subtitle: 'Registro nº 0078/2000 · B.O. nº 00879/2000 · comunicante: Paul H. Salles',
    org: 'Consulado Francês em Londres — Dep. de Pessoas Desaparecidas',
    // 'DESAPARECIMENTO' é único — não colide com o registro consular (MC-2000-00078).
    url: find('DESAPARECIMENTO'),
  },
  {
    id: 'testemunho',
    title: 'Carta de Testemunho',
    subtitle: 'Declaração de Margaret E. Whitmore · 25/04/2000 · relato não verificado',
    org: 'Testemunha voluntária',
    url: find('TESTEMUNHO'),
  },
  {
    id: 'yellow',
    title: 'Alerta Amarelo — Yellow Alert (reemitido)',
    subtitle: 'Alerta nº Y-9862/2000-FICT-R1 · original 2000 · reemitido em 2026',
    org: 'AICOI — Dep. de Identificação e Desaparecimento',
    url: find('AMARELO'),
  },
  {
    id: 'obito',
    title: 'Certidão de Óbito',
    subtitle: 'Amélie Salles (mãe) · †1997 · ATENÇÃO: não é certidão de Marie',
    org: 'Registro Civil das Pessoas Naturais — Montbleu/FRA',
    url: find('CERTID'),
  },
  {
    id: 'consular',
    title: 'Registro Consular — Índice de Anexos',
    subtitle: 'Matrícula MC-2000-00078 · titular Paul H. Salles · anexo A-04 ausente',
    org: 'Consulado Francês em Londres',
    url: find('CONSULAR'),
  },
]
