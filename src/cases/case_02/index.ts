import type { Case } from '../types'
import type { Persona, PhotoKind, PhotoDetails, GraphNode, GraphEdge } from '../../data/types'
import { docs } from './docs'

// Rede de correlação do caso (consumida pelo InvestigationGraph no modo Analista).
const graphNodes: GraphNode[] = [
  { id: 'alvo', type: 'pessoa', label: 'Mirosvalikov', sub: 'procurado internacional', x: 50, y: 48, center: true },
  { id: 'pseudo', type: 'username', label: 'Baravsholov', sub: 'pseudônimo', x: 24, y: 26 },
  { id: 'nac', type: 'documento', label: 'Russa', sub: 'nacionalidade', x: 12, y: 50 },
  { id: 'cicatriz', type: 'foto', label: 'Cicatriz facial', sub: 'sinal particular', x: 33, y: 13 },
  { id: 'tattoo', type: 'foto', label: 'Tatuagens', sub: 'braço direito', x: 52, y: 12 },
  { id: 'g63', type: 'infra', label: 'Mercedes-AMG G63', sub: 'placa parcial "GHS"', x: 76, y: 28 },
  { id: 'pasticceria', type: 'local', label: 'Pasticceria Buona Luce', sub: '03/10 · avistamento antigo', x: 80, y: 54 },
  { id: 'cam04', type: 'documento', label: 'CAM 04 · CCTV', sub: '14:27 · match 97%', x: 72, y: 74 },
  { id: 'denuncia', type: 'documento', label: 'Denúncia DEN-2026', sub: 'anônima · 16h40', x: 49, y: 86 },
  { id: 'leadhoje', type: 'evento', label: 'Lead de hoje', sub: 'G63 08:12 · zona portuária', x: 27, y: 80 },
  { id: 'atual', type: 'local', label: 'Caffè del Porto', sub: 'posição ATUAL', x: 16, y: 44, color: 'var(--ok)' },
]

const graphEdges: GraphEdge[] = [
  { from: 'alvo', to: 'pseudo', label: 'pseudônimo' },
  { from: 'alvo', to: 'nac', label: 'nacionalidade' },
  { from: 'alvo', to: 'cicatriz', label: 'sinal' },
  { from: 'alvo', to: 'tattoo', label: 'sinal' },
  { from: 'alvo', to: 'g63', label: 'veículo' },
  { from: 'g63', to: 'pasticceria', label: 'visto em' },
  { from: 'pasticceria', to: 'cam04', label: 'CCTV' },
  { from: 'cam04', to: 'alvo', label: 'match 97%' },
  { from: 'denuncia', to: 'pasticceria', label: 'relato' },
  { from: 'denuncia', to: 'alvo', label: 'aponta' },
  { from: 'g63', to: 'leadhoje', label: 'flagrado hoje' },
  { from: 'leadhoje', to: 'atual', label: 'leva a' },
  { from: 'alvo', to: 'atual', label: 'está em' },
]

// O CASE_02 usa uma surface própria (Portal AICOI), orientada a documentos — não os
// 3 apps sociais do case_01. Os campos "sociais" exigidos hoje pelo tipo `Case` são
// preenchidos com placeholders estruturais (nunca renderizados neste caso). Os dados
// jogáveis do case_02 vivem em ./conclusion, ./messages e ./map, lidos direto pela
// surface em src/investigador/case02.

const persona: Persona = {
  name: 'Mirosvalikov (Baravsholov)',
  age: 0,
  city: 'Napoli',
  fotogram: { handle: '', bio: '', followers: 0, following: 0 },
  correapp: { handle: '', club: '' },
  gamechat: { nick: '', displayName: '', status: '', about: '', server: '', since: '' },
}

const photoDetails: PhotoDetails = {
  employer: '', role: '', houseNumber: '', street: '',
  mother: '', pet: '', birthday: '', password: '',
}

export const case02: Case = {
  id: 'case_02',
  number: '02',
  name: 'Operação Baravsholov',
  city: 'Napoli',

  kind: 'documental',
  attackerDisabled: true,

  imagesFolder: 'case_02',
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
