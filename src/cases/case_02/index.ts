import type { Case } from '../types'
import type { Persona, PhotoKind, PhotoDetails } from '../../data/types'
import { docs } from './docs'

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
  graphNodes: [],
  graphEdges: [],
  missionCategory: {},
  attackCategory: {},
  missionConfidence: {},
  // ---------------------------------------------------------------------

  docs,
}
