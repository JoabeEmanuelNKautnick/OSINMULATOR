// Tipos de dados compartilhados por todos os casos (estáveis; não mudam por caso).
import type { Line } from '../kali/Terminal'
import type { CategoryKey } from '../ui/categories'
import type { Icon } from '../ui/icons'

/* ===== Persona / redes ===== */
export type PhotoKind = 'dog' | 'cake' | 'badge' | 'house' | 'beach' | 'coffee' | 'sunset' | 'gym'

export interface Comment {
  author: string
  name: string
  text: string
}

export interface Post {
  id: string
  date: string
  location?: string
  photo: PhotoKind
  caption: string
  likes: number
  comments: Comment[]
}

export interface Run {
  id: string
  title: string
  weekday: string
  date: string
  start: string
  end: string
  km: number
  pace: string
  route: 'loop' | 'park'
  startPlace: string
  endPlace: string
}

export interface ChatMessage {
  id: string
  author: string
  time: string
  text: string
}

export type ChatUsers = Record<string, { color: string; display: string }>

export interface Persona {
  name: string
  age: number
  city: string
  fotogram: { handle: string; bio: string; followers: number; following: number }
  correapp: { handle: string; club: string }
  gamechat: { nick: string; displayName: string; status: string; about: string; server: string; since: string }
}

export interface PhotoDetails {
  employer: string
  role: string
  houseNumber: string
  street: string
  mother: string
  pet: string
  birthday: string
  password: string
}

/* ===== Missões ===== */
export type AppId = 'fotogram' | 'correapp' | 'gamechat'

export interface Mission {
  id: number
  title: string
  question: string
  options: string[]
  answer: number
  app: AppId
  evidence: string
  clueLabel: string
  clueValue: string
  explanation: string
  avoid: string
  command: string
  output: string[]
}

/* ===== Ataque ===== */
export type RevealKind = 'wordlist' | 'recovery' | 'phishing' | 'riskmap' | 'gamechat'

export interface AttackMission {
  id: number
  objective: string
  question: string
  options: string[]
  answer: number
  terminal: Line[]
  reveal: RevealKind
  loot: { label: string; value: string }
  defense: string
}

/* ===== Grafo ===== */
export interface GraphNode {
  id: string
  type: CategoryKey
  label: string
  sub?: string
  x: number
  y: number
  icon?: Icon
  color?: string
  center?: boolean
}

export interface GraphEdge {
  from: string
  to: string
  label?: string
}
