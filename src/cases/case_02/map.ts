// Localização atual do suspeito — pontos candidatos no mapa (região de Napoli, fictícia).
// O ponto correto é deduzido CRUZANDO dois sinais:
//   1) a rotina matinal de café (~07h45) relatada na denúncia; e
//   2) o lead "ao vivo" do app de Mensagens (SUV flagrado hoje na zona portuária /
//      bairro Artemiro Pascual).
// Há decoys que batem com apenas UM dos sinais — por isso é preciso cruzar os dois.

export interface MapSpot {
  id: string
  label: string
  sub: string
  x: number // 0-100 (% no mapa)
  y: number // 0-100
  correct: boolean
  feedback: string
}

/** Janela de captura após localizar o suspeito (≈ 3 min). */
export const CAPTURE_WINDOW_MS = 180_000
/** Penalidade de tempo por justificativa errada na ordem de captura. */
export const WRONG_JUSTIFICATION_PENALTY_MS = 30_000
/** Tentativas de despacho antes de o suspeito fugir. */
export const MAX_STRIKES = 2

export const spots: MapSpot[] = [
  {
    id: 'porto',
    label: 'Caffè del Porto',
    sub: 'Artemiro Pascual · zona portuária',
    x: 63, y: 57,
    correct: true,
    feedback: 'Café + zona portuária onde o SUV foi flagrado hoje às 08:12 + rotina matinal. Os dois sinais batem aqui.',
  },
  {
    id: 'pasticceria',
    label: 'Pasticceria Buona Luce',
    sub: 'Rua Leonardo DaVinci, 345 · avistamento antigo',
    x: 33, y: 40,
    correct: false,
    feedback: 'É o avistamento de 30/09–03/10 (já passou). O lead de hoje aponta outra região.',
  },
  {
    id: 'centrale',
    label: 'Caffè Centrale',
    sub: 'Piazza Garibaldi · centro',
    x: 50, y: 29,
    correct: false,
    feedback: 'Bate com "café da manhã", mas fica longe do flagra do SUV de hoje. Só um dos sinais confere.',
  },
  {
    id: 'molo',
    label: 'Molo Beverello',
    sub: 'Terminal de balsas · zona portuária',
    x: 71, y: 69,
    correct: false,
    feedback: 'Está na zona portuária, mas é terminal de balsas — não casa com a rotina de café. Só um sinal confere.',
  },
  {
    id: 'aeroporto',
    label: 'Aeroporto Capodichino',
    sub: 'Capodichino',
    x: 82, y: 20,
    correct: false,
    feedback: 'Nenhum lead o coloca no aeroporto. Despachar aqui queima uma tentativa à toa.',
  },
]
