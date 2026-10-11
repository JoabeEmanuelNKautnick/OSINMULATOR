import type { Case } from '../types'
import type { CategoryKey } from '../../ui/categories'
import { persona, posts, runs, chat, chatUsers, photoDetails } from './persona'
import { missions } from './missions'
import { attackMissions } from './attackMissions'
import { graphNodes, graphEdges } from './graph'
import { docs } from './docs'

const missionCategory: Record<number, CategoryKey> = {
  1: 'pessoa', 2: 'data', 3: 'pessoa', 4: 'empresa', 5: 'local',
  6: 'local', 7: 'evento', 8: 'evento', 9: 'conta',
}

const attackCategory: Record<number, CategoryKey> = {
  1: 'conta', 2: 'conta', 3: 'conta', 4: 'pessoa', 5: 'pessoa',
  6: 'empresa', 7: 'local', 8: 'evento', 9: 'evento',
}

const missionConfidence: Record<number, number> = {
  1: 95, 2: 88, 3: 90, 4: 96, 5: 82, 6: 93, 7: 85, 8: 92, 9: 78,
}

export const case01: Case = {
  id: 'case_01',
  number: '01',
  name: persona.name,
  city: persona.city,
  imagesFolder: 'case_01',
  avatar: 'perfil-lia',
  photos: {
    dog: 'thor', cake: 'bolo', badge: 'cracha', house: 'casa',
    beach: 'praia', coffee: 'cafe', sunset: 'pordosol', gym: 'academia',
  },
  persona, posts, runs, chat, chatUsers, photoDetails,
  missions, attackMissions, graphNodes, graphEdges,
  missionCategory, attackCategory, missionConfidence,
  docs,
}
