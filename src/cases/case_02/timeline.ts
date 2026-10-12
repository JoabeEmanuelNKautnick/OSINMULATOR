import type { CategoryKey } from '../../ui/categories'

export interface TimelineEvent {
  time: string
  label: string
  detail: string
  kind: CategoryKey
}

/** Cronologia do caso (para o painel do Analista e a Palestra). */
export const timeline: TimelineEvent[] = [
  {
    time: '03/10 · ~14h20',
    label: 'Ocorrido relatado',
    detail: 'Homem na Pasticceria Buona Luce (Via Leonardo DaVinci); faz um carinho na cabeça de uma criança e entra no banco de trás de um G63 preto.',
    kind: 'evento',
  },
  {
    time: '03/10 · 14:27',
    label: 'CCTV — CAM 04',
    detail: 'A câmera registra o G63 e o suspeito no mesmo frame. Match facial 97% com o procurado — identidade confirmada.',
    kind: 'foto',
  },
  {
    time: '03/10 · 16h40',
    label: 'Denúncia anônima',
    detail: 'Protocolo DEN-2026-111026. Relato não verificado; a testemunha não soube o nome e reconheceu por caixa de leite / retrato falado.',
    kind: 'documento',
  },
  {
    time: 'hoje · 08:12',
    label: 'Lead de hoje',
    detail: 'G63 (placa parcial "GHS") flagrado entrando na zona portuária — bairro Artemiro Pascual.',
    kind: 'evento',
  },
  {
    time: 'hoje',
    label: 'Localização deduzida',
    detail: 'Rotina de café da manhã (~07h45) + zona portuária do lead → Caffè del Porto. A Pasticceria é o registro antigo de 03/10.',
    kind: 'local',
  },
  {
    time: 'janela ~3 min',
    label: 'Ordem de captura',
    detail: 'Correspondência plausível + localização corroborada → captura para fins de verificação e extradição.',
    kind: 'pessoa',
  },
]
