// Fase 5 (SCAFFOLDED) — reconstrução de percursos no Castelo Real.
// Diferente do case_02: NÃO há ponto "correto", NÃO há janela de captura nem strikes.
// O jogador marca cada percurso como compatível / incompatível / indeterminado com os
// documentos. O objetivo é verificar possibilidades, não simular uma localização exata
// que as evidências não fornecem.

export type RouteVerdict = 'compativel' | 'incompativel' | 'indeterminado'

export interface Route {
  id: string
  label: string
  sub: string
  /** Coordenadas (0-100) de origem e destino no SVG do mapa. */
  from: { x: number; y: number }
  to: { x: number; y: number }
  /** Classificação esperada dado o que os documentos sustentam. */
  expected: RouteVerdict
  note: string
}

/** Pontos de referência do mapa (desenhado em SVG inline no componente). */
export const landmarks = [
  { id: 'patio', label: 'Pátio interno', x: 46, y: 56 },
  { id: 'loja', label: 'Loja de souvenirs', x: 60, y: 62 },
  { id: 'portao', label: 'Portão leste', x: 80, y: 40 },
  { id: 'jardins', label: 'Jardins', x: 24, y: 30 },
  { id: 'servico', label: 'Acesso de serviço', x: 30, y: 78 },
]

export const routes: Route[] = [
  {
    id: 'patio-portao',
    label: 'Pátio → Portão leste',
    sub: 'rota do avistamento da testemunha',
    from: { x: 46, y: 56 }, to: { x: 80, y: 40 },
    expected: 'indeterminado',
    note: 'A testemunha viu uma menina no portão leste, mas o relato não confirma que era Marie nem que ela percorreu este caminho. Compatível como possibilidade, não como percurso provado.',
  },
  {
    id: 'patio-jardins',
    label: 'Pátio → Jardins',
    sub: 'área aberta a oeste',
    from: { x: 46, y: 56 }, to: { x: 24, y: 30 },
    expected: 'indeterminado',
    note: 'Nenhum documento situa Marie nos jardins, mas nada a exclui. Possibilidade aberta.',
  },
  {
    id: 'patio-loja',
    label: 'Pátio → Loja de souvenirs',
    sub: 'onde pai e filha pararam às 11h40',
    from: { x: 46, y: 56 }, to: { x: 60, y: 62 },
    expected: 'compativel',
    note: 'Documentado: pai e filha estavam perto da loja às 11h40. É o último ponto físico com respaldo documental — mas não o "último lugar onde Marie foi vista com certeza".',
  },
]
