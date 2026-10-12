import type { CategoryKey } from '../../ui/categories'

export interface TimelineEvent {
  time: string
  label: string
  detail: string
  kind: CategoryKey
}

/** Cronologia conhecida do caso (painel do Analista e Palestra).
 *  Horários fiéis aos documentos reais do caso (registro às 13h00; testemunha ~11h50). */
export const timeline: TimelineEvent[] = [
  { time: '12/10/1994', label: 'Nascimento de Marie', detail: 'Marie Joan Elise Salles nasce em Montbleu, França. Filha de Paul Henry Salles e Amélie Salles.', kind: 'data' },
  { time: '09/12/1997', label: 'Falecimento de Amélie', detail: 'A mãe, Amélie Salles, falece de câncer pancreático (certidão de óbito). Marie passa a ser criada pelo pai. NÃO é certidão de Marie.', kind: 'documento' },
  { time: '1998', label: 'Queda no playground', detail: 'Marie cai em um playground e fica com uma pequena cicatriz no joelho esquerdo (característica física).', kind: 'evento' },
  { time: '23/04/2000 · 10h30', label: 'Chegada ao Castelo Real', detail: 'Paul e Marie chegam ao Castelo Real, em Londres, para visita turística.', kind: 'local' },
  { time: '23/04/2000 · 11h40', label: 'Pátio interno', detail: 'Pai e filha param no pátio interno, próximo à loja de souvenirs.', kind: 'local' },
  { time: '23/04/2000 · 11h45', label: 'Paul percebe a ausência', detail: 'Paul percebe que perdeu Marie de vista. Horário declarado por ele — é o conteúdo da declaração, não prova do instante do desaparecimento.', kind: 'pessoa' },
  { time: '23/04/2000 · ~11h50', label: 'Avistamento no portão leste', detail: 'A testemunha Margaret Whitmore relata ver uma menina sozinha com um coelho de pelúcia perto do portão leste. Não viu com quem a menina foi.', kind: 'evento' },
  { time: '23/04/2000 · 11h55', label: 'Bloqueio das saídas', detail: 'A segurança faz anúncios internos e bloqueia as saídas. Sem lista completa de quem já havia saído.', kind: 'documento' },
  { time: '23/04/2000 · 12h20', label: 'Polícia acionada', detail: 'Paul aciona a polícia local.', kind: 'evento' },
  { time: '23/04/2000 · 13h00', label: 'Registro consular', detail: 'Paul formaliza o Registro de Desaparecimento nº 0078/2000 (B.O. 00879/2000) no Consulado Francês.', kind: 'documento' },
  { time: '24/04/2000', label: 'Divulgação do cartaz', detail: 'Divulgação do cartaz de desaparecimento. A testemunha o vê no metrô e só então procura a polícia.', kind: 'documento' },
  { time: '15/03/2026', label: 'Reemissão do alerta', detail: 'O AICOI reemite o Alerta Amarelo Y-9862/2000-FICT-R1 com projeção de idade (31 anos).', kind: 'documento' },
]

/** Evento do construtor de linha do tempo (Fase 1): o jogador ordena a manhã de 23/04. */
export interface BuilderEvent {
  id: string
  time: string
  label: string
  /** Posição correta na ordem cronológica (0-based). */
  order: number
  /** De onde o horário vem (ajuda didática). */
  source: string
}

/** Fase 1 — a manhã de 23/04/2000, embaralhada; o jogador reconstrói a ordem. */
export const builderEvents: BuilderEvent[] = [
  { id: 'b-1030', time: '10h30', label: 'Chegada ao Castelo Real', order: 0, source: 'Registro 0078/2000' },
  { id: 'b-1140', time: '11h40', label: 'Pátio interno, perto da loja', order: 1, source: 'Registro 0078/2000' },
  { id: 'b-1145', time: '11h45', label: 'Paul percebe a ausência de Marie', order: 2, source: 'Declaração de Paul (relato)' },
  { id: 'b-1150', time: '~11h50', label: 'Testemunha vê a menina no portão leste', order: 3, source: 'Carta de testemunho (relato)' },
  { id: 'b-1155', time: '11h55', label: 'Segurança bloqueia as saídas', order: 4, source: 'Registro / testemunho' },
  { id: 'b-1220', time: '12h20', label: 'Polícia acionada', order: 5, source: 'Registro 0078/2000' },
  { id: 'b-1300', time: '13h00', label: 'Registro no Consulado Francês', order: 6, source: 'Registro 0078/2000' },
]

/** Janela de incerteza que o sistema deve registrar após a ordenação correta. */
export const WINDOW = {
  from: '11h45',
  to: '~11h50',
  label: 'Janela inicial de investigação',
  note:
    'Entre 11h45 (Paul percebe a ausência) e ~11h50 (avistamento da testemunha) há uma ' +
    'janela de ~5 minutos. ATENÇÃO: isso é uma referência inicial, não prova de que Marie ' +
    'desapareceu exatamente nesse intervalo — ela pode ter saído do campo de visão do pai antes.',
}
