import type { CategoryKey } from '../ui/categories'
import type { Icon } from '../ui/icons'
import { IconPaw, IconKey, IconCamera, IconActivity, IconGamepad } from '../ui/icons'
import { persona, photoDetails } from './persona'

// Grafo de investigação do caso da Lia. Tudo fictício.
// x,y em % (0–100) para um layout autoral limpo.

export interface GraphNode {
  id: string
  type: CategoryKey        // reaproveita categoria p/ ícone+cor padrão
  label: string
  sub?: string
  x: number
  y: number
  icon?: Icon              // sobrescreve o ícone da categoria
  color?: string           // sobrescreve a cor da categoria
  center?: boolean         // nó-alvo
}

export interface GraphEdge {
  from: string
  to: string
  label?: string
}

export const graphNodes: GraphNode[] = [
  { id: 'lia', type: 'pessoa', label: persona.name, sub: `@${persona.fotogram.handle} · alvo`, x: 50, y: 50, center: true },

  { id: 'sandra', type: 'pessoa', label: photoDetails.mother, sub: 'mãe', x: 28, y: 20 },
  { id: 'rosa', type: 'pessoa', label: 'Rosa Andrade', sub: 'avó', x: 12, y: 33 },
  { id: 'thor', type: 'pessoa', label: photoDetails.pet, sub: 'cachorro, 3 anos', x: 17, y: 67, icon: IconPaw, color: 'var(--purple-2)' },

  { id: 'farmacia', type: 'empresa', label: photoDetails.employer, sub: 'atendente', x: 50, y: 13 },

  { id: 'fotogram', type: 'username', label: 'Fotogram', sub: `@${persona.fotogram.handle}`, x: 74, y: 17, icon: IconCamera, color: 'var(--blue)' },
  { id: 'correapp', type: 'username', label: 'CorreApp', sub: persona.correapp.handle, x: 87, y: 41, icon: IconActivity, color: 'var(--blue)' },
  { id: 'gamechat', type: 'username', label: 'GameChat', sub: `@${persona.gamechat.nick}`, x: 82, y: 67, icon: IconGamepad, color: 'var(--blue)' },

  { id: 'endereco', type: 'local', label: `${photoDetails.street}, ${photoDetails.houseNumber}`, sub: 'residência', x: 60, y: 82, color: 'var(--cyan)' },
  { id: 'rotina', type: 'evento', label: 'Ter/Qui 06:10', sub: 'corrida matinal', x: 37, y: 87 },
  { id: 'viagem', type: 'evento', label: '20–27/12', sub: 'casa vazia', x: 20, y: 86 },

  { id: 'senha', type: 'conta', label: photoDetails.password, sub: 'senha provável', x: 84, y: 88, icon: IconKey },
]

export const graphEdges: GraphEdge[] = [
  { from: 'lia', to: 'sandra', label: 'mãe' },
  { from: 'sandra', to: 'rosa', label: 'mãe' },
  { from: 'lia', to: 'thor', label: 'pet' },
  { from: 'lia', to: 'farmacia', label: 'trabalha' },
  { from: 'lia', to: 'fotogram', label: 'perfil' },
  { from: 'lia', to: 'correapp', label: 'perfil' },
  { from: 'lia', to: 'gamechat', label: 'perfil' },
  { from: 'lia', to: 'endereco', label: 'mora' },
  { from: 'correapp', to: 'endereco', label: 'corridas' },
  { from: 'lia', to: 'rotina', label: 'rotina' },
  { from: 'rotina', to: 'endereco', label: 'sai de casa' },
  { from: 'lia', to: 'viagem', label: 'viagem' },
  { from: 'gamechat', to: 'senha', label: 'senha' },
  { from: 'thor', to: 'senha', label: 'origem' },
]
