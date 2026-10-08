/* ============================================================
   Categorias de evidência (proposta, seção 10).
   Mapeadas por cima das missões/loot — sem editar os dados.
   ============================================================ */
import {
  IconPerson, IconAt, IconMapPin, IconBuilding, IconCalendar,
  IconImage, IconFile, IconAccount, IconFlag, IconServer, type Icon,
} from './icons'

export type CategoryKey =
  | 'pessoa' | 'username' | 'local' | 'empresa' | 'data'
  | 'foto' | 'documento' | 'conta' | 'evento' | 'infra'

export interface Category {
  key: CategoryKey
  label: string
  Icon: Icon
  color: string // referência a um token CSS
}

export const categories: Record<CategoryKey, Category> = {
  pessoa:    { key: 'pessoa',    label: 'Pessoa',          Icon: IconPerson,   color: 'var(--purple)' },
  username:  { key: 'username',  label: 'Username',        Icon: IconAt,       color: 'var(--blue)' },
  local:     { key: 'local',     label: 'Local',           Icon: IconMapPin,   color: 'var(--blue)' },
  empresa:   { key: 'empresa',   label: 'Empresa',         Icon: IconBuilding, color: 'var(--purple-2)' },
  data:      { key: 'data',      label: 'Data',            Icon: IconCalendar, color: 'var(--blue)' },
  foto:      { key: 'foto',      label: 'Foto',            Icon: IconImage,    color: 'var(--purple-2)' },
  documento: { key: 'documento', label: 'Documento',       Icon: IconFile,     color: 'var(--text-2)' },
  conta:     { key: 'conta',     label: 'Conta',           Icon: IconAccount,  color: 'var(--danger)' },
  evento:    { key: 'evento',    label: 'Evento',          Icon: IconFlag,     color: 'var(--warn)' },
  infra:     { key: 'infra',     label: 'Infraestrutura',  Icon: IconServer,   color: 'var(--text-2)' },
}

/** Força da evidência por missão do Investigador (direto vs. inferido). */
export const missionConfidence: Record<number, number> = {
  1: 95, 2: 88, 3: 90, 4: 96, 5: 82, 6: 93, 7: 85, 8: 92, 9: 78,
}

/** Categoria de cada missão do Investigador (por id). */
export const missionCategory: Record<number, CategoryKey> = {
  1: 'pessoa',   // nome do pet
  2: 'data',     // nascimento
  3: 'pessoa',   // mãe
  4: 'empresa',  // trabalho
  5: 'local',    // rua
  6: 'local',    // número da casa
  7: 'evento',   // rotina
  8: 'evento',   // viagem
  9: 'conta',    // senha
}

/** Categoria de cada passo do modo Atacante (por id). */
export const attackCategory: Record<number, CategoryKey> = {
  1: 'conta',    // vetor
  2: 'conta',    // wordlist
  3: 'conta',    // senha
  4: 'pessoa',   // recuperação (pet)
  5: 'pessoa',   // recuperação (mãe)
  6: 'empresa',  // engenharia social
  7: 'local',    // endereço
  8: 'evento',   // janela de viagem
  9: 'evento',   // rotina
}
