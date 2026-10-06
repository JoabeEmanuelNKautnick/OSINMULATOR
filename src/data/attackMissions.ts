import type { Line } from '../kali/Terminal'
import { persona, photoDetails } from './persona'

export type RevealKind = 'wordlist' | 'recovery' | 'phishing' | 'riskmap' | 'gamechat'

export interface AttackMission {
  id: number
  objective: string // o alvo tático do passo
  question: string
  options: string[]
  answer: number
  terminal: Line[] // saída impressa ao acertar
  reveal: RevealKind // painel revelado ao acertar
  loot: { label: string; value: string }
  defense: string
}

export const attackMissions: AttackMission[] = [
  {
    id: 1,
    objective: 'Escolher o vetor mais fraco',
    question: 'Qual rede entrega mais rápido uma senha reutilizável do alvo?',
    options: ['CorreApp (corridas)', 'GameChat (nick + conversas)', 'Fotogram (fotos)', 'Nenhuma'],
    answer: 1,
    reveal: 'gamechat',
    loot: { label: 'Vetor', value: 'GameChat (nick thor2007)' },
    defense: 'Não use o mesmo padrão de apelido/senha em vários serviços; separe contas de jogo do resto.',
    terminal: [
      { text: 'recon --surface lia.andrade', cls: 'cmd' },
      { text: '  [*] fotogram: fotos; correapp: GPS; gamechat: nick+chat', cls: 'dim' },
      { text: `  [ok] alvo preferencial: gamechat (${persona.gamechat.nick})`, cls: 'ok' },
    ],
  },
  {
    id: 2,
    objective: 'Montar a wordlist',
    question: 'Com base no perfil, qual combinação é a melhor semente para a wordlist?',
    options: ['cidade + ano', 'nome do pet + ano de nascimento', 'nome da mãe + 123', 'números aleatórios'],
    answer: 1,
    reveal: 'wordlist',
    loot: { label: 'Wordlist', value: 'base: pet + ano (thor2007…)' },
    defense: 'Senhas baseadas em dados pessoais são previsíveis. Use senhas longas e aleatórias num gerenciador.',
    terminal: [
      { text: 'wordlist --from-dossier', cls: 'cmd' },
      { text: '  [*] combinando pet + datas...', cls: 'dim' },
      { text: '  thor / thor2007 / Thor2007 / thor1403 / thor@2007', cls: 'dim' },
      { text: '  [ok] 1.248 candidatos gerados', cls: 'ok' },
    ],
  },
  {
    id: 3,
    objective: 'Quebrar o login',
    question: 'Qual senha testar primeiro contra a conta do GameChat?',
    options: ['serrana2026', 'thor2007', '12345678', 'liaandrade'],
    answer: 1,
    reveal: 'wordlist',
    loot: { label: 'Senha', value: photoDetails.password },
    defense: 'Ative verificação em duas etapas (2FA): mesmo com a senha certa, o acesso é bloqueado.',
    terminal: [
      { text: `bruteforce gamechat:${persona.gamechat.nick} -w wordlist.txt`, cls: 'cmd' },
      { text: '  [*] tentativa 1: thor ... negado', cls: 'dim' },
      { text: '  [*] tentativa 2: thor2007 ...', cls: 'dim' },
      { text: `  [ok] ACESSO CONCEDIDO — senha: ${photoDetails.password}`, cls: 'ok' },
    ],
  },
  {
    id: 4,
    objective: 'Burlar a recuperação (pet)',
    question: 'A recuperação de conta pergunta "nome do primeiro pet". Qual a resposta?',
    options: ['Bolt', 'Mel', 'Thor', 'Pipoca'],
    answer: 2,
    reveal: 'recovery',
    loot: { label: 'Pergunta 1', value: 'pet = Thor' },
    defense: 'Trate perguntas de segurança como senhas: responda com algo falso e único, não com a verdade exposta.',
    terminal: [
      { text: 'account-recovery --q "primeiro pet"', cls: 'cmd' },
      { text: '  [*] buscando no dossiê...', cls: 'dim' },
      { text: `  [ok] resposta: ${photoDetails.pet}`, cls: 'ok' },
    ],
  },
  {
    id: 5,
    objective: 'Burlar a recuperação (mãe)',
    question: 'Agora pede "nome de solteira da mãe". Qual a resposta?',
    options: ['Rosa Andrade', 'Sandra Andrade', 'Carla Mendes', 'Juliana Prado'],
    answer: 1,
    reveal: 'recovery',
    loot: { label: 'Pergunta 2', value: 'mãe = Sandra Andrade' },
    defense: 'Peça à família para fechar perfis e evitar comentários que revelem parentesco.',
    terminal: [
      { text: 'account-recovery --q "nome da mãe"', cls: 'cmd' },
      { text: '  [*] comentário em p-cake: "Parabéns minha filha"', cls: 'dim' },
      { text: `  [ok] resposta: ${photoDetails.mother}`, cls: 'ok' },
    ],
  },
  {
    id: 6,
    objective: 'Preparar a engenharia social',
    question: 'No golpe se passando pela Lia, qual detalhe deixa a mensagem para a mãe mais convincente?',
    options: [
      'Falar de um sorteio genérico',
      'Citar o trabalho (Farmácia Serrana) e a avó Rosa',
      'Usar emojis demais',
      'Mandar um link aleatório',
    ],
    answer: 1,
    reveal: 'phishing',
    loot: { label: 'Pretexto', value: 'trabalho real + nome da avó' },
    defense: 'Combine uma palavra-código com a família e confirme pedidos de dinheiro por ligação ou vídeo.',
    terminal: [
      { text: 'pretext-gen --target "mãe"', cls: 'cmd' },
      { text: '  [*] injetando contexto real: Farmácia Serrana, vó Rosa', cls: 'dim' },
      { text: '  [ok] mensagem fabricada (ver painel →)', cls: 'ok' },
    ],
  },
  {
    id: 7,
    objective: 'Localizar o alvo',
    question: 'Juntando CorreApp e Fotogram, qual é o endereço do alvo?',
    options: [
      'Av. das Palmeiras, 24',
      'Rua das Hortênsias, 142',
      'Praça Central, 10',
      'Rua do Ipê, 142',
    ],
    answer: 1,
    reveal: 'riskmap',
    loot: { label: 'Endereço', value: `${photoDetails.street}, ${photoDetails.houseNumber}` },
    defense: 'Ative zonas de privacidade no app de corrida e confira o fundo das fotos antes de postar.',
    terminal: [
      { text: 'geo-correlate --runs --posts', cls: 'cmd' },
      { text: '  [*] start/end das corridas: Rua das Hortênsias', cls: 'dim' },
      { text: '  [*] OCR da placa (p-house): 142', cls: 'dim' },
      { text: `  [ok] ${photoDetails.street}, ${photoDetails.houseNumber}`, cls: 'warn' },
    ],
  },
  {
    id: 8,
    objective: 'Achar a janela sem a família',
    question: 'Em que período a casa fica sem a família?',
    options: ['Todo fim de semana', 'Feriado de novembro', '20 a 27/12', 'Nas férias de julho'],
    answer: 2,
    reveal: 'riskmap',
    loot: { label: 'Janela', value: 'casa vazia: 20–27/12' },
    defense: 'Nunca anuncie viagens antes ou durante. Poste as fotos só depois de voltar.',
    terminal: [
      { text: 'timeline --grep "praia|viagem"', cls: 'cmd' },
      { text: '  [*] p-beach: "família toda na praia de 20 a 27/12"', cls: 'dim' },
      { text: '  [ok] janela de ausência: 20–27/12', cls: 'warn' },
    ],
  },
  {
    id: 9,
    objective: 'Mapear a rotina',
    question: 'Em que dias e horário o alvo sai sozinho de casa de forma previsível?',
    options: ['Seg/Qua 18h', 'Ter/Qui 6h10', 'Sábado 8h', 'Domingo 7h'],
    answer: 1,
    reveal: 'riskmap',
    loot: { label: 'Rotina', value: 'ter/qui 6h10 (sai de casa)' },
    defense: 'Evite publicar atividades com horário fixo e em tempo real; varie o trajeto e poste depois.',
    terminal: [
      { text: 'pattern --weekly correapp', cls: 'cmd' },
      { text: '  [*] ter 06:10, qui 06:10 (recorrente)', cls: 'dim' },
      { text: '  [ok] rotina previsível: ter/qui 06:10', cls: 'warn' },
    ],
  },
]
