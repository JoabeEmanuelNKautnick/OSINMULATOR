import type { Case } from './types'
import { case01 } from './case_01'

export const defaultCaseId = 'case_01'

export const cases: Record<string, Case> = {
  case_01: case01,
}

/** Casos em ordem de exibição (para o seletor da tela inicial). */
export const caseList: Case[] = [case01]

export type { Case } from './types'
