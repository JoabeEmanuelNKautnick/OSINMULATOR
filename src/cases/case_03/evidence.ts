// Núcleo didático do CASE_03 (caso frio, inconclusivo). O jogador NÃO "resolve" o caso:
// ele separa o que é fato documentado, relato testemunhal, hipótese e o que permanece
// desconhecido — sem transformar suspeita em certeza. Tudo fictício.

/** Fase a partir da qual o item fica disponível. <=4 = jogável agora; 5–8 = scaffolded. */
export type Phase = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export const ACTIVE_PHASE_MAX: Phase = 4

// ---- Quadro de evidências (§14): classificação em 4 valores -----------------
export type EvTruth = 'confirmado' | 'relato' | 'hipotese' | 'desconhecido'

export type EvSource = 'registro' | 'testemunho' | 'yellow' | 'obito' | 'jornal' | 'in-app'

export interface EvidenceItem {
  id: string
  text: string
  source: EvSource
  truth: EvTruth
  note: string
  phase: Phase
}

export const intro =
  'Marie Joan Elise Salles desapareceu aos 5 anos no Castelo Real, em Londres, em 23/04/2000. ' +
  '26 anos depois, o AICOI reabre o caso. Sua missão não é encontrar Marie — é reconstruir os ' +
  'fatos, verificar as fontes e dizer com honestidade até onde as evidências permitem chegar. ' +
  'Separe fato, relato e hipótese; não transforme semelhança em identidade.'

export const evidences: EvidenceItem[] = [
  {
    id: 'ev-desap',
    text: 'Marie desapareceu em Londres em 23/04/2000.',
    source: 'registro',
    truth: 'confirmado',
    note: 'Sustentado pelos documentos do caso (registro consular 0078/2000 e alerta amarelo).',
    phase: 1,
  },
  {
    id: 'ev-1145',
    text: 'Paul percebeu a ausência de Marie às 11h45.',
    source: 'registro',
    truth: 'relato',
    note: 'É o conteúdo da declaração de Paul — confirma o que ele disse, não o instante exato do desaparecimento.',
    phase: 1,
  },
  {
    id: 'ev-obito-marie',
    text: 'Existe uma certidão de óbito de Marie.',
    source: 'obito',
    truth: 'desconhecido',
    note: 'ARMADILHA: a certidão de óbito dos autos é da MÃE, Amélie Salles (†1997). Não há certidão de óbito de Marie. Ler o documento evita o erro.',
    phase: 1,
  },
  {
    id: 'ev-portao',
    text: 'A testemunha viu Marie no portão leste por volta das 11h50.',
    source: 'testemunho',
    truth: 'relato',
    note: 'Relato de Margaret Whitmore, sem confirmação independente. Ela viu uma menina — não confirmou o rosto nem o nome.',
    phase: 3,
  },
  {
    id: 'ev-adulto',
    text: 'Um adulto levou Marie para fora do castelo.',
    source: 'testemunho',
    truth: 'desconhecido',
    note: 'A testemunha relata um casal idoso por perto, mas afirma que NÃO viu com quem a menina foi. Não há abordagem, contato ou sequestro comprovado.',
    phase: 3,
  },
  {
    id: 'ev-cameras',
    text: 'As câmeras do pátio estavam indisponíveis para manutenção.',
    source: 'in-app',
    truth: 'confirmado',
    note: 'Documentado na ordem de manutenção. A falta de imagens não prova sabotagem nem que alguém saiu com Marie.',
    phase: 4,
  },
  // ---- fases 5–8 (scaffolded, exibidas bloqueadas) --------------------------
  {
    id: 'ev-coelho',
    text: 'O coelho visto no portão era o mesmo coelho de pelúcia de Marie.',
    source: 'testemunho',
    truth: 'hipotese',
    note: 'O coelho é um identificador narrativo forte, mas não prova de identidade — o relato não permite confirmar que era o mesmo objeto.',
    phase: 6,
  },
  {
    id: 'ev-acolhimento',
    text: 'O registro de acolhimento de menor pertence a Marie.',
    source: 'in-app',
    truth: 'hipotese',
    note: 'Possível, sem comprovação suficiente. Proximidade temporal e semelhança de idade não estabelecem identidade.',
    phase: 7,
  },
  {
    id: 'ev-mulher2026',
    text: 'A mulher da fotografia de 2026 é Marie.',
    source: 'yellow',
    truth: 'hipotese',
    note: 'Possível, sem comprovação suficiente. Uma projeção de envelhecimento não é retrato exato — semelhança não é identificação.',
    phase: 8,
  },
  {
    id: 'ev-viva',
    text: 'Marie está viva em 2026.',
    source: 'in-app',
    truth: 'desconhecido',
    note: 'Não há confirmação de que Marie esteja viva ou morta. O caso permanece aberto.',
    phase: 8,
  },
]

