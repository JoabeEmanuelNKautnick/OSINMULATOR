// Fachada: tipos estáveis + dados do CASO ATIVO (ver src/cases).
export type { AppId, Mission } from './types'
import { activeCase } from '../cases/active'

export const missions = activeCase.missions
