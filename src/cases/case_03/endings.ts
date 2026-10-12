// Desfecho do CASE_03: NÃO há "vitória". Há um relatório graduado em 4 finais (§15).
// Todos preservam a mesma verdade central: o destino de Marie não foi confirmado.
// O que muda é a qualidade da investigação e o que o jogador consegue estabelecer.

import { evidences, type EvTruth, type CmpTruth, type Phase, ACTIVE_PHASE_MAX } from './evidence'

export type EndingId = 'A' | 'B' | 'C' | 'D'

export interface Ending {
  id: EndingId
  title: string
  rejected: boolean
  summary: string
}

export const endings: Record<EndingId, Ending> = {
  A: {
    id: 'A',
    title: 'Relatório consistente',
    rejected: false,
    summary:
      'Você separou corretamente fatos, relatos e hipóteses, não declarou nenhuma identidade ' +
      'adulta e apontou linhas de investigação futuras. O caso continua aberto — com um relatório de alta qualidade.',
  },
  B: {
    id: 'B',
    title: 'A pista inconclusiva',
    rejected: false,
    summary:
      'Você perseguiu as pistas de identidade (acolhimento / mulher adulta) e reconheceu que não há ' +
      'comprovação suficiente. Encontrou uma linha plausível, mas deixou parte da cronologia de Londres incompleta.',
  },
  C: {
    id: 'C',
    title: 'Conclusão precipitada',
    rejected: true,
    summary:
      'Você elevou uma suspeita a certeza — afirmou uma identidade ou um responsável sem evidência suficiente. ' +
      'O sistema rejeita a conclusão. Corrija o relatório antes do encerramento.',
  },
  D: {
    id: 'D',
    title: 'O silêncio do arquivo',
    rejected: false,
    summary:
      'Você reconstruiu a cronologia com cuidado, mas não encontrou uma pista que permita avançar na identificação. ' +
      'O caso é arquivado como investigação inconclusiva, com os documentos ausentes e as perguntas ainda abertas.',
  },
}

export interface ReportInput {
  ev: Record<string, EvTruth>
  cmp: Record<string, CmpTruth>
  /** Decisão da Fase 7 (acolhimento): 'manter' | 'confirmar' | 'descartar'. */
  acolhimentoDecision?: string
  /** Decisão da Fase 8 (mulher de 2026): mesmas opções. */
  projecaoDecision?: string
}

export interface ReportResult {
  ending: Ending
  /** Rótulos dos pontos em que o jogador transformou suspeita/relato em "confirmado". */
  overclaims: string[]
  correct: number
  answered: number
  totalActive: number
}

/** Itens cujo exagero para "confirmado" caracteriza conclusão precipitada (Final C). */
const OVERCLAIM_IDS = ['ev-adulto', 'ev-portao', 'ev-obito-marie', 'ev-acolhimento', 'ev-mulher2026', 'ev-viva']

/** Gradua o relatório do jogador. `maxPhase` reflete até onde a investigação avançou. */
export function computeEnding(input: ReportInput, maxPhase: Phase = ACTIVE_PHASE_MAX): ReportResult {
  const active = evidences.filter((e) => e.phase <= maxPhase)
  const totalActive = active.length

  const overclaims: string[] = []
  for (const id of OVERCLAIM_IDS) {
    const item = evidences.find((e) => e.id === id)
    if (item && item.phase <= maxPhase && input.ev[id] === 'confirmado' && item.truth !== 'confirmado') {
      overclaims.push(item.text)
    }
  }
  if (input.acolhimentoDecision === 'confirmar') overclaims.push('Acolhimento declarado como identidade confirmada.')
  if (input.projecaoDecision === 'confirmar') overclaims.push('Mulher de 2026 declarada como Marie.')

  const answered = active.filter((e) => input.ev[e.id]).length
  const correct = active.filter((e) => input.ev[e.id] === e.truth).length

  // Final C — qualquer exagero de suspeita para certeza rejeita o relatório.
  if (overclaims.length > 0) {
    return { ending: endings.C, overclaims, correct, answered, totalActive }
  }

  const rigorous = answered === totalActive && correct >= totalActive - 1
  const reachedLeads = maxPhase >= 7
  const decisionsCorrect =
    input.acolhimentoDecision === 'manter' && input.projecaoDecision === 'manter'
  const pursued =
    reachedLeads && (input.acolhimentoDecision === 'manter' || input.projecaoDecision === 'manter')

  let ending: Ending
  if (!reachedLeads) {
    // Encerrou nos Atos I–II: só é possível A (rigoroso) ou D.
    ending = rigorous ? endings.A : endings.D
  } else if (rigorous && decisionsCorrect) {
    ending = endings.A
  } else if (pursued) {
    ending = endings.B
  } else {
    ending = endings.D
  }

  return { ending, overclaims, correct, answered, totalActive }
}

/** Relatório de encerramento (§16) — texto fixo exibido na tela final. */
export const closingReport = {
  heading: 'AICOI — RELATÓRIO DE ENCERRAMENTO DA ETAPA INVESTIGATIVA',
  caseName: 'Marie Joan Elise Salles',
  ref: 'Y-9862/2000-FICT-R1',
  date: '12 de outubro de 2026',
  body: [
    'A revisão documental permitiu reconstruir parte da cronologia do desaparecimento ocorrido em Londres, em 23 de abril de 2000.',
    'Foram identificadas limitações nos registros de vigilância, lacunas documentais e informações testemunhais que não puderam ser confirmadas de maneira independente.',
    'Uma possível correspondência encontrada em arquivos posteriores permanece sem comprovação. A projeção de envelhecimento digital não permite estabelecer a identidade de uma pessoa adulta.',
    'Não foi possível determinar o mecanismo do desaparecimento, identificar um responsável ou estabelecer o paradeiro atual de Marie Joan Elise Salles.',
  ],
  conclusion: 'O caso permanece aberto. O destino de Marie continua desconhecido.',
}

/** Cena final (§16). */
export const finalScene = {
  stamp: 'CASE 03 — INCONCLUSIVO',
  line: '26 anos depois, ainda existem perguntas sem resposta.',
  quote:
    '"Não encontrar uma resposta não significa que não exista uma verdade. Significa apenas que ' +
    'as evidências disponíveis ainda não permitem conhecê-la."',
}
