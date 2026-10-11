// Fachada: tipos estáveis + dados do CASO ATIVO (ver src/cases).
export type { GraphNode, GraphEdge } from './types'
import { activeCase } from '../cases/active'

export const graphNodes = activeCase.graphNodes
export const graphEdges = activeCase.graphEdges
