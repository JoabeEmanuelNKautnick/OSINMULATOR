import { cases, defaultCaseId } from './index'

/** Caso ativo, resolvido uma vez a partir da URL (?case=<id>, default case_01).
 *  Trocar de caso é uma navegação (recarrega), então isto não muda em runtime. */
function resolve() {
  const id = new URLSearchParams(window.location.search).get('case') || defaultCaseId
  return cases[id] ?? cases[defaultCaseId]
}

export const activeCase = resolve()
