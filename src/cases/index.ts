import type { Case } from './types'
import { case01 } from './case_01'
import { case02 } from './case_02'
import { case03 } from './case_03'

export const defaultCaseId = 'case_01'

export const cases: Record<string, Case> = {
  case_01: case01,
  case_02: case02,
  case_03: case03,
}

/** Casos em ordem de exibição (para o seletor da tela inicial). */
export const caseList: Case[] = [case01, case02, case03]

export type { Case } from './types'
