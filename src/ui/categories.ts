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

/* Mapas específicos do CASO ATIVO (categoria/confiança por missão e passo). */
import { activeCase } from '../cases/active'

export const missionConfidence = activeCase.missionConfidence
export const missionCategory = activeCase.missionCategory
export const attackCategory = activeCase.attackCategory
