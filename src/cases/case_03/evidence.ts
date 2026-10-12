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

// ---- Fase 6 · Montbleu (leitura) --------------------------------------------
export const montbleuFacts: string[] = [
  'Registro civil confirma: Marie nasceu em 12/10/1994, em Montbleu; filiação Paul e Amélie.',
  'A ficha familiar registra o falecimento de Amélie em 1997 (coerente com a certidão de óbito).',
  'Nota familiar anterior a 2000 descreve o coelho de pelúcia branco com manchas castanhas.',
  'As características físicas e o objeto descritos no relato são compatíveis com os registros familiares — porém compatibilidade não é prova de que o coelho visto no portão era o mesmo.',
]

// ---- Fase 7 · Ficha de acolhimento (tabela comparativa, §11) -----------------
export type RowVerdict = 'compativel' | 'divergente' | 'sem-dados'

export interface MatchRow {
  id: string
  label: string
  marie: string
  encontrado: string
  verdict: RowVerdict
}

export const acolhimentoRows: MatchRow[] = [
  { id: 'ac-idade', label: 'Idade aproximada', marie: '5 anos', encontrado: 'Compatível', verdict: 'compativel' },
  { id: 'ac-cabelo', label: 'Cabelos', marie: 'Cor de mel', encontrado: 'Descrição genérica de cabelos claros', verdict: 'sem-dados' },
  { id: 'ac-olhos', label: 'Olhos', marie: 'Azuis acinzentados', encontrado: 'Não registrados', verdict: 'sem-dados' },
  { id: 'ac-origem', label: 'Origem', marie: 'Montbleu, França', encontrado: 'Desconhecida', verdict: 'sem-dados' },
  { id: 'ac-identidade', label: 'Identidade', marie: 'Marie J. E. Salles', encontrado: 'Outro nome', verdict: 'divergente' },
  { id: 'ac-londres', label: 'Ligação com Londres', marie: 'Desaparecimento em 2000', encontrado: 'Não documentada', verdict: 'sem-dados' },
]

// ---- Fase 8 · Projeção 2026 × descrição (sem 2ª foto) ------------------------
export const projecaoRows: MatchRow[] = [
  { id: 'pj-idade', label: 'Idade', marie: '~31 anos (projetada)', encontrado: 'Adulta, faixa compatível', verdict: 'compativel' },
  { id: 'pj-olhos', label: 'Olhos', marie: 'Azuis acinzentados', encontrado: 'Cor costuma persistir', verdict: 'compativel' },
  { id: 'pj-cabelo', label: 'Cabelos', marie: 'Cor de mel (infância)', encontrado: 'Desconhecido (possível tingimento)', verdict: 'sem-dados' },
  { id: 'pj-rosto', label: 'Traços do rosto', marie: 'Projeção digital estimada', encontrado: 'Semelhança geral', verdict: 'sem-dados' },
  { id: 'pj-doc', label: 'Documentação independente', marie: '—', encontrado: 'Nenhuma conecta a mulher ao caso', verdict: 'divergente' },
]

// Decisão exigida ao avaliar uma possível correspondência (acolhimento / mulher 2026).
export interface MatchDecision {
  id: string
  label: string
  correct: boolean
  feedback: string
}

export const matchDecisions: MatchDecision[] = [
  {
    id: 'manter',
    label: 'Manter como possível correspondência NÃO confirmada, documentando as limitações.',
    correct: true,
    feedback: 'Correto: proximidade e semelhança não bastam para estabelecer identidade; manter como linha aberta é o rigor esperado.',
  },
  {
    id: 'confirmar',
    label: 'Confirmar que é Marie — a semelhança e a idade são suficientes.',
    correct: false,
    feedback: 'Exagero (conclusão precipitada): semelhança não é identificação. Isso rejeita o relatório (Final C).',
  },
  {
    id: 'descartar',
    label: 'Descartar a pista — não há conexão comprovada.',
    correct: false,
    feedback: 'Cauteloso demais: sem prova não se confirma, mas descartar perde uma linha legítima. O certo é manter como não confirmada.',
  },
]

// ---- §13 · Índice de anexos do registro consular (D31) ----------------------
export interface AnnexItem { id: string; label: string; present: boolean }

export const annexItems: AnnexItem[] = [
  { id: 'A-01', label: 'Cópia do documento de identidade de Marie (RG 12479565)', present: true },
  { id: 'A-02', label: 'Última fotografia de Marie (dez/1999)', present: true },
  { id: 'A-03', label: 'Ficha de descrição física e vestes', present: true },
  { id: 'A-04', label: 'Relatório das providências adotadas após o desaparecimento (23–24/04/2000)', present: false },
  { id: 'A-05', label: 'Carta de testemunho (M. E. Whitmore, 25/04/2000)', present: true },
]

export const annexNote =
  'O anexo A-04 consta listado no conjunto documental original, mas não integra a cópia digital ' +
  'consultada. Não há informação sobre extravio, arquivamento em separado ou não incorporação. ' +
  'A ausência é uma limitação documental e NÃO representa, por si, evidência de omissão ou encobrimento.'

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