// ---- Comparação depoimento × anotação complementar (Fases 2–3, §7) ----------
// O jogador diz, para cada informação, se a carta de testemunho a CONFIRMA, a
// ACRESCENTA (não estava no resumo distribuído) ou a deixa INCERTA.
export type CmpTruth = 'confirmada' | 'acrescentada' | 'incerta'

export interface ComparisonRow {
  id: string
  info: string
  detail: string
  truth: CmpTruth
  note: string
  phase: Phase
}

export const comparisons: ComparisonRow[] = [
  {
    id: 'cmp-avistamento',
    info: 'Avistamento de uma menina sozinha no portão leste (~11h50).',
    detail: 'Consta diretamente na declaração da testemunha.',
    truth: 'confirmada',
    note: 'A testemunha afirma ter visto a menina — é o núcleo do depoimento.',
    phase: 2,
  },
  {
    id: 'cmp-horario',
    info: 'Horário "pouco antes do meio-dia" repetido pelo jornal.',
    detail: 'O jornal não cita a testemunha nem a origem exata do horário.',
    truth: 'incerta',
    note: 'Fonte repetida não é fonte independente: o jornal parece mais preciso do que é.',
    phase: 2,
  },
  {
    id: 'cmp-rosto',
    info: 'Identificação de Marie pelo rosto.',
    detail: 'A testemunha viu a menina por poucos segundos e reconheceu coelho/roupa.',
    truth: 'incerta',
    note: 'Reconhecer um objeto e uma roupa não é reconhecer um rosto — identidade não confirmada.',
    phase: 3,
  },
  {
    id: 'cmp-adulto',
    info: 'Presença de um adulto próximo (casal idoso).',
    detail: 'Aparece na carta de testemunho, não no resumo distribuído à imprensa.',
    truth: 'acrescentada',
    note: 'É uma lembrança registrada — não uma identificação de suspeito.',
    phase: 3,
  },
  {
    id: 'cmp-levou',
    info: 'Alguém levou a menina embora.',
    detail: 'A testemunha afirma explicitamente que NÃO viu com quem a menina foi.',
    truth: 'incerta',
    note: 'A pista que parecia apontar um sequestro não comprova abordagem nem contato.',
    phase: 3,
  },
  {
    id: 'cmp-fotos',
    info: 'Fotografias analógicas que poderiam conter a menina ao fundo.',
    detail: 'A testemunha cita um filme ainda não revelado em 2000.',
    truth: 'acrescentada',
    note: 'Detalhe novo da carta — uma linha de investigação, não uma prova existente.',
    phase: 3,
  },
]

// ---- Critérios de avaliação (recap) -----------------------------------------
export const criteria: string[] = [
  'Consultou os autos essenciais (registro, testemunho, alerta, certidão).',
  'Reconstruiu a cronologia e registrou a janela 11h45–11h50 com ressalva.',
  'Não confundiu a certidão de óbito da mãe com o destino de Marie.',
  'Tratou o avistamento do portão como relato, sem confirmação independente.',
  'Não afirmou que um adulto levou Marie sem evidência.',
  'Separou fato documentado, relato testemunhal e hipótese.',
  'Entregou um relatório honesto sobre o que permanece desconhecido.',
]
