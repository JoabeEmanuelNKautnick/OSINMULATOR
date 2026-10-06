import type { AppId } from '../data/missions'
import { Fotogram } from './Fotogram'
import { CorreApp } from './CorreApp'
import { GameChat } from './GameChat'

export const appMeta: Record<AppId, { name: string; icon: string; color: string }> = {
  fotogram: { name: 'Fotogram', icon: '📷', color: '#d6336c' },
  correapp: { name: 'CorreApp', icon: '🏃', color: '#e8491d' },
  gamechat: { name: 'GameChat', icon: '🎮', color: '#5865f2' },
}

export function AppView({ app, highlight }: { app: AppId; highlight?: string }) {
  if (app === 'fotogram') return <Fotogram highlight={highlight} />
  if (app === 'correapp') return <CorreApp highlight={highlight} />
  return <GameChat highlight={highlight} />
}
