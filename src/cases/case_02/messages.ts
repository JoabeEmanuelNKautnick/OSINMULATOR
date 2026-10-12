// App de Mensagens (AICOI Chat) do CASE_02. Contatos fictícios que dão contexto,
// alertas e os leads "ao vivo" que apontam para a localização ATUAL do suspeito.
// As mensagens reforçam cautela — não entregam a conclusão de bandeja.

export interface AicoiMessage {
  from: 'contato' | 'voce'
  text: string
  time?: string
  /** Basename de uma imagem do caso (ex.: 'cctv' → imgs/case_02/cctv.gif) anexada à mensagem. */
  image?: string
  imageCaption?: string
  /** Se definido, só aparece depois de a fase indicada acontecer. */
  unlockAfter?: 'analise' | 'local'
}

export interface AicoiContact {
  id: string
  name: string
  role: string
  messages: AicoiMessage[]
}

export const contacts: AicoiContact[] = [
  {
    id: 'coord',
    name: 'Coordenação AICOI',
    role: 'Supervisão do caso',
    messages: [
      { from: 'contato', time: '07:52', text: 'Bom dia, investigador-455. Caso Baravsholov com você. Chegou uma denúncia anônima (DEN-2026-111026), registrada em 03/10 às 16h40, relatando um homem na Pasticceria Buona Luce por volta das 14h20.' },
      { from: 'contato', time: '07:52', text: 'Regra de ouro: denúncia anônima é PISTA, não prova. Não trate semelhança como identidade confirmada.' },
      { from: 'voce', time: '07:53', text: 'Entendido. Vou cruzar com o Red Wanted e o mandado.' },
      { from: 'contato', time: '07:54', text: 'Isso. E cuidado com o trecho da criança: o relato descreve um gesto, não um crime. Não conclua além do que há.' },
      { from: 'contato', time: '08:15', unlockAfter: 'local', text: 'Localização confirmada do seu lado? Se for agir, a janela é curta. Emita a ordem com justificativa correta.' },
    ],
  },
  {
    id: 'cftv',
    name: 'Monitoramento / CFTV',
    role: 'Vigilância urbana',
    messages: [
      { from: 'contato', time: '08:03', text: 'Puxando o arquivo da denúncia: o fato foi relatado por volta das 14h20 de 03/10, e a denúncia entrou às 16h40. Vou confrontar com a CAM 04 da Via Leonardo DaVinci.' },
      {
        from: 'contato', time: '08:06',
        text: '📹 Recon concluído. A CAM 04 marca 14:27 (03/10) — bate com o ocorrido relatado (~14h20). PRESENÇA DE MIROSVALIKOV CONFIRMADA — match facial com o procurado. É ele mesmo:',
        image: 'Napoli CCTV_ Recon Mirosvalikov',
        imageCaption: 'CAM 04 · Via Leonardo DaVinci · 03/10/2026 14:27 — LOCALIZADO: Mirosvalikov (Baravsholov) entrando no G63.',
      },
      {
        from: 'contato', time: '08:06',
        text: 'E o veículo no mesmo frame: Mercedes-AMG G63 preto (placa parcial "GHS") em frente à Pasticceria Buona Luce.',
        image: 'Napoli CCTV_ G-Class Outside Pasticceria',
        imageCaption: 'CAM 04 · Pasticceria Buona Luce (Via Leonardo DaVinci) · 03/10/2026 14:27 — Mercedes-AMG G63.',
      },
      { from: 'contato', time: '08:07', text: '⚠ Mas isso é o registro de 03/10, da própria denúncia. Identidade confirmada — porém NÃO é a posição atual. Rastreando onde ele está agora…' },
      { from: 'contato', time: '08:14', text: '⚑ LEAD DE HOJE: G63 compatível (placa "GHS") flagrado às 08:12 entrando na zona portuária — bairro Artemiro Pascual.' },
      { from: 'contato', time: '08:15', text: 'A denúncia cita café matinal recorrente ~07h45. Procure um ponto de café nessa região.' },
      { from: 'contato', time: '08:16', unlockAfter: 'analise', text: 'Confere no mapa os pontos da zona portuária. A Pasticceria é o registro de 03/10 — ele mudou de área.' },
    ],
  },
  {
    id: 'enlace',
    name: 'Enlace Internacional',
    role: 'Cooperação / difusão vermelha',
    messages: [
      { from: 'contato', time: '07:58', text: 'Confirmo a difusão: Red Wanted A-4251/2001-FICT, pseudônimo Baravsholov, nacionalidade russa.' },
      { from: 'contato', time: '07:59', text: 'Sete países solicitantes. Sinais particulares no documento: cicatriz facial e tatuagens.' },
      { from: 'contato', time: '08:00', text: 'Para capturar, precisamos de causa plausível + coordenação local. Não basta a semelhança do relato.' },
    ],
  },
]
