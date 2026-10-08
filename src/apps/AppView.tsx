import type { AppId } from '../data/missions'
import { Fotogram } from './Fotogram'
import { CorreApp } from './CorreApp'
import { GameChat } from './GameChat'
import { IconCamera, IconActivity, IconGamepad, type Icon } from '../ui/icons'

export const appMeta: Record<AppId, { name: string; Icon: Icon; color: string }> = {
  fotogram: { name: 'Fotogram', Icon: IconCamera, color: '#d6336c' },
  correapp: { name: 'CorreApp', Icon: IconActivity, color: '#e8491d' },
  gamechat: { name: 'GameChat', Icon: IconGamepad, color: '#5865f2' },
}

export function AppView({ app, highlight }: { app: AppId; highlight?: string }) {
  if (app === 'fotogram') return <Fotogram highlight={highlight} />
  if (app === 'correapp') return <CorreApp highlight={highlight} />
  return <GameChat highlight={highlight} />
}
