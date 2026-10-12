// Fase 4 — "As câmeras que não gravaram". Puzzle de associação: para cada zona de
// vigilância, qual é a situação REAL registrada nos documentos preservados. A lição é
// que a falta de imagem não prova sabotagem nem entrada/saída com a criança.

export interface CameraZone {
  id: string
  label: string
  /** Posição no esquema SVG (0-100). */
  x: number
  y: number
  /** id do status correto. */
  correct: string
  note: string
}

export interface CameraStatus {
  id: string
  label: string
}

export const cameraStatuses: CameraStatus[] = [
  { id: 'manutencao', label: 'Indisponíveis — em manutenção' },
  { id: 'solicitadas', label: 'Gravações solicitadas — resultado não documentado' },
  { id: 'incompleta', label: 'Cobertura incompleta nos documentos preservados' },
]

export const cameraZones: CameraZone[] = [
  {
    id: 'patio', label: 'Pátio interno', x: 34, y: 58, correct: 'manutencao',
    note: 'O relatório técnico confirma a indisponibilidade das câmeras do pátio por manutenção.',
  },
  {
    id: 'portao', label: 'Portão leste', x: 76, y: 38, correct: 'solicitadas',
    note: 'As imagens do portão leste foram solicitadas, mas o material recuperado não diz se foram preservadas, analisadas ou perdidas.',
  },
  {
    id: 'servico', label: 'Acesso de serviço', x: 28, y: 82, correct: 'incompleta',
    note: 'Os documentos preservados têm cobertura incompleta do acesso de serviço.',
  },
]

export const cameraLesson =
  'A falta de imagens NÃO demonstra sabotagem, nem permite concluir que alguém entrou ou saiu ' +
  'com Marie. É uma limitação do registro de vigilância.'
