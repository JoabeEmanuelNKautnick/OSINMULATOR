// Fachada: tipos estáveis + dados do CASO ATIVO (ver src/cases).
export type { RevealKind, AttackMission } from './types'
import { activeCase } from '../cases/active'

export const attackMissions = activeCase.attackMissions
