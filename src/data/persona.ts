// Fonte única de dados. Tudo aqui é FICTÍCIO.

export type PhotoKind = 'dog' | 'cake' | 'badge' | 'house' | 'beach' | 'coffee' | 'sunset' | 'gym'

export interface Comment {
  author: string
  name: string
  text: string
}

export interface Post {
  id: string
  date: string // exibição
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

export const persona = {
  name: 'Lia Andrade',
  age: 19,
  city: 'Vila Serrana',
  fotogram: {
    handle: 'lia.andrade',
    bio: '19 🌻 | Vila Serrana | corredora iniciante 🏃‍♀️ | mãe do Thor 🐶',
    followers: 1284,
    following: 612,
  },
  correapp: {
    handle: 'Lia A.',
    club: 'Corredores de Vila Serrana',
  },
  gamechat: {
    nick: 'thor2007',
    displayName: 'Lia 🌻',
    status: 'jogando Arena Legends',
    about: 'Vila Serrana · main suporte · não me chama de noob',
    server: 'Vila Serrana Gamers',
    since: 'membro desde 2021',
  },
}

export const posts: Post[] = [
  {
    id: 'p-beach',
    date: '2 dias atrás',
    photo: 'beach',
    caption: 'Contagem regressiva 🏖️ família toda na praia de 20 a 27/12! Vila Serrana que me aguarde na volta kkk',
    likes: 203,
    comments: [
      { author: 'carla.mnds', name: 'Carla Mendes', text: 'aaaa que inveja!!! leva o Thor?' },
      { author: 'lia.andrade', name: 'Lia Andrade', text: 'não 😭 ele vai ficar no hotelzinho' },
    ],
  },
  {
    id: 'p-house',
    date: '3 semanas atrás',
    location: 'Vila Serrana',
    photo: 'house',
    caption: 'Casa nova!!! 🏡🔑 finalmente nosso cantinho',
    likes: 341,
    comments: [
      { author: 'juh.prado', name: 'Juliana Prado', text: 'que linda!! chá de casa nova quando?' },
      { author: 'sandra.andrade73', name: 'Sandra Andrade', text: 'Nosso lar ❤️🙏' },
    ],
  },
  {
    id: 'p-badge',
    date: '1 mês atrás',
    photo: 'badge',
    caption: 'Primeiro dia no trampo novo!! nervosa mas feliz 💚',
    likes: 289,
    comments: [
      { author: 'carla.mnds', name: 'Carla Mendes', text: 'arrasa amigaaa' },
      { author: 'rosa.andrade', name: 'Rosa Andrade', text: 'Deus abençoe netinha' },
    ],
  },
  {
    id: 'p-coffee',
    date: '1 mês atrás',
    location: 'Padaria Pão da Serra',
    photo: 'coffee',
    caption: 'café pós corrida é sagrado ☕',
    likes: 97,
    comments: [{ author: 'juh.prado', name: 'Juliana Prado', text: 'me chama na próxima!' }],
  },
  {
    id: 'p-dog',
    date: '2 meses atrás',
    photo: 'dog',
    caption: 'O Thor fez 3 anos!!! 🐶🎉 meu melhor amigo',
    likes: 412,
    comments: [
      { author: 'juh.prado', name: 'Juliana Prado', text: 'o Bolt mandou parabéns pro primo kkkk' },
      { author: 'carla.mnds', name: 'Carla Mendes', text: 'a Mel aqui ficou com ciúmes 🐱' },
    ],
  },
  {
    id: 'p-gym',
    date: '4 meses atrás',
    location: 'Academia Corpo Ativo',
    photo: 'gym',
    caption: 'tentando ser fitness 😂',
    likes: 154,
    comments: [],
  },
  {
    id: 'p-cake',
    date: '14 de março',
    photo: 'cake',
    caption: '19 anos!!! 🎂✨ obrigada por todo o carinho',
    likes: 520,
    comments: [
      { author: 'sandra.andrade73', name: 'Sandra Andrade', text: 'Parabéns minha filha ❤️ te amo' },
      { author: 'rosa.andrade', name: 'Rosa Andrade', text: 'Parabéns minha netinha linda' },
      { author: 'carla.mnds', name: 'Carla Mendes', text: 'feliz aniversário amigaaa 🥳' },
    ],
  },
  {
    id: 'p-sunset',
    date: '7 meses atrás',
    location: 'Mirante da Serra',
    photo: 'sunset',
    caption: 'Vila Serrana nunca decepciona 🌄',
    likes: 188,
    comments: [],
  },
]

export const runs: Run[] = [
  { id: 'r1', title: 'Corrida matinal', weekday: 'Quinta', date: 'ontem', start: '06:10', end: '06:41', km: 5.1, pace: "6'05\"", route: 'loop', startPlace: 'Rua das Hortênsias', endPlace: 'Rua das Hortênsias' },
  { id: 'r2', title: 'Corrida matinal', weekday: 'Terça', date: '3 dias atrás', start: '06:10', end: '06:43', km: 5.2, pace: "6'20\"", route: 'loop', startPlace: 'Rua das Hortênsias', endPlace: 'Rua das Hortênsias' },
  { id: 'r3', title: 'Corrida da Serra 5K 🏅', weekday: 'Sábado', date: '5 dias atrás', start: '08:00', end: '08:29', km: 5.0, pace: "5'48\"", route: 'park', startPlace: 'Praça Central', endPlace: 'Parque das Águas' },
  { id: 'r4', title: 'Corrida matinal', weekday: 'Quinta', date: '8 dias atrás', start: '06:11', end: '06:40', km: 4.9, pace: "5'55\"", route: 'loop', startPlace: 'Rua das Hortênsias', endPlace: 'Rua das Hortênsias' },
  { id: 'r5', title: 'Corrida matinal', weekday: 'Terça', date: '10 dias atrás', start: '06:09', end: '06:42', km: 5.0, pace: "6'36\"", route: 'loop', startPlace: 'Rua das Hortênsias', endPlace: 'Rua das Hortênsias' },
]

export const chat: ChatMessage[] = [
  { id: 'm1', author: 'k4io', time: '21:02', text: 'bora rankeada hj?' },
  { id: 'm2', author: 'thor2007', time: '21:04', text: 'bora, só 1h q amanhã é dia de correr cedo' },
  { id: 'm3', author: 'duda_zz', time: '21:05', text: 'lia vc acorda q horas p correr 💀' },
  { id: 'm4', author: 'thor2007', time: '21:05', text: 'terça e quinta 6h10 to na rua kkk' },
  { id: 'm5', author: 'k4io', time: '21:31', text: 'caiu a conta dnv?' },
  { id: 'm6', author: 'thor2007', time: '21:32', text: 'esqueci a senha de novo 🤡 ainda bem que é o nome do Thor' },
  { id: 'm7', author: 'duda_zz', time: '21:33', text: 'KKKKK fala alto msm' },
  { id: 'm8', author: 'thor2007', time: '22:10', text: 'ah e de 20 a 27/12 fico off, praia c a família 🏖️' },
]

export const chatUsers: Record<string, { color: string; display: string }> = {
  thor2007: { color: '#f5a623', display: 'thor2007' },
  k4io: { color: '#5865f2', display: 'k4io' },
  duda_zz: { color: '#3ba55d', display: 'duda_zz' },
}

// Detalhes que só aparecem nas "fotos"
export const photoDetails = {
  employer: 'Farmácia Serrana',
  role: 'Atendente',
  houseNumber: '142',
  street: 'Rua das Hortênsias',
  mother: 'Sandra Andrade',
  pet: 'Thor',
  birthday: '14/03/2007',
  password: 'thor2007',
}
