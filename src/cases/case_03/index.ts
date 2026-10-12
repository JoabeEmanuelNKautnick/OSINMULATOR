import type { Case } from '../types'
import type { Persona, PhotoKind, PhotoDetails, GraphNode, GraphEdge } from '../../data/types'
import { docs } from './docs'

// Rede de correlação do caso (consumida pelo InvestigationGraph no painel do Analista).
// Caso frio: várias arestas são "relato" / "possível" / "não confirmado" de propósito.
const graphNodes: GraphNode[] = [
  { id: 'marie', type: 'pessoa', label: 'Marie Salles', sub: 'desaparecida · 5 anos em 2000', x: 50, y: 48, center: true },
  { id: 'paul', type: 'pessoa', label: 'Paul H. Salles', sub: 'pai · comunicante', x: 50, y: 22 },
  { id: 'amelie', type: 'pessoa', label: 'Amélie Salles', sub: 'mãe · †1997', x: 29, y: 14 },
  { id: 'testemunha', type: 'pessoa', label: 'M. Whitmore', sub: 'testemunha', x: 78, y: 23 },
  { id: 'portao', type: 'local', label: 'Portão leste', sub: 'avistamento ~11h50', x: 82, y: 44 },
  { id: 'loja', type: 'local', label: 'Loja de souvenirs', sub: 'visto 11h40', x: 61, y: 66 },
  { id: 'cameras', type: 'infra', label: 'Câmeras do pátio', sub: 'em manutenção', x: 41, y: 77 },
  { id: 'coelho', type: 'foto', label: 'Coelho de pelúcia', sub: 'identificador', x: 23, y: 58 },
  { id: 'registro', type: 'documento', label: 'Registro 0078/2000', sub: 'consular', x: 17, y: 37 },
  { id: 'yellow', type: 'documento', label: 'Alerta amarelo', sub: 'Y-9862 · reemitido 2026', x: 16, y: 64 },
  { id: 'obito', type: 'documento', label: 'Certidão de óbito', sub: 'da MÃE (armadilha)', x: 31, y: 88 },
  { id: 'projecao', type: 'foto', label: 'Projeção 2026', sub: 'envelhecimento digital', x: 70, y: 80 },
  { id: 'acolhimento', type: 'documento', label: 'Ficha de acolhimento', sub: 'fase 7 · possível', x: 86, y: 65 },
  { id: 'mulher2026', type: 'pessoa', label: 'Mulher de 2026', sub: 'fase 8 · não confirmado', x: 85, y: 86 },
]

const graphEdges: GraphEdge[] = [
  { from: 'marie', to: 'paul', label: 'pai' },
  { from: 'paul', to: 'amelie', label: 'cônjuge' },
  { from: 'marie', to: 'amelie', label: 'mãe (†1997)' },
  { from: 'amelie', to: 'obito', label: 'certidão' },
  { from: 'marie', to: 'registro', label: 'registro' },
  { from: 'marie', to: 'yellow', label: 'alerta' },
  { from: 'testemunha', to: 'portao', label: 'avistou ~11h50' },
  { from: 'marie', to: 'portao', label: 'relato (incerto)' },
  { from: 'marie', to: 'loja', label: 'visto 11h40' },
  { from: 'portao', to: 'cameras', label: 'sem imagem' },
  { from: 'marie', to: 'coelho', label: 'objeto' },
  { from: 'testemunha', to: 'coelho', label: 'descreveu' },
  { from: 'yellow', to: 'projecao', label: 'contém' },
  { from: 'marie', to: 'projecao', label: 'estimativa' },
  { from: 'acolhimento', to: 'marie', label: 'possível' },
  { from: 'mulher2026', to: 'projecao', label: 'semelhança' },
  { from: 'mulher2026', to: 'marie', label: 'não confirmado' },
]

// O CASE_03 usa a surface própria (Portal AICOI documental), como o case_02. Os campos
// "sociais" exigidos pelo tipo `Case` são placeholders estruturais (nunca renderizados).
// Os dados jogáveis vivem em ./timeline, ./messages, ./evidence, ./map e ./endings.
const persona: Persona = {
  name: 'Marie Joan Elise Salles',
  age: 0,
  city: 'Londres',
  fotogram: { handle: '', bio: '', followers: 0, following: 0 },
  correapp: { handle: '', club: '' },
  gamechat: { nick: '', displayName: '', status: '', about: '', server: '', since: '' },
}

const photoDetails: PhotoDetails = {
  employer: '', role: '', houseNumber: '', street: '',
  mother: '', pet: '', birthday: '', password: '',
}

export const case03: Case = {
  id: 'case_03',
  number: '03',
  name: 'Marie Joan Elise Salles',
  city: 'Londres',

  kind: 'documental',
  attackerDisabled: true,

  imagesFolder: 'case_03',
  avatar: 'perfil',
  photos: {} as Record<PhotoKind, string>,

  // --- placeholders estruturais (não usados pela surface documental) ---
  persona,
  posts: [],
  runs: [],
  chat: [],
  chatUsers: {},
  photoDetails,
  missions: [],
  attackMissions: [],
  graphNodes,
  graphEdges,
  missionCategory: {},
  attackCategory: {},
  missionConfidence: {},
  // ---------------------------------------------------------------------

  docs,
}
