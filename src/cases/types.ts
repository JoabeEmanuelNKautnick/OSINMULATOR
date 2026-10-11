import type {
  Persona, Post, Run, ChatMessage, ChatUsers, PhotoDetails, PhotoKind,
  Mission, AttackMission, GraphNode, GraphEdge,
} from '../data/types'
import type { CategoryKey } from '../ui/categories'

/** Documento oficial do caso (autos). */
export interface CaseDoc {
  id: string
  title: string
  subtitle: string
  org: string
  url: string
  lockedUntilDone?: boolean // no Investigador, só libera após concluir
}

/** Tudo que define um caso investigativo. */
export interface Case {
  id: string            // 'case_01'
  number: string        // '01'
  name: string          // nome do alvo
  city: string
  imagesFolder: string  // pasta em /imgs (ex.: 'case_01')
  avatar: string        // base do arquivo do avatar (ex.: 'perfil-lia')
  photos: Record<PhotoKind, string> // PhotoKind -> base do arquivo

  persona: Persona
  posts: Post[]
  runs: Run[]
  chat: ChatMessage[]
  chatUsers: ChatUsers
  photoDetails: PhotoDetails

  missions: Mission[]
  attackMissions: AttackMission[]
  graphNodes: GraphNode[]
  graphEdges: GraphEdge[]

  missionCategory: Record<number, CategoryKey>
  attackCategory: Record<number, CategoryKey>
  missionConfidence: Record<number, number>

  docs: CaseDoc[]
}
