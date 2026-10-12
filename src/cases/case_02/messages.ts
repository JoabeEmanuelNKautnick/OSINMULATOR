// App de Mensagens (AICOI Chat) do CASE_02. Contatos fictícios que dão contexto,
// alertas e os leads "ao vivo" que apontam para a localização ATUAL do suspeito.
// As mensagens reforçam cautela — não entregam a conclusão de bandeja.

export interface AicoiMessage {
  from: 'contato' | 'voce'
  text: string
  time?: string
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
      { from: 'contato', time: '07:52', text: 'Bom dia, investigador-455. Caso Baravsholov com você. Chegou uma denúncia anônima de Napoli.' },
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
      { from: 'contato', time: '08:03', text: 'Rodando as câmeras com a descrição do SUV preto Mercedes-AMG G63.' },
      { from: 'contato', time: '08:14', text: '⚑ LEAD: SUV compatível flagrado HOJE 08:12 entrando na zona portuária — bairro Artemiro Pascual.' },
      { from: 'contato', time: '08:14', text: 'A denúncia cita rotina de café da manhã ~07h45. Procure um ponto de café recorrente nessa região.' },
      { from: 'contato', time: '08:16', unlockAfter: 'analise', text: 'Confere no mapa os pontos da zona portuária. O avistamento da Pasticceria é antigo — ele mudou de área.' },
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
